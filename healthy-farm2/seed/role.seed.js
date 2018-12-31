const mongoose = require('mongoose');
const env = require('dotenv');

const Role = require('../models/role.model');
const User = require('../models/user.model');
env.config();

// connect to database
mongoose.connect(
  process.env.URI_LOCAL,{
    useNewUrlParser: true
  }
).then((result)=> {
  console.log('connect to database successfully');
}).catch((err)=>{
  console.log(err);
  process.exit();
})
// create category
Role.deleteMany((err, result)=>{

  const roles = [];
  roles.push(new Role({
    key: 'USER'
  })),
  roles.push(new Role({
    key: 'ADMIN'
  }))

  Role.insertMany(roles, (err, result)=> {
    if (err) {
      console.log(err);
    }
    if (result) {
      console.log('insert roles to database successfully');
      console.log(result);
      User.findOne({ email: 'dactue1006@gmail.com'}, (err, user)=> {
        if (user) {
          user.role = result[1].id;
          user.save((err, res)=>{
            console.log('Set to admin successfully')
          })
        }
      })
    }
    
    //process.exit();
  })
  
})