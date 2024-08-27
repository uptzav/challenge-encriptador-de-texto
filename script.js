const encsound = new Audio("recursos/encsound.mp3");
const decsound = new Audio("recursos/decsound.mp3");
const texto_copiado = new Audio("recursos/texto_copiado.mp3");

const textArea = document.querySelector(".text-area");
const mensaje = document.querySelector(".mensaje");
const btnCopiar = document.querySelector(".btn-copiar");

const placeholderStrong = document.getElementById("placeholder-strong");
const placeholderSpan = document.getElementById("placeholder-span");


document.getElementById('text-area').addEventListener('input', function(event) {
    let value = event.target.value;
    // Reemplaza cualquier carácter que no sea una letra (sin acentos) o número
    event.target.value = value.replace(/[^a-zA-Z0-9\s]/g, '');
});


function ocultarPlaceholder() {
    placeholderStrong.style.display = "none";
    placeholderSpan.style.display = "none";
}

function actualizarMensaje(texto) {
    mensaje.value = texto;
    textArea.value = "";
    mensaje.style.backgroundImage = "none";
    btnCopiar.style.display = texto ? "block" : "none";
}

function btnEncriptar() {
    encsound.play();
    const textoEncriptado = encriptar(textArea.value);
    actualizarMensaje(textoEncriptado);
    ocultarPlaceholder(); // Ocultar placeholder
}

function btnDesencriptar() {
    decsound.play();
    const textoDesencriptado = desencriptar(textArea.value);
    actualizarMensaje(textoDesencriptado);
    ocultarPlaceholder(); // Ocultar placeholder
}

function btnCopiarTexto() {
    texto_copiado.play();
    navigator.clipboard.writeText(mensaje.value)
        .then(() => mensaje.value = "") // Borra el texto después de copiar
        .catch(err => console.error('Error al copiar al portapapeles: ', err));
}

function encriptar(stringEncriptada) {
    const matrizCodigo = [["e", "enter"], ["i", "imes"], ["a", "ai"], ["o", "ober"], ["u", "ufat"]];
    return matrizCodigo.reduce((acc, [original, reemplazo]) =>
        acc.replaceAll(original, reemplazo), stringEncriptada.toLowerCase());
}

function desencriptar(stringDesencriptada) {
    const matrizCodigo = [["e", "enter"], ["i", "imes"], ["a", "ai"], ["o", "ober"], ["u", "ufat"]];
    return matrizCodigo.reduce((acc, [original, reemplazo]) =>
        acc.replaceAll(reemplazo, original), stringDesencriptada.toLowerCase());
}
