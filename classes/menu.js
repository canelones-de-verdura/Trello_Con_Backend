// TODO leer los inputs del usuario
/***
 * SUJETO A CAMBIOS
 * Clase que "envuelve" el modal.
 * El único objetivo es estructurar la lógica.
 */
class taskMenu {
    /***
     * @param div que se va a utilizar como modal
     */
    constructor(HTML_Element) {
        // Atributos que vale la pena tener a mano
        this.element = HTML_Element;
        this.title = HTML_Element.querySelector(".modal-card-title");
        this.btn_holder = HTML_Element.querySelector(".buttons"); // 0 = cancelar, 1 = aceptar, 2 = eliminar tarjeta

        // Configuramos eventos
        const modal_background = document.getElementById("background");
        modal_background.addEventListener("click", () => this.close());
        this.btn_holder.children[0].addEventListener("click", () => this.close());
        this.element.addEventListener("keydown", ({ key }) => {
            if (key === "Escape")
                this.close()
        });
    }

    //TODO ARREGLAR CHANCHADA
    /***
     * Termina de configurar el modal y lo muestra.
     * @param task Tarea a editar. Si es null, se crea una tarea nueva
     */
    spawn(task, dashboard) {
        let title = "";
        const confirm_button = this.btn_holder.children[1];

        if (task.is_empty) {
            title = "Nueva tarea";
            confirm_button.innerText = "Agregar tarea";

            confirm_button.addEventListener("click", () => {
                const args = this.recoverInput();

                task.fill(args[0], args[1], args[2], args[3], args[4], args[5]);
                dashboard[args[4]].placeCard(task);

                task.element.querySelector(".card-content").addEventListener("click", () => menu.spawn(task));
                task.element.querySelector(".card-header-icon").addEventListener("click", () => task.delete());

                this.close();
            });
        } else {
            title = "Editar tarea";
            confirm_button.innerText = "Aceptar";

            confirm_button.addEventListener("click", () => {
                const args = this.recoverInput();

                task.fill(args[0], args[1], args[2], args[3], args[4], args[5]);
                task.delete();
                dashboard[args[4]].placeCard(task);

                this.close();
            });
        }

        // Título
        this.title.innerText = title;

        // Mostramos modal
        this.element.classList.add("is-active");
    }

    recoverInput() {
        // Input
        const titulo = this.element.querySelector("#titulo").value;
        const descripcion = this.element.querySelector("#descripcion").value;
        const asignado = this.element.querySelector("#asignado").value;
        const prioridad = this.element.querySelector("#prioridad").value;
        const estado = this.element.querySelector("#estado").value;
        //const fecha_limite = this.element.querySelectorAll("#fecha_limite").value;
        const fecha_limite = null;

        // TODO agregar validación del input

        return [titulo, descripcion, asignado, prioridad, estado, fecha_limite];
    }

    clearInput() {
        this.element.querySelector("#titulo").value = "";
        this.element.querySelector("#descripcion").value = "";
        this.element.querySelector("#asignado").value = "";
        this.element.querySelector("#prioridad").value = "";
        this.element.querySelector("#estado").value = "";
    }

    close() {
        this.clearInput();
        // Malabares para deshacer las event calls
        this.btn_holder.replaceChild(this.btn_holder.children[1].cloneNode(), this.btn_holder.children[1]);
        // Ocultamos
        this.element.classList.remove("is-active");
    }
}
