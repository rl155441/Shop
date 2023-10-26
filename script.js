class Artikel {
    constructor(id, bezeichnung, beschreibung, preis) {
        this.id = id;
        this.bezeichnung = bezeichnung;
        this.beschreibung = beschreibung;
        this.preis = preis;
    }
}

// Überprüfen, ob der Local Storage leer ist
if (localStorage.getItem('Produkte') === null) {
    // Wenn leer, erstelle drei Lebensmittelartikel und speichere sie im Local Storage
    const produkt1 = new Artikel(1, 'Produkt 1', 'Beschreibung 1', 10.99);
    const produkt2 = new Artikel(2, 'Produkt 2', 'Beschreibung 2', 15.49);
    const produkt3 = new Artikel(3, 'Produkt 3', 'Beschreibung 3', 7.99);

    const produkte = [produkt1, produkt2, produkt3];

    // Produkte im Local Storage speichern
    localStorage.setItem('Produkte', JSON.stringify(produkte));
}

// Produkte aus dem Local Storage abrufen
const produkteAusLocalStorage = JSON.parse(localStorage.getItem('Produkte'));

// Container für die Produktanzeige
const productContainer = document.getElementById('product-container');

// Produkte auf der Webseite anzeigen
produkteAusLocalStorage.forEach(produkt => {
    const productCard = document.createElement('div');
    productCard.classList.add('product-card');
    productCard.innerHTML = `
        <h2>${produkt.bezeichnung}</h2>
        <p>${produkt.beschreibung}</p>
        <p>Preis: $${produkt.preis.toFixed(2)}</p>
        <p><button class="add-to-cart-button" id=btn${produkt.id}>In den Warenkorb</button></p>
    `;
    productContainer.appendChild(productCard);
});

// Einkaufswagen

const cartButton = document.getElementById('cart');
const cartDropdown = document.getElementById('cart-dropdown');
const cartCount = document.getElementById('cart-count');
const cartItems = document.getElementById('cart-items');

// Warenkorb anzeigen oder ausblenden, wenn auf das Cart-Element geklickt wird
cartButton.addEventListener('click', function() {
    if (cartDropdown.style.display === 'block') {
        cartDropdown.style.display = 'none';
    } else {
        cartDropdown.style.display = 'block';
    }
});

// Artikel in den Warenkorb legen
const addToCartButtons = document.querySelectorAll('.add-to-cart-button');
let itemCount = 0;

addToCartButtons.forEach(button => {
    button.addEventListener('click', function() {
        itemCount++;
        cartCount.textContent = itemCount;

        const productInfo = button.parentElement.textContent;
        const cartItem = document.createElement('li');
        cartItem.textContent = productInfo;
        cartItems.appendChild(cartItem);
    });
});