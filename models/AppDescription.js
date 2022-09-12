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
    rating:{
        type: Number, 
        enum: [1, 2, 3, 4, 5], 
    }
})
   

const AppDescription = mongoose.model('AppDescription', appDescriptionSchema);
module.exports = AppDescription;



// ratings:{
//     type: mongoose.Mixed, // A mixed type object to handle ratings. Each star level is represented in the ratings object
//     1: Number,           //  the key is the weight of that star level
//     2: Number,
//     3: Number,
//     4: Number,
//     5: Number,
//     get: function(r){
//         // r is the entire ratings object
//         let items = Object.entries(r); // get an array of key/value pairs of the object like this [[1:1], [2:1]...]
//         let sum = 0; // sum of weighted ratings
//         let total = 0; // total number of ratings
//         for(let [key,value] of items){
//             total += value;
//             sum += value * parseInt(key); // multiply the total number of ratings by it's weight in this case which is the key
//         }
//         return Math.round(sum / total)
//     },
//     set: function(r){
//         if (!(this instanceof mongoose.Document)){
//             // only call setter when updating the whole path with an object
//             if(r instanceof Object) return r
//             else{throw new Error('')}
//         }else{
//             // get the actual ratings object without using the getter which returns  an integer value
//             // r is the ratings which is an integer value that represent the star level from 1 to 5
//             if(r instanceof Object){
//                 return r    // handle setting default when creating object
//             }
//             this.get('ratings', null, {getters: false})[r] = 1 + parseInt(this.get('ratings', null, {getters: false})[r])
//             return this.get('ratings', null, {getters: false})} // return the updated ratings object
//     },
//     validate:{
//         validator: function(i){
//             let b = [1, 2, 3, 4, 5] // valid star levels
//             let v = Object.keys(i).sort()
//             return b.every((x, j) => (v.length === b.length) && x === parseInt(v[j]))
//         },
//         message: "Invalid Star Level"
//     },
//     default: {1:1, 2:1, 3:1, 4:1, 5:1}
// }
// }, {toObject:{getters: true, }, toJSON:{getters: true}

// })


// document.addEventListener('DOMContentLoaded', function(){
//     (function(){
//         let stars = document.querySelectorAll('.my-star');
//         let i = 0;
//         //loop through stars   
//         while (i < stars.length){       
//             //attach click event      
//             stars[i].addEventListener('click', function(){
//               //current star
//                 let cs = parseInt(this.getAttribute("data-star"));
//                 //output current clicked star value
//                 document.querySelector('#output').value = cs;
//             })//end of click event
//             i++;
//         }
//     })()
// })