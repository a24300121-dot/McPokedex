// EXPLICACION: Esta funcion es la encargada de de buscar el pokemon en la API, tambien es la encargada de los errores que puede tener la misma

export async function buscarPokemon(pokemonSeleccionado) {
  try {
    let pokemonApi = `https://pokeapi.co/api/v2/pokemon/${pokemonSeleccionado}`;
    let respuesta = await fetch(pokemonApi);
    if (!respuesta.ok) {
      throw new Error(404);
    }

    let datosPokemon = await respuesta.json();
    datosPokemon = limpiarJson(datosPokemon);

    return datosPokemon;
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

export function limpiarJson(json) {
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
