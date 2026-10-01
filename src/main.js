import './style.css'
import logoBatoi from "../public/logoBatoi.png";
import datos from "./services/datos";


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
  getModuleByCode
  
} from "./functions";


document.querySelector("#app").innerHTML = `
          <img class="logo" src="${logoBatoi}" alt="" />
<h1>BatoiBooks</h1>
<p>Abre la consola para ver el resultado</p>
`;

console.log(booksFromUser(datos.books,4));
console.log(booksWithStatus(booksFromModule(datos.books,"5021"),"good"));
console.log(incrementPriceOfbooks(datos.books,10))