/**
 * @class ToDo
 *
 * Creates a list of orders and updates a list
 */

class ToDoOrders {
  orders = [];
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
   *   <button class="btn btn-secondary" onclick="deleteOrder(e, index)">X</button>
   *   <span>Order item</span>
   *   <span>quantity</span>
   *   <span>total price</span>
   *   <span>date create</span>
   * </li>
   */
  _renderListRowItem = (order) => {
    const listGroupItem = document.createElement("li");
    listGroupItem.id = `order-${order.id}`;
    listGroupItem.className = "list-group-item";

    const deleteBtn = document.createElement("button");
    const deleteBtnTxt = document.createTextNode("X");
    deleteBtn.id = "delete-btn";
    deleteBtn.className = "btn btn-secondary";
    deleteBtn.addEventListener("click", this._deleteEventHandler(order.id));
    deleteBtn.appendChild(deleteBtnTxt);

    const orderItemSpan = document.createElement("span");
    const orderItem = document.createTextNode(order.drink_id);
    orderItemSpan.appendChild(orderItem);

    const orderQuantitySpan = document.createElement("span");
    const orderQuantity = document.createTextNode(order.quantity);
    orderQuantitySpan.append(orderQuantity);

    const orderTotalSpan = document.createElement("span");
    const orderTotal = document.createTextNode(order.total_price);
    orderTotalSpan.append(orderTotal);

    const orderDateSpan = document.createElement("span");
    const orderDate = document.createTextNode(order.created_at);
    orderDateSpan.append(orderDate);

    listGroupItem.append(deleteBtn);
    listGroupItem.append(orderItemSpan);
    listGroupItem.append(orderQuantitySpan);
    listGroupItem.append(orderTotalSpan);
    listGroupItem.append(orderDateSpan);

    return listGroupItem;
  };

  /**
   * DOM renderer for assembling the list items then mounting them to a parent node.
   */
  _renderList = () => {
    // get the "Loading..." text node from parent element
    const ordersDiv = document.getElementById("orders");
    const loadingDiv = ordersDiv.childNodes[0];
    const fragment = document.createDocumentFragment();
    const ul = document.createElement("ul");
    ul.id = "orders-list";
    ul.className = "list-group list-group-flush checked-list-box";

    this.orders.map((order) => {
      const listGroupRowItem = this._renderListRowItem(order);

      // add entire list item
      ul.appendChild(listGroupRowItem);
    });

    fragment.appendChild(ul);
    ordersDiv.replaceChild(fragment, loadingDiv);
  };

  /**
   * DOM renderer for displaying a default message when a user has an empty list.
   */
  _renderMsg = () => {
    const ordersDiv = document.getElementById("orders");
    const loadingDiv = ordersDiv.childNodes[0];
    const listParent = document.getElementById("orders-list");
    const msgDiv = this._createMsgElement("Create new orders!");

    if (ordersDiv) {
      ordersDiv.replaceChild(msgDiv, loadingDiv);
    } else {
      ordersDiv.replaceChild(msgDiv, listParent);
    }
  };

  /**
   * Pure function for adding an order.
   *
   * @param {Object} newOrder - form's values as an object
   */
  addOrder = async (newOrder) => {
    try {
      await this.todoService.addOrder(newOrder);

      await this.render(); //refresh order list. had to refresh manually to see values
    } catch (err) {
      console.error("Error adding order:", err);
      alert("Unable to add order. Please try again later.");
    }
  };

  /**
   * DOM Event handler helper for adding an order to the DOM.
   *
   * @param {number} orderId - id of the order to delete
   */
  _addOrderEventHandler = () => {
    const order_item = document.getElementById("formOrderItem").value;
    const order_quantity = document.getElementById("formQuantity").value;

    // validation checks
    if (!order_item) {
      alert("Please enter an order item.");
      return;
    }

    const order = { drink_id: order_item, quantity: order_quantity }; // assemble the new order parts
    const { newOrder, newOrderEl } = this._createNewOrderEl(order); // add order to list

    this.addOrder(newOrder);

    const listParent = document.getElementById("orders-list");

    if (listParent) {
      listParent.appendChild(newOrderEl);
    } else {
      this._renderList();
    }
    document.getElementById("formOrderItem").value = ""; // clear form text input. Might have to just declare order_item = "";
  };

  /**
   * Create the DOM element for the new order with all its parts.
   *
   * @param {Object} order - { drink_id, quantity } partial status object
   */
  _createNewOrderEl = (order) => {
    const order_id = this.orders.length;
    const created_date = new Date().toISOString();
    const newOrder = { ...order, order_id, created_date };
    const newOrderEl = this._renderListRowItem(newOrder);

    return { newOrder, newOrderEl };
  };

  /**
   * Pure function for deleting an order.
   *
   * @param {number} orderId - id for the order to be deleted
   */
  deleteOrder = async (orderId) => {
    try {
      const res = await this.todoService.deleteOrder(orderId);
      this.orders = this.orders.filter((order) => order.id !== orderId);

      if (res !== null) {
        alert("Order deleted successfully!");
      }
      return res;
    } catch (err) {
      alert("Unable to delete order. Please try again later.");
    }
  };

  /**
   * DOM Event handler helper for deleting an order from the DOM.
   * This relies on a pre-existing in the list of orders.
   *
   * @param {number} orderId - id of the order to delete
   */
  _deleteEventHandler = (orderId) => () => {
    const order = document.getElementById(`order-${orderId}`);
    order.remove();

    this.deleteOrder(orderId).then(() => {
      if (!this.orders.length) {
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
    const orders = await this.todoService.getOrders();

    try {
      if (orders.length) {
        this.orders = orders;
        this._renderList();
      } else {
        this._renderMsg();
      }
    } catch (err) {
      alert(`Error: ${err.message}`);
    }
  };
}

const todoOrders = new ToDoOrders(todoService);
