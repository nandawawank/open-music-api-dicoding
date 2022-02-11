import * as dotenv from 'dotenv';
import Hapi from '@hapi/hapi';

dotenv.config();

const init = async () => {
  const server = Hapi.server({
    port: process.env.PORT,
    host: process.env.HOST,
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });

  await server.start();
  console.info(`Server has been running at ${server.info.uri}`);
};

init();
