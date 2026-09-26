export function crearMemoria(objetoPokemon) {
  let listaMemoria = [];
  let checarMemoria = localStorage.getItem("ultimoPokemon");
  let pokemonListaMemoria = JSON.parse(checarMemoria);

  if (pokemonListaMemoria != null) {
    listaMemoria = pokemonListaMemoria;
    if (listaMemoria.length <= 5) {
      listaMemoria.push(objetoPokemon);
    } else {
      listaMemoria.push();
      listaMemoria.shift();
    }
  }
  let memoriaEmpaquetada = JSON.stringify(listaMemoria);
  localStorage.setItem("ultimoPokemon", memoriaEmpaquetada);
}

export function obtenerHistorial() {
  let pokemonsMemoria = localStorage.getItem("ultimoPokemon");
  let listaPokemons = JSON.parse(pokemonsMemoria);
  if (listaPokemons != null) {
    return listaPokemons;
  } else {
    return [];
  }
}

//nota falta mejorar el deste para los pokemons
