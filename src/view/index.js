import logoBatoi from "../../public/logoBatoi.png";
import Controller from "../controller/index.js";

export default class View {
  #moduleSelect;

  init() {
    const app = document.querySelector("#app");

    app.innerHTML = `

<img class="logo" src="${logoBatoi}" alt="" />
<h1>BatoiBooks</h1>

<nav>
  <ul>
    <li><a href="#list">Ver Libros</a></li>
    <li><a href="#form">Añadir Libro</a></li>
    <li><a href="#about">Acerca de...</a></li>
  </ul>
</nav>


<div id="messages">

</div>

<div>

  <div id="list">

  </div>
  
 

  <div id="form">
  
  <form action="" id="bookForm">
  <h1 id="formTitle">Añadir libro</h1>


<div id="bookIdContainer" hidden>
  <label for="bookId">
    ID:
    <input type="text" id="bookId" disabled />
  </label>
</div>
    
  <label for="modulos">Modulo:</label>

  <select id="moduleSelect" name="modulos">
      <option value="">Selecciona una opción</option>
  </select> <br>


  <label for="editorial">
  Editorial: <input type="text" id="editorial">
  </label> <br>

  <label for="precio">
  Precio: <input type="text" id="precio">
  </label> <br>
  
  <label for="paginas">
  Paginas: <input type="number" id="paginas">
  </label> <br>

    <label for="status">
  Estado: <input type="text" id="status">
  </label> <br>

    <label for="foto">
  Foto: <input type="text" id="foto">
  </label> <br>

  <label for="comentarios">
  Comentarios: <textarea name="" id="comentarios"></textarea>
  </label> <br>

    <label for="fechaVenta">
  Paginas: <input type="date" id="fechaVenta">
  </label> <br>

   <button type="submit" id="btn-guardar">Añadir</button>
    <button type="Reset">Reset</button>
   
    </form>
  </div>
  
  <div id="about">
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam, corporis.
  </div>
</div>


<footer>
  <p>Alonso Nuñez</p>
</footer>


`;

    /* 
 <div id="remove">

  <h1>Eliminar libro</h1>

    <label for="id-eliminar">
        Id libro remover:  <input type="text" id="id-eliminar" for="id-eliminar">
        <button type="submit" id="btn-eliminar">Borrar</button>
    </label>

  </div>
  
      this.campoIdEliminar = document.getElementById("id-eliminar");
    this.botonEliminar = document.getElementById("btn-eliminar");

  */

    this.booksList = document.getElementById("list");
    this.about = document.getElementById("about");
    this.form = document.getElementById("form");
    this.bookForm = document.getElementById("bookForm");
    this.#moduleSelect = document.getElementById("moduleSelect");

    this.messages = document.getElementById("messages");
    this.card = document.getElementById("card");

    this.campoModulo = document.getElementById("moduleSelect");
    this.campoEditorial = document.getElementById("editorial");
    this.campoPrecio = document.getElementById("precio");
    this.campoPaginas = document.getElementById("paginas");
    this.campoStatus = document.getElementById("status");
    this.campoFoto = document.getElementById("foto");
    this.campoComentarios = document.getElementById("comentarios");
    this.campoFechaVenta = document.getElementById("fechaVenta");

    this.botonGuardar = document.getElementById("btn-guardar");

    //
    this.formTitle = document.getElementById("formTitle");
    this.bookIdContainer = document.getElementById("bookIdContainer");
    this.campoId = document.getElementById("bookId");
  }

  crearTarjetaLibro(libro) {
    const tarjeta = document.createElement("article");
    tarjeta.classList.add("card");
    tarjeta.dataset.id = libro.id;

    const libroImg = document.createElement("img");
    libroImg.src = `${libro.photo}`;

    const libroId = document.createElement("h3");
    libroId.textContent = `Libro ${libro.id}`;

    const moduleCode = document.createElement("h3");
    moduleCode.textContent = `${libro.moduleCode} (${libro.id})`;

    const publisher = document.createElement("h4");
    publisher.textContent = `${libro.publisher}`;

    const pages = document.createElement("p");
    pages.textContent = `${libro.pages} páginas`;

    const status = document.createElement("p");
    status.textContent = `Estado:  ${libro.status}`;

    const soldDate = document.createElement("p");
    soldDate.textContent = ` ${libro.soldDate}`;

    const comments = document.createElement("p");
    comments.textContent = `${libro.comments}`;

    const price = document.createElement("h4");
    price.textContent = `${libro.price} €`;

    // Buttons :
    const acciones = document.createElement("div");
    acciones.classList.add("book-actions");

    const botonCarrito = document.createElement("button");
    botonCarrito.innerHTML = `
  <span class="material-icons">add_shopping_cart</span>
`;
    botonCarrito.dataset.action = "card";

    const botonEditar = document.createElement("button");
    botonEditar.innerHTML = `
  <span class="material-icons">edit</span>
`;
    botonEditar.dataset.action = "edit";

    const botonEliminar = document.createElement("button");
    botonEliminar.innerHTML = `
  <span class="material-icons">delete</span>
`;
    botonEliminar.dataset.action = "delete";

    acciones.append(botonCarrito, botonEditar, botonEliminar);

    tarjeta.append(
      libroImg,
      libroId,
      moduleCode,
      publisher,
      pages,
      status,
      soldDate,
      comments,
      price,
      acciones,
    );

    return tarjeta;
  }

  mostrarLibros(libros) {
    this.booksList.innerHTML = "";
    libros.forEach((libro) => {
      this.booksList.append(this.crearTarjetaLibro(libro));
    });
  }

  selectModulos(modulos) {
    modulos.forEach((modulo) => {
      const option = document.createElement("option");

      option.value = modulo.code;
      option.textContent = modulo.code;

      this.#moduleSelect.appendChild(option);
    });
  }

  mostrarMensaje(texto, tipo) {
    this.messages.innerHTML = "";

    const alerta = document.createElement("div");
    alerta.classList.add(tipo, "alert", `alert-${tipo}`, "alert-dismissible");
    alerta.setAttribute("role", "alert");
    alerta.textContent = texto;

    const boton = document.createElement("button");
    boton.type = "button";
    boton.classList.add("btn-close");
    boton.setAttribute("data-bs-dismiss", "alert");
    boton.setAttribute("aria-label", "Close");
    boton.textContent = "x";
    boton.addEventListener("click", () => alerta.remove());

    let temporizador;

    boton.addEventListener("click", () => {
      clearTimeout(temporizador);
      alerta.remove();
    });

    alerta.append(boton);
    this.messages.append(alerta);

    if (tipo !== "error") {
      temporizador = setTimeout(() => alerta.remove(), 3000);
    }
  }

  // From here we send id 2.
  obtenerDatosFormulario() {
    console.log("id" + this.campoId.value.trim());
    return {
      id: this.campoId.value.trim(),
      userId: 2,
      moduleCode: this.campoModulo.value,
      publisher: this.campoEditorial.value,
      price: Number(this.campoPrecio.value),
      pages: Number(this.campoPaginas.value),
      status: this.campoStatus.value,
      photo: this.campoFoto.value,
      comments: this.campoComentarios.value,
      soldDate: this.campoFechaVenta.value,
    };
  }

  obtenerIdEliminar() {
    return this.campoIdEliminar.value.trim();
  }

  limpiarFormulario() {
    this.bookForm.reset();

    this.formTitle.textContent = "Añadir libro";
    this.bookIdContainer.hidden = true;
    this.campoId.value = "";
    this.botonGuardar.textContent = "Añadir";
  }

  /* 
  setEliminarHandler(handler) {
    this.botonEliminar.addEventListener("click", () => {
      const id = this.obtenerIdEliminar();
      
      if(!id){
        this.mostrarMensaje("La ID del libro es obligatoria","error");
        return;
      }

      // callback function, (id = I'm waiting for a function they passed to me, to execute my id on that).
      handler(id);
    });
  }
  */

  setSubmitHandler(handler) {
    this.bookForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const data = this.obtenerDatosFormulario();
      handler(data);
    });
  }

  // Events of each button of card

  setBookActionHandler(handler) {
    this.booksList.addEventListener("click", (event) => {
      // even.target = is the span, not the button, with closest we'll go where is the button
      const button = event.target.closest("button");

      if (!button) {
        return;
      }

      // here we search the parent element more near that have class .card
      const card = button.closest(".card");

      // because of card have an id we use it.
      const id = card.dataset.id;

      const action = button.dataset.action;

      // callback function = will execute (setBookActionHandler), with this parameters
      handler(action, id);
    });
  }

  // View doesn't hear the actions, but controller.

  prepareEdit(book) {
    this.formTitle.textContent = "Editar libro";
    this.bookIdContainer.hidden = false;
    this.campoId.value = book.id;

    this.campoModulo.value = book.moduleCode;
    this.campoEditorial.value = book.publisher;
    this.campoPrecio.value = book.price;
    this.campoPaginas.value = book.pages;
    this.campoStatus.value = book.status;
    this.campoFoto.value = book.photo;
    this.campoComentarios.value = book.comments;
    this.campoFechaVenta.value = book.soldDate;

    this.botonGuardar.textContent = "Guardar cambios";
  }
  
}
