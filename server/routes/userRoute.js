const router = require('express').Router();
const userControllers = require('../controllers/userController')

router.get("/getFees",userControllers.getFees);

router.post("/signup",userControllers.postUserSignup);

router.post("/login",userControllers.postUserLogin)

router.post("/getNationalities",userControllers.getNationalities)

router.post("/getCourses",userControllers.getCourses)

router.post("/getCourseLevels",userControllers.getCourseLevels)

router.post("/getResultingAmount",userControllers.getResultingAmount)



module.exports = router;