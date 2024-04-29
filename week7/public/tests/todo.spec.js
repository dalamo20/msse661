const drinksService = new TodoService();
const todo = new ToDoDrinks(drinksService);

describe("ToDoDrinks", () => {
  it("should initialize some HTML", () => {
    spyOn(todo, "init");
    todo.init();

    expect(todo.init).toHaveBeenCalled();
  });

  it("should add a drink", async () => {
    const newDrink = { name: "Test Drink", price: 5.99 };
    const addDrinkServiceSpy = spyOn(drinksService, "addDrink");

    expect(todo.drinks.length).toBe(0);

    await todo.addDrink(newDrink);

    expect(addDrinkServiceSpy).toHaveBeenCalled();
    expect(todo.drinks.length).toBe(1); //fails here, it's saying my dom elements
  });

  it("should delete a drink", async () => {
    const existingDrink = { name: "Test Drink", price: 5.99 };
    const deleteDrinkServiceSpy = spyOn(drinksService, "deleteDrink");

    expect(todo.drinks.length).toBe(1);

    await todo.deleteDrink(existingDrink.id);

    expect(deleteDrinkServiceSpy).toHaveBeenCalled();
    expect(todo.drinks.length).toBe(0); //fails here
  });
  //There is no update for the drinks
  //   it("should update an individual drink", () => {
  //   });
});
