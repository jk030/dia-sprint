const mongoose = require('mongoose');
const Schema = mongoose.Schema

const userCommentSchema = new Schema({
    comment: String, 
    userRating: {
        type: Number, 
        enum: [1, 2, 3, 4, 5]
    }, 
    user:{
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    app:{
        type: Schema.Types.ObjectId,
        ref: "AppDescription"
    },
	reviews: [{
		user: String,
		text: String
	}], 
})

const UserComment = mongoose.model('UserComment', userCommentSchema);
module.exports = UserComment;