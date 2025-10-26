let currentCategory = "kitchens";
let products = [];

async function loadData() {
  currentCategory = document.getElementById("category").value;
  const res = await fetch(`../static/data/${currentCategory}.json`);
  products = await res.json();
  renderTable();
}

function renderTable() {
  const tbody = document.querySelector("#product-table tbody");
  tbody.innerHTML = "";
  products.forEach(p => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${p.id}</td>
      <td>${p.name}</td>
      <td>${p.price} ₴</td>
      <td><button onclick="deleteProduct('${p.id}')">Видалити</button></td>
    `;
    tbody.appendChild(tr);
  });
}

document.getElementById("add-form").addEventListener("submit", e => {
  e.preventDefault();
  const newProduct = {
    id: `${currentCategory}-${Date.now()}`,
    name: document.getElementById("name").value,
    price: parseInt(document.getElementById("price").value),
    image: document.getElementById("image").value,
    description: document.getElementById("description").value,
    tags: document.getElementById("tags").value.split(",").map(t => t.trim())
  };
  products.push(newProduct);
  renderTable();
  alert("Товар додано (але щоб зберегти у JSON — потрібен бекенд)");
});

function deleteProduct(id) {
  products = products.filter(p => p.id !== id);
  renderTable();
  alert("Товар видалено (але щоб зберегти у JSON — потрібен бекенд)");
}