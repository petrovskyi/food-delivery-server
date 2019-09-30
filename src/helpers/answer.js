module.exports = {
  id: data => {
    let dataStatus;
    if (data.length === 0) {
      dataStatus = "no products";
    } else {
      dataStatus = "success";
    }
    return JSON.stringify({
      success: dataStatus,
      products: data
    });
  }
};
