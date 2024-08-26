// Cambiar modo claro / modo oscuro
const theme_switch = document.getElementById("theme-switcher");
theme_switch.addEventListener("click", () => {
    // Cambiamos tema
    document.getElementsByTagName("html")[0].classList.toggle("theme-dark");

    // Cambiamos ícono
    const icon = theme_switch.getElementsByTagName("span")[0].innerText;
    if (icon == "dark_mode")
        theme_switch.getElementsByTagName("span")[0].innerText = "light_mode";
    else
        theme_switch.getElementsByTagName("span")[0].innerText = "dark_mode";

    // Esto es para el .css viejo
    // document.getElementsByTagName("html")[0].classList.toggle("dark-theme");
});


// Modal
const add_task = document.getElementById("add-task");
add_task.addEventListener("click", () => {
    document.getElementsByClassName("modal")[0].classList.add("is-active");
});

// Cerrar el modal al hacer clic en el fondo
const exit_modal = document.getElementsByClassName("modal-background")[0];
exit_modal.addEventListener("click", closeModal);

// Cerrar el modal al hacer clic en el botón (x)
const close_button = document.getElementsByClassName("delete")[0];
close_button.addEventListener("click", closeModal)



function closeModal() {
    document.getElementsByClassName("modal")[0].classList.remove("is-active");
    clearform();
}

// Cerrar el modal al hacer clic en el botón cancelar
const cancel_button = document.getElementById("cancel-button");
cancel_button.addEventListener("click", closeModal);

function clearform() {
    document.getElementById("titulo").value = "";
    document.getElementById("descripcion").value = "";
    document.getElementById("asignado").value = "";
    document.getElementById("prioridad").value = "";
    document.getElementById("estado").value = "";
    document.getElementById("fecha limite").value = "";
}