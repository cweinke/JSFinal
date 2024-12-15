
const router = require('express').Router()
const { response } = require('express')
const { getCollection, ObjectId } = require('../../../dbconnect')

let menuCollection = null
const getMenu = async () => {
    if (!menuCollection) menuCollection = await getCollection('FoodTruckAPI', 'Menu')
    return menuCollection
}
let eventCollection = null
const getEvents = async () => {
    if (!eventCollection) eventCollection = await getCollection('FoodTruckAPI', 'Events')
    return eventCollection
}


router.get('/menu/', async (_, response) => {
    const collection = await getMenu()
    const found = await collection.find().toArray()
    response.send(found)
})

router.get('/events/', async (_, response) => {
    const collection = await getEvents()
    const found = await collection.find().toArray()
    response.send(found)
})

router.get('/menu/:id', async (request, response) => {
    const { id } = request.params
    const collection = await getMenu()
    const found = await collection.findOne({ _id: new ObjectId(id) })
    if (found) response.send(found)
    else response.send({ error: {message: 'Could not find menu item with that ID'}})
})

router.get('/events/:id', async (request, response) => {
    const { id } = request.params
    const collection = await getEvents()
    const found = await collection.findOne({ _id: new ObjectId(id) })
    if (found) response.send(found)
    else response.send({ error: {message: 'Could not find menu item with that ID'}})
})


router.post('/addmenu', async (request, response) => {
    const { name, Description, price, image } = request.body
    const collection = await getMenu()
    const { acknowledged, insertedId } = await collection.insertOne({ name, Description, price, image })
    response.send({ acknowledged, insertedId })
})


router.post('/addevents', async (request, response) => {
    const { name, location, date, time } = request.body
    const collection = await getEvents()
    const { acknowledged, insertedId } = await collection.insertOne({ name, location, date, time })
    response.send({ acknowledged, insertedId })
})


module.exports = router