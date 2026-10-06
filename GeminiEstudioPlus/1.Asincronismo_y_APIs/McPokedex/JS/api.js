// EXPLICACION: Esta funcion es la encargada de de buscar el pokemon en la API, tambien es la encargada de los errores que puede tener la misma

let estaBuscandoPokemon = false;

export async function buscarPokemon(pokemonSeleccionado) {
  try {
    if (!estaBuscandoPokemon) {
      estaBuscandoPokemon = true;

      let pokemonApi = `https://pokeapi.co/api/v2/pokemon/${pokemonSeleccionado}`;
      let respuestaPokemon = await fetch(pokemonApi);
      if (!respuestaPokemon.ok) {
        throw new Error(404);
      }
      let datosPokemon = await respuestaPokemon.json();

      let linkSaberEvoluciones = await fetch(datosPokemon.species.url);
      let respuestaLink = await linkSaberEvoluciones.json();

      let datosEvolucion = await fetch(respuestaLink.evolution_chain.url);
      let respuestaDatosEvolucion = await datosEvolucion.json();

      datosPokemon = limpiarJson(datosPokemon, respuestaDatosEvolucion);

      estaBuscandoPokemon = false;
      return datosPokemon;
    } else {
      return null;
    }
  } catch (error) {
    console.error(error);
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

    estaBuscandoPokemon = false;
    return null;
  }
}

function extraerId(urlPokemon) {
  if (!urlPokemon) return null;

  let idpokemonPedazos = urlPokemon.split("/");
  return idpokemonPedazos[idpokemonPedazos.length - 2];
}

// EXPLICACION: En este limpiamos los datos del pokemon que nos manda la API para que solo jalemos lo que ocupemos

export function limpiarJson(json, jsonEvoluciones) {
  //para un mejor diseño se usar other.home :)
  let pokemonLimpio = {
    name: json.name,
    imagen: json.sprites.front_default,
    imagenShiny: json.sprites.front_shiny,
    grito: json.cries.latest,
    altura: json.height,
    peso: json.weight,
    estadisticas: json.stats,
    tipos: json.types,
    nombrePrimeraEvo: jsonEvoluciones.chain.species.name,
    nombreSegundaEvo: jsonEvoluciones.chain.evolves_to[0]?.species.name,
    nombreTerceraEvo:
      jsonEvoluciones.chain.evolves_to[0]?.evolves_to[0]?.species.name,
    idPrimeraEvo: extraerId(jsonEvoluciones.chain.species.url),
    idSegundaEvo: extraerId(jsonEvoluciones.chain.evolves_to[0]?.species.url),
    idTerceraEvo: extraerId(
      jsonEvoluciones.chain.evolves_to[0]?.evolves_to[0]?.species.url,
    ),
  };
  return pokemonLimpio;
}
