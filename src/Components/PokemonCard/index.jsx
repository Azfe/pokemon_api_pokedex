import pokemonImg from '../../assets/004.png';

const PokemonCard = () => {

    return (
        <div className="card">
        <h2>Pokemon Name</h2>
        <img src={pokemonImg} alt="Pokemon" width="100" />
        <p>Type: Fire</p>
        <p>Abilities: Blaze, Solar Power</p>
        </div>
    );
}

export default PokemonCard;