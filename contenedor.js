
const fs = require('fs')

class Producto {
    constructor(title, price, thumbnail){
      this.title = title
      this.price = price
      this.thumbnail = thumbnail
    }
}  

module.exports = class Archivo {
  constructor(name){
    this.name = name
     
    try {
      this.productos = fs.readFileSync(this.name, 'utf-8')
      this.productos = JSON.parse(this.productos)
    } catch (error) {
      this.productos = []
    }
  }


  async getAll(){
    try {
      let archivo = await fs.promises.readFile(this.name, 'utf-8')
      console.log(JSON.parse(archivo))
      return JSON.parse(archivo)
    } catch(error) {
	return console.log(this.productos)
    }
  }

  getRandom(){
      return this.getById(Math.floor(Math.random() * this.productos.length) + 1)
  }

  getById(id){
    try {
      let producto = { id }
      for(let i = 0; i < this.productos.length; i++){
	if(producto.id == this.productos[i].id){
	  producto = this.productos[i]
	}
      }

      return producto
    } catch (error) {
      return error
    }
  }

  async save(title, price, thumbnail){
    try {
      let newProduct = new Producto(title, price, thumbnail)
      newProduct.id = this.productos.length + 1
      this.productos.push(newProduct)
      await fs.promises.writeFile(this.name, JSON.stringify(this.productos, null, '\t'))

    } catch(error) {
      console.log(error)
    }
  }

  delateAll(){
    fs.truncateSync(this.name, 0)
  }

  async delateById(id){
    try {
      for(let i = 0; i < this.productos.length; i++){
	if(id == this.productos[i].id){
	  this.productos.splice(id - 1, 1)
	}

      }
      await fs.promises.writeFile(this.name, JSON.stringify(this.productos, null))
      
    } catch (error) {
      return 'Error! ID no existe o ya fue eliminado'
    } 
  }

}


// let archivoProductos = new Archivo('./productos.txt')
// archivoProductos.save('Pelota', 6000, 'https://m.media-amazon.com/images/I/71xpDeKcPjL._AC_SL1453_.jpg')
// archivoProductos.save('Zapatillas', 24900, 'https://asics.vteximg.com.br/arquivos/ids/164579-1000-1000/1051A061_010_1.jpg?v=637741316341870000')
// archivoProductos.save('Red', 1300, 'https://media.istockphoto.com/photos/beach-volley-net-on-a-sandy-beach-picture-id483446388?b=1&k=20&m=483446388&s=170667a&w=0&h=k0RmqpKVj14dExkLxgLhG01KGBziA3jukEYolmoR3to=')
// archivoProductos.save('Rodilleras', 3000, 'https://http2.mlstatic.com/D_NQ_NP_637480-MLA43460121352_092020-O.webp')
// archivoProductos.getAll()
// console.log(archivoProductos.getById(1))
// archivoProductos.delateAll()
// archivoProductos.delateById(4)