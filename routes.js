/* eslint-disable no-unused-vars */
const Books= require('./handlers');

const routes = [

  {
    method: 'POST',
    path: '/books',
    handler: Books.create,
  },
  {
    method: 'GET',
    path: '/books',
    handler: Books.all,
  },
  {
    method: 'GET',
    path: '/books/{bookId}',
    handler: Books.one,
  },
  {
    method: 'PUT',
    path: '/books/{bookId}',
    handler: Books.update,
  },
  {
    method: 'DELETE',
    path: '/books/{bookId}',
    handler: Books.delete,
  },
];

module.exports = routes;
