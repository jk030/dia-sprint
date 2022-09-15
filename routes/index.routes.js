const router = require("express").Router();
const User = require("../models/User.model");

const isLoggedOut = require("../middleware/isLoggedOut");
const isLoggedIn = require("../middleware/isLoggedIn");
const { Router } = require("express");


/* GET home page */
router.get("/", (req, res, next) => {
res.render("index",{user:req.session.user} );
});



router.get("/profile",isLoggedIn, (req,res,next) => {
  const {username,_id  } = req.session.user

  User
		.findById(_id)
		.then(profileFromDB => {
//console.log(profileFromDB)

// --> you deleted data from the model so you need individual messages for every value beeing empty or wrong 
  if (profileFromDB.data === undefined){
    res.render("profile",{profileFromDB, message: 'your profile has no information, lets get to know each other and be friends 🤭, just press the EDIT button',} )
  }
  else {
    res.render("profile", {profileFromDB} )
  }
  
})
})

router.get("/profile/edit", isLoggedIn, (req,res,next) => {
  const {username,_id  } = req.session.user

  User
  .findById(_id)
  .then(profileFromDB => {

res.render("editProfile",{profileFromDB} )
  })
})

router.post('/profile/edit', isLoggedIn, (req, res, next) => {
  //console.log("body: ", req.body)
  const {username,_id  } = req.session.user
  const {name,lastName,city,age,ailment,pictureUrl} = req.body
  User
  .findByIdAndUpdate(_id, {
	name,
  lastName,
  city,
  age,
  ailment,
  pictureUrl,
	})
		.then(updatedUser => {
     // console.log(updatedUser)
			res.redirect(`/profile`) 
		})
		.catch(err => next(err))
});


// router.post('/profile/edit', isLoggedIn, (req, res, next) => {
// 	const { imageUrl, name, description, type, rating} = req.body
// 	AppDescription
// 	.findByIdAndUpdate(req.params.id, {
// 		imageUrl,
// 		name,
// 		description, 
// 		type, 
// 		rating,
// 	})
// 		.then(() => {
// 			res.redirect(`/nutrition/create`) 
// 			//${req.params.id}
// 		})
// 		.catch(err => next(err))
// });

module.exports = router;
