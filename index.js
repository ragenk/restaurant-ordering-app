import menuArray from "/data.js";

const orderArray = [];
const modal = document.getElementById("modal");
const orderSection = document.getElementById("order-section");
const paymentForm = document.getElementById("payment-form");

paymentForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const paymentFormData = new FormData(paymentForm);
  const fullName = paymentFormData.get("fullName");

  orderSection.innerHTML = `    
    <div class="complete-order-container order-complete-bg">
        <p class="order-complete-msg">Thanks, ${fullName}! Your order is on its way!</p>
    </div>`;

  clearCart(orderArray);
  closeModal();
});

orderSection.addEventListener("click", function (e) {
  if (e.target.id === "complete-order-btn") {
    modal.style.display = "inline";
  }
});

document.addEventListener("click", function (e) {
  if (e.target.dataset.id) {
    handleOrders(e.target.dataset.id);
  }

  if (e.target.dataset.remove) {
    removeItem(e.target.dataset.remove);
  }

  if (e.target.id === "modal") {
    closeModal();
  }
});

function closeModal() {
  modal.style.display = "none";
}

function clearCart(arr) {
  arr.length = 0;
}

function getMenuItems() {
  let menuHtml = "";

  menuArray.forEach((menuItem) => {
    menuHtml += `
      <div class="menu-item">
          <div class="item-image">
              <p>${menuItem.emoji}</p>
          </div>
          <div class="item-details">
              <h3>${menuItem.name}</h3>
              <p class="item-ingredients">${menuItem.ingredients.join(", ")}</p>
              <p class="item-price">$${menuItem.price}</p>
          </div>
          <div class="item-btn">
              <i class="fa-solid fa-plus" data-id="${menuItem.id}"></i>
          </div>
      </div>      
      <hr>
      `;
  });

  return menuHtml;
}

function renderMenuItems() {
  document.getElementById("menu-section").innerHTML = getMenuItems();
}

renderMenuItems();

function handleOrders(itemId) {
  const selectedItem = menuArray.find(
    (addedItem) => addedItem.id === parseInt(itemId)
  );

  if (selectedItem) {
    orderArray.push(selectedItem);
    renderOrderSection();
  }
}

function removeItem(itemId) {
  const index = orderArray.findIndex(
    (orderedItem) => orderedItem.id === parseInt(itemId)
  );

  if (index !== -1) {
    orderArray.splice(index, 1);
    renderOrderSection();
  }
}

function getOrder() {
  const totalPrice = orderArray.reduce((acc, item) => acc + item.price, 0);
  let orderHtml = `<div class="order-title"><h3>Your order</h3></div>`;

  orderArray.forEach((orderedItem) => {
    orderHtml += `
    <div class="order-container">
      <h3>${orderedItem.name} <span class="remove-btn" data-remove="${orderedItem.id}">remove</span></h3>
      <p class="item-price">$${orderedItem.price}</p>
    </div>
    `;
  });

  orderHtml += `
    <hr>
    <div class="order-container">
      <h3>Total price:</h3>
      <p class="item-price">$${totalPrice}</p>
    </div>
    <div class="complete-order-container">
      <button id="complete-order-btn" class="complete-order-btn">Complete order</button>
    </div>`;

  if (orderArray.length === 0) {
    orderHtml = "";
  }

  return orderHtml;
}

function renderOrderSection() {
  orderSection.innerHTML = getOrder();
}
