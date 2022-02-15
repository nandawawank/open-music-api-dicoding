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

module.exports = {
  objectIsEmpty, mapObjectToSongModel,
};
