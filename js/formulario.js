let captcha_aleatorio; // Variable para almacenar de manera global el captcha generado

// Función para generar un número aleatorio entre 0 y 9999
function generarCaptcha() {
    captcha_aleatorio = Math.floor(Math.random() * 10000);
    return captcha_aleatorio;
}
  
// Función para mostrar en el span el valor generado del captcha
function mostrarCaptcha() {
    document.querySelector("#valorCaptcha").innerHTML = generarCaptcha();
}

// Generar captcha al tocar el botón
document.querySelector("#generarCaptcha").addEventListener("click", mostrarCaptcha);

// Escuchar el submit del form
let form = document.querySelector("#form");
form.addEventListener("submit", agregar);

// Función para verificar el form
function agregar(e) {
    e.preventDefault();

    let captcha_ingreso = document.querySelector("#ingresoCaptcha").value;  // Obtener el valor ingresado por el usuario en el campo de captcha.
    let terminosCondiciones = document.querySelector("#acuerdo");

    if (captcha_ingreso == captcha_aleatorio) {
        // El captcha es correcto, verificar términos y condiciones check
        if (terminosCondiciones.checked) {
            // Obtener todos los datos del form
            let formData = new FormData(form);

            let nombre = formData.get("nombre");
            let apellido = formData.get("apellido");
            let direccion = formData.get("direccion");
            let email = formData.get("correo");
            let telefono = formData.get("telefono");
            let genero = formData.get("genero");
            console.log(nombre, apellido, direccion, email, telefono, genero);

            document.querySelector("#validacion").innerHTML = "¡El formulario ha sido enviado con éxito!";
        } else {
            document.querySelector("#validacion").innerHTML = "Por favor, acepte los Términos y Condiciones."
        } 
    } else {
        // El captcha es incorrecto, no enviar el formulario
        document.querySelector("#validacion").innerHTML = "El captcha ingresado no es correcto.";
    }
}