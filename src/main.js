import "./style.css";
import logoBatoi from "../public/logoBatoi.png";
import datos from "./services/datos";

// import { data } from './services/datos.js'

import {
  getBookById,
  getBookIndexById,
  bookExists,
  booksFromUser,
  booksFromModule,
  booksCheeperThan,
  booksWithStatus,
  averagePriceOfBooks,
  booksOfTypeNotes,
  booksNotSold,
  incrementPriceOfbooks,
  getUserById,
  getUserIndexById,
  getUserByNickName,
  getModuleByCode,
} from "./functions";

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

// console.log(booksFromUser(datos.books,4));
// console.log(booksWithStatus(booksFromModule(datos.books,"5021"),"good"));
// console.log(incrementPriceOfbooks(datos.books,10))

const users = new Users();
users.populate(datos.users);

const user1 = new User("Alex", "alex@gmail.com", 1234);


const books = new Books();
books.populate(datos.books);

const book1 = new Book(10, 10, "Genius", 20.55, 30, "good");


const modules = new Modules();
modules.populate(datos.modules);

const module1 = new Module("CV0006", "Sol", "Solet", "58");


console.log(books.booksFromModule("5021"));
console.log(books.booksWithStatus("new"));
console.log(books.incrementPriceOfbooks(10));

