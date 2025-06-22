import { NavLink } from "react-router-dom";
import { PokedexContext } from "../../Context";
import pokemonLogo from '../../assets/pokemon_logo.svg';

const Navbar = () => {

    return (        
        <nav className="bg-gray-800 p-4 text-white flex gap-4 ">
            <div>
                <img src={pokemonLogo} alt="Pokemon Logo" className="w-12 h-12" />
            </div>
            <ul className="flex items-center gap-3">
                <li>
                    <NavLink to="/" className="hover:text-gray-400">Home</NavLink>
                </li>
                <li>
                    <NavLink to="/login" className="hover:text-gray-400">Login</NavLink>
                </li>
                <li>
                    <NavLink to="/signin" className="hover:text-gray-400">Sign In</NavLink>
                </li>
            </ul>            
        </nav>
    );
}

export default Navbar;