fetch('static/data/products.json')
  .then(res => res.json())
  .then(data => {
    const list = document.getElementById('product-list');
    const categoryFilter = document.getElementById('filter-category');
    const sortFilter = document.getElementById('filter-sort');

    function renderProducts(products) {
      list.innerHTML = '';
      products.forEach(p => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
          <img src="${p.image}" alt="${p.title}">
          <div class="product-info">
            <h3>${p.title}</h3>
            <p>${p.description}</p>
            <div class="price">від ${p.price} грн</div>
            <a href="product/${p.slug}.html" class="btn-accent">Детальніше</a>
          </div>
        `;
        list.appendChild(card);
      });
    }

    function applyFilters() {
      let filtered = [...data];
      const category = categoryFilter.value;
      const sort = sortFilter.value;

      if (category) {
        filtered = filtered.filter(p => p.category === category);
      }

      if (sort === 'price-asc') filtered.sort((a,b) => a.price - b.price);
      if (sort === 'price-desc') filtered.sort((a,b) => b.price - a.price);
      if (sort === 'name-asc') filtered.sort((a,b) => a.title.localeCompare(b.title));
      if (sort === 'name-desc') filtered.sort((a,b) => b.title.localeCompare(a.title));

      renderProducts(filtered);
    }

    categoryFilter.addEventListener('change', applyFilters);
    sortFilter.addEventListener('change', applyFilters);

    renderProducts(data);
  });