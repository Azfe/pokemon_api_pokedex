import React from "react";
import pokemonBall from '../../assets/images/poke_ball_icon.svg';

const Header = ({ title = "Pokédex", subtitle = "Descubre y explora el mundo Pokémon" }) => {
  return (
    <section className="bg-gradient-to-r from-tertiary to-primary text-white py-16 px-4">
      <div className="flex max-w-6xl mx-auto text-center gap-4 items-center justify-center">
        <img src={pokemonBall} alt="Pokemon Ball Logo" className="w-18 h-18" />
        <h1 className="text-5xl md:text-6xl font-bold mb-4 text-shadow-lg">
          {title}
        </h1>
      </div>
      <div className="max-w-2xl mx-auto text-center mt-4">
        {subtitle && (
          <p className="text-xl md:text-2xl text-blue-100 font-light">
            {subtitle}
          </p>
        )}
        {/* <div className="mt-8 flex justify-center">
          <div className="w-48 h-48 rounded-full flex items-center justify-center">
            <img src={pokemonBall} alt="Pokemon Ball Logo" className="w-48 h-48" />            
          </div>
        </div> */}
      </div>
    </section>
  );
};

export default Header;