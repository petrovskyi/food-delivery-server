module.exports = {
  jsonUpdater: (userArr, update) => {
    if (!userArr) {
      return JSON.stringify([update], null, 6);
    } else {
      const db = JSON.parse(userArr);
      db.push(update);
      return JSON.stringify(db, null, 6);
    }
  }
};
