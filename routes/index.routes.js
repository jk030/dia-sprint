const router = require("express").Router();
const User = require("../models/User.model");

/* GET home page */
router.get("/", (req, res, next) => {
res.render("index",{user:req.session.user} );
});

router.post("/", (req,res,next) => {
  
})

router.get("/profile", (req,res,next) => {
  const {username, nationality
  
  } = req.session.user
 // User.findOne({username:username})
  console.log({username:username, nationality:nationality})
  // .then(loggedInUser => {

  // })
  res.render("profile", {user:req.session.user} )
})


router.post("/", (req,res,next) => {
  
})

module.exports = router;
