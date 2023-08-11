const express = require("express");
const { model1 } = require("../DB/db");
const { model } = require("mongoose");
const passport = require("passport");
const routes = require("../routes/routes");

const router = express.Router();

router.use(express.urlencoded({ extended: true }));

const users = model1;

passport.use(users.createStrategy());
passport.serializeUser(users.serializeUser());
passport.deserializeUser(users.deserializeUser());

router.get("/register", (req, res) => {
  res.render("register");
});

router.post("/register", async (req, res) => {
  const{phone , age ,username} = req.body

  const existingUser = await users.findOne({ username });
  if (existingUser) {
    let link = '<a href = "/register" >click here</a>'
    res.send("username already exists" +  link)
  
  }else{
    users.register(
      { username: req.body.username },
      req.body.password,
      (err, user) => {
        if (err) {
          console.log(err);
          res.redirect("/register");
        } else {
  
          const newUser = new model1({
    phone , age , displayname
  
          })
          newUser.save()
          passport.authenticate("local")(req, res, () => {
            res.redirect("/clubs");
          });
        }
      }
    )
  }
 ;
});

router.get("/login", (req, res) => {
  res.render("login");
});

router.post("/login", (req, res) => {
  const user = new users({
    username: req.body.username,
    password: req.body.password,
  });
  req.login(user, (err) => {
    if (err) {
      console.log(err);
    } else {
      passport.authenticate("local")(req, res, () => {
        res.redirect("/clubs");
      });
    }
  });
});

router.get("/register/*", (req, res) => {
  res.sendStatus(404);
});


router.get('/about' , (req,res)=>{
    res.render('about')
})

module.exports = router;
