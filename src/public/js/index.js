const socket = io()

let productList = document.getElementById("productList")

socket.on("newproduct", (products) => {
    let list = ""
    products.forEach((product) => {
        list = list +
        ` ${product.id}, ${product.title}, ${product.description}, ${product.code}, 
        ${product.price}, ${product.status}, ${product.stock}, ${product.categories} <br>
        `
    })
    productList.innerHTML = list
})


