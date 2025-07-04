const products = [
    {
        name: "Camiseta Roja",
        price: 19.99,
        image: "img/camisa_roja.jpg"
    },
    {
        name: "Zapatos Negros",
        price: 49.99,
        image: "img/zapatos_negros.jpg"
    },
    {
        name: "Gorra Azul",
        price: 14.99,
        image: "img/gorra_azul.jpeg"
    },
    {
        name: "Pantalón Jeans",
        price: 34.99,
        image: "img/pantalon_jean.jpg"
    },
    {
        name: "Mochila Negra",
        price: 59.99,
        image: "img/mochila_negra.jpg"
    },
    {
        name: "Gafas de Sol",
        price: 22.50,
        image: "img/gafas_de_sol.jpeg"
    },
    {
        name: "Camisa Blanca",
        price: 25.99,
        image: "img/camisa_blanca.jpg"
    },
    {
        name: "Reloj Deportivo",
        price: 89.90,
        image: "img/reloj_hombre.jpeg"
    }
];

const container = document.getElementById('product-list');
const cartList = document.getElementById('cart');
const payButton = document.getElementById('payButton');
const cart = [];

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

payButton.addEventListener('click', () => {
    if (cart.length === 0) {
        alert("El carrito está vacío");
        return;
    }

    const total = cart.reduce((sum, item) => sum + item.price, 0);
    const totalCentavos = Math.round(total * 100); // Total en centavos
    const baseSinIVA = Math.round(totalCentavos / 1.12); // 12% IVA
    const iva = totalCentavos - baseSinIVA;

    console.log("Total:", totalCentavos, "Base sin IVA:", baseSinIVA, "IVA:", iva);

    PayPhone.Button({
        token: "CypQXFuXTyI-suQGu6tJIKjnv5mM64yMRws47kEuLpWYZ2Btib7yeKC1X4ZRELv4y_iBNIAdTuqeRn-9WXN8G5XTiDtsnODT7Zxtm66Z3n6I5BiEYZvZn-J7FSrhxzIaK3Xkql_eIuj_bV12paihMQpxV_v5T0VUVumXgVl6Lwbrnf4gyQ4vYeBkTMF40FO0aCeyoVROiBToOABKFpyZ4HbuqexW9JqbVsG2zbkZV8Fcwt2pG_58D9s-HtezMn9uUphmhz94RMppA3OxhSO5AWPJs5M0QKFUgXI2z4YagYHZSoCblr0T-LTHFfR2p0z-dHS6DMwdtKgDcmPEWEniYt5sFg0",
        btnText: "Pagar Ahora",
        amount: totalCentavos,
        amountWithoutTax: baseSinIVA,
        tax: iva,
        clientTransactionId: "pedido_" + Date.now(),
        callback: function(response) {
            console.log("Respuesta PayPhone:", response);
            alert("Pago procesado correctamente. Ver consola para más detalles.");
        }
    });
});
