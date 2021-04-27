export function CheckItem(itemsInCart, currItem) {
  return itemsInCart.find(item => item.id === currItem.id);
}