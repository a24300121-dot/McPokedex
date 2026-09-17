// NOTA: este codigo pretende que apartir de algo ingresado por el usuario se extraigan los datos del pokemon requerido

function obtenerPokemon() {
  // EXPLICACION: En esta parte se consigue el input y el boton para agregar un evento y asi
  let inputPokemon = document.getElementById("input_pokemon");
  let botonBuscar = document.getElementById("btn_buscar");

  // EXPLICACION: aca el evento lo que hace es obtenr el valor del input y mandar a llamar a la funcion de buscar pokemon
  botonBuscar.addEventListener("click", function () {
    let pokemonObtenido = inputPokemon.value.toLowerCase();

    // EXPLICACION: Esto nos sirve para simular que esta cargando la API
    let contenedor = document.getElementById("tarjeta-pokemon");
    contenedor.innerHTML = "espera a que cargue el dato";
    // EXPLICACION: Esto lo hago para que muestre un un mensaje de espera, siento que seria mejor si agregamos un SetTimeout
    setTimeout(() => {
      buscarPokemon(pokemonObtenido);
    }, 1000);
  });
}
async function buscarPokemon(pokemonSeleccionado) {
  // EXPLICACION: En este lo que se hace es tratar de conseguir la API y los datos, si todo sale bien mandar a llamar a la funcion para aplicar Cambios
  try {
    let pokemonApi = `https://pokeapi.co/api/v2/pokemon/${pokemonSeleccionado}`;
    let respuesta = await fetch(pokemonApi);

    // EXPLICACION: Esto es por si la pagina esta caida que de el error
    if (!respuesta.ok) {
      throw new Error("pokemon no encontrado");
    }

    let datosPokemon = await respuesta.json();

    insertarDatosDom(datosPokemon);

    // EXPLICACION: Por si algo falla saber que fallo
  } catch (error) {
    let contenedor = document.getElementById("tarjeta-pokemon");
    let mensajeError = document.createElement("h1");
    contenedor.innerHTML = "";
    mensajeError.textContent = error;
    contenedor.appendChild(mensajeError);
  }
}
function insertarDatosDom(datosPokemon) {
  let contenedor = document.getElementById("tarjeta-pokemon");
  contenedor.innerHTML = "";

  // EXPLICACION: Esto es para crear los elementos los cuales se van a organizar el DIV
  let nombrePokemon = document.createElement("h2");
  let imagenPokemon = document.createElement("img");
  let alturaPesoPokemon = document.createElement("p");
  let tiposPokemon = document.createElement("ul");

  // EXPLICACION: aca asiganmos todos esos datos
  nombrePokemon.textContent = datosPokemon.name;
  imagenPokemon.src = datosPokemon.sprites.front_shiny;
  alturaPesoPokemon.textContent = `Altura de ${datosPokemon.height}m y su peso de ${datosPokemon.weight}`;

  datosPokemon.types.forEach(function (elementoTipo) {
    let listaTipos = document.createElement("li");
    listaTipos.textContent = elementoTipo.type.name;
    listaTipos.classList.add(elementoTipo.type.name);
    tiposPokemon.appendChild(listaTipos);
  });

  // EXPLICACION: Aca ya agreagmaos todo al documento principal osea el DIV
  contenedor.appendChild(nombrePokemon);
  contenedor.appendChild(imagenPokemon);
  contenedor.appendChild(alturaPesoPokemon);
  contenedor.appendChild(tiposPokemon);

  // EXPLICACION: Bloque para inserccion de clases mediante DOM
  imagenPokemon.classList.add("pokemon-img");
  tiposPokemon.classList.add("pokemon-tipos");
}

obtenerPokemon();
