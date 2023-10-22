// Botón Toggle Menú
let btn_nav = document.querySelector("#btn_nav");
btn_nav.addEventListener("click", toggleMenu);

let menu = document.querySelector("#menu");

function toggleMenu() {
    if (menu.style.display == 'none') {
        menu.style.display = 'block';
    } else {
        menu.style.display = 'none';
    }
}