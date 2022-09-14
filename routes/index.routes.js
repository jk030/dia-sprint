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
  const {username,_id
  //   // lastName,
  //   // city,
  //   // age,
  //   // ailement,
  //   // pictureUrl,
  } = req.session.user

  console.log(req.session.user)

  User
		.findById(_id)
		.then(profileFromDB => {
console.log(profileFromDB)

  if (profileFromDB.data === undefined){
    res.render("profile",{profileFromDB, message: 'your profile has no information, lets get to know each other and be friends 🤭, just press the EDIT button',} )
  }
  else {
    res.render("profile", {profileFromDB} )
  }
  
})
})

router.get('/profile/edit', isLoggedIn, (req, res, next) => {
//res.render("editProfile",{user:req.session.user})

	User
		.findById(req.params._id)
		.then(profileFromDB => {
			res.render('editProfile', { userProfile: profileFromDB }, {user:req.session.user})
		})
		.catch(err => next(err))
});


module.exports = router;
