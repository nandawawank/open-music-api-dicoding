/* eslint-disable camelcase */
const objectIsEmpty = (object) => {
  const length = Object.keys(object).length;

  if (length === 0) return true;
  return false;
};

const mapObjectToSongModel = ({
  id,
  title,
  year,
  performer,
  genre,
  duration = null,
  album_id = null,
}) => ({
  id,
  title,
  year,
  performer,
  genre,
  duration: duration,
  albumId: album_id,
});

const mapObjectToCollaborationModel = ({
  id,
}) => ({
  collab_id: id,
});

module.exports = {
  objectIsEmpty,
  mapObjectToSongModel,
  mapObjectToCollaborationModel,
};
