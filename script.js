const contentEl = document.getElementById("main-content");
const homeLink = document.getElementById("home-link");
const catalogLink = document.getElementById("catalog-link");

homeLink.addEventListener("click", () => {
  contentEl.innerHTML = `
    <h1>Лабораторна робота №5</h1>
    <p>
      Натисни <strong>«Каталог»</strong>, щоб завантажити перелік категорій
      товарів без перезавантаження сторінки.
    </p>
  `;
});

catalogLink.addEventListener("click", loadCategories);

function loadCategories() {
  fetch("data/categories.json")
    .then((res) => res.json())
    .then((data) => {
  
      let html = `<h2>Каталог</h2>`;
      html += `<div class="category-list"><ul>`;

      data.categories.forEach((cat) => {
        html += `
          <li>
            <a onclick="loadCategory('${cat.shortname}')">
              ${cat.name}
            </a>
          </li>
        `;
      });

      html += `</ul>`;

      html += `
        <div>
          <a class="special-link" onclick="loadRandomCategory()">
            Specials – випадкова категорія
          </a>
        </div>
      </div>
      `;

      contentEl.innerHTML = html;
    })
    .catch((err) => {
      contentEl.innerHTML = `<p>Помилка завантаження категорій: ${err}</p>`;
    });
}

function loadCategory(shortname) {
  fetch(`data/${shortname}.json`)
    .then((res) => res.json())
    .then((data) => {
      let html = `<h2>${data.categoryName}</h2>`;

      html += `<div class="grid">`;

      data.items.forEach((item) => {
        html += `
          <div class="item">
            <img src="${item.img}" alt="${item.name}">
            <h3>${item.name}</h3>
            <p>${item.description}</p>
            <b>${item.price}</b>
          </div>
        `;
      });

      html += `</div>`;

      contentEl.innerHTML = html;
    })
    .catch((err) => {
      contentEl.innerHTML = `<p>Помилка завантаження категорії: ${err}</p>`;
    });
}

function loadRandomCategory() {
  fetch("data/categories.json")
    .then((res) => res.json())
    .then((data) => {
      const cats = data.categories;
      const randomIndex = Math.floor(Math.random() * cats.length);
      const randomCategory = cats[randomIndex];
      loadCategory(randomCategory.shortname);
    })
    .catch((err) => {
      contentEl.innerHTML = `<p>Помилка завантаження specials: ${err}</p>`;
    });
}

window.loadCategory = loadCategory;
window.loadRandomCategory = loadRandomCategory;
