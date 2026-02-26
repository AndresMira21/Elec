const nombre = document.getElementById("nombre");
const email = document.getElementById("email");
const mensaje = document.getElementById("mensaje");
const submitBtn = document.getElementById("submitBtn");
const form = document.getElementById("contactForm");

function validarNombre() {
    if (nombre.value.trim().length < 3) {
        setError(nombre, "El nombre debe tener mínimo 3 caracteres");
        return false;
    }
    setValid(nombre);
    return true;
}

function validarEmail() {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(email.value.trim())) {
        setError(email, "Ingresa un email válido");
        return false;
    }
    setValid(email);
    return true;
}

function validarMensaje() {
    if (mensaje.value.trim().length < 5) {
        setError(mensaje, "El mensaje debe tener mínimo 5 caracteres");
        return false;
    }
    setValid(mensaje);
    return true;
}

function setError(input, message) {
    input.classList.add("invalid");
    input.classList.remove("valid");
    input.nextElementSibling.textContent = message;
}

function setValid(input) {
    input.classList.remove("invalid");
    input.classList.add("valid");
    input.nextElementSibling.textContent = "";
}

function validarFormulario() {
    const esValido =
        validarNombre() &
        validarEmail() &
        validarMensaje();

    submitBtn.disabled = !esValido;
}

nombre.addEventListener("input", validarFormulario);
email.addEventListener("input", validarFormulario);
mensaje.addEventListener("input", validarFormulario);