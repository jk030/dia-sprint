const router = require("express").Router();

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

router.post("/", (req,res,next) => {
  
})

module.exports = router;
