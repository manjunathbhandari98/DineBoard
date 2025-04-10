import Logo from "../assets/Logo";
import NavLinks from "./NavLinks";

const Header = () => {
 return (<div className="flex items-center justify-between p-4 bg-white shadow-md">
    <div className="logo">
      <Logo/>  
    </div>
    
    {/* Menu options */}
    <NavLinks/>
    
    {/* Login or profile */}
    <div className="hidden md:flex items-center space-x-4">
      <a href="#" className="text-gray-700 hover:text-gray-900">Login</a>
      <a href="#" className="text-gray-700 hover:text-gray-900">Sign Up</a>
    </div>
    {/* Mobile menu button */}
    <div className="md:hidden flex items-center">
        <button className="text-gray-700 hover:text-gray-900 focus:outline-none">
            <svg
            className="w-6 h-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16m-7 6h7"
            />
            </svg>
        </button>
    </div>
    
      

    </div>) 
};

export default Header;