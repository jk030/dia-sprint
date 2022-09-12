const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const appDescriptionSchema = new Schema({
	// imgName: String,
	// imgPath: String,
    type: {
        type: String, 
        enum: ['nutrition', 'exercise'], 
    }, 
    name: String, 
    description: String, 
	owner: {
		type: Schema.Types.ObjectId,
		ref: 'User'
	},
    // timestamps: true,
    ratings:{
        type: mongoose.Mixed, 
 // A mixed type object to handle ratings. Each star level is represented in the ratings object
        1: Number, 
        2: Number,
        3: Number,
        4: Number,
        5: Number,
        default: {1:0, 2:0, 3:0, 4:0, 5:0}
    },  
})

const AppDescription = mongoose.model('AppDescription', appDescriptionSchema);
module.exports = AppDescription;

