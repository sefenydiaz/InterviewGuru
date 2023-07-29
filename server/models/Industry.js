const { Schema, model} = require('mongoose')

const industrySchema = new Schema ({
    name: {
        type: String,
        required: true, 
        unique: true,
    },
});

const Industry = model('Industry', industrySchema);

module.exports = Industry;