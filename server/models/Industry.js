const mongoose = require("mongoose");

const { Schema } = mongoose;

const industrySchema = new Schema ({
    name: {
        type: String,
        required: true, 
        unique: true,
    },
});

const Industry = mongoose.model('Industry', industrySchema);

module.exports = Industry;