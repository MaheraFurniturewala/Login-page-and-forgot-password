const User = require('../models/user');

//going to the sign-up page
module.exports.profile = function(req,res){
   User.findById( req.params.id,function(err,user){
       if(err){
           console.log("Error in finding user",err);
           return res.redirect('/');
       }else{
           return res.render('profile',{title:'Profile page',profile_user:user})
       }
   })
}

module.exports.sign_up = function(req, res){
    if (req.isAuthenticated()){
        return res.redirect('/users/profile');
    }


    return res.render('sign_up', {
        title: " Sign Up"
    });
}
//going tot the sign-in page
module.exports.sign_in = function(req, res){

    if (req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    return res.render('sign_in', {
        title: " Sign In"
    });
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

// sign in and create a session for the user
module.exports.create_session = function(req, res){
    //req is an object so we are setting up the flash object
    //the first type of the flash message is success however we can name it anything
    console.log("Session created");
    return res.redirect('/');
}

module.exports.log_out = function(req, res){
    req.logout();
    res.redirect('/');
  }