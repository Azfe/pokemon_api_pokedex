import { useState } from "react"; // Usa useState para manejar el estado del menú móvil.
import { NavLink } from "react-router-dom";
import pokemonLogo from '../../assets/pokemon_logo.svg';

const Navbar = () => {

    const [menuOpen, setMenuOpen] = useState(false); // Estado para manejar la apertura/cierre del menú móvil.

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const closeMenu = () => {
        setMenuOpen(false);
    };

    return (
        <nav className="bg-white px-8 text-tertiary flex items-center justify-between relative ">
            <div className="flex items-center justify-between ">
                {/* Logo */}
                <div className="flex-shrink-0">
                    <img src={pokemonLogo} alt="Pokemon Logo" className="w-24 h-24 md:w-20 md:h-20" />
                </div>
                {/* Desktop Menu */}
                <ul className="absolute left-1/2 transform -translate-x-1/2 items-center gap-8 text-lg hidden lg:flex font-semibold">
                    <li>
                        <NavLink
                            to="/"
                            className={({ isActive }) =>
                                `hover:text-yellow-400 transition-colors duration-200 font-medium ${isActive ? 'text-yellow-400 border-b-2 border-yellow-400' : ''
                                }`
                            }
                        >
                            Home</NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/login"
                            className={({ isActive }) =>
                                `hover:text-yellow-400 transition-colors duration-200 font-medium ${isActive ? 'text-yellow-400 border-b-2 border-yellow-400' : ''
                                }`
                            }
                        >
                            Login
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/signin"
                            className={({ isActive }) =>
                                `hover:text-yellow-400 transition-colors duration-200 font-medium ${isActive ? 'text-yellow-400 border-b-2 border-yellow-400' : ''
                                }`
                            }
                        >
                            Sign In
                        </NavLink>
                    </li>
                </ul>


                {/* Mobile Menu Button */}
                <button
                    className="md:hidden flex flex-col items-center justify-center w-8 h-8 space-y-1"
                    onClick={toggleMenu}
                    aria-label="Toggle menu"
                >
                    <div className={`w-6 h-0.5 bg-white transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-1.5' : ''
                        }`}></div>
                    <div className={`w-6 h-0.5 bg-white transition-all duration-300 ${menuOpen ? 'opacity-0' : ''
                        }`}></div>
                    <div className={`w-6 h-0.5 bg-white transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-1.5' : ''
                        }`}></div>
                </button>
            </div>

            {/* Mobile Menu */}
            <div className={`md:hidden transition-all duration-300 ease-in-out ${
                menuOpen ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'
            } overflow-hidden`}>
                <ul className="pt-4 space-y-2 border-t border-gray-700 mt-4">
                    <li>
                        <NavLink 
                            to="/" 
                            onClick={closeMenu}
                            className={({ isActive }) => 
                                `block py-2 px-4 hover:bg-gray-700 rounded transition-colors duration-200 ${
                                    isActive ? 'bg-gray-700 text-yellow-400' : ''
                                }`
                            }
                        >
                            Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink 
                            to="/login" 
                            onClick={closeMenu}
                            className={({ isActive }) => 
                                `block py-2 px-4 hover:bg-gray-700 rounded transition-colors duration-200 ${
                                    isActive ? 'bg-gray-700 text-yellow-400' : ''
                                }`
                            }
                        >
                            Login
                        </NavLink>
                    </li>
                    <li>
                        <NavLink 
                            to="/signin" 
                            onClick={closeMenu}
                            className={({ isActive }) => 
                                `block py-2 px-4 hover:bg-gray-700 rounded transition-colors duration-200 ${
                                    isActive ? 'bg-gray-700 text-yellow-400' : ''
                                }`
                            }
                        >
                            Sign In
                        </NavLink>
                    </li>
                </ul>
            </div>
        </nav>
    );
}

export default Navbar;