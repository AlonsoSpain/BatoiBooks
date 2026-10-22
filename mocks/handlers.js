import { http, HttpResponse } from "msw";

// Initial Data simulated
let users = [
  {
    id: "1",
    email: "ana@gmail.com",
    nick: "Ana",
    password: "1234",
  },
  {
    id: "2",
    email: "ignasi.gomis.mullor@gmail.com",
    nick: "Ignasi",
    password: "1234",
  },
];

let modules = [
  {
    cliteral: "Didáctica de la educación infantil",
    code: "0011",
    courseId: "39",
    id: "Yk99N7Po2Cg",
    vliteral: "Didàctica de l'educación infantil",
  },
];

let books = [
  {
    id: "1",
    userId: 2,
    moduleCode: "5025",
    publisher: "Apunts",
    price: 12,
    pages: 25,
    status: "good",
    photo: "",
    comments: "",
    soldDate: "2023-02-01",
  },
  {
    id: "10",
    userId: 2,
    moduleCode: "5025",
    publisher: "Apunts",
    price: 15,
    pages: 30,
    status: "good",
    photo: "",
    comments: "",
    soldDate: "2023-02-01",
  },
];
let initialUsers = structuredClone(users);
let initialModules = structuredClone(modules);
let initialBooks = structuredClone(books);

// Restart al data for each tests.
export function resetMockData() {
  users = structuredClone(initialUsers);
  modules = structuredClone(initialModules);
  books = structuredClone(initialBooks);
}

export const handlers = [
  // GET: get all users
  http.get("http://localhost:3000/users", () => {
    return HttpResponse.json(users);
  }),

  // GET: get a user by id
  http.get("http://localhost:3000/users/:id", ({ params }) => {
    const user = users.find((u) => u.id == params.id);

    return HttpResponse.json(user);
  }),

  // GET: get all modules
  http.get("http://localhost:3000/modules", () => {
    return HttpResponse.json(modules);
  }),

  // GET: get all books
  http.get("http://localhost:3000/books", () => {
    return HttpResponse.json(books);
  }),

  // GET: get a book by id
  http.get("http://localhost:3000/books/:id", ({ params }) => {
    const book = books.find((b) => b.id == params.id);

    return HttpResponse.json(book);
  }),

  // POST: add a user
  http.post("http://localhost:3000/users", async ({ request }) => {
    const user = await request.json();

    user.id = String(
      Math.max(0, ...users.map((u) => Number(u.id) || 0)) + 1,
    );

    users.push(user);

    return HttpResponse.json(user, { status: 201 });
  }),

  // POST: add a book
  http.post("http://localhost:3000/books", async ({ request }) => {
    const book = await request.json();

    book.id = String(
      Math.max(0, ...books.map((b) => Number(b.id) || 0)) + 1,
    );

    books.push(book);

    return HttpResponse.json(book, { status: 201 });
  }),

  // DELETE: remove a book
  http.delete("http://localhost:3000/books/:id", ({ params }) => {
    books = books.filter((b) => b.id != params.id);
    return new HttpResponse(null, { status: 200 });
  }),

  // DELETE: remove a user
  http.delete("http://localhost:3000/users/:id", ({ params }) => {
  users = users.filter((user) => user.id != params.id);
  return new HttpResponse(null, { status: 200 });
}),

  http.put("http://localhost:3000/books/:id", async ({ params, request }) => {
  const bookReceived = await request.json();

  const index = books.findIndex((book) => book.id == params.id);

  if (index !== -1) {
    books[index] = bookReceived;
  }

  return HttpResponse.json(bookReceived);
}),

http.put("http://localhost:3000/users/:id", async ({ params, request }) => {
  const userReceived = await request.json();

  const index = users.findIndex((user) => user.id == params.id);

  if (index !== -1) {
    users[index] = userReceived;
  }

  return HttpResponse.json(userReceived);
}),

http.patch("http://localhost:3000/users/:id", async ({ params, request }) => {
  const data = await request.json();

  const user = users.find((user) => user.id == params.id);

  if (user) {
    user.password = data.password;
  }

  return HttpResponse.json(user);
}),


];