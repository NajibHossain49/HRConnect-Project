import Link from "next/link";
import { Menu } from "lucide-react";

export default function NavBar() {
  return (
    <nav className="bg-gradient-to-r from-indigo-600 to-purple-600 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left side - Logo/Home */}
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Link 
                href="/" 
                className="text-white font-bold text-xl hover:text-purple-200 transition duration-300"
              >
                HRConnect
              </Link>
            </div>
          </div>

          {/* Center - Desktop Navigation */}
          <div className="hidden lg:block">
            <div className="ml-10 flex items-center space-x-4">
              <Link 
                href="/signin/"
                className="px-4 py-2 rounded-md text-white font-medium hover:bg-white hover:text-purple-600 transition duration-300"
              >
                Login
              </Link>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost lg:hidden">
                <Menu className="h-6 w-6 text-white" />
              </label>
              <ul 
                tabIndex={0} 
                className="menu menu-sm dropdown-content mt-3 z-50 p-2 shadow-lg bg-white rounded-lg w-52"
              >
                <li>
                  <Link 
                    href="/signin/"
                    className="text-gray-700 hover:text-purple-600 hover:bg-purple-50 py-2 px-4 rounded-md transition duration-300"
                  >
                    Login
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}