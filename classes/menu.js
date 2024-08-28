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
        const delete_button = this.btn_holder.children[2];

        if (task.is_empty) {
            title = "Nueva tarea";
            confirm_button.innerText = "Agregar tarea";
            delete_button.classList.add("is-hidden");

            confirm_button.addEventListener("click", () => {
        // Input
        const titulo = this.element.querySelector("#titulo").value;
        const descripcion = this.element.querySelector("#descripcion").value;
        const asignado = this.element.querySelector("#asignado").value;
        const prioridad = this.element.querySelector("#prioridad").value;
        const estado = this.element.querySelector("#estado").value;
        //const fecha_limite = this.element.querySelectorAll("#fecha_limite").value;
        const fecha_limite = null;

                console.log(titulo);
                console.log(descripcion);
                console.log(asignado);
                console.log(prioridad);
                console.log(estado);
                console.log(fecha_limite);

                task.fill(titulo, descripcion, asignado, prioridad, estado, fecha_limite);
                dashboard.columns[0].placeCard(task);
                this.close();
            });
        } else {
            title = "Editar tarea";
            confirm_button.innerText = "Aceptar";
            delete_button.classList.remove("is-hidden");

            delete_button.addEventListener("click", () => {
                // TODO
            });

            confirm_button.addEventListener("click", () => {
                this.close();
            });
        }

        // Título
        this.title.innerText = title;

        // Mostramos modal
        this.element.classList.add("is-active");
    }

    /*
    recoverInput() {
        const titulo = modal.querySelector("#titulo").value;
        const descripcion = modal.querySelector("#descripcion").value;
        const asignado = modal.querySelector("#asignado").value;
        const prioridad = modal.querySelector("#prioridad").value;
        const estado = modal.querySelector("#estado").value;
        const fecha_limite = modal.querySelectorAll("#fecha_limite").value;

    }
    */

    close() {
        // Malabares para deshacer las event calls
        this.btn_holder.replaceChild(this.btn_holder.children[1].cloneNode(), this.btn_holder.children[1]);
        this.btn_holder.replaceChild(this.btn_holder.children[2].cloneNode(), this.btn_holder.children[2]);
        // Ocultamos
        this.element.classList.remove("is-active");
    }
}
