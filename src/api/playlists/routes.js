const Joi = require('joi');

module.exports = (handler) => [
  {
    method: 'POST',
    path: '/playlists',
    handler: handler.postPlaylistHandler,
    options: {
      auth: 'musicapp_jwt',
    },
  },
  {
    method: 'GET',
    path: '/playlists',
    handler: handler.getPlaylistHandler,
    options: {
      auth: 'musicapp_jwt',
    },
  },
  {
    method: 'DELETE',
    path: '/playlists/{playlistId}',
    handler: handler.deletePlaylistHandler,
    options: {
      auth: 'musicapp_jwt',
      validate: {
        params: Joi.object({
          playlistId: Joi.string().required(),
        }),
      },
    },
  },
  {
    method: 'POST',
    path: '/playlists/{playlistId}/songs',
    handler: handler.postPlaylistSongHandler,
    options: {
      auth: 'musicapp_jwt',
      validate: {
        params: Joi.object({
          playlistId: Joi.string().required(),
        }),
      },
    },
  },
  {
    method: 'GET',
    path: '/playlists/{playlistId}/songs',
    handler: handler.getPlaylistSongHandler,
    options: {
      auth: 'musicapp_jwt',
      validate: {
        params: Joi.object({
          playlistId: Joi.string().required(),
        }),
      },
    },
  },
  {
    method: 'DELETE',
    path: '/playlists/{playlistId}/songs',
    handler: handler.deletePlaylistSongHandler,
    options: {
      auth: 'musicapp_jwt',
      validate: {
        params: Joi.object({
          playlistId: Joi.string().required(),
        }),
      },
    },
  },
];
