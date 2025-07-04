const products = [{
        name: "Camiseta Roja",
        price: 19.99,
        image: "img/camisa_roja.jpg"
    },
    {
        name: "Zapatos Negros",
        price: 49.99,
        image: "https://via.placeholder.com/200x150/333333/ffffff?text=Zapatos"
    },
    {
        name: "Gorra Azul",
        price: 14.99,
        image: "https://via.placeholder.com/200x150/008cba/ffffff?text=Gorra"
    },
    {
        name: "Pantalón Jeans",
        price: 34.99,
        image: "https://via.placeholder.com/200x150/444444/ffffff?text=Jeans"
    },
    {
        name: "Mochila Negra",
        price: 59.99,
        image: "https://via.placeholder.com/200x150/000000/ffffff?text=Mochila"
    },
    {
        name: "Gafas de Sol",
        price: 22.50,
        image: "https://via.placeholder.com/200x150/ffcc00/000000?text=Gafas"
    },
    {
        name: "Camisa Blanca",
        price: 25.99,
        image: "https://via.placeholder.com/200x150/ffffff/000000?text=Camisa"
    },
    {
        name: "Reloj Deportivo",
        price: 89.90,
        image: "https://via.placeholder.com/200x150/005f7a/ffffff?text=Reloj"
    }
];

const container = document.getElementById('product-list');
const cartList = document.getElementById('cart');
const payButton = document.getElementById('payButton');
const cart = [];

function updateCart() {
    cartList.innerHTML = "";
    cart.forEach((item, index) => {
        const li = document.createElement("li");
        li.innerHTML = `
            ${item.name} - $${item.price.toFixed(2)}
            <button onclick="removeFromCart(${index})" class="remove-btn">❌</button>
        `;
        cartList.appendChild(li);
    });
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCart();
}


// Mostrar productos
products.forEach(product => {
    const card = document.createElement('div');
    card.className = 'card';

    card.innerHTML = `
        <img src="${product.image}" alt="${product.name}">
        <h2>${product.name}</h2>
        <p>Precio: $${product.price.toFixed(2)}</p>
        <button>Añadir al carrito</button>
    `;

    const button = card.querySelector('button');
    button.addEventListener('click', () => {
        cart.push(product);
        updateCart();
    });

    container.appendChild(card);
});

// Botón de pago con PayPhone
payButton.addEventListener('click', () => {
    if (cart.length === 0) {
        alert("El carrito está vacío");
        return;
    }

    const total = cart.reduce((sum, item) => sum + item.price, 0);
    const totalCentavos = Math.round(total * 100);
    const baseSinIVA = Math.round(totalCentavos * 0.89);
    const iva = totalCentavos - baseSinIVA;

    PayPhone.Button({
        token: "TU_TOKEN_DE_COMERCIO_AQUÍ", // ← REEMPLAZA esto con tu token real
        btnText: "Pagar Ahora",
        amount: totalCentavos,
        amountWithoutTax: baseSinIVA,
        tax: iva,
        clientTransactionId: "pedido_" + Date.now(),
        callback: function(response) {
            console.log("Respuesta PayPhone:", response);
            alert("Pago procesado correctamente. Ver consola.");
        }
    });
});
