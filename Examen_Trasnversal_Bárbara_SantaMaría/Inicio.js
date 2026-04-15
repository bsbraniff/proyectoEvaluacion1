const form = document.getElementById('userForm');
const grid = document.getElementById('userGrid');
const users = [];
let datosPendientes = null;

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const nombre = document.getElementById('nombre').value.trim();
  const apellido = document.getElementById('apellido').value.trim();
  const correo = document.getElementById('correo').value.trim();
  const nacimientoStr = document.getElementById('nacimiento').value;
  const ingresoStr = document.getElementById('ingreso').value;
  const cargo = document.getElementById('cargo').value;

  // Validaciones manuales
  if (!nombre || !apellido || !correo || !nacimientoStr || !ingresoStr || !cargo) {
    alert('Todos los campos son obligatorios.');
    return;
  }

  if (!/\S+@\S+\.\S+/.test(correo)) {
    alert('El correo electrónico no es válido.');
    return;
  }

  if (!nacimientoStr || !ingresoStr) {
    alert('Por favor completa las fechas.');
    return;
  }

  const nacimiento = new Date(nacimientoStr);
  const ingreso = new Date(ingresoStr);
  const edad = calcularEdad(nacimiento);

  if (edad < 18) {
    alert('El empleado debe tener al menos 18 años.');
    return;
  }

  if (ingreso < new Date(nacimiento.setFullYear(nacimiento.getFullYear() + 18))) {
    alert('La fecha de ingreso no puede ser antes de cumplir 18 años.');
    return;
  }

  if (users.find(u => u.correo === correo)) {
    alert('Ya existe un empleado con ese correo.');
    return;
  }

  // Guardamos datos temporalmente
  datosPendientes = {
    nombre,
    apellido,
    correo,
    nacimiento: new Date(nacimientoStr).toLocaleDateString(),
    ingreso: new Date(ingresoStr).toLocaleDateString(),
    cargo
  };

  // Mostrar modal de confirmación
  document.getElementById('confirmBody').innerHTML = `
    <p><strong>Nombre:</strong> ${nombre} ${apellido}</p>
    <p><strong>Correo:</strong> ${correo}</p>
    <p><strong>Nacimiento:</strong> ${datosPendientes.nacimiento}</p>
    <p><strong>Ingreso:</strong> ${datosPendientes.ingreso}</p>
    <p><strong>Cargo:</strong> ${cargo}</p>
  `;
  const modal = new bootstrap.Modal(document.getElementById('confirmModal'));
  modal.show();
});

// Confirmar en el modal
document.getElementById('confirmBtn').addEventListener('click', () => {
  if (datosPendientes) {
    users.push(datosPendientes);
    mostrarUsuarios();
    form.reset();
    mostrarToast("Usuario agregado correctamente");
    datosPendientes = null;
    bootstrap.Modal.getInstance(document.getElementById('confirmModal')).hide();
  }
});

function calcularEdad(fechaNacimiento) {
  const hoy = new Date();
  let edad = hoy.getFullYear() - fechaNacimiento.getFullYear();
  const m = hoy.getMonth() - fechaNacimiento.getMonth();
  if (m < 0 || (m === 0 && hoy.getDate() < fechaNacimiento.getDate())) {
    edad--;
  }
  return edad;
}



function mostrarUsuarios(filtro = '') {
  grid.innerHTML = '';
  users
    .filter(user =>
      (user.nombre + ' ' + user.apellido).toLowerCase().includes(filtro)
    )
    .forEach((user, index) => {
      const col = document.createElement('div');
      col.className = 'col-12';

      const avatarUrl = "https://cdn-icons-png.flaticon.com/512/847/847969.png";

      col.innerHTML = `
        <div class="card user-card shadow-sm d-flex flex-row align-items-center p-3 gap-3 hover-shadow">
          <img src="${avatarUrl}" alt="Avatar" class="rounded-circle user-avatar">
          <div class="flex-grow-1">
            <h5 class="mb-1">${user.nombre} ${user.apellido}</h5>
            <p class="mb-1"><strong>Correo:</strong> ${user.correo}</p>
            <p class="mb-1"><strong>Nacimiento:</strong> ${user.nacimiento}</p>
            <p class="mb-1"><strong>Ingreso:</strong> ${user.ingreso}</p>
            <p class="mb-1"><strong>Cargo:</strong> ${user.cargo}</p>
          </div>
          <button class="btn btn-danger btn-sm eliminar-btn" data-index="${index}">Eliminar</button>
        </div>
      `;
      grid.appendChild(col);
    });

   // Agregar eventos para eliminar con confirmación y toast
  const botonesEliminar = document.querySelectorAll('.eliminar-btn');
  botonesEliminar.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const idx = e.target.getAttribute('data-index');

      // Confirmar eliminación
      const confirmar = confirm("¿Estás seguro que deseas eliminar este usuario?");
      if (confirmar) {
        users.splice(idx, 1); // eliminar del array
        mostrarUsuarios();    // refrescar lista
        mostrarToast('Usuario eliminado');
      }
    });
  });
}
// Toast
function mostrarToast(mensaje) {
  const toastEl = document.getElementById('toast');
  const toastMsg = document.getElementById('toastMsg');
  toastMsg.textContent = mensaje;
  const toast = new bootstrap.Toast(toastEl);
  toast.show();
}
