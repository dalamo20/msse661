// const doAddDrink = async (event) => {
//   event.preventDefault();

//   const drinkName = document.getElementById("formInputDrinkName").value;
//   const drinkPrice = document.getElementById("formPrice").value;

//   // const formData = {
//   //   name: drinkName,
//   //   price: drinkPrice,
//   // };

//   if (!drinkName) {
//     alert("Please enter a drink name.");
//     return;
//   }

//   try {
//     const drink = { name: drinkName, price: drinkPrice };
//     await todoService.addDrink(drink);
//     todoDrinks.addDrink(drink); //add drink to list
//     drinkName.value = ""; //clear input
//   } catch (err) {
//     console.log(err);
//     alert("Unable to add drink. Please try again.");
//   }

//   // const res = await addDrink(formData);

//   // if (res !== null) {
//   //   // reloads drinks
//   //   inst.generateDrinks();
//   // } else {
//   //   console.error("Error adding drink.");
//   // }
// };

const doAddDrink = async (e) => {
  e.preventDefault();
  todoDrinks._addDrinkEventHandler();
};
