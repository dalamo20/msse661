/**
 * AJAX add new drinks to drink list on save.
 */
const doAddDrink = async (e) => {
  e.preventDefault();

  const drinkInput = document.getElementById("formInputDrinkName");
  const drink_name = drinkInput.value;
  const priceInput = document.getElementById("formPrice");
  const drink_price = priceInput.value;

  if (!drink_name) {
    alert("Please enter a drink name.");
    return;
  }

  const res = await addDrink({ drink_name, drink_price });

  if (res !== null) {
    inst.generateDrinks();
  }
  drinkInput.value = "";
};
