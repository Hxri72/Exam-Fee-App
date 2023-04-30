const userModel = require('../models/userModel')
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const feeModel = require('../models/feeModel')

module.exports = {
    postUserSignup : async(req,res,next) => {
        try {
            const userExist = await userModel.findOne({ email: req.body.email });
            if(userExist){
                return res.send({
                    success:false,
                    message:'User already exist'
                })
            }

            //hashing the password
            const salt = await bcrypt.genSalt(10);
            const hashPassword = await bcrypt.hash(req.body.password, salt);
            req.body.password = hashPassword;

            const newUser = new userModel(req.body);
            await newUser.save();

            res.send({
                success: true,
                message: "User created successfully",
            });

        } catch (error) {
            return res.send({
                success:false,
                message:'something went wrong'
            })
        }
    },

    postUserLogin : async(req,res,next) => {
        try {
            const userExist = await userModel.findOne({ email: req.body.email });
            if(userExist){
                let validatePassword = await bcrypt.compare(req.body.password,userExist.password)
                if(validatePassword){
                    //jwt token creation
                    const token = jwt.sign({_id:userExist._id},process.env.jwt_secret,{expiresIn:"1d"})
                    res.send({
                        success:true,
                        message:'User logged in successfully',
                        data:token
                    })
                }else{
                    res.send({
                        success:false,
                        message:'Incorrect Password',
                    })
                }
            }else{
                res.send({
                    success:false,
                    message:'User is not exist'
                })
            }
        }catch (error) {
            return res.send({
                success:false,
                message:'something went wrong'
            })
        }
    },

    getNationalities : async(req,res,next) => {
        try {
            const selectedFee = req.body.selectedFee
            const amount = Number(selectedFee)
            console.log(amount)
            const Nationality = await feeModel.aggregate([
                // unwind the Exam Fee object
                { $unwind: "$EXAMFEE" },
                // convert the Exam Fee object to an array of key-value pairs
                {
                  $project: {
                    ExamFeeArray: { $objectToArray: "$EXAMFEE" }
                  }
                },
                // unwind the ExamFeeArray
                { $unwind: "$ExamFeeArray" },
                // filter out the unwanted documents
                {
                  $match: {
                    "ExamFeeArray.v.ALL_COURSES.ALL_LEVEL.amount": amount
                  }
                },
                // group the documents by _id and reconstruct the Exam Fee object
                {
                  $group: {
                    _id: "$_id",
                    ExamFee: {
                      $push: {
                        k: "$ExamFeeArray.k",
                        v: "$ExamFeeArray.v"
                      }
                    }
                  }
                },
                // reconstruct the document
                {
                  $project: {
                    _id: 1,
                    ExamFee: { $arrayToObject: "$ExamFee" }
                  }
                }
              ])

              const data = Nationality

              res.send({
                success:true,
                data:data
              })

            
        } catch (error) {
            return res.send({
                success:false,
                message:'something went wrong'
            })
        }
    },

    getFees : async(req,res,next) => {
        try {
            const amountData = await feeModel.aggregate([
                { $project: { amounts: { $map: { input: { $objectToArray: "$EXAMFEE" }, as: "item", in: "$$item.v.ALL_COURSES.ALL_LEVEL.amount" } } } }
            ])
            const amount = amountData[0].amounts
            res.send({
                success:true,
                message:'amount fetched successfully',
                data:amount
            })

        } catch (error) {
            return res.send({
                success:false,
                message:'something went wrong'
            })
        }
    },

    getCourses: async(req,res,next)=>{
        try {
            const Nationality = req.body.selectedNationality
            const data = await feeModel.aggregate([
                {
                    $project: {
                      ExamFeeArray: { $objectToArray: "$EXAMFEE" }
                    }
                },
            ])

            const dataModified = data[0].ExamFeeArray
            

            const arr = []
            const AllCourses = []

            dataModified.map((data)=>{
                if(data.k === Nationality){
                    arr.push(data)
                    const hasAllCourses = arr.every(obj => obj.v.hasOwnProperty('ALL_COURSES'));
                    if(hasAllCourses){
                        AllCourses.push('Medical','Dental','Ayurvedic')
                    }
                }
            })

            res.send({
                success:true,
                message:'Allcourses array returned',
                data:AllCourses
            })
            
            
        } catch (error) {
            return res.send({
                success:false,
                message:'something went wrong'
            })
        }
    },

    getCourseLevels : async(req,res,next) => {
        try {
            const selectedCourse = req.body.selectedCourse
            const data = await feeModel.aggregate([
                {
                    $project: {
                      ExamFeeArray: { $objectToArray: "$EXAMFEE" }
                    }
                },
            ])

            const dataModified = data[0].ExamFeeArray

            const allLevel = ['UG','PG','Ph.D','Diploma']

            res.send({
                success:true,
                message:'All levels fetched successFully',
                data:allLevel
            })

        } catch (error) {
            return res.send({
                success:false,
                message:'something went wrong'
            })
        }
    },

    getResultingAmount : async(req,res,next) => {
        try {
            console.log(req.body)
            const data = await feeModel.aggregate([
                {
                    $project: {
                      ExamFeeArray: { $objectToArray: "$EXAMFEE" }
                    }
                },
            ])

            const dataModified = data[0].ExamFeeArray

            console.log(dataModified)

            const resultingAmount = []

            dataModified.map((data)=>{
                if(data.k === req.body.nationality){
                    console.log(data.v.ALL_COURSES);
                    const hasAllCourses = data.v.hasOwnProperty('ALL_COURSES');
                    if(hasAllCourses){
                        const hasAllLevels = data.v.ALL_COURSES.hasOwnProperty('ALL_LEVEL')
                        if(hasAllLevels){
                           resultingAmount.push(data.v.ALL_COURSES.ALL_LEVEL.amount)
                        }
                    }
                }
            })

            console.log(resultingAmount[0]);

            res.send({
                success:true,
                message:'resulting amount is fetched',
                data:resultingAmount[0]
            })

        } catch (error) {
            return res.send({
                success:false,
                message:'something went wrong'
            })
        }
    }
}

