module.exports = {
  jsonUpdater: (userArr, update) => {
    if (!userArr) {
      return JSON.stringify([update], null, 6);
    } else {
      const db = JSON.parse(userArr);
      db.push(update);
      return JSON.stringify(db, null, 6);
    }
  },
  checkUserById: (reqData, readData) =>
    JSON.parse(readData).find(el => el.id === reqData.user),
  checkAllProducts: (reqData, readData) =>
    JSON.parse(readData).filter(el => reqData.products.includes(el.id))
      .length === reqData.products.length
};
``;
