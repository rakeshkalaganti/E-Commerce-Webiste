// Basic interactive behaviors for the demo clone (improved & robust)

document.addEventListener("DOMContentLoaded", function () {
  // search suggestions demo (robust)
  const searchInput = document.getElementById("searchInput");
  const suggestionsBox = document.getElementById("searchSuggestions");
  const searchBtn = document.getElementById("searchBtn");

  const sample = [
    "iPhone 15",
    "Samsung Galaxy",
    "Men's Shoes",
    "Bluetooth Earphones",
    "LED TV 32 inch",
    "Air Conditioner 1.5 Ton",
    "Laptop Dell",
    "Nike Shoes",
    "Earbuds",
    "Smartwatch",
  ];

  function showSuggestions(list) {
    if (!suggestionsBox) return;
    if (!list || list.length === 0) {
      suggestionsBox.innerHTML =
        '<div class="px-2 py-1 text-muted">No suggestions</div>';
      suggestionsBox.style.display = "block";
      return;
    }
    suggestionsBox.innerHTML = list
      .map((m) => `<div class="px-2 py-1 suggestion-item">${m}</div>`)
      .join("");
    suggestionsBox.style.display = "block";
  }

  if (searchInput && suggestionsBox) {
    searchInput.addEventListener("input", () => {
      const q = searchInput.value.trim().toLowerCase();
      if (!q) {
        suggestionsBox.style.display = "none";
        suggestionsBox.innerHTML = "";
        return;
      }
      const matches = sample
        .filter((s) => s.toLowerCase().includes(q))
        .slice(0, 7);
      showSuggestions(matches);
    });

    // delegated click for suggestions
    suggestionsBox.addEventListener("click", (e) => {
      const t = e.target.closest(".suggestion-item");
      if (t) {
        searchInput.value = t.textContent;
        suggestionsBox.style.display = "none";
        searchInput.focus();
      }
    });

    // hide on outside click (guard for nulls)
    document.addEventListener("click", (e) => {
      const target = e.target;
      if (!target) return;
      // if click is outside searchInput and outside suggestionsBox, hide suggestions
      if (
        !(
          searchInput === target ||
          searchInput.contains(target) ||
          suggestionsBox === target ||
          suggestionsBox.contains(target)
        )
      ) {
        suggestionsBox.style.display = "none";
      }
    });

    // optional: search button triggers simple console log
    if (searchBtn) {
      searchBtn.addEventListener("click", () => {
        console.log("Search for:", searchInput.value);
        suggestionsBox.style.display = "none";
      });
    }
  }

  // Add-to-cart demo (works for dynamically added items too)
  function addCartHandler(btn) {
    btn.addEventListener("click", (e) => {
      const card =
        e.target.closest(".product-card") || e.target.closest("button");
      const title = card
        ? card.querySelector(".product-title")
          ? card.querySelector(".product-title").innerText
          : "Product"
        : "Product";
      // UI feedback
      btn.classList.add("btn-success");
      btn.innerHTML = '<i class="fa fa-check"></i>';
      setTimeout(() => {
        btn.classList.remove("btn-success");
        btn.innerHTML = '<i class="fa fa-shopping-cart"></i>';
      }, 1000);
      console.log("Added to cart:", title);
    });
  }

  document.querySelectorAll(".add-cart").forEach((btn) => addCartHandler(btn));

  // Load more demo - duplicates existing products
  const loadMore = document.getElementById("loadMore");
  if (loadMore) {
    loadMore.addEventListener("click", () => {
      const row = document.getElementById("productsRow");
      for (let i = 0; i < 4; i++) {
        const col = document.createElement("div");
        col.className = "col-6 col-md-4 col-lg-3 mb-4";
        const seed = Math.floor(Math.random() * 1000);
        col.innerHTML = `
          <div class="card product-card h-100">
            <img src="https://picsum.photos/seed/load${seed}/400/300"
                 onerror="this.onerror=null;this.src='https://via.placeholder.com/400x300?text=Product';"
                 class="card-img-top" alt="new" loading="lazy">
            <div class="card-body d-flex flex-column">
              <h6 class="product-title">New Product</h6>
              <p class="small text-muted mb-1">Brand • Feature</p>
              <div class="mt-auto d-flex justify-content-between align-items-center">
                <div>
                  <div class="price">₹999</div>
                  <div class="small text-success">5% off</div>
                </div>
                <button class="btn btn-sm btn-primary add-cart" type="button"><i class="fa fa-shopping-cart"></i></button>
              </div>
            </div>
          </div>
        `;
        row.appendChild(col);
        // attach handler to the new button
        const newBtn = col.querySelector(".add-cart");
        if (newBtn) addCartHandler(newBtn);
      }
    });
  }
});