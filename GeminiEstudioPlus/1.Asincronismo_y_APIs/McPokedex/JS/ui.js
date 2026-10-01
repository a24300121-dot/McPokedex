import { crearMemoria } from "./storage.js";
import { buscarPokemon } from "./api.js";

let grito = new Audio();
grito.volume = 0.3;

// EXPLICACION: en este insertamos los datos a la pagina mediante DOM y creamos los datos
export function insertarDatosDom(datosPokemon) {
  let contenedorPokemon = document.getElementById("tarjeta-pokemon");
  contenedorPokemon.innerHTML = "";

  grito.pause();
  grito.src = datosPokemon.grito;
  grito.play();

  let nombrePokemon = document.createElement("h2");
  let imagenPokemon = document.createElement("img");
  let alturaPesoPokemon = document.createElement("p");
  let tiposPokemon = document.createElement("ul");
  let estadisticasPokemon = document.createElement("ul");
  let botonCambioShiny = document.createElement("button");

  nombrePokemon.textContent = datosPokemon.name;
  imagenPokemon.src = datosPokemon.imagen;
  botonCambioShiny.textContent = "Version shiny";

  let alturaReal = datosPokemon.altura * 0.1;
  let pesoReal = datosPokemon.peso * 0.1;

  alturaPesoPokemon.textContent = `Altura de ${alturaReal.toFixed(1)}Metros y su peso de ${pesoReal.toFixed(1)}Kg`;

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
  contenedorPokemon.appendChild(botonCambioShiny);
  contenedorPokemon.appendChild(imagenPokemon);
  insertarEvoluciones(datosPokemon);
  contenedorPokemon.appendChild(alturaPesoPokemon);
  contenedorPokemon.appendChild(tiposPokemon);
  contenedorPokemon.appendChild(estadisticasPokemon);

  imagenPokemon.classList.add("pokemon-img");
  tiposPokemon.classList.add("pokemon-tipos");

  botonCambioShiny.onclick = () => {
    if (imagenPokemon.src === datosPokemon.imagen) {
      imagenPokemon.src = datosPokemon.imagenShiny;
      botonCambioShiny.textContent = "Version normal";
    } else {
      imagenPokemon.src = datosPokemon.imagen;
      botonCambioShiny.textContent = "Version shiny";
    }
  };
  botonCambioShiny.classList.add("btn-cambioshiny");
  //esto es para simplemente poder llamar a la funcion de memoria
  let botonGuardado = document.getElementById("btn_guardar");

  botonGuardado.onclick = () => {
    let guardarPokemon = crearMemoria(datosPokemon);
    console.log(datosPokemon);
    alertaPokemonDuplicado(guardarPokemon);
  };
}

export function dibujarHistorial(historialPokemons) {
  let contenedor = document.getElementById("tarjeta-pokemon");
  let listaHistorial = document.createElement("ul");
  listaHistorial.id = "lista-historial-inicio";
  let mensaje = document.createElement("p");

  contenedor.innerHTML = "";
  mensaje.textContent = "pokemons consultados";

  historialPokemons.forEach(function (pokemons) {
    let pokemonsLista = document.createElement("li");
    let imagenPokemon = document.createElement("img");
    let nombrePokemon = document.createElement("p");

    imagenPokemon.src = pokemons.imagen;
    nombrePokemon.textContent = pokemons.name;
    pokemonsLista.classList.add("mini-tarjeta");

    pokemonsLista.onclick = async () => {
      let pokemonGuardado = await buscarPokemon(pokemons.name);
      insertarDatosDom(pokemonGuardado);
    };

    pokemonsLista.appendChild(imagenPokemon);
    pokemonsLista.appendChild(nombrePokemon);

    listaHistorial.appendChild(pokemonsLista);
  });
  contenedor.appendChild(mensaje);
  contenedor.appendChild(listaHistorial);
}

function insertarEvoluciones(datosPokemon) {
  let listaEvoluciones = document.createElement("ul");
  let primeraEvolucionCont = document.createElement("li");
  let segundaEvolucionCont = document.createElement("li");
  let ultimaEvolucionCont = document.createElement("li");
  let contenedor = document.getElementById("tarjeta-pokemon");

  listaEvoluciones.classList.add("contenedor-evoluciones");
  primeraEvolucionCont.classList.add("btn-evolucion");
  segundaEvolucionCont.classList.add("btn-evolucion");
  ultimaEvolucionCont.classList.add("btn-evolucion");

  primeraEvolucionCont.textContent = datosPokemon.nombrePrimeraEvo;
  listaEvoluciones.appendChild(primeraEvolucionCont);
  primeraEvolucionCont.addEventListener("click", async () => {
    let buscarPrimeraEvolucion = await buscarPokemon(
      datosPokemon.nombrePrimeraEvo,
    );
    insertarDatosDom(buscarPrimeraEvolucion);
  });

  if (datosPokemon.nombreSegundaEvo) {
    segundaEvolucionCont.textContent = datosPokemon.nombreSegundaEvo;
    listaEvoluciones.appendChild(segundaEvolucionCont);
    segundaEvolucionCont.addEventListener("click", async () => {
      let buscarSegundaEvolucion = await buscarPokemon(
        datosPokemon.nombreSegundaEvo,
      );
      insertarDatosDom(buscarSegundaEvolucion);
    });
  }
  if (datosPokemon.nombreTerceraEvo) {
    ultimaEvolucionCont.textContent = datosPokemon.nombreTerceraEvo;
    listaEvoluciones.appendChild(ultimaEvolucionCont);
    ultimaEvolucionCont.addEventListener("click", async () => {
      let buscarTercerEvolucion = await buscarPokemon(
        datosPokemon.nombreTerceraEvo,
      );
      insertarDatosDom(buscarTercerEvolucion);
    });
  }

  contenedor.appendChild(listaEvoluciones);
}

function alertaPokemonDuplicado(pokemonDuplicado) {
  if (pokemonDuplicado) {
    let mensajeDuplicado = document.createElement("div");
    mensajeDuplicado.textContent = "pokemon ya guardado";
    mensajeDuplicado.classList.add("toast-error");
    document.body.appendChild(mensajeDuplicado);

    setTimeout(() => {
      mensajeDuplicado.remove();
    }, 3000);
  } else {
    console.log("no duplicado");
  }
}
