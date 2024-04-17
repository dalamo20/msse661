/**
 * @class DrinkList
 *
 * Creates a list of drinks and updates a list
 */

class DrinkList {
  drinks = [];

  constructor() {}

  /**
   * Build drink list parent.
   * Uses bootstrap classes with some custom overrides.
   */
  createDrinkListParent = () => {
    const ul = document.createElement("ul");
    ul.id = "drinks-list";
    ul.className = "list-group list-group-flush checked-list-box";
    return ul;
  };

  _deleteEventHandler = (drinkId) => async () => {
    if (drinkId) {
      const res = await deleteDrink(drinkId);

      if (res !== null) {
        this.drinks = this.drinks.filter((drink) => drink.id !== drinkId);
        const drink = document.getElementById(`drink-${drinkId}`);
        drink.remove();

        if (!this.drinks.length) {
          const div = document.getElementById("drinks");
          const loadingDiv = div.childNodes[1];
          const errDiv = this.generateErrorMsg("Create some new drinks!");
          div.replaceChild(errDiv, loadingDiv);
        }
      }
    }
  };

  /**
   * Builds the list item.
   * Uses bootstrap classes with some custom overrides.
   *
   * {@link https://getbootstrap.com/docs/4.4/components/list-group/}
   * @example
   * <li class="list-group-item">
   *   <button class="btn btn-secondary" onclick="deleteDrink(e, index)">X</button>
   *   <span>Drink name</span>
   *   <span>price</span>
   * </li>
   */
  buildDrinkListRowItem = (drink) => {
    const listGroupItem = document.createElement("li");
    listGroupItem.id = `drink-${drink.id}`; // drink-1
    listGroupItem.className = "list-group-item";

    const deleteBtn = document.createElement("button");
    const deleteBtnTxt = document.createTextNode("X");
    deleteBtn.className = "btn btn-secondary";
    deleteBtn.addEventListener("click", this._deleteEventHandler(drink.id));
    deleteBtn.appendChild(deleteBtnTxt);

    const drinkNameSpan = document.createElement("span");
    const drinkName = document.createTextNode(drink.name);
    drinkNameSpan.appendChild(drinkName);

    const drinkPriceSpan = document.createElement("span");
    const drinkPrice = document.createTextNode(drink.price);
    drinkPriceSpan.append(drinkPrice);

    // add list item's details
    listGroupItem.append(deleteBtn);
    listGroupItem.append(drinkNameSpan);
    listGroupItem.append(drinkPriceSpan);

    return listGroupItem;
  };

  /**
   * Assembles the list items then mounts them to a parent node.
   * Uses bootstrap classes with some custom overrides.
   */
  buildDrinksList = (mount, drinks) =>
    drinks.map((drink) => {
      const listGroupRowItem = this.buildDrinkListRowItem(drink);

      // add entire list item
      mount.append(listGroupRowItem);
    });

  generateErrorMsg = (msg) => {
    const div = document.createElement("div");
    const text = document.createTextNode(msg);
    div.id = "user-message";
    div.className = "center";
    div.appendChild(text);
    return div;
  };

  generateDrinks = async () => {
    const res = await getDrinks();
    const div = document.getElementById("drinks");
    const loadingDiv = div.childNodes[1];

    if (res.length) {
      this.drinks = res;
      const drinksDiv = this.createDrinkListParent();
      this.buildDrinksList(drinksDiv, res);
      div.replaceChild(drinksDiv, loadingDiv);
    } else {
      const errDiv = this.generateErrorMsg(res.msg);
      div.replaceChild(errDiv, loadingDiv);
    }
  };
}

const inst = new DrinkList();

// This is an IIFE (Immediately Invoked Function Expression).
(async () => {
  inst.generateDrinks();
})();
