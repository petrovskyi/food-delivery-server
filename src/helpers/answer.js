module.exports = {
  answer: data => {
    let dataStatus;
    data.length === 0
      ? (dataStatus = "no products")
      : (dataStatus = "success");

    return JSON.stringify({
      success: dataStatus,
      products: data
    });
  }
  //   ids :  data => {

  //   }
};
