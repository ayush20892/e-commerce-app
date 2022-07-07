export function CheckItem(itemsInCart, productId) {
  if (itemsInCart.length === 0) return false;
  const itemPresent = itemsInCart.find(
    (item) => item.product._id === productId
  );
  return itemPresent ? true : false;
}

export function GetKeyByValue(object, value) {
  return Object.keys(object).find((key) => object[key] === value);
}

export function CategoryMatch(str) {
  var result = str.match(/\b(men|women|gadget)\b/);
  return result;
}

export function ProductTypeMatch(str) {
  var result = str.match(/(halfSleeveTshirt|shirt|kurti)/);
  return result;
}
