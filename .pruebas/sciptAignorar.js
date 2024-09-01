function crearCartaConModal() {
    // Obtener el título y la descripción del modal
    const title = modal.querySelector("input[type='text']").value;
    const description = modal.querySelectorAll("input[type='text']")[1].value;
    const asignated = modal.querySelectorAll("input[type='text']")[2].value;
    const priority = modal.querySelectorAll("input[type='text']")[3].value;
    const stateQ = modal.querySelectorAll("input[type='text']")[4].value;

    // Verificar si se ingresó un título
    if (title) {
        // Crear un elemento div para la carta principal
        const cartaPrincipal = document.createElement("div");
        cartaPrincipal.className = "card";
        cartaPrincipal.classList.add("contenedor_tarea")

        // Asignar un ID único a la carta principal
        const uniqueId = 'task-' + new Date().getTime();
        cartaPrincipal.setAttribute("id", uniqueId);
        //ERA ESTO POR LO QUE SE ME ROMPIOO TODO LPM de el id de mierda que no se genera solo

        // Crear un elemento div para la carta secundaria
        const cartaSecundaria = document.createElement("div");
        cartaSecundaria.className = "card2";

        // Crear contenido con el título y la descripción
        const titulo = document.createElement("p");
        titulo.className = "cardtext";
        titulo.textContent = title;
        titulo.contentEditable = true;
        titulo.classList.add("forzarCentrado");

        const descripcion = document.createElement("p");
        descripcion.className = "cardtext";
        descripcion.textContent = description;
        descripcion.contentEditable = true;

        const asignado = document.createElement("p");
        asignado.className = "cardtext";
        asignado.textContent = asignated;
        asignado.contentEditable = true;

        const prioridad = document.createElement("p");
        prioridad.className = "cardtext";
        prioridad.textContent = priority;
        prioridad.contentEditable = true;

        const estado = document.createElement("p");
        estado.className = "cardtext";
        estado.textContent = stateQ;
        estado.contentEditable = true;

        // Crear botón de eliminar
        let eliminar = document.createElement("button");
        eliminar.className = "eliminar";
        eliminar.onclick = function() { borrarCarta(this) };

        let eliminar_lg = document.createElement("span");
        let eliminar_sl = document.createElement("span");
        let eliminar_text = document.createElement("span");
        eliminar_lg.className = "eliminar_lg";
        eliminar_sl.className = "eliminar_sl";
        eliminar_text.className = "eliminar_text";
        eliminar_text.textContent = "ELIMINAR";

        // Anidar elementos
        eliminar_lg.appendChild(eliminar_sl);
        eliminar_lg.appendChild(eliminar_text);
        eliminar.appendChild(eliminar_lg);
        cartaSecundaria.appendChild(eliminar);
        cartaSecundaria.appendChild(titulo);
        cartaSecundaria.appendChild(descripcion);
        cartaSecundaria.appendChild(asignado);
        cartaSecundaria.appendChild(prioridad);
        cartaSecundaria.appendChild(estado);
        cartaPrincipal.appendChild(cartaSecundaria);
        
        //intentando que se pueda arrastrar la carta
      // Para la carta principal
    cartaPrincipal.setAttribute("draggable", "true");
    cartaPrincipal.addEventListener('dragstart', (event) => {
    event.dataTransfer.setData('text/plain', event.target.id);
    cartaPrincipal.classList.add('dragging');
    });
    cartaPrincipal.addEventListener('dragend', () => {
    cartaPrincipal.classList.remove('dragging');
    });

    

        // Agregar la carta principal al contenedor de cartas (e.g., backlogColumn)
        backlogColumn.appendChild(cartaPrincipal);

        // Limpiar y cerrar el modal
        modal.querySelectorAll("input").forEach(input => input.value = "");
        modal.classList.remove("is-active");

        saveBodyContentToLocalStorage("bodyContent");
    
    }
}

acceptModalButton.addEventListener("click",crearCartaConModal);

function borrarCarta(botonEliminar){
    //Borra la carta 
    const cartaPorEliminar= botonEliminar.parentElement.parentElement;
    cartaPorEliminar.remove();
  }
  function saveBodyContentToLocalStorage(storageKey) {
    const bodyContent = document.body.innerHTML;
    localStorage.setItem(storageKey, bodyContent);
}

function loadBodyContentFromLocalStorage(storageKey) {
    const storedContent = localStorage.getItem(storageKey);
    if (storedContent) {
        console.log("Contenido encontrado");
        document.body.innerHTML = storedContent;
    } else {
        console.error('No se encontró contenido almacenado bajo la clave:', storageKey);
    }
}

window.addEventListener("load", loadBodyContentFromLocalStorage("bodyContent"));