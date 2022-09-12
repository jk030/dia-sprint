const router = require("express").Router();
const AppDescription = require('../models/AppDescription')


router.get('/nutrition/create', (req, res, next) => {
	res.render('createNutritionApp')
})

router.post('/nutrition/create', (req, res, next) => {
    const {name, description, type, rating} = req.body
	// create an app example  
	// const loggedInUser = req.user.id
	AppDescription
		.create({name, description, type: "nutrition", rating}) 
		.then(appDescription => {
			res.render('nutritionAdd', {appDescription}) 
		})
		.catch(err => next(err))
});

router.get('/nutrition', (req, res, next) => {
	// const queryAllApps = req.query.q
	// console.log(queryAllApps)
	AppDescription
	.find()
	.then(allAppsFromDB => {
	console.log(allAppsFromDB)
		res.render('nutritionOverview', {allAppsFromDB})
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