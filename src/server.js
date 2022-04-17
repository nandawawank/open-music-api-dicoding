/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
require('dotenv').config();

const Hapi = require('@hapi/hapi');
const Jwt = require('@hapi/jwt');
const Inert = require('@hapi/inert');
const path = require('path');

const albums = require('./api/albums');
const songs = require('./api/songs');
const users = require('./api/users');
const authentications = require('./api/authentications');
const playlists = require('./api/playlists');
const collaborations = require('./api/collaborations');
const exportPlaylist = require('./api/export');

const TokenManager = require('./tokenize/TokenManager');

const AlbumsService = require('./services/postgres/albums/AlbumsService');
const AlbumsValidator = require('./validator/albums/index');

const SongsService = require('./services/postgres/songs/SongsService');
const SongsValidator = require('./validator/songs/index');

const UsersService = require('./services/postgres/users/UsersService');
const UsersValidator = require('./validator/users/index');

const AuthenticationsService = require('./services/postgres/authentications/AuthenticationsService');
const AuthenticationsValidator = require('./validator/authentications/index');

const PlaylistsService = require('./services/postgres/playlists/PlaylistsService');
const PlaylistsValidator = require('./validator/playlists/index');

const CollaborationsService = require('./services/postgres/collaborations/CollaborationsService');
const CollaboratorsValidator = require('./validator/collaborations/index');

const ExportsPlaylistValidator = require('./validator/export/index');

const StorageService = require('./services/storage/StorageService');
const CacheService = require('./services/redis/CacheService');

const ClientError = require('./exception/ClientError');

const init = async () => {
  const storageService = new StorageService(path.resolve(__dirname, 'api/albums/cover'));
  const albumsService = new AlbumsService();
  const songsService = new SongsService(albumsService);
  const usersService = new UsersService();
  const authenticationsService = new AuthenticationsService();
  const collaborationsService = new CollaborationsService();
  const playlistsService = new PlaylistsService(collaborationsService);
  const cacheService = new CacheService();

  const server = Hapi.server({
    port: process.env.PORT,
    host: process.env.HOST,
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });

  // registrasi plugin eksternal
  await server.register([
    {
      plugin: Jwt,
    },
    {
      plugin: Inert,
    },
  ]);

  // mendefinisikan strategy autentikasi jwt
  server.auth.strategy('musicapp_jwt', 'jwt', {
    keys: process.env.ACCESS_TOKEN_KEY,
    verify: {
      aud: false,
      iss: false,
      sub: false,
      maxAgeSec: process.env.TOKEN_AGE,
    },
    validate: (artifacts) => ({
      isValid: true,
      credentials: {
        id: artifacts.decoded.payload.id,
      },
    }),
  });

  await server.register([
    {
      plugin: albums,
      options: {
        albumsService,
        storageService,
        cacheService,
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
    {
      plugin: users,
      options: {
        service: usersService,
        validator: UsersValidator,
      },
    },
    {
      plugin: authentications,
      options: {
        usersService,
        authenticationsService,
        tokenManager: TokenManager,
        validator: AuthenticationsValidator,
      },
    },
    {
      plugin: playlists,
      options: {
        songsService,
        playlistsService,
        validator: PlaylistsValidator,
      },
    },
    {
      plugin: collaborations,
      options: {
        songsService,
        playlistsService,
        usersService,
        collaborationsService,
        validator: CollaboratorsValidator,
      },
    },
    {
      plugin: exportPlaylist,
      options: {
        playlistsService,
        validator: ExportsPlaylistValidator,
      },
    },
  ]);

  await server.ext('onPreResponse', (request, h) => {
    // mendapatkan konteks response dari request
    const {response} = request;

    if (response instanceof ClientError) {
      // membuat response baru dari response toolkit
      // sesuai kebutuhan error handling
      const newResponse = h.response({
        status: 'fail',
        message: response.message,
        statusCode: response.statusCode,
      });

      newResponse.code(response.statusCode);
      return newResponse;
    }

    if (response instanceof Error) {
      const newResponse = h.response({
        status: 'fail',
        message: response.output.payload.message,
      });
      newResponse.code(response.output.statusCode);
      return newResponse;
    }

    // jika bukan ClientError, lanjutkan dengan
    // response sebelumnya (tanpa terintervensi)
    return response.continue || response;
  });

  await server.start();
  console.info(`Server has been running at ${server.info.uri}`);
};

init();
