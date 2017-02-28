function query(coords) {
  return new Promise(r => setTimeout(r, 2000))
    .then(() => coords);
}

module.exports = {
  query,
};
