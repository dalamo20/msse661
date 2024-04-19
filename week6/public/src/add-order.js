const doAddOrder = async (e) => {
  e.preventDefault();

  const orderItem = document.getElementById("formOrderItem");
  const order_item = orderItem.value;
  const orderQuantity = document.getElementById("formQuantity");
  const order_quantity = orderQuantity.value;

  if (!order_item || !order_quantity) {
    alert("Please enter both item number and quantity.");
    return;
  }

  const formData = {
    drink_id: order_item,
    quantity: order_quantity,
  };

  const res = await addOrder(formData);

  if (res !== null) {
    inst.generateOrders();
  } else {
    console.log("Error adding order.");
  }
  // orderItem.value = "";
};
