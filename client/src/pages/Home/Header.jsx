const Header = ({ navigateTo, cartCount }) => (
  <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center py-6">
        {/* Logo */}
        <div className="text-2xl font-bold italic text-black">Fashion</div>

        {/* Navigation Links - updated to use navigateTo */}
        <nav className="hidden md:flex space-x-8">
          <a
            href="#"
            onClick={() => navigateTo("home")}
            className="text-sm font-medium text-gray-700 hover:text-black"
          >
            Home
          </a>
          {["Women", "Men", "Kids", "Offers", "Brands"].map((item) => (
            <a
              key={item}
              href="#"
              className="text-sm font-medium text-gray-700 hover:text-black"
            >
              {item}
            </a>
          ))}
        </nav>

        {/* Actions - "Cart" now shows item count and navigates */}
        <div className="flex items-center space-x-4">
          <a
            href="#"
            className="text-sm font-medium text-gray-700 hover:text-black"
          >
            Search
          </a>
          <a
            href="#"
            className="text-sm font-medium text-gray-700 hover:text-black"
          >
            Account
          </a>
          <a
            href="#"
            className="text-sm font-medium text-gray-700 hover:text-black"
          >
            Wishlist
          </a>
          <a
            href="#"
            onClick={() => navigateTo("cart")}
            className="text-sm font-medium text-gray-700 hover:text-black"
          >
            Cart ({cartCount})
          </a>
        </div>
      </div>
    </div>
  </header>
);

export default Header;
