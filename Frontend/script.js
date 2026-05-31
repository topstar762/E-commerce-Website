async function loadProducts() {
  const res = await fetch(`${API_URL}/products`);
  const products = await res.json();

  document.getElementById("products").innerHTML = products
    .map(
      (p) => `
      <div class="card">
        <h3>${p.name}</h3>
        <p>${p.description || ""}</p>
        <h4>₹${p.price}</h4>
        <button onclick="addToCart('${p._id}','${p.name}',${p.price})">
          Add to Cart
        </button>
      </div>
    `
    )
    .join("");
}

function addToCart(id, name, price) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.push({ id, name, price });
  localStorage.setItem("cart", JSON.stringify(cart));
  alert("Added");
}

async function placeOrder() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const token = localStorage.getItem("token");

  const totalPrice = cart.reduce((a, b) => a + b.price, 0);

  await fetch(`${API_URL}/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      orderItems: cart.map((i) => ({
        product: i.id,
        quantity: 1,
      })),
      totalPrice,
    }),
  });

  localStorage.removeItem("cart");
  alert("Order placed");
}