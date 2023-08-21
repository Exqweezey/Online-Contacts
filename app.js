import express from 'express'
import path from 'path'
import {v4} from 'uuid'

const __dirname = path.resolve()
const PORT = 3000

const app = express()

app.use(express.json())

let CONTACTS = []

app.get('/api/contacts', (req, res) => {
    setTimeout(() => {
        res.json(CONTACTS)
    }, 1000)
})

app.post('/api/contacts', (req, res) => {
     const contact = {...req.body, id: v4(), marked: false}
     CONTACTS.push(contact) 
     res.status(201).json(contact)
})

app.delete('/api/contacts/:id', (req, res) => {
    CONTACTS = CONTACTS.filter(contact => contact.id !== req.params.id)
    res.json({message: 'Contact has been deleted'})
})

app.put('/api/contacts/:id', (req, res) => {
    const idx = CONTACTS.findIndex(contact => contact.id === req.params.id)
    CONTACTS[idx] = req.body
    res.json(CONTACTS[idx])
})

app.use(express.static(path.resolve(__dirname, 'client')))

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'index.html'))
})

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`)
})

