import express from "express";
import mongoose from "mongoose";
import cors from "cors";

// --- Initialize App & Middleware ---
const app = express();
app.use(cors()); // Allow requests from your React frontend
app.use(express.json()); // Allow app to read JSON from request bodies

// --- Database Connection ---
const MONGO_URI = "mongodb://localhost:27017/ecom-fashion"; // Your MongoDB connection string
mongoose
  .connect(MONGO_URI)
  .then(() => console.log("MongoDB connected successfully."))
  .catch((err) => console.error("MongoDB connection error:", err));

// --- Database Schemas ---

// Product Schema: What our products look like
const productSchema = new mongoose.Schema({
  name: String,
  price: Number, // Store price as a number for calculations
});
const Product = mongoose.model("Product", productSchema);

// CartItem Schema: What our cart items look like
// We store a reference to the product and the quantity
const cartItemSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
  },
});
const CartItem = mongoose.model("CartItem", cartItemSchema);

// --- Mock Data & Seeding ---
// This function runs once to add mock products to your empty database
const seedDatabase = async () => {
  try {
    const productCount = await Product.countDocuments();
    if (productCount === 0) {
      console.log("No products found. Seeding database...");
      const mockProducts = [
        { name: "Classic Blue Jeans", price: 59.99 },
        { name: "Brown Suede Jacket", price: 149.99 },
        { name: "Knit Sweater", price: 69.99 },
        { name: "Casual T-Shirt", price: 24.99 },
        { name: "White Linen Shirt", price: 49.99 },
        { name: "Summer Floral Dress", price: 79.99 },
        { name: "Beige Trench Coat", price: 129.99 },
        { name: "Kids Denim Overall", price: 39.99 },
      ];
      await Product.insertMany(mockProducts);
      console.log("Database seeded with 8 products.");
    } else {
      console.log("Products already exist. Skipping seeding.");
    }
  } catch (err) {
    console.error("Error seeding database:", err);
  }
};

// --- API ROUTES ---

/**
 * GET /api/products
 * Fetches all products from the database.
 */
app.get("/api/products", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/**
 * GET /api/cart
 * Fetches all cart items (with product details) and calculates the total.
 */
app.get("/api/cart", async (req, res) => {
  try {
    const items = await CartItem.find().populate("productId");

    // Calculate total on the server
    const total = items.reduce((acc, item) => {
      // item.productId is the full product object thanks to .populate()
      return acc + item.productId.price * item.quantity;
    }, 0);

    res.json({ items, total });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/**
 * POST /api/cart
 * Adds a new item to the cart or updates its quantity if it already exists.
 * Expects body: { productId, quantity }
 */
app.post("/api/cart", async (req, res) => {
  const { productId, quantity } = req.body;

  if (quantity <= 0) {
    return res.status(400).json({ message: "Quantity must be greater than 0" });
  }

  try {
    // Find item by productId
    let cartItem = await CartItem.findOne({ productId });

    if (cartItem) {
      // If item exists, update its quantity
      cartItem.quantity = quantity;
      await cartItem.save();
    } else {
      // If item does not exist, create a new one
      cartItem = new CartItem({ productId, quantity });
      await cartItem.save();
    }

    // Populate product info before sending back
    await cartItem.populate("productId");
    res.status(201).json(cartItem);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/**
 * DELETE /api/cart/:id
 * Removes an item from the cart by its *cart item ID* (not product ID).
 */
app.delete("/api/cart/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedItem = await CartItem.findByIdAndDelete(id);
    if (!deletedItem) {
      return res.status(404).json({ message: "Cart item not found" });
    }
    res.json({ message: "Item removed from cart" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/**
 * POST /api/checkout
 * Simulates a checkout. Clears the cart and returns a mock receipt.
 * Expects body: { cartItems } (though we'll clear the DB cart)
 */
app.post("/api/checkout", async (req, res) => {
  try {
    // For this simple app, we'll just clear the entire cart on checkout
    await CartItem.deleteMany({});

    // The request body isn't strictly needed since the server knows the cart,
    // but we can use it to get the total for the receipt.
    const { total } = req.body;

    const receipt = {
      orderId: new mongoose.Types.ObjectId().toString(),
      total: total,
      timestamp: new Date(),
      message: "Thank you for your purchase!",
    };

    res.json({ receipt });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// --- Start Server ---
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  // Seed the database after the server starts
  seedDatabase();
});
