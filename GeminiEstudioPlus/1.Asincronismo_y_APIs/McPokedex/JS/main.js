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

let revisarMemoria = Almacenamiento.obtenerHistorial();

if (revisarMemoria.length !== 0) {
  UI.dibujarHistorial(revisarMemoria);
}
obtenerPokemon();
