const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const listSchema  = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'task'
    },
    title:{
        type:String,
        required:true
    },
    complete:{
    type:Boolean,
    required:true
}
});

module.exports = list = mongoose.model('list', listSchema);