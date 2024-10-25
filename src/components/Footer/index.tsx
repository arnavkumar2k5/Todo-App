import React from "react";
import { Link } from "react-router-dom";

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#f4f0ec] text-[#3B2F2F] py-4 text-center mt-40 w-full">
      <div className="container mx-auto">
        <p className="text-sm">
          © {new Date().getFullYear()} TodoApp. All rights reserved.
        </p>
        <div className="flex justify-center gap-5 mt-2">
          <Link to="/" className="hover:underline">
            About Us
          </Link>
          <Link to="/" className="hover:underline">
            Privacy Policy
          </Link>
          <Link to="/" className="hover:underline">
            Terms of Service
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
