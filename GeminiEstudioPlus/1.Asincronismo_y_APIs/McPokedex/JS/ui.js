import { crearMemoria } from "./storage.js";

// EXPLICACION: en este insertamos los datos a la pagina mediante DOM y creamos los datos
export function insertarDatosDom(datosPokemon) {
  let contenedorPokemon = document.getElementById("tarjeta-pokemon");
  contenedorPokemon.innerHTML = "";

  let nombrePokemon = document.createElement("h2");
  let imagenPokemon = document.createElement("img");
  let alturaPesoPokemon = document.createElement("p");
  let tiposPokemon = document.createElement("ul");
  let estadisticasPokemon = document.createElement("ul");

  nombrePokemon.textContent = datosPokemon.name;
  imagenPokemon.src = datosPokemon.imagen;

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
