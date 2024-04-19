const doAddDrink = async (event) => {
  event.preventDefault();

  const drinkName = document.getElementById("formInputDrinkName").value;
  const drinkPrice = document.getElementById("formPrice").value;

  const formData = {
    name: drinkName,
    price: drinkPrice,
  };

  const res = await addDrink(formData);

  if (res !== null) {
    // reloads drinks
    inst.generateDrinks();
  } else {
    console.error("Error adding drink.");
  }
};
