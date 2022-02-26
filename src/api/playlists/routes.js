module.exports = (handler) => [
  {
    method: 'POST',
    path: '/playlists',
    handler: handler.postPlaylistHandler,
  },
  {
    method: 'GET',
    path: '/playlists',
    handler: handler.getPlaylistsHandler,
  },
  {
    method: 'DELETE',
    path: '/playlists/{playlistId}',
    handler: handler.deletePlaylistHandler,
  },
  {
    method: 'POST',
    path: '/playlists/{songId}/songs',
    handler: handler.postPlaylistSongHandler,
  },
  {
    method: 'GET',
    path: '/playlists/{songId}/songs',
    handler: handler.getPlaylistSongHandler,
  },
  {
    method: 'DELETE',
    path: '/playlists/{songId}/songs',
    handler: handler.deletePlaylistSongHandler,
  },
];
