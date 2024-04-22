/**
 * @class OrderList
 *
 * Creates a list of orders and updates a list
 */

class OrderList {
  orders = [];

  constructor() {}

  /**
   * Build order list parent.
   * Uses bootstrap classes with some custom overrides.
   */
  createOrderListParent = () => {
    const ul = document.createElement("ul");
    ul.id = "orders-list";
    ul.className = "list-group list-group-flush checked-list-box";
    return ul;
  };

  _deleteEventHandler = (orderId) => async () => {
    if (orderId) {
      const res = await deleteOrder(orderId);

      if (res !== null) {
        this.orders = this.orders.filter((order) => order.id !== orderId);
        const order = document.getElementById(`order-${orderId}`);
        order.remove();

        if (!this.orders.length) {
          const div = document.getElementById("orders");
          const loadingDiv = div.childNodes[1];
          const errDiv = this.generateErrorMsg("Create some new orders!");
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
   *   <button class="btn btn-secondary" onclick="deleteOrder(e, index)">X</button>
   *   <span>Order item</span>
   *   <span>quantity</span>
   *   <span>total price</span>
   *   <span>date create</span>
   * </li>
   */
  buildOrderListRowItem = (order) => {
    const listGroupItem = document.createElement("li");
    listGroupItem.id = `order-${order.id}`; // order-1
    listGroupItem.className = "list-group-item";

    const deleteBtn = document.createElement("button");
    const deleteBtnTxt = document.createTextNode("X");
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
   * Assembles the list items then mounts them to a parent node.
   * Uses bootstrap classes with some custom overrides.
   */
  buildOrdersList = (mount, orders) =>
    orders.map((order) => {
      const listGroupRowItem = this.buildOrderListRowItem(order);

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

  generateOrders = async () => {
    const res = await getOrders();
    const div = document.getElementById("orders");
    const loadingDiv = div.childNodes[1];

    if (res.length) {
      this.orders = res;
      const ordersDiv = this.createOrderListParent();
      this.buildOrdersList(ordersDiv, res);
      div.replaceChild(ordersDiv, loadingDiv);
    } else {
      const errDiv = this.generateErrorMsg(res.msg);
      div.replaceChild(errDiv, loadingDiv);
    }
  };
}

const instO = new OrderList();

// This is an IIFE (Immediately Invoked Function Expression).
(async () => {
  inst.generateOrders();
})();
