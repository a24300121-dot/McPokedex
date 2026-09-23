// NOTA: este codigo pretende que apartir de algo ingresado por el usuario se extraigan los datos del pokemon requerido

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
  function pokemonBuscar() {
    // FALLA: lo ideal seria poner este "setTimeout" despues y no ahorita por que seria x + 1 en vez de que ese segundo sea tanqueando en lo que se busca
    let pokemonObtenido = inputPokemon.value.toLowerCase();
    let contenedor = document.getElementById("tarjeta-pokemon");
    contenedor.innerHTML = "espera a que cargue el dato";
    setTimeout(() => {
      inputPokemon.value = "";
      buscarPokemon(pokemonObtenido);
    }, 1000);
  }
}

// EXPLICACION: Esta funcion es la encargada de de buscar el pokemon en la API, tambien es la encargada de los errores que puede tener la misma
async function buscarPokemon(pokemonSeleccionado) {
  try {
    let pokemonApi = `https://pokeapi.co/api/v2/pokemon/${pokemonSeleccionado}`;
    let respuesta = await fetch(pokemonApi);
    if (!respuesta.ok) {
      throw new Error(404);
    }

    let datosPokemon = await respuesta.json();
    datosPokemon = limpiarJson(datosPokemon);

    insertarDatosDom(datosPokemon);
  } catch (error) {
    let contenedor = document.getElementById("tarjeta-pokemon");
    let mensajeError = document.createElement("p");
    let pokemonNoEncontrado = document.createElement("img");

    if (error.message === "404") {
      pokemonNoEncontrado.src = "https://i.redd.it/q37r8riip3271.jpg";
      contenedor.innerHTML = "";
      mensajeError.textContent = "Pokemon no encontrado :(";
      contenedor.appendChild(pokemonNoEncontrado);
      contenedor.appendChild(mensajeError);
    } else {
      pokemonNoEncontrado.src = "./Imagenes/QuagsireMorbido.png";
      contenedor.innerHTML = "";
      mensajeError.textContent =
        "no hubo conexicion exitosa, pinche quagsire todo morbido";
      contenedor.appendChild(pokemonNoEncontrado);
      contenedor.appendChild(mensajeError);
    }
  }
}

// EXPLICACION: En este limpiamos los datos del pokemon que nos manda la API para que solo jalemos lo que ocupemos
function limpiarJson(json) {
  let pokemonLimpio = {
    name: json.name,
    imagen: json.sprites.front_default,
    altura: json.height,
    peso: json.weight,
    estadisticas: json.stats,
    tipos: json.types,
  };
  return pokemonLimpio;
}

// EXPLICACION: en este insertamos los datos a la pagina mediante DOM y creamos los datos
function insertarDatosDom(datosPokemon) {
  let contenedorPokemon = document.getElementById("tarjeta-pokemon");
  contenedorPokemon.innerHTML = "";

  let nombrePokemon = document.createElement("h2");
  let imagenPokemon = document.createElement("img");
  let alturaPesoPokemon = document.createElement("p");
  let tiposPokemon = document.createElement("ul");
  let estadisticasPokemon = document.createElement("ul");

  nombrePokemon.textContent = datosPokemon.name;
  imagenPokemon.src = datosPokemon.imagen;
  alturaPesoPokemon.textContent = `Altura de ${datosPokemon.altura}m y su peso de ${datosPokemon.peso}`;

  datosPokemon.estadisticas.forEach(function (estadisticasPok) {
    let contenedorStat = document.createElement("li");
    contenedorStat.classList.add("barra-fondo");
    contenedorStat.classList.add(estadisticasPok.stat.name);

    let rellenoStat = document.createElement("div");
    rellenoStat.classList.add("barra-relleno");
    let maximaEstadistica = (estadisticasPok.base_stat * 100) / 255;
    rellenoStat.style.width = `${maximaEstadistica}%`;

    let textoStat = document.createElement("span");
    textoStat.textContent = `${estadisticasPok.stat.name} ${estadisticasPok.base_stat}`;
    textoStat.classList.add("texto-stat");

    contenedorStat.appendChild(textoStat);
    contenedorStat.appendChild(rellenoStat);

    estadisticasPokemon.appendChild(contenedorStat);
  });

  datosPokemon.tipos.forEach(function (elementoTipo) {
    let listaTipos = document.createElement("li");
    listaTipos.textContent = elementoTipo.type.name;
    listaTipos.classList.add(elementoTipo.type.name);
    tiposPokemon.appendChild(listaTipos);
  });

  contenedorPokemon.appendChild(nombrePokemon);
  contenedorPokemon.appendChild(imagenPokemon);
  contenedorPokemon.appendChild(alturaPesoPokemon);
  contenedorPokemon.appendChild(tiposPokemon);
  contenedorPokemon.appendChild(estadisticasPokemon);

  imagenPokemon.classList.add("pokemon-img");
  tiposPokemon.classList.add("pokemon-tipos");

  //esto es para simplemente poder llamar a la funcion de memoria
  let botonGuardado = document.getElementById("btn_guardar");

  botonGuardado.onclick = () => {
    crearMemoria(datosPokemon);
    console.log("salio bien?");
  };
}

function crearMemoria(objetoPokemon) {
  let pokemonEmpaquetado = JSON.stringify(objetoPokemon);
  localStorage.setItem("ultimoPokemon", pokemonEmpaquetado);
}

function revisarMemoria() {
  let pokemonEnMemoria = localStorage.getItem("ultimoPokemon");
  let objetoPokemon = JSON.parse(pokemonEnMemoria);
  if (objetoPokemon != null) {
    insertarDatosDom(objetoPokemon);
  } else {
    console.log("no hay pokemon en memoria");
  }
  obtenerPokemon();
}
revisarMemoria();

//buscarPokemon("quagsire");
