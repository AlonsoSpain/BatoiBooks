function getBookById(books, bookId) {
  const book = books.find((book) => book.id == bookId);
  if (!book) {
    throw new Error("El libro no existe");
  }
  return book;
}

function getBookIndexById(books, bookId) {
  const index = books.findIndex((book) => book.id == bookId);
  if (index === -1) {
    throw new Error("El libro no existe");
  }
  return index;
}

function bookExists(books, userId, moduleCode) {
  const existence = books.find((book) => {
    if (book.userId == userId && book.moduleCode == moduleCode) {
      return true;
    }
  });

  if (existence) {
    return true;
  } else {
    return false;
  }
}

function booksFromUser(books, userId) {
  const existences = books.filter((book) => book.userId == userId);
  return existences;
}

function booksFromModule(books, moduleCode) {
  const existences = books.filter((book) => book.moduleCode == moduleCode);
  return existences;
}

function booksCheeperThan(books, price) {
  const existences = books.filter((book) => book.price <= price);
  return existences;
}

function booksWithStatus(books, status) {
  const existences = books.filter((book) => book.status == status);
  
  return existences;
}

function averagePriceOfBooks(books) {
  const precios =
    books.reduce((count, book) => {
      return count + book.price;
    }, 0) / books.length;

  return precios.toFixed(2) + " €";
}

function booksOfTypeNotes(books) {
  const existences = books.filter((book) => book.publisher == "Apunts");
  return existences;
}

function booksNotSold(books) {
  const existences = books.filter((book) => book.soldDate == "");
  return existences;
}

function incrementPriceOfbooks(books, percentage) {
  const existences = books.map((book) => {
    return { ...book, 
      price: (book.price + book.price * (percentage / 100)) };
  });
  return existences;
}

function getUserById(users, userId) {
  const existence = users.find((user) => user.id == userId);

  if (!existence) {
    throw new Error("El usuario no existe");
  }
  return existence;
}

function getUserIndexById(users, userId) {
  const index = users.findIndex((user) => user.id == userId);

  if (index < 0) {
    throw new Error("El usuario no existe");
  }
  return index;
}


function getUserByNickName(users,nick){
    const existence = users.find((user) => user.nick == nick)

    if(!existence){
        throw new Error("El usuario no existe")
    }

    return existence;

}

function getModuleByCode(modules, moduleCode){
    const existence = modules.filter((module) => module.code == moduleCode)

    if(existence.length === 0){
        throw new Error("El modulo no existe")
    }

    return existence;
}

export {
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
};
