// NOTA:  en este apartado se prentende usar async para consultar a una api y saber el peso de un pokemon en este caso de mi poderoso Quagsire

async function ObtenerQuagsire() {
  // EXPLICACION: El try como en phyton sirve para ejecutar una cosa la cual no sabes si falle o no
  try {
    let respuesta = await fetch("https://pokeapi.co/api/v2/pokemon/quagsire");

    // EXPLICACION: esto porque la consulta devuelve un Json, lo de abajo lo que hace es convertir ese json en un Objeto para poder usarlo facilmente
    let datos = await respuesta.json();

    // EXPLICACION: En esa funcion estara toda la logica de modifcar el DOM para no tener TODO junto en una misma funcion y hacer que "obtenerQuagsire" Sea obtenr UNICAMENTE esos datos
    ModificarDom(datos);

    // EXPLICACION:  esto se hace por que el try si no mal estoy requiere si o si mostrar algo o hacer algo si algo sale mal
  } catch (error) {
    console.log("algo salio mal ", error);
  }
}

function ModificarDom(DatosQuagsire) {
  let contenedor = document.getElementById("tarjeta-pokemon");
  contenedor.innerHTML = "";

  // EXPLICACION: Esto es para crear los elementos los cuales se van a organizar el DIV
  let Titulo = document.createElement("h2");
  let imagen = document.createElement("img");
  let PesoAltura = document.createElement("p");

  // EXPLICACION: aca asiganmos todos esos datos
  Titulo.textContent = DatosQuagsire.name;
  imagen.src = DatosQuagsire.sprites.front_shiny;
  PesoAltura.textContent = `Altura de ${DatosQuagsire.height}m y su peso de ${DatosQuagsire.weight}`;

  // EXPLICACION: Aca ya agreagmaos todo al documento principal osea el DIV
  contenedor.appendChild(Titulo);
  contenedor.appendChild(imagen);
  contenedor.appendChild(PesoAltura);
}

ObtenerQuagsire();
