const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const listSchema  = new Schema({
    listId: {
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