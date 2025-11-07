const ConfirmationPage = ({ navigateTo }) => (
  <div className="bg-white py-16 lg:py-24">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <h2 className="text-3xl font-bold text-gray-900 mb-4">Thank You!</h2>
      <p className="text-lg text-gray-600 mb-8">Your order has been placed successfully.</p>
      <button 
        onClick={() => navigateTo('home')}
        className="bg-black text-white py-3 px-8 rounded-md font-semibold text-sm hover:bg-gray-800 transition-colors"
      >
        Back to Home
      </button>
    </div>
  </div>
);

export default ConfirmationPage;
