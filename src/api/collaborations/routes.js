const routes = (handler) => [
  {
    method: 'POST',
    path: '/colaborations',
    handler: handler.postCollaborationsHandler,
    options: {
      auth: 'musicapp_jwt',
    },
  },
];

module.exports = routes;
