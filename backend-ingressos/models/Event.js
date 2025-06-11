const mongoose = require('mongoose')

const EventSchema = new mongoose.Schema({
    title: {
        type:String,
        required: true
    },
    description: {
        type:String,
        required: true
    },
    date:{
        type: Date,
    },
    price:{
        type: Number,
        required: true
    },
    image: String,
})

module.exports = mongoose.model('Event', EventSchema)