import { servicesProducts } from "../services/product-services.js";

const productoContainer = document.querySelector("[data-producto]"); 
const form = document.querySelector("[data-form]");


function createcard(nombre, precio, imagen, id) {
    const card = document.createElement("div"); 
    card.classList.add("producto-item"); 
    card.innerHTML = `
        <img class="producto-imagen" src="${imagen}" alt="${nombre}"> <!-- Imagen del producto -->
        <p class="producto-descripcion">${nombre}</p> <!-- Nombre del producto -->
        <p class="producto-precio">$ ${precio}</p> <!-- Precio del producto -->
        
    `;

    const deleteButton = card.querySelector(".icono-borrar");
    deleteButton.addEventListener("click", () => {
        servicesProducts.deleteProduct(id)
            .then(() => {
                card.remove();
            })
            .catch(err => console.log(err));
    });

    productoContainer.appendChild(card);
    return card;

}



const render = async () => {
    try {
        const listProducts = await servicesProducts.productList();
        listProducts.forEach(productos => {
            productoContainer.appendChild(
                createcard(
                    productos.nombre,
                    productos.precio,
                    productos.imagen,
                    productos.id)
            );

        });
    } catch (error) {
        console.log(error);
    }
};

form.addEventListener("submit", (event) => {
    event.preventDefault();

    const nombre = document.querySelector("[data-nombre]").value;
    const precio = document.querySelector("[data-precio]").value;
    const imagen = document.querySelector("[data-imagen]").value;

    // Verificar si los campos no están vacíos
    if (nombre.trim() === '' || precio.trim() === '' || imagen.trim() === '') {
        alert('Por favor completar el formulario.');
        return;
    }

    servicesProducts
        .createProducts(nombre, precio, imagen)
        .then((res) => {
            console.log(res);
        })
        .catch((err) => console.log(err))
});


render();