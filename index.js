//impotamos express
const express = require("express")

// importamos el modulo FileSystems
const { readFileSync, writeFileSync } = require('fs')

//dejamos la instancia app
const app = express()

// levantamos el servidor
app.listen(3000, console.log("servidor activo"))

//middleware
app.use(express.json())

// peticiones
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html")
})

app.get("/canciones", (req, res) => {
    const canciones = JSON.parse(readFileSync("repertorio.json", "utf-8"))
    res.json(canciones)
})

app.post("/canciones", (req, res) => {
    const cancion = req.body
    if (!cancion.titulo || !cancion.artista || !cancion.tono) {
        res.send(console.log("debe completar todos los campos"))
    } else {
        const canciones = JSON.parse(readFileSync("repertorio.json", "utf-8"))
        canciones.push(cancion)
        writeFileSync("repertorio.json", JSON.stringify(canciones))
        res.send("Cancion agregada con exito")
    }
})

app.delete("/canciones/:id", (req, res) => {
    const { id } = req.params
    const canciones = JSON.parse(readFileSync("repertorio.json", "utf-8"))
    const index = canciones.findIndex((cancion) => cancion.id === parseInt(id))
    canciones.splice(index, 1)
    writeFileSync("repertorio.json", JSON.stringify(canciones))
    res.send("La cancion fue eliminada")
})

app.put("/canciones/:id", (req, res) => {
    const { id } = req.params
    const edicion = req.body
    if (!edicion.titulo || !edicion.artista || !edicion.tono) {
        res.send(console.log("debe completar todos los campos"))
    } else {
        const canciones = JSON.parse(readFileSync("repertorio.json", "utf-8"))
        const index = canciones.findIndex((cancion) => cancion.id === parseInt(id))
        canciones.splice(index, 1, edicion)
        // canciones[index] = edicion
        writeFileSync("repertorio.json", JSON.stringify(canciones))
        res.send("La cancion ha sido modificada")
    }
})