const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const appSchema = new Schema({
	type: Ernährung,  
    name: String,
	owner: {
		type: Schema.Types.ObjectId,
		ref: 'User'
	},
    timestamps: true,
    ratings:{
        type: mongoose.Mixed, 
 // A mixed type object to handle ratings. Each star level is represented in the ratings object
        1: Number, 
        2: Number,
        3: Number,
        4: Number,
        5: Number,
    default: {1:1, 2:1, 3:1, 4:1, 5:1}}, 
    text: String, 
   
})

const App = mongoose.model('App', appSchema);
module.exports = App;