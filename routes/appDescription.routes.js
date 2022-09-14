const router = require("express").Router();
const AppDescription = require('../models/AppDescription')
const uploader = require('../config/cloudinary')


/// -----> connection to the user und session stuff
//const User = require("../models/User.model");
const isLoggedOut = require("../middleware/isLoggedOut");
const isLoggedIn = require("../middleware/isLoggedIn");
const { Router } = require("express");

router.get('/nutrition/create',isLoggedIn, (req, res, next) => {
	res.render('createNutritionApp')
})

router.post('/nutrition/create', uploader.single('appImage'), (req, res, next) => {
  	// console.log(req.file)
	  const {name, description, type, rating} = req.body
	  const imageUrl = req.file.path
console.log(req.body)
	// const loggedInUser = req.user.id
	AppDescription
		.create({imageUrl, name, description, type: "nutrition", rating}) 
		.then(appDescription => {
			res.render('nutritionAdd', {appDescription}) 
		})
		.catch(err => next(err))
});


router.get('/nutrition/edit/:id', (req, res, next) => {
	AppDescription
		.findById(req.params._id)
		.then(appFromDB => {
			res.render('nutritionEdit', { app: appFromDB })
		})
		.catch(err => next(err))
});


router.post('/nutrition/edit/:id', (req, res, next) => {
	const { imageUrl, name, description, type, rating} = req.body
	AppDescription
	.findByIdAndUpdate(req.params.id, {
		imageUrl,
		name,
		description, 
		type, 
		rating,
	})
		.then(() => {
			res.redirect(`/nutrition/create`) 
			//${req.params.id}
		})
		.catch(err => next(err))
});


router.get('/nutrition', (req, res, next) => {
	// const queryAllApps = req.query.q
	// console.log(queryAllApps)
	res.render('nutritionOverview', {user:req.session.user})
	AppDescription
	.find()
	.then(allAppsFromDB => {
	console.log(allAppsFromDB)
		res.render('nutritionOverview', {allAppsFromDB} )
	})
	.catch(err => next(err))
})


module.exports = router;
 



// router.post('/nutrition', (req, res, next) => {
//     const {imgName, imgPath, title, description, owner, timestamps, ratings} = req.body
// 	// create an app example  
// 	// const loggedInUser = req.user.id
// 	console.log(req.body)
// 	AppDescription.create({imgName, imgPath, title, description, timestamps, type: "nutrition", ratings}) //owner: loggedInUser
// 		.then( AppDescription => {
// 			res.render('nutritionPage', {AppDescription}) 
// 		})
// 		.catch(err => next(err))
// });


// let items = Object.entries(r); // get an array of key/value pairs of the object like this [[1:1], [2:1]...]
// let sum = 0; // sum of weighted ratings
// let total = 0; // total number of ratings
// for(let [key,value] of items){
// 	total += value;
// 	sum += value * parseInt(key); // multiply the total number of ratings by it's weight in this case which is the key
// }
// return Math.round(sum / total)
// }