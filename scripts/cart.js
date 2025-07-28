document.addEventListener("DOMContentLoaded", () => {
  const cartContainer = document.getElementById("cartContainer");
  const totalPriceElement = document.getElementById("totalPrice");
  const placeOrderBtn = document.getElementById("placeOrderBtn");

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  // 🟢 Attach listener only once
  placeOrderBtn.addEventListener("click", placeOrder);

  function updateCartUI() {
    cartContainer.innerHTML = "";
    let total = 0;

    if (cart.length === 0) {
      cartContainer.innerHTML = "<p>Your cart is empty.</p>";
      totalPriceElement.innerText = "Total: ₹0";
      return;
    }

    cart.forEach((item, index) => {
      const itemTotal = item.price * item.quantity;
      total += itemTotal;

      const div = document.createElement("div");
      div.className = "cart-item";
      div.innerHTML = `
        <span style="font-weight: bold; margin-right: 10px;">${index + 1}.</span>
        <img src="${item.image}" alt="${item.name}" width="80">
        <div style="flex: 1; margin-left: 15px;">
          <h3>${item.name}</h3>
          <p>Price: ₹${item.price}</p>
          <div style="display: flex; align-items: center; gap: 10px;">
            <button class="qty-btn" data-action="decrease" data-index="${index}">−</button>
            <span>${item.quantity}</span>
            <button class="qty-btn" data-action="increase" data-index="${index}">+</button>
            <button class="remove-btn" data-index="${index}">🗑️ Remove</button>
          </div>
          <p>Total: ₹${itemTotal}</p>
        </div>
      `;
      cartContainer.appendChild(div);
    });

    totalPriceElement.innerText = `Total: ₹${total}`;
    attachEventListeners();
  }

  function placeOrder() {
    if (cart.length === 0) {
      alert("Your cart is empty. Please add some items before placing an order.");
      return;
    }

    alert("🎉 Order placed successfully!");
    cart = [];
    localStorage.setItem("cart", JSON.stringify(cart));
    location.reload(); // Refresh the page
  }

  function attachEventListeners() {
    document.querySelectorAll(".qty-btn").forEach(btn => {
      btn.addEventListener("click", e => {
        const index = e.target.getAttribute("data-index");
        const action = e.target.getAttribute("data-action");

        if (action === "increase") {
          cart[index].quantity++;
        } else if (action === "decrease" && cart[index].quantity > 1) {
          cart[index].quantity--;
        }

        localStorage.setItem("cart", JSON.stringify(cart));
        updateCartUI();
      });
    });

    document.querySelectorAll(".remove-btn").forEach(btn => {
      btn.addEventListener("click", e => {
        const index = e.target.getAttribute("data-index");
        cart.splice(index, 1);
        localStorage.setItem("cart", JSON.stringify(cart));
        updateCartUI();
      });
    });
  }

  // Add "Clear Cart" button
  const clearBtn = document.createElement("button");
  clearBtn.innerText = "Clear Cart";
  clearBtn.className = "clear-btn";
  clearBtn.style.margin = "20px auto";
  clearBtn.style.display = "block";
  clearBtn.addEventListener("click", () => {
    if (confirm("Are you sure you want to clear the cart?")) {
      cart = [];
      localStorage.setItem("cart", JSON.stringify(cart));
      updateCartUI();
    }
  });
  document.body.appendChild(clearBtn);

  updateCartUI();
});
