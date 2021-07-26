const User = require('../models/user');

//going to the sign-up page
module.exports.sign_up = function(req,res){
    return res.render('sign_up.ejs');
}

//going tot the sign-in page
module.exports.sign_in = function(req,res){
    return res.render('sign_in.ejs');
}

//when user is signing up
module.exports.create = function(req,res){
  if(req.body.password != req.body.confirm_password){
      return res.redirect('back');
  }
  else{
      User.findOne({email: req.body.email},function(err, user){
          if(err){
              console.log('Error in finding user', err);
              return;
          }

          if(!user){
              User.create(req.body, function(err,user){
                  if(err){
                      console.log("Error in creating user",err);
                      return;
                  }
                  return res.redirect('/users/sign_in');
              })
          }else{
              return res.redirect('back');
          }
      })
  }
}

module.exports.create_session = function(req,res){
    return res.redirect('/users/profile');
}