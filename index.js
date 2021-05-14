const Hapi = require('@hapi/hapi');
const routes = require('./routes');

const init = async () => {
  const server = Hapi.server({
    port: 5000,
    host: 'localhost',
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });

  server.route(routes);

  await server.start();

  console.log(`Server running on ${server.info.uri}`);
  return server;
};

process.on('unhandledRejection', (error) => {
  console.log(error);
  process.exit(1);
});

init();
