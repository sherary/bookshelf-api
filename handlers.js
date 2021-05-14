/* eslint-disable no-new-object */
/* eslint-disable guard-for-in */
/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
/* eslint-disable no-unused-vars */
const {nanoid} = require('nanoid');
const books = require('./bookshelfs');

const Books = class {
  static async create(request, h) {
    const book = {
      nama: request.payload.nama,
      year: request.payload.year,
      author: request.payload.author,
      summary: request.payload.summary,
      publisher: request.payload.publisher,
      pageCount: request.payload.pageCount,
      readPage: request.payload.readPage,
    };

    let result = '';

    const checkUndefinedValue = () => {
      const entries = Object.entries(book);

      for (let i = 0; i < entries.length; i++) {
        if (entries[i][1] === undefined) {
          const tmp = entries[i].pop();
          return result = entries[i].toString();
        };
      }
      return result;
    };

    checkUndefinedValue();

    const checkResult = result ? true : false;

    if (checkResult) {
      const response = h.response({
        status: 'fail',
        message: `Gagal menambahkan buku. Mohon isi ${result} buku`,
      });
      response.code(400);
      return response;
    }

    const id = nanoid(16);
    const nama = book.nama;
    const year = book.year;
    const author = book.author;
    const summary = book.summary;
    const publisher = book.publisher;
    const pageCount = book.pageCount;
    const readPage = book.readPage;
    const finished = parseInt(book.pageCount) === parseInt(book.readPage) ? true : false;
    const reading = parseInt(book.readPage) > 0 ? true : false;
    const insertedAt = new Date().toISOString();
    const updatedAt = insertedAt;

    const createBook = {
      id, nama, year, author, summary, publisher, pageCount, readPage, reading, finished, insertedAt, updatedAt,
    };

    const overRead = parseInt(book.readPage) > parseInt(book.pageCount) ? true : false;

    if (overRead) {
      const response = h.response({
        status: 'fail',
        message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
      }).code(400);
      return response;
    } else {
      books.push(createBook);
    }

    const isSuccess = books.filter((book) => book.id === id).length > 0;

    if (isSuccess) {
      const response = h.response({
        status: 'success',
        message: 'Buku berhasil ditambahkan',
        data: {
          bookId: createBook.id,
        },
      });
      response.code(201);
      response.header('Access-Control-Allow-Origin', '*');
      return response;
    }

    const response = h.response({
      status: 'Gagal',
      message: 'Buku gagal ditambahkan',
    });
    response.code(500);
    return response;
  };

  static async all(request, h) {
    const data = [];

    const dataViewer = () => {
      for (let i = 0; i < books.length; i++) {
        data.push({
          id: books[i].id,
          nama: books[i].nama,
          publisher: books[i].publisher,
        });
      }
    };

    dataViewer();

    const response = h.response({
      status: 'success',
      data: {
        books: data,
      },
    }).code(200);
    return response;
  };

  static async one(request, h) {
    const {bookId} = request.params;

    const book = books.filter((book) => book.id === bookId);

    if (book[0] !== undefined) {
      const response = h.response({
        status: 'success',
        data: {
          book: book,
        },
      }).code(200);
      return response;
    } else {
      const response = h.response({
        status: 'fail',
        message: 'Buku tidak ditemukan',
      }).code(404);
      return response;
    };
  };

  static async update(request, h) {
    const {bookId} = request.params;

    const {nama, year, author, summary, publisher, pageCount, readPage, reading} = request.payload;

    const book = books.filter((book) => book);
    const data = books.findIndex((b) => b.id === bookId);

    if (nama === undefined) {
      const response = h.response({
        status: 'failed',
        message: 'Gagal memperbarui buku. Mohon isi nama buku',
      }).code(400);

      return response;
    } else if ( parseInt(readPage) > parseInt(pageCount) ) {
      const response = h.response({
        status: 'failed',
        message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
      }).code(400);

      return response;
    }

    if (data !== -1) {
      books[data] = {
        ...books[data],
        nama, year, author, summary, publisher, pageCount, readPage, reading,
      };

      const response = h.response({
        status: 'success',
        message: 'Buku berhasil diperbarui',
      }).code(200);
      return response;
    } else {
      const response = h.response({
        status: 'fail',
        message: 'Gagal memperbarui buku. Id tidak ditemukan',
      });
      return response;
    }
  };

  static async delete(request, h) {
    const {bookId} = request.params;

    const index = books.findIndex((book) => book.id === bookId);

    if (index !== -1) {
      books.splice(index, 1);
      const response = h.response({
        status: 'success',
        message: 'Buku berhasil dihapus',
      }).code(200);

      return response;
    }

    const response = h.response({
      status: 'fail',
      message: 'Buku gagal dihapus. Id tidak ditemukan',
    }).code(400);

    return response;
  };
};

module.exports = Books;
