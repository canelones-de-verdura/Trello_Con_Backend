class dashboardColumn {
    constructor(name, id) {
        this.element = document.createElement("div");
        this.element.classList.add(
            "column",
            "has-background-primary",
            "is-flex",
            "is-flex-direction-column",
            "is-align-items-center"
        );
        this.element.setAttribute("id", id);
        this.element.innerHTML = `<h2 class="subtitle is-3">${name}</h2>`;

        // Configuramos eventos
        this.element.addEventListener('dragover', (event) => {
            event.preventDefault(); // Necesario para permitir el drop
        });

        this.element.addEventListener('drop', (event) => {
            event.preventDefault();
            const dragged_element_id = event.dataTransfer.getData('text/plain'); // Obtener el ID del elemento arrastrado
            const dragged_element = document.getElementById(dragged_element_id); // Buscar el elemento arrastrado por su ID

            if (dragged_element) {
                this.element.appendChild(dragged_element); // Mover el elemento arrastrado a la nueva columna
            } else {
                console.error('El elemento arrastrado no existe en el DOM:', dragged_element_id);
            }
        });
    }

    placeCard(task) {
        this.element.appendChild(task.element);
    }
}

class taskDashboard {
    constructor(HTML_Element) {
        this.element = HTML_Element;
        this.element.classList.add(
            "columns",
            "is-multiline",
            "is-gap-3"
        );
    }

    setColumns(column_names) {
        column_names.forEach(name => {
            const name_low = name.toLowerCase().replaceAll(" ", "-");
            this[name_low] = new dashboardColumn(name, name_low);
            this.element.appendChild(this[name_low].element);
        })
    }
}
