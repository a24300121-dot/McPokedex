export function crearMemoria(objetoPokemon) {
  let listaMemoria = [];
  let checarMemoria = localStorage.getItem("ultimoPokemon");
  let pokemonListaMemoria = JSON.parse(checarMemoria);

  if (pokemonListaMemoria != null) {
    listaMemoria = pokemonListaMemoria;
  }
  console.log(listaMemoria);
  listaMemoria.push(objetoPokemon);
  let memoriaEmpaquetada = JSON.stringify(listaMemoria);
  localStorage.setItem("ultimoPokemon", memoriaEmpaquetada);
}

export function revisarMemoria() {
  let pokemonEnMemoria = localStorage.getItem("ultimoPokemon");
  let objetoPokemon = JSON.parse(pokemonEnMemoria);
  if (objetoPokemon != null) {
    return objetoPokemon.pop();
  } else {
    return null;
  }
}

// EXPLICACION: Aca lo que planeo hacer es que en revisarmemoria se cheque si existe algo, si no creea un arrai, con cada vez que se pulse el boton se concatene algo sumado a una variable, algo asi lo quiero hacer
