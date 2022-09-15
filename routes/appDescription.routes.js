const router = require("express").Router();
const AppDescription = require('../models/AppDescription')
const uploader = require('../config/cloudinary')
const UserComment = require("../models/reviewModel")
const User = require("../models/User.model");

/// -----> connection to the user und session stuff
const isLoggedOut = require("../middleware/isLoggedOut");
const isLoggedIn = require("../middleware/isLoggedIn");
const { Router } = require("express");

router.get('/nutrition/create',isLoggedIn, (req, res, next) => {
	res.render('nutrition/createNutritionApp')
})


router.post( "/nutrition/create", uploader.single("appImage"), (req, res, next) => {
    // console.log(req.file)
    const { name, description, type, rating } = req.body;
    const imageUrl = req.file.path;
    console.log(req.body);
    // const loggedInUser = req.user.id

    AppDescription.findOne({ name: name }).then((appNameFromDB) => {
      if (appNameFromDB !== null) {
        res.render("nutrition/createNutritionApp", {
          message: "Someone already recommended that App!",
        });
      } else {
        AppDescription.create({
          imageUrl,
          name,
          description,
          type: "nutrition",
          rating,
        })
          .then((appDescription) => {
            res.render("nutrition/nutritionAdd", { appDescription });
          })
          .catch((err) => next(err));
      }
    });
  }
);


router.get('/nutrition/edit/:id',isLoggedIn, (req, res, next) => {
	AppDescription
		.findById(req.params.id)
		.then(appFromDB => {
			res.render('nutrition/nutritionEdit', { app: appFromDB })
		})
		.catch(err => next(err))
});



router.post('/nutrition/edit/:id', isLoggedIn, (req, res, next) => {
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
})


router.get("/nutrition/appReviews/:id", (req, res, next) => {

	AppDescription.findById(req.params.id)
    .then(appFromDB => {
		console.log(appFromDB)
      res.render("nutrition/appReviews", { app: appFromDB  });
    })
    .catch((err) => next(err));
});



router.post('/nutrition/appReviews/:id', (req, res, next) => {
	// console.log(req.)
	const { user, text, userRating } = req.body
	UserComment
	.create(createdReview, {
			user,
			text,
			userRating,
		})
	.then(userReview=>{
	console.log(userReview)
	res.redirect(nutrition/appReviews)
	})
});



router.get("/nutrition", (req, res, next) => {
  // const queryAllApps = req.query.q
  // console.log(queryAllApps)
  AppDescription.find()
    .then((allAppsFromDB) => {
      console.log(allAppsFromDB);
      res.render("nutrition/nutritionOverview", { allAppsFromDB });
    })
    .catch((err) => next(err));
});










// router.post('/nutrition/reviews/:id', (req, res, next) => {
// 	const { user, text } = req.body
// 	const appId = req.params.id

// 	AppDescription
// 	.findByIdAndUpdate(appId,
// 		{ $push: { reviews: { user: user, text: text } } }
// 	)
// 		.then(() => {
// 			res.redirect(`nutrition/reviews`)
// 		})
// 		.catch(err => next(err))
// });



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
