const Footer = () => (
  <footer className="bg-gray-800 text-gray-300">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-12">
        {/* Logo and About */}
        <div className="lg:col-span-2">
          <div className="text-2xl font-bold italic text-white mb-4">
            Fashion
          </div>
          <p className="text-sm max-w-xs">
            The best way to shop for the latest fashion trends. We provide
            high-quality clothing for men, women, and kids.
          </p>
        </div>
        {/* Links Column 1 */}
        <div>
          <h4 className="font-semibold text-white mb-4">Shop</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="#" className="hover:text-white">
                Women
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Men
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Kids
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Sale
              </a>
            </li>
          </ul>
        </div>
        {/* Links Column 2 */}
        <div>
          <h4 className="font-semibold text-white mb-4">Customer</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="#" className="hover:text-white">
                Shipping
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Returns
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                FAQ
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Contact Us
              </a>
            </li>
          </ul>
        </div>
        {/* Links Column 3 */}
        <div>
          <h4 className="font-semibold text-white mb-4">Company</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="#" className="hover:text-white">
                About Us
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Careers
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Terms of Use
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="mt-16 pt-8 border-t border-gray-700 text-center text-sm">
        <p>&copy; {new Date().getFullYear()} Fashion. All rights reserved.</p>
      </div>
    </div>
  </footer>
);

export default Footer;
