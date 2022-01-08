import menCategory from "./components/categoryImages/menCategory.jpg";
import womenCategory from "./components/categoryImages/womenCategory.jpg";
import gadgetCategory from "./components/categoryImages/gadgetCategory.jpg";

export const CategoryData = [
  {
    categoryName: "men",
    categoryImg: menCategory,
    productType: [
      {
        id: "men1",
        img: "https://images.bewakoof.com/t540/nimbus-grey-half-sleeve-t-shirt-men-s-plain-t-shirts-223291-1585903641.jpg",
        name: "Half Sleeve T-shirt",
        page: "halfSleeveTshirt",
      },

      {
        id: "men2",
        img: "https://images.bewakoof.com/t540/men-s-white-stripe-slim-fit-shirts-men-s-stripe-shirts-291870-1617617304.jpg",
        name: "Shirt",
        page: "shirt",
      },
    ],
  },

  {
    categoryName: "women",
    categoryImg: womenCategory,
    productType: [
      {
        id: "women1",
        img: "https://images.bewakoof.com/t540/watermelon--aop-t-shirt-women-s-plain-half-sleeves-aop-t-shirts-338845-1614351440.jpg",
        name: "Half Sleeve T-shirt",
        page: "halfSleeveTshirt",
      },

      {
        id: "women2",
        img: "https://images.bewakoof.com/t540/women-s-ethnic-printed-top-women-s-ethnic-printed-top-318385-1614943408.jpg",
        name: "Kurti",
        page: "kurti",
      },
    ],
  },

  {
    categoryName: "gadget",
    categoryImg: gadgetCategory,
    productType: [],
  },
];
