/**
 * html structure
 *
 * @example
 * <ul class="orders-list">
 *  <li class="order-item">
 *    <div class="order-item-block">
 *      <span class="order-checkbox"><input type="checkbox"></span>
 *      <span class="order-name">Order number</span>
 *      <span class="order-status">quantity</span>
 *      <span class="order-date">total price</span>
 *    </div>
 *  </li>
 * </ul>
 */

// This is an IIFE (Immediately Invoked Function Expression).
// What it does is in the name.
(async () => {
  const orders = await getOrders();
  console.log(orders);

  if (orders.length) {
    const div = document.getElementById("orders");
    const loadingDiv = div.childNodes[1];

    const ul = document.createElement("ul");

    // replace 'loading...' with list
    div.replaceChild(ul, loadingDiv); // <- order is important here!

    // create the list
    orders.map((order) => {
      // building blocks
      const li = document.createElement("li");
      li.className = "order-item";
      const block = document.createElement("div");
      block.className = "order-item-block";

      //   content
      const checkboxSpan = document.createElement("span");
      const checkbox = document.createElement("input");
      checkbox.setAttribute("type", "checkbox");
      checkboxSpan.className = "order-checkbox";
      checkboxSpan.appendChild(checkbox);

      const itemSpan = document.createElement("span");
      itemSpan.className = "order-item";
      itemSpan.innerText = order.item;

      const quantitySpan = document.createElement("span");
      quantitySpan.className = "order-quantity";
      quantitySpan.innerText = order.quantity;

      const totalSpan = document.createElement("span");
      totalSpan.className = "total-price";
      totalSpan.innerText = order.totalPrice;

      // add list item
      block.appendChild(checkboxSpan);
      block.appendChild(itemSpan);
      block.appendChild(quantitySpan);
      block.appendChild(totalSpan);

      li.appendChild(block);
      ul.appendChild(li);
    });
  }
})();
