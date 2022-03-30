const ExportHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'export',
  version: '1.0.0',
  register: (server, {
    playlistsService,
    validator,
  }) => {
    const exportHandler = new ExportHandler(
        playlistsService,
        validator,
    );
    server.route(routes(exportHandler));
  },
};
