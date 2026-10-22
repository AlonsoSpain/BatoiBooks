const usersURL = "http://localhost:3000/users";
const coursesURL = "http://localhost:3000/courses";
const modulesURL = "http://localhost:3000/modules";
const families = "http://localhost:3000/families";
const salesURL = "http://localhost:3000/sales";
const booksURL = "http://localhost:3000/books";

import Book from "../model/Book.class.js";
import User from "../model/User.class.js";

async function getDBUsers() {
  const res = await fetch(usersURL);
  const users = await res.json();
  return users;
}

async function getDBModules() {
  const res = await fetch(modulesURL);
  return res.json();
}

async function getDBBooks() {
  const res = await fetch(booksURL);
  return res.json();
}

async function getDBUser(id) {
  const res = await fetch(usersURL);
  const users = await res.json();

  return users.filter((u) => u.id == id);
}

async function getDBBook(id) {
  const res = await fetch(booksURL);
  const books = await res.json();

  return books.filter((u) => u.id == id);
}

async function addDBBook(book) {
  const res = await fetch(booksURL, {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(book),
  });
}

async function addDBUser(user) {
  const res = await fetch(usersURL, {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(user),
  });

}

async function removeDBBook(bookId) {
  const res = await fetch(booksURL + `/${bookId}`, {
    method: "DELETE"
  });
}

async function removeDBUser(userId) {
  const res = await fetch(usersURL + `/${userId}`, {
    method: "DELETE"
  });
}

async function changeDBBook(bookReceived) {
  const res = await fetch(booksURL + `/${bookReceived.id}`, {
    method: "PUT",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(bookReceived)
  });
}

async function changeDBUser(userReceived) {
 
  const res = await fetch(usersURL + `/${userReceived.id}`, {
    method: "PUT",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(userReceived)
  });
}

async function changeDBUserPassword(id, password) {

    const res = await fetch(usersURL + `/${id}`, {
    method: "PATCH",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify({ password: password })
  });
}

export {
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
};    


  
