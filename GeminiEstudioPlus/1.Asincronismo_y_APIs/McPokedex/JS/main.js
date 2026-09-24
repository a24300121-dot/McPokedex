import * as Almacenamiento from "./storage.js";
import * as API from "./api.js";
import * as UI from "./ui.js";

// EXPLICACION: En esta funcion se obtiene el pokemon y se hacen los eventos
function obtenerPokemon() {
  let inputPokemon = document.getElementById("input_pokemon");
  let botonBuscar = document.getElementById("btn_buscar");

  inputPokemon.addEventListener("keydown", (evento) => {
    if (evento.key === "Enter") {
      pokemonBuscar();
    }
  });
  botonBuscar.addEventListener("click", function () {
    pokemonBuscar();
  });
  async function pokemonBuscar() {
    // FALLA: lo ideal seria poner este "setTimeout" despues y no ahorita por que seria x + 1 en vez de que ese segundo sea tanqueando en lo que se busca
    let pokemonObtenido = inputPokemon.value.toLowerCase();
    let contenedor = document.getElementById("tarjeta-pokemon");

    contenedor.innerHTML = "espera a que cargue el dato";
    let respuestaAPI = await API.buscarPokemon(pokemonObtenido);
    inputPokemon.value = "";
    if (respuestaAPI) {
      UI.insertarDatosDom(respuestaAPI);
    }
  }
}

let revisarMemoria = Almacenamiento.revisarMemoria();

if (revisarMemoria !== null) {
  UI.insertarDatosDom(revisarMemoria);
}
obtenerPokemon();
