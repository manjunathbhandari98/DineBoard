import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="py-16 mt-16 border-t">
      <div className="max-w-6xl mx-auto px-4">
        {/* Logo Section */}
        <div className="flex justify-center mb-10">
          <img
            src="/logo.png" // Replace with your logo path
            alt="Logo"
            className="w-52 h-auto"
          />
        </div>

        {/* Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16 text-center md:text-left">
          {/* About Section */}
          <div>
            <h4 className="text-2xl font-semibold mb-6">
              About Us
            </h4>
            <p className="text-base text-gray-600">
              Our platform allows hotels to create
              and share digital menus with
              customers via QR codes, providing a
              seamless dining experience.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-2xl font-semibold mb-6">
              Quick Links
            </h4>
            <ul className="space-y-3 text-base text-gray-600">
              <li>
                <Link
                  to="/about"
                  className="transition hover:opacity-75 hover:scale-105 inline-block"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="transition hover:opacity-75 hover:scale-105 inline-block"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  to="/terms"
                  className="transition hover:opacity-75 hover:scale-105 inline-block"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  to="/privacy"
                  className="transition hover:opacity-75 hover:scale-105 inline-block"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/pricing"
                  className="transition hover:opacity-75 hover:scale-105 inline-block"
                >
                  Pricing
                </Link>
              </li>
              <li>
                <Link
                  to="/faq"
                  className="transition hover:opacity-75 hover:scale-105 inline-block"
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  to="/blog"
                  className="transition hover:opacity-75 hover:scale-105 inline-block"
                >
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Services Section */}
          <div>
            <h4 className="text-2xl font-semibold mb-6">
              Services
            </h4>
            <ul className="space-y-3 text-base text-gray-600">
              <li>
                <Link
                  to="/services/qr-codes"
                  className="transition hover:opacity-75 hover:scale-105 inline-block"
                >
                  QR Code Generation
                </Link>
              </li>
              <li>
                <Link
                  to="/services/menu-design"
                  className="transition hover:opacity-75 hover:scale-105 inline-block"
                >
                  Menu Design
                </Link>
              </li>
              <li>
                <Link
                  to="/services/analytics"
                  className="transition hover:opacity-75 hover:scale-105 inline-block"
                >
                  Analytics
                </Link>
              </li>
              <li>
                <Link
                  to="/services/support"
                  className="transition hover:opacity-75 hover:scale-105 inline-block"
                >
                  Customer Support
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Section */}
          <div>
            <h4 className="text-2xl font-semibold mb-6">
              Contact
            </h4>
            <p className="text-base text-gray-600 mb-2">
              Email: support@yourdomain.com
            </p>
            <p className="text-base text-gray-600 mb-2">
              Phone: +123 456 7890
            </p>
            <p className="text-base text-gray-600">
              Address: 123 Hotel Street, City,
              Country
            </p>
          </div>
        </div>

        {/* Social Media Section */}
        <div className="mt-12 text-center">
          <h4 className="text-2xl font-semibold mb-4">
            Follow Us
          </h4>
          <div className="flex justify-center space-x-8 text-base text-gray-600">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="transition hover:opacity-75 hover:scale-105 inline-block"
            >
              Facebook
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="transition hover:opacity-75 hover:scale-105 inline-block"
            >
              Twitter
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="transition hover:opacity-75 hover:scale-105 inline-block"
            >
              Instagram
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="transition hover:opacity-75 hover:scale-105 inline-block"
            >
              LinkedIn
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-10 text-center text-sm text-gray-600">
          <p>
            &copy; {new Date().getFullYear()} Dineboard. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
