// Cambiar modo claro / modo oscuro
const theme_switch = document.getElementById("theme-switcher");
theme_switch.addEventListener("click", () => {
     // Cambiar tema en el HTML
    document.getElementsByTagName("html")[0].classList.toggle("theme-dark");

    // Cambiar el ícono del botón
    const iconSpan = theme_switch_button.querySelector("span");
    const icon = iconSpan.innerText;
    iconSpan.innerText = (icon === "dark_mode") ? "light_mode" : "dark_mode";
});

// Modal
const add_task = document.getElementById("add-task");
add_task.addEventListener("click", () => {
    const modal = spawn_modal();
    setup_modal(modal, null);
});


