const path = require('path');

const routes = (handler) => [
  {
    method: 'POST',
    path: '/albums',
    handler: handler.postAlbumHandler,
  },
  {
    method: 'GET',
    path: '/albums/{albumId}',
    handler: handler.getAlbumByIdHandler,
  },
  {
    method: 'PUT',
    path: '/albums/{albumId}',
    handler: handler.putAlbumByIdHandler,
  },
  {
    method: 'DELETE',
    path: '/albums/{albumId}',
    handler: handler.deleteAlbumByIdHandler,
  },
  {
    method: 'POST',
    path: '/albums/{albumId}/covers',
    handler: handler.postCoverAlbumHandler,
    options: {
      payload: {
        allow: 'multipart/form-data',
        multipart: true,
        output: 'stream',
        maxBytes: 512000,
      },
    },
  },
  {
    method: 'GET',
    path: '/albums/cover/{param*}',
    handler: {
      directory: {
        path: path.resolve(__dirname, 'cover'),
      },
    },
  },
  {
    method: 'GET',
    path: '/albums/{albumId}/likes',
    handler: handler.getLikeAlbumHandler,
  },
  {
    method: 'POST',
    path: '/albums/{albumId}/likes',
    handler: handler.postLikeAlbumHandler,
    options: {
      auth: 'musicapp_jwt',
    },
  },
];

module.exports = routes;
