const DRINKS_API = `${BASE_API_URL}/drinks`; // http://localhost:3000/api/drinks

const getDrinks = () => _get(DRINKS_API, OPTIONS_WITH_AUTH);

const addDrink = (formData) =>
  _post(DRINKS_API, formData, DEFAULT_OPTIONS_WITH_AUTH);

const deleteDrink = (drinkId) =>
  _delete(`${DRINKS_API}/${drinkId}`, OPTIONS_WITH_AUTH);
