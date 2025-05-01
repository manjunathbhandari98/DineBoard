import React from "react";
import { Link } from "react-router-dom";
import Button from "../ui/Button";

const TryADemo = () => {
  return (
    <section className="py-20 px-4 md:px-16">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        {/* Left: QR Image */}
        <div className="flex justify-center">
          <div className=" border rounded-2xl shadow-lg p-6 w-full max-w-sm transform hover:scale-105 transition-transform duration-300 ease-in-out">
            <div className="w-full aspect-square  rounded-xl flex items-center justify-center overflow-hidden">
              {/* Replace this div with your actual QR image */}
              <img
                src="/banner-2.jpeg"
                alt="QR Demo"
                className="object-cover w-full h-full"
              />
            </div>
          </div>
        </div>

        {/* Right: Info */}
        <div>
          <h2 className="text-4xl font-bold mb-6">
            Try a Demo Menu
          </h2>
          <p className="text-lg  mb-8">
            Scan the QR code to experience how
            smooth and fast digital menus can be.
            No downloads, no fuss—just instant
            access to a beautiful, interactive
            menu.
          </p>

          <ul className="space-y-6 text-base  mb-6">
            <li className="flex items-center gap-4">
              <span className="text-[#f43f5e] text-3xl">
                ✔
              </span>
              <span>
                Instant access to the menu by
                scanning the QR code
              </span>
            </li>
            <li className="flex items-center gap-4">
              <span className="text-[#f43f5e] text-3xl">
                ✔
              </span>
              <span>
                View real-time menu design and
                categories
              </span>
            </li>
            <li className="flex items-center gap-4">
              <span className="text-[#f43f5e] text-3xl">
                ✔
              </span>
              <span>
                Works seamlessly with any
                smartphone camera
              </span>
            </li>
            <li className="flex items-center gap-4">
              <span className="text-[#f43f5e] text-3xl">
                ✔
              </span>
              <span>
                Completely free to try with no
                hidden costs
              </span>
            </li>
          </ul>

          <Link to="/demo">
            <Button
              radius="xl"
              color="red"
              className="transition-colors duration-300 hover:bg-red-600 hover:text-white transform hover:scale-105"
            >
              Try It Now
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default TryADemo;
