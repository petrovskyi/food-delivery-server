const answer = (data, res) => {
  res.status(200).json(
    data.length !== 0
      ? {
          status: "success",
          products: data
        }
      : {
          status: "no products",
          products: data
        }
  );
};

module.exports = {
  byID: (data, id, res) => {
    const result = data.filter(el => el.id === Number(id));
    answer(result, res);
  },
  byIDs: (data, ids, res) => {
    const idsArray = ids.split(",");
    const result = data.filter(el => idsArray.includes(String(el.id)));
    answer(result, res);
  },
  byCategory: (data, category, res) => {
    const result = data.filter(el => el.categories.includes(category));
    answer(result, res);
  },
  byAll: (data, res) => answer(data, res)
};
