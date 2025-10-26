async function loadProducts() {
  try {
    const response = await fetch(jsonPath);
    const products = await response.json();
    renderProducts(products);

    const sortSelect = document.getElementById("filter-sort");
    if (sortSelect) {
      sortSelect.addEventListener("change", () => {
        const sorted = sortProducts([...products], sortSelect.value);
        renderProducts(sorted);
      });
    }
  } catch (error) {
    console.error("Помилка завантаження JSON:", error);
  }
}

function sortProducts(products, sortType) {
  switch (sortType) {
    case "price-asc": return products.sort((a, b) => a.price - b.price);
    case "price-desc": return products.sort((a, b) => b.price - a.price);
    case "name-asc": return products.sort((a, b) => a.name.localeCompare(b.name, "uk"));
    case "name-desc": return products.sort((a, b) => b.name.localeCompare(a.name, "uk"));
    default: return products;
  }
}

function renderProducts(products) {
  const container = document.getElementById("product-list");
  container.innerHTML = "";

  products.forEach(p => {
    const card = document.createElement("div");
    card.className = "product-card";
    card.innerHTML = `
      <img src="${p.image}" alt="${p.name}">
      <h3>${p.name}</h3>
      <p class="price">${p.price.toLocaleString("uk-UA")} ₴</p>
      <button class="details-btn" data-id="${p.id}">Детальніше</button>
    `;
    container.appendChild(card);
  });

  // кнопки "Детальніше"
  document.querySelectorAll(".details-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const productId = btn.dataset.id;
      const product = products.find(p => p.id === productId);
      if (product) openModal(product);
    });
  });
}

// --- модальне вікно ---
function openModal(product) {
  const modal = document.getElementById("product-modal");
  const modalContent = modal.querySelector(".modal-content");

  modalContent.innerHTML = `
    <span class="close">&times;</span>
    <img src="${product.image}" alt="${product.name}">
    <h2>${product.name}</h2>
    <p class="price">${product.price.toLocaleString("uk-UA")} ₴</p>
    <p>${product.description}</p>
    <p><strong>Теги:</strong> ${product.tags.join(", ")}</p>
  `;

  modal.style.display = "block";

  modal.querySelector(".close").onclick = () => modal.style.display = "none";
  window.onclick = (e) => { if (e.target === modal) modal.style.display = "none"; };
}

loadProducts();