import React from "react";

export const navItems = [
    { label: "Store" },
    { label: "Mac" },
    { label: "Vision" },
    { label: "iPhone" },
    { label: "Watch" },
    { label: "AirPods" },
  ];


const Navbar = () => {
  
  return (
    <header className="w-screen fixed top-0 left-0 z-50 flex-center bg-black min-h-[7vh]">
      <nav className="px-5 py-4 2xl:px-0 flex w-screen ">
        <img
          className="cursor-pointer hover:-translate-y-0.5 transition-all duration-300 ease-in-out"
          src="/logo.svg"
          alt=""
        />
        <div className="flex justify-center w-full">
          <ul className="flex gap-8">
            {navItems.map((item) => (
              <li className="flex-center" key={item.label}>
                <a
                  className="hidden md:block r text-white font-semibold opacity-80  text-sm cursor-pointer hover:opacity-100 transition-all duration-300 ease-in-out"
                  href={item.label.toLowerCase()}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex-end gap-4 flex flex-row">
          <button className="bg-transparent border-none outline-none cursor-pointer">
            <img
              className="cursor-pointer hover:-translate-y-0.5 transition-all duration-300 ease-in-out"
              src="/search.svg"
              alt="Search"
            />
          </button>
          <button className="bg-transparent border-none outline-none cursor-pointer">
            <img
              className="cursor-pointer hover:-translate-y-0.5 transition-all duration-300 ease-in-out"
              src="/cart.svg"
              alt="Cart"
            />
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;