import axios from "axios";
axios.defaults.withCredentials = true;

const { REACT_APP_BACKEND_URL } = process.env;

export const signup = async (name, email, password) => {
  try {
    const res = await axios.post(
      `${REACT_APP_BACKEND_URL}/signup`,
      {
        name,
        email,
        password,
      },
      {
        withCredentials: true,
      }
    );
    return res;
  } catch (err) {
    console.log(err);
  }
};

export const login = async (email, password) => {
  try {
    const res = await axios.post(
      `${REACT_APP_BACKEND_URL}/login`,
      {
        email,
        password,
      },
      {
        withCredentials: true,
      }
    );
    return res;
  } catch (err) {
    console.log(err);
  }
};

export const logout = async (email, password) => {
  try {
    await axios.get(`${REACT_APP_BACKEND_URL}/logout`, {
      withCredentials: true,
    });
  } catch (err) {
    console.log(err);
  }
};

export const forgotPassword = async (email) => {
  try {
    const res = await axios.post(
      `${REACT_APP_BACKEND_URL}/forgotPassword`,
      {
        email,
      },
      {
        withCredentials: true,
      }
    );
    console.log(res);
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

export const verifyCode = async (forgotCode) => {
  try {
    const { data } = await axios.post(
      `${REACT_APP_BACKEND_URL}/verifyCode`,
      {
        forgotCode,
      },
      {
        withCredentials: true,
      }
    );
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const passwordReset = async (password, confirmPassword) => {
  try {
    const { data } = await axios.post(
      `${REACT_APP_BACKEND_URL}/password/reset`,
      {
        password,
        confirmPassword,
      }
    );
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const userDashboard = async (email, password) => {
  try {
    const { data } = await axios.get(`${REACT_APP_BACKEND_URL}/userDashboard`, {
      withCredentials: true,
    });
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const getAllProducts = async () => {
  try {
    const { data } = await axios.get(
      `${REACT_APP_BACKEND_URL}/getAllProducts`,
      {
        withCredentials: true,
      }
    );
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const getAllWishlistItems = async () => {
  try {
    const {
      data: { success, wishlist },
    } = await axios.get(`${REACT_APP_BACKEND_URL}/user/wishlist`, {
      withCredentials: true,
    });
    return { success, wishlist };
  } catch (err) {
    console.log(err);
  }
};

export const addToWishlist = async (productId) => {
  try {
    const { data } = await axios({
      method: "post",
      url: `${REACT_APP_BACKEND_URL}/user/wishlist`,
      data: {
        productId: productId,
      },
    });
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const deleteFromWishlist = async (productId) => {
  try {
    const { data } = await axios({
      method: "delete",
      url: `${REACT_APP_BACKEND_URL}/user/wishlist`,
      data: {
        productId: productId,
      },
    });
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const getAllCartItems = async () => {
  try {
    const {
      data: { success, cart },
    } = await axios.get(`${REACT_APP_BACKEND_URL}/user/cart`, {
      withCredentials: true,
    });
    return { success, cart };
  } catch (err) {
    console.log(err);
  }
};

export const addToCart = async (productId) => {
  try {
    const { data } = await axios({
      method: "post",
      url: `${REACT_APP_BACKEND_URL}/user/cart`,
      data: {
        productId: productId,
        quantity: 1,
      },
    });
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const updateCartProductQuantity = async (productId, quantity) => {
  try {
    const { data } = await axios({
      method: "put",
      url: `${REACT_APP_BACKEND_URL}/user/cart`,
      data: {
        productId,
        quantity,
      },
    });
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const deleteFromCart = async (productId) => {
  try {
    const { data } = await axios({
      method: "delete",
      url: `${REACT_APP_BACKEND_URL}/user/cart`,
      data: {
        productId: productId,
      },
    });
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const emptyCart = async () => {
  try {
    const { data } = await axios({
      method: "delete",
      url: `${REACT_APP_BACKEND_URL}/user/emptycart`,
    });
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const getASingleProduct = async (productId) => {
  try {
    const { data } = await axios.get(
      `${REACT_APP_BACKEND_URL}/getOneProduct/${productId}`
    );
    return { data };
  } catch (err) {
    console.log(err);
  }
};

export const getProductListingData = async (productType, categoryName) => {
  try {
    const {
      data: { productResult },
    } = await axios.get(
      `${REACT_APP_BACKEND_URL}/getAllProducts?productType=${productType}&category=${categoryName}`
    );
    return { productResult };
  } catch (err) {
    console.log(err);
  }
};

export const updateUserData = async (dataUpdate) => {
  try {
    const { data } = await axios({
      method: "post",
      url: `${REACT_APP_BACKEND_URL}/user/update`,
      data: dataUpdate,
    });
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const updateUserPassowrd = async (
  oldPassword,
  password,
  confirmPassword
) => {
  try {
    const { data } = await axios({
      method: "post",
      url: `${REACT_APP_BACKEND_URL}/password/update`,
      data: {
        oldPassword,
        password,
        confirmPassword,
      },
    });
    return data;
  } catch (err) {
    console.log(err);
  }
};

// Address
export const addAddress = async (
  name,
  addressLine,
  city,
  state,
  country,
  pinCode,
  mobileNo
) => {
  try {
    const { data } = await axios({
      method: "post",
      url: `${REACT_APP_BACKEND_URL}/user/address`,
      data: {
        name,
        addressLine,
        city,
        state,
        country,
        pinCode,
        mobileNo,
      },
    });
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const editAddress = async ({
  addressId,
  name,
  addressLine,
  city,
  state,
  country,
  pinCode,
  mobileNo,
}) => {
  try {
    const { data } = await axios({
      method: "post",
      url: `${REACT_APP_BACKEND_URL}/user/address/${addressId}`,
      data: {
        name,
        addressLine,
        city,
        state,
        country,
        pinCode,
        mobileNo,
      },
    });
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const deleteAddress = async (addressId) => {
  try {
    const { data } = await axios({
      method: "delete",
      url: `${REACT_APP_BACKEND_URL}/user/address/${addressId}`,
    });
    return data;
  } catch (err) {
    console.log(err);
  }
};

// Order
export const createOrder = async (
  addressId,
  products,
  paymentInfoId,
  totalAmount,
  discountAmount,
  orderAmount
) => {
  try {
    const { data } = await axios({
      method: "post",
      url: `${REACT_APP_BACKEND_URL}/user/order`,
      data: {
        addressId,
        products,
        paymentInfoId,
        totalAmount,
        discountAmount,
        orderAmount,
      },
    });
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const cancelOrder = async (orderId) => {
  try {
    const { data } = await axios({
      method: "delete",
      url: `${REACT_APP_BACKEND_URL}/user/order`,
      data: {
        orderId,
      },
    });
    return data;
  } catch (err) {
    console.log(err);
  }
};
