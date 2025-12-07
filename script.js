const content = document.getElementById("content");
document.getElementById("home").onclick = () => location.reload();
document.getElementById("catalog").onclick = loadCategories;

function loadCategories() {
    fetch("data/categories.json")
        .then(r => r.json())
        .then(data => {
            let html = `<h2>Каталог</h2><ul>`;
            data.categories.forEach(cat => {
                html += `<li><a onclick="loadCategory('${cat.shortname}')">${cat.name}</a></li>`;
            });
            html += `</ul><a onclick="loadRandom()">Specials (випадкова категорія)</a>`;
            content.innerHTML = html;
        });
}

function loadCategory(shortname) {
    fetch(`data/${shortname}.json`)
        .then(r => r.json())
        .then(data => {
            let html = `<h2>${data.categoryName}</h2><div class="grid">`;
            data.items.forEach(item => {
                html += `
                    <div class="item">
                        <img src="${item.img}">
                        <h3>${item.name}</h3>
                        <p>${item.description}</p>
                        <b>${item.price}</b>
                    </div>`;
            });
            html += `</div>`;
            content.innerHTML = html;
        });
}

function loadRandom() {
    fetch("data/categories.json")
        .then(r => r.json())
        .then(data => {
            let random = data.categories[Math.floor(Math.random() * data.categories.length)];
            loadCategory(random.shortname);
        });
}
