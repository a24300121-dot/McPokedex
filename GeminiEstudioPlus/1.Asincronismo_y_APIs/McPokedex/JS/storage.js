export function crearMemoria(objetoPokemon) {
  let pokemonEmpaquetado = JSON.stringify(objetoPokemon);
  localStorage.setItem("ultimoPokemon", pokemonEmpaquetado);
}

export function revisarMemoria() {
  console.log("hola");
  let pokemonEnMemoria = localStorage.getItem("ultimoPokemon");
  let objetoPokemon = JSON.parse(pokemonEnMemoria);
  if (objetoPokemon != null) {
    return objetoPokemon;
  } else {
    return null;
  }
}
