const ORDERS_API = `${BASE_API_URL}/orders`; // http://localhost:3000/api/orders

const getOrders = () => _get(ORDERS_API, OPTIONS_WITH_AUTH);

const addOrder = async (formData) => {
  try {
    const res = await _post(ORDERS_API, formData, DEFAULT_OPTIONS_WITH_AUTH);
    return res;
  } catch (error) {
    console.error("Error adding order:", error);
    return null;
  }
};

const deleteOrder = (orderId) =>
  _delete(`${ORDERS_API}/${orderId}`, OPTIONS_WITH_AUTH);
