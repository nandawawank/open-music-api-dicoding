require('dotenv').config();

const Hapi = require('@hapi/hapi');
const albums = require('./api/albums');
const songs = require('./api/songs');

const AlbumsService = require('./services/postgres/albums/AlbumsService');
const AlbumsValidator = require('./validator/albums/index');

const SongsService = require('./services/postgres/songs/SongsService');
const SongsValidator = require('./validator/songs/index');

const init = async () => {
  const albumsService = new AlbumsService();
  const songsService = new SongsService();

  const server = Hapi.server({
    port: process.env.PORT,
    host: process.env.HOST,
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });

  await server.register([
    {
      plugin: albums,
      options: {
        service: albumsService,
        validator: AlbumsValidator,
      },
    },
    {
      plugin: songs,
      options: {
        service: songsService,
        validator: SongsValidator,
      },
    },
  ]);

  await server.start();
  console.info(`Server has been running at ${server.info.uri}`);
};

init();
