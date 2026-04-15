
const obras = {
  obra1: {
    titulo: "Fragmentos de Ella",
    autor: "Alina Vespera",
    descripcion: "En esta obra, el rostro femenino se disuelve en una sinfonía de colores que desafían las fronteras del realismo. Cada tono representa una emoción, una historia no contada, un instante de transformación. La multiplicidad cromática no confunde: revela. Porque en la complejidad de su mirada, el espectador descubre que no hay un solo rostro, sino muchos. Y todos son ella.",
    imagen: "img/obra1.jpg",
    precio: "$1.050.000"
  },

  obra2: {
    titulo: "Ciudad Latente",
    autor: "Matías Quintero",
    descripcion: "La ciudad cobra vida en una paleta vibrante que desafía la rutina del concreto. Cada edificio, cada calle y cada sombra se reinventa en tonos audaces que evocan sueños, caos y esperanza. No es solo un paisaje urbano, es una ciudad que late, que respira arte, que transforma lo cotidiano en poesía visual. En su colorido desorden, descubrimos que también las ciudades sienten.",
    imagen: "img/obra2.webp",
    precio: "$1.100.000"
  },

  obra3: {
    titulo: "Susurros del Horizonte",
    autor: "Francisco Lagos",
    descripcion: "Las olas rompen con una cadencia serena, mientras la brisa parece susurrar secretos antiguos del océano. En esta obra, Francisco Lagos captura la inmensidad del mar con trazos que transmiten tanto fuerza como calma. Cada pincelada es una invitación a perderse en la profundidad azul, donde el tiempo se disuelve y solo queda el instante.",
    imagen: "img/Obra3.jpg",
    precio: "$600.000"
  },

  obra4: {
    titulo: "Caminantes del Color",
    autor: "Clara Montalbán",
    descripcion: "Dos figuras avanzan en silencio bajo un bosque vibrante, donde los árboles gigantes se alzan como testigos de un mundo que se desborda en color. Cada paso que dan parece encender la escena, como si caminaran dentro de un sueño. En este sendero de luz y pigmento, el tiempo se detiene, y la naturaleza se convierte en un abrazo cromático que envuelve la intimidad del momento.",
    imagen: "img/obra4.jpg",
    precio: "$300.000"
  },

  obra5: {
    titulo: "Noche en el Bistró",
    autor: "Esteban Ríos",
    descripcion: "En una esquina tranquila de la ciudad, un antiguo restorán permanece encendido bajo un cielo azul profundo salpicado de estrellas. Las mesas vacías, bañadas por luces cálidas, invitan al silencio y a la nostalgia. Cada pincelada evoca el eco de conversaciones pasadas, copas que tintinean, y aromas suspendidos en el tiempo. Es un retrato del alma nocturna de la ciudad: melancólica, serena, infinitamente viva.",
    imagen: "img/obra5.jpg",
    precio: "$200.000"
  },

  obra6: {
    titulo: "Silencio Interior",
    autor: "Tomás Aguirre",
    descripcion: "El rostro femenino emerge con expresión serena, casi distante, envuelto en tonos suaves y apagados que sugieren introspección. No hay gritos de color, solo la quietud de una presencia que observa y guarda secretos. La mirada, fija pero sin urgencia, invita a detenerse, a escuchar lo que no se dice. Es un retrato de la calma contenida, de la fuerza que habita en el silencio..",
    imagen: "img/obra6.jpg",
    precio: "$250.000"
  },

  obra7: {
    titulo: "El Hombre del Norte",
    autor: "Amaya Escudero",
    descripcion: "Un caballero de cabello anaranjado se alza con porte firme y mirada penetrante. Su traje celeste contrasta con su expresión seria, como si llevara consigo historias que pesan más que las palabras. La formalidad de su vestimenta no oculta su humanidad, sino que la enmarca con sobriedad. Es un retrato de elegancia contenida, de un espíritu que observa el mundo con distancia, pero sin indiferencia.",
    imagen: "img/obra7.jpg",
    precio: "$150.000"
  },

  obra8: {
    titulo: "Silencio Cálido",
    autor: "Rebeca Valdés",
    descripcion: "En medio de un fondo oscuro que resalta su presencia, una mujer posa con la quietud de quien observa más de lo que dice. Su mirada es seria, profunda, pero no fría: es el tipo de expresión que guarda una simpatía discreta, casi secreta. Un paño envuelve su cabello, como si protegiera pensamientos íntimos o recuerdos valiosos. Esta obra es un diálogo mudo entre fortaleza y ternura, entre luz interior y sombra envolvente.",
    imagen: "img/obra8.jpg" ,
    precio: "$300.000"
  },


  obra9: {
    titulo: "El Cielo Estrellado",
    autor: "Elena Soler",
    descripcion: "El cielo estrellado es un lienzo infinito donde la luz de miles de estrellas pinta historias antiguas y misteriosas. En su vastedad, nos conecta con el universo y nos invita a soñar, a reflexionar sobre nuestro lugar en el cosmos y la belleza efímera de la noche. Cada estrella es un faro de esperanza y un recordatorio del infinito que nos rodea.",
    imagen: "img/obra9.jpg",
    precio: "$1.070.000"
  },
  
};



function mostrarModalObra(obra) {
  document.getElementById('modalObraLabel').textContent = obra.titulo;
  document.getElementById('modalObraAutor').innerHTML = `<strong>Autor:</strong> ${obra.autor}`;
  document.getElementById('modalObraDescripcion').textContent = obra.descripcion;
  document.getElementById('modalObraImagen').src = obra.imagen;
  document.getElementById('modalObraPrecio').textContent = obra.precio;

  const modal = new bootstrap.Modal(document.getElementById('modalObra'));
  modal.show();
}

function asignarEventosDetalles() {
  document.querySelectorAll('.btn-detalles').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-id');
      const obra = obras[id];
      if (obra) {
        mostrarModalObra(obra);
      }
    });
  });
}

function eliminarObra(card) {
  const confirmar = confirm("¿Estás seguro de que quieres eliminar esta obra de arte?");
  if (confirmar) {
    card.remove();
  }
}

function asignarEventosEliminar() {
  document.querySelectorAll('.cerrar-x').forEach(btn => {
    btn.addEventListener('click', () => {
      const card = btn.closest('.card');
      if (card) eliminarObra(card);
    });
  });
}

function crearTarjetasDinamicas() {
  const contenedor = document.getElementById("contenedor-cards");

  for (const id in obras) {
    const obra = obras[id];
    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <span class="etiqueta">NUEVO</span>
      <span class="cerrar-x" aria-label="Cerrar tarjeta">&times;</span>
      <img src="${obra.imagen}" alt="${obra.titulo}">
      <h3>${obra.titulo} - Óleo sobre lienzo</h3>
      <p>${obra.autor}</p>
      <p class="precio">${obra.precio}</p>
      <button class="btn-detalles" data-id="${id}">VER</button>
    `;

    contenedor.appendChild(card);
  }
}

function inicializarGaleria() {
  crearTarjetasDinamicas();
  asignarEventosDetalles();
  asignarEventosEliminar();
}

document.addEventListener('DOMContentLoaded', inicializarGaleria);
