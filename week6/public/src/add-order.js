/**
 * AJAX add new tasks to task list on save.
 */
const doAddOrder = async (e) => {
  e.preventDefault();

  const orderItem = document.getElementById("formOrderItem");
  const order_item = orderItem.value;
  const orderQuantity = document.getElementById("formQuantity");
  const order_quantity = orderQuantity.value;

  // what happens to the total that needs to be calculated by the server?

  if (!order_item) {
    alert("Please enter an order item.");
    return;
  }

  const res = await addTask({ order_item, order_quantity });

  if (res !== null) {
    inst.generateOrders();
  }
  orderItem.value = "";
};
