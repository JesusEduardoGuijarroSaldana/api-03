const express = require("express");
const req = require("express/lib/request");
const res = require("express/lib/response");
const app = express();
const port = process.env.port || 3000;
app.use(express.json());
// Arreglo de objetos de categorías
let categories = [
  { id: 1, name: "Cocina", description: "Elementos para Cocina." },
  { id: 2, name: "Limpieza", description: "Elementos para Limpieza." },
  { id: 3, name: "Electrónica", description: "Elementos de Electrónica." },
  { id: 4, name: "Ropa bebé", description: "Elementos para Ropa bebé." },
  { id: 5, name: "Línea Blanca", description: "Elementos de Línea Blanca" },
  { id: 6, name: "Jardinería", description: "Elementos para la Jardinería." },
  { id: 7, name: "Salud", description: "Elementos para la Salud." },
  { id: 8, name: "Muebles", description: "Elementos para sala y demás." },
  { id: 9, name: "Lácteos", description: "Elementos para Lácteos." },
  { id: 10, name: "Licores", description: "Elementos para beber." },
];

app.get("/partners/v1/categories", (req, res) => {
  // obtener todos los recursos - obtener todas las categorías
  // 1. Verificar si existen categorías
  if (categories) {
    res.status(200).json({
      estado: 1,
      mensaje: "Existen categorias",
      categories: categories,
    });
  } else {
    res.status(404).json({
      estado: 0,
      mensaje: "No existen categorias",
      categories: categories,
    });
  }
  // 2. Mostrarlas con un estado y mensaje
  // 3. No existe, mostrar estado y mensaje en formato JSON
  // 4. Mostrar el estado del servidor
});
app.get("/partners/v1/categories/:id", (req, res) => {
  const id = req.params.id;
  const category = categories.find((categories) => categories.id == id);
  if (category) {
    res.status(200).json({
      estado: 1,
      mensaje: "Categoria encontrada",
      category: category,
    });
  } else {
    res.status(404).json({
      estado: 0,
      mensaje: "Categoria no encontrada",
      category: category,
    });
  }

  // obtener un recurso - obtener una categoría
  res.send("Mostrar una categoría por su id.");
});
app.post("/partners/v1/categories", (req, res) => {
  // crear un recurso - crear una categoría
  // Requerimientos
  // id = generar número aleatorio
  // nombre y descripcion
  //console.log("------------------------------");
  const { name, description } = req.body;
  // console.log("------------------------------");
  // console.log(name);
  // console.log(description);
  const id = Math.round(Math.random() * 1000);
  // Comprobar que el cliente (chrome, edge, insomnia, postman) = usuario = programador
  if (!name || !description) {
    res.status(400).json({
      estado: 0,
      mensaje: "Faltan par{ametros en la solicitud (Bad Request)",
    });
  } else {
    const category = { id, name, description };
    const lengthInit = categories.length;
    categories.push(category);
    if (categories.length > lengthInit) {
      // Todo ok de parte del cliente y servidor
      res.status(201).json({
        estado: 1,
        mensaje: "Categoría creada correctamente.",
        category,
      });
    } else {
      // Error del servidor - Creador de la API, DB, o en el servidor como tal
      res.status(500).json({
        estado: 0,
        mensaje: "Ocurrio un error desconocido.",
      });
    }
  }

  res.send("Crear una categoría.");
});
app.put("/partners/v1/categories/:id", (req, res) => {
  // id viene ? = params
  // nombre y descripción ? = body
  // actualizar un recurso - actualizar una categoría
  const { id } = req.params;
  const { name, description } = req.body;
  if (!name || !description) {
    //console.log("hola-----------------");
    res.status(400).json({
      estado: 0,
      mensaje: "Faltan parametros en la solicitud.",
    });
  } else {
    console.log("hola******************");
    const indexUpdate = categories.findIndex((category) => category.id == id);
    if (indexUpdate != -1) {
      // Si encontró la categoría //console.log(indexUpdate); //console.log("Entré al if/////////////////");
      categories[indexUpdate].name = name;
      categories[indexUpdate].description = description;
      res.status(200).json({
        estado: 1,
        mensaje: "Categoría actualizada.",
        categories: categories[indexUpdate],
      });
    } else {
      res.status(404).json({
        estado: 0,
        mensaje: "Categoría no encontrada",
      });
      // No se encontró la categoría //console.log(indexUpdate); // console.log("Entré al else-----------------");
    }
  }
});
app.delete("/partners/v1/categories/:id", (req, res) => {
  // id viene ? = params
  // eliminar un recurso - eliminar una categoría
  const { id } = req.params;
  const indexDelete = categories.findIndex((category) => category.id == id);
  if (indexDelete != -1) {
    // Si encontró la categoría, entonces la borramos
    categories.splice(indexDelete, 1);
    res.status(201).json({
      estado: 1,
      mensaje: "Eliminado correctamente.",
    });
  } else {
    res.status(404).json({
      estado: 0,
      mensaje: "Categoría no encontrada.",
    });
  }
});
app.listen(port, () => {
  console.log("Servidor corriendo en el puerto: ", port);
});
