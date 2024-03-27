import * as pokeConnection from "./fetch.js";
import * as pokeAnimations from "./animations.js";
import fetchAllPokemon from "./fetchAll.js";
import selectTypePokemon from "./fetchSelectType.js";

selectTypePokemon();
pokeConnection.initHandlePokemonData();
fetchAllPokemon();


