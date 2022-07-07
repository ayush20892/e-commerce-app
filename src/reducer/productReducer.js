export function productReducer(acc, action) {
  switch (action.type) {
    case "SORT":
      return { ...acc, sortby: action.payload };

    case "TOGGLE-STOCK":
      return { ...acc, outOfStock: !acc.outOfStock };

    case "TOGGLE-DELIVERY":
      return { ...acc, fastDelivery: !acc.fastDelivery };

    case "RESET":
      return { ...acc, sortby: null, outOfStock: false, fastDelivery: false };

    default:
      return { ...acc };
  }
}

export function getSortedData(products, sortby) {
  if (sortby && sortby === "HIGH-TO-LOW")
    return products.sort((a, b) => b.price - a.price);

  if (sortby && sortby === "LOW-TO-HIGH")
    return products.sort((a, b) => a.price - b.price);

  return products;
}

export function getFilteredData(products, outOfStock, fastDelivery) {
  if (outOfStock && fastDelivery)
    return products
      .filter((item) => item.inStock === true)
      .filter((item) => item.fastDelivery === true);

  if (outOfStock) return products.filter((item) => item.inStock === true);

  if (fastDelivery)
    return products.filter((item) => item.fastDelivery === true);

  return products;
}
