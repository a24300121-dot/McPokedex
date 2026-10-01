export function crearMemoria(objetoPokemon) {
  let listaMemoria = [];
  let revisarRepetidos = false;
  let checarMemoria = localStorage.getItem("ultimoPokemon");
  let pokemonListaMemoria = JSON.parse(checarMemoria);

  if (pokemonListaMemoria != null) {
    listaMemoria = pokemonListaMemoria;
  }
  revisarRepetidos = revisarNombre(listaMemoria, objetoPokemon);
  let memoriaEmpaquetada = JSON.stringify(listaMemoria);
  localStorage.setItem("ultimoPokemon", memoriaEmpaquetada);

  return revisarRepetidos;
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

function revisarNombre(listaMemoria, objetoPokemon) {
  let estaRepetido = listaMemoria.some(
    (pokemon) => pokemon.name === objetoPokemon.name,
  );
  if (!estaRepetido) {
    if (listaMemoria.length <= 5) {
      listaMemoria.push(objetoPokemon);
    } else {
      listaMemoria.push(objetoPokemon);
      listaMemoria.shift();
    }
    return false;
  } else {
    return true;
  }
}
