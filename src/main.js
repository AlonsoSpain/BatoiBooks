import "./style.css";
import logoBatoi from "../public/logoBatoi.png";

import User from "./model/User.class.js";
import Users from "./model/Users.class.js";

import Books from "./model/Books.class.js";
import Book from "./model/Book.class.js";
import Module from "./model/Module.class.js";
import Modules from "./model/Modules.class.js";

document.querySelector("#app").innerHTML = `
          <img class="logo" src="${logoBatoi}" alt="" />
<h1>BatoiBooks</h1>
<p>Abre la consola para ver el resultado</p>
`;

import {
  getDBUsers,
  getDBModules,
  getDBBooks,
  getDBUser,
  getDBBook,
  addDBBook,
  addDBUser,
  removeDBBook,
  removeDBUser,
  changeDBBook,
  changeDBUser,
  changeDBUserPassword,
} from "./services/api.js";

// Cuando colocamos un id al principio el plugin de json-server sobreescribe cualquier
// id colocado por uno aleatorio, si se borra el id fisico que colocamos se corren las posiciones y da lugar
// a que por ejemplo alex@gmail.com sea la password

const module1 = new Module("CV0006", "Sol", "Solet", "58");
const book1 = new Book("lYSf0upCDOM",10,10,"Philosophaee",20.55,30,"good");
const user1 = new User("aFkppv4EcXA", "Alexis", "alex@gmail.com", 1234);


const users = new Users();
const modules = new Modules();
const books = new Books();


async function main() {
  const res = await books.populate();

  console.log(books.booksFromModule("5021"));
  console.log(books.booksWithStatus("new"));
}


main();

