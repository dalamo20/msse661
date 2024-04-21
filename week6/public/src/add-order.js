const doAddOrder = async (event) => {
  event.preventDefault();

  const order_item = document.getElementById("formOrderItem").value;
  const order_quantity = document.getElementById("formQuantity").value;

  // if (!order_item || !order_quantity) {
  //   alert("Please enter both item number and quantity.");
  //   return;
  // }

  const formData = {
    drink_id: order_item,
    quantity: order_quantity,
  };

  const res = await addOrder(formData);

  if (res !== null) {
    instO.generateOrders();
  } else {
    console.log("Error adding order.");
  }
  // orderItem.value = "";
};
