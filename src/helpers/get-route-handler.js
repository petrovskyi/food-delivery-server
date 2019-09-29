const hasNumber = myString => /\d/.test(myString);

const getIdFreeUrl = url => {
  // url example : `/users/12345`
  const lastIndex = url.lastIndexOf("/");
  const idString = url.slice(lastIndex + 1).trim();

  // url example : `/produscts`
  if (!hasNumber(idString) && url === "/products") {
    console.log(url);

    return url;
  }
  // url example : `/produscts/?ids=...`
  if (!hasNumber(idString)) {
    return url.slice(0, lastIndex);
  }

  const idNumber = +idString;

  if ((idString && lastIndex !== -1) || (idNumber && lastIndex !== -1)) {
    // console.log(idString);
    return url.slice(0, lastIndex);
  }

  return url;
};

const getRouteHandler = (routerConfig, url) => {
  const clearUrl = getIdFreeUrl(url);

  return routerConfig[clearUrl];
};

module.exports = getRouteHandler;
