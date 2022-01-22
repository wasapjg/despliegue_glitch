const express = require("express")
const app = express()
const PORT = 8080
const Archivo = require("./contenedor")

const producto = new Archivo('./productos.txt')

app.get("/", (req, res, next) => {
    res.send(`<ul>
                <li>
                    <a href="/productos">Productos</a>
                </li>
                <li>
                    <a href="/productoRandom">Un Producto Random</a>
                </li>
              </ul>`)
})

app.get("/productos", (req, res, next) => {
    producto.getAll().then(respuesta => {
        res.json(respuesta)
    })
})

app.get("/productoRandom", (req, res, next) => {
    res.send(producto.getRandom())
})

const server = app.listen(PORT, ()=>{
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
})