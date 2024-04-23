const DRINKS_API = `${BASE_API_URL}/drinks`; // http://localhost:3000/api/drinks
const ORDERS_API = `${BASE_API_URL}/orders`; // http://localhost:3000/api/orders

class TodoService {
  getDrinks = () => _get(DRINKS_API, OPTIONS_WITH_AUTH);

  addDrink = (formData) =>
    _post(DRINKS_API, formData, DEFAULT_OPTIONS_WITH_AUTH);

  deleteDrink = (drinkId) =>
    _delete(`${DRINKS_API}/${drinkId}`, OPTIONS_WITH_AUTH);

  getOrders = () => _get(ORDERS_API, OPTIONS_WITH_AUTH);

  addOrder = (formData) =>
    _post(ORDERS_API, formData, DEFAULT_OPTIONS_WITH_AUTH);

  deleteOrder = (orderId) =>
    _delete(`${ORDERS_API}/${orderId}`, OPTIONS_WITH_AUTH);
}

const todoService = new TodoService();
