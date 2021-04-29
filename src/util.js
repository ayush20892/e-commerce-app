export function CheckItem(itemsInCart, currItem) {
  return itemsInCart.find(item => item.id === currItem.id);
}


export function GetKeyByValue(object, value) {
  return Object.keys(object).find(key => object[key] === value);
}

export function CategoryMatch(str)
{
    var result = str.match(/\b(men|women|gadget)\b/)
    return result;
}

export function ProductTypeMatch(str)
{
    var result = str.match(/(-halfSleeveTshirt-|-shirt-|-kurti-)/)
    var result1 = str.match(/(halfSleeveTshirt|shirt|kurti)/)
    return result1;
}