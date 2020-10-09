const mongoose = require('mongoose')

// #Log Entry 

// *Title -Text
// *Description -Text
// *Comment - Text
// *Rating - Text
// *Start Date
// *End Date  
// *Latitude
// *Longitude
// *CreatedAt
// *UpdatedAt

const defaultDate = {
    type: Date,
    default: Date.now,
    required: true
}

const logEntrySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: String,
    comments: String,
    image: String,
    latitude: {
        type: Number,
        required: true,
        min:-90,
        max:90
    },
    longitude: {
        type: Number,
        required: true,
        min:-100,
        max:100
    },
    visitDate: {
        type: Date,
        required: true
    },
    rating: {
        type: Number,
        min: 0,
        max: 10,
        default: 0
    },
},
{
    timestamps:true,
}
)

module.exports = mongoose.model('LogEntry', logEntrySchema)