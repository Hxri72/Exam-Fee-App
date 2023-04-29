const mongoose = require('mongoose')

const feeSchema = new mongoose.Schema({
        INDIAN: {
            ALL_COURSES: {
              ALL_LEVEL: {
                amount: {
                  type: Number,
                  required: true
                }
              }
            }
          },
          FOREIGN: {
            ALL_COURSES: {
              ALL_LEVEL: {
                amount: {
                  type: Number,
                  required: true
                }
              }
            }
          },
          NRI: {
            ALL_COURSES: {
              ALL_LEVEL: {
                amount: {
                  type: Number,
                  required: true
                }
              }
            }
          },
          SAARC: {
            ALL_COURSES: {
              ALL_LEVEL: {
                amount: {
                  type: Number,
                  required: true
                }
              }
            }
        }
    
})

module.exports = mongoose.model('feedata',feeSchema)