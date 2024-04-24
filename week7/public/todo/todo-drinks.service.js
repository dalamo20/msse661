/**
 * @class ToDoDrinks
 *
 * Creates a list of drinks and updates a list
 */

class ToDoDrinks {
  drinks = [];
  todoService;

  constructor(todoService) {
    this.todoService = todoService;
  }

  init() {
    this.render();
  }

  /**
   * DOM renderer for building the list row item.
   * Uses bootstrap classes with some custom overrides.
   *
   * {@link https://getbootstrap.com/docs/4.4/components/list-group/}
   * @example
   * <li class="list-group-item">
   *   <button class="btn btn-secondary" onclick="deleteDrink(e, index)">X</button>
   *   <span>Drink id</span>
   *   <span>Drink name</span>
   *   <span>price</span>
   * </li>
   */
  _renderListRowItem = (drink) => {
    const listGroupItem = document.createElement("li");
    listGroupItem.id = `drink-${drink.id}`;
    listGroupItem.className = "list-group-item";

    const deleteBtn = document.createElement("button");
    const deleteBtnTxt = document.createTextNode("X");
    deleteBtn.id = "delete-btn";
    deleteBtn.className = "btn btn-secondary";
    deleteBtn.addEventListener("click", this._deleteEventHandler(drink.id));
    deleteBtn.appendChild(deleteBtnTxt);

    const drinkIdSpan = document.createElement("span");
    const drinkId = document.createTextNode(drink.id);
    drinkIdSpan.appendChild(drinkId);

    const drinkNameSpan = document.createElement("span");
    const drinkName = document.createTextNode(drink.name);
    drinkNameSpan.appendChild(drinkName);

    const drinkPriceSpan = document.createElement("span");
    const drinkPrice = document.createTextNode(drink.price);
    drinkPriceSpan.append(drinkPrice);

    // add list item's details
    listGroupItem.append(deleteBtn);
    listGroupItem.append(drinkIdSpan);
    listGroupItem.append(drinkNameSpan);
    listGroupItem.append(drinkPriceSpan);

    return listGroupItem;
  };

  /**
   * DOM renderer for assembling the list items then mounting them to a parent node.
   */
  _renderList = () => {
    // get the "Loading..." text node from parent element
    const drinksDiv = document.getElementById("drinks");
    const loadingDiv = drinksDiv.childNodes[0];
    const fragment = document.createDocumentFragment();
    const ul = document.createElement("ul");
    ul.id = "drinks-list";
    ul.className = "list-group list-group-flush checked-list-box";

    this.drinks.map((drink) => {
      const listGroupRowItem = this._renderListRowItem(drink);

      // add entire list item
      ul.appendChild(listGroupRowItem);
    });

    fragment.appendChild(ul);
    drinksDiv.replaceChild(fragment, loadingDiv);
  };

  /**
   * DOM renderer for displaying a default message when a user has an empty list.
   */
  _renderMsg = () => {
    const drinksDiv = document.getElementById("drinks");
    const loadingDiv = drinksDiv.childNodes[0];
    const listParent = document.getElementById("drinks-list");
    const msgDiv = this._createMsgElement("Create new drinks!");

    if (drinksDiv) {
      drinksDiv.replaceChild(msgDiv, loadingDiv);
    } else {
      drinksDiv.replaceChild(msgDiv, listParent);
    }
  };

  /**
   * Pure function for adding a drink.
   *
   * @param {Object} newDrink - form's values as an object
   */
  addDrink = async (newDrink) => {
    try {
      // const { id, name, price } = newDrink;
      // console.log(newDrink);
      await this.todoService.addDrink(newDrink);
      await this.render();
    } catch (err) {
      console.error("Error adding order:", err);
      alert("Unable to add drink. Please try again later.");
    }
  };

  /**
   * DOM Event handler helper for adding a drink to the DOM.
   *
   * @param {number} drinkId - id of the drink to delete
   */
  _addDrinkEventHandler = () => {
    const drinkName = document.getElementById("formInputDrinkName").value;
    const drinkPrice = document.getElementById("formPrice").value;

    // validation checks
    if (!drinkName) {
      alert("Please enter a drink name.");
      return;
    }

    const drink = { name: drinkName, price: drinkPrice };
    const { newDrink, newDrinkEl } = this._createNewDrinkEl(drink); // add drink to list

    this.addDrink(newDrink);

    const listParent = document.getElementById("drinks-list");

    if (listParent) {
      listParent.appendChild(newDrinkEl);
    } else {
      this._renderList();
    }
    // Clear form text inputs
    document.getElementById("formInputDrinkName").value = "";
    document.getElementById("formPrice").value = "";
  };

  /**
   * Create the DOM element for the new drink with all its parts.
   *
   * @param {Object} drink - { drinkName, drinkPrice } partial status object
   */
  _createNewDrinkEl = (drink) => {
    const drink_id = this.drinks.length;
    const newDrink = { ...drink, drink_id };
    const newDrinkEl = this._renderListRowItem(newDrink);

    return { newDrink, newDrinkEl };
  };

  /**
   * Pure function for deleting a drink.
   *
   * @param {number} drinkId - id for the drink to be deleted
   */
  deleteDrink = async (drinkId) => {
    try {
      const res = await this.todoService.deleteDrink(drinkId);
      this.drinks = this.drinks.filter((drink) => drink.id !== drinkId);

      if (res !== null) {
        alert("Drink deleted successfully!");
      }
      return res;
    } catch (err) {
      alert("Unable to delete drink. Please try again later.");
    }
  };

  /**
   * DOM Event handler helper for deleting a drink from the DOM.
   * This relies on a pre-existing in the list of drinks.
   *
   * @param {number} drinkId - id of the drink to delete
   */
  _deleteEventHandler = (drinkId) => () => {
    const drink = document.getElementById(`drink-${drinkId}`);
    drink.remove();

    this.deleteDrink(drinkId).then(() => {
      if (!this.drinks.length) {
        this._renderMsg();
      }
    });
  };

  /**
   * Creates a message div block.
   *
   * @param {string} msg - custom message to display
   */
  _createMsgElement = (msg) => {
    const msgDiv = document.createElement("div");
    const text = document.createTextNode(msg);
    msgDiv.id = "user-message";
    msgDiv.className = "center";
    msgDiv.appendChild(text);

    return msgDiv;
  };

  render = async () => {
    const drinks = await this.todoService.getDrinks();

    try {
      if (drinks.length) {
        this.drinks = drinks;
        this._renderList();
      } else {
        this._renderMsg();
      }
    } catch (err) {
      alert(`Error: ${err.message}`);
    }
  };
}

const todoDrinks = new ToDoDrinks(todoService);
