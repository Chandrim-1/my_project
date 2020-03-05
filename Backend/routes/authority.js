var Traveller = require('../models/traveller').traveller;
var User = require('../models/login').user;
const bcrypt = require('bcrypt');




/*exports.show = function(req, res) {
    var id = req.params.id;
    Traveller.findById(id).exec().then(doc=>{
      if(doc) {
        res.status(200).json(doc);
      }
      else {
        res.status(404).json({ message: "passenger not found."});
      }
    }).catch(err=>{
      res.status(500).json({ message: "Error loading to database." + err});
    })
  }*/

exports.login = function(req, res) {
  var Email = req.query.email;
  var Password= req.query.password;
  let email = Email.toString();
  let password = Password.toString();
  let query={"email":email};
  User.find(query).exec().then(user=>{
    if(user.length<1){
      return res.status(401).json({ message: "Authentication Failed!"});
    }
    bcrypt.compare(password,user[0].password,(err,result)=>{
      if(err){
        return res.status(401).json({ message: "Authentication Failed!"});
      }
      if(result){
        return res.status(200).json({ message: "Authentication Successful"});
      }
      res.status(401).json({ message: "Authentication Failed!"});
    })
  }).catch(err=>{
    res.status(500).json({ message: "Error loading to database." + err});
  })
}

exports.signup = function (req,res){
  User.find({ email: req.body.email}).exec().then(user=>{
    if (user.length >=1){
      return res.status(409).json({ message: "Mail exists"});
    }
    else{
  bcrypt.hash(req.body.password, 10 , (err,hash)=>{
    if(err){
      return res.status(500).json({error : err});
    }
    else{
  var email =req.body.email;
  var password = hash;
  var authority_signup = new User();
  authority_signup.email = email;
  authority_signup.password = password;

  authority_signup.save(function(err) {
    if(!err) {
      res.status(201).json({message: "database created with email: " +authority_signup.email });   
    } else {
      res.status(500).json({message: "Could not insert data.Error: " + err});
    }
  });
}
})
    }
  });
}

  exports.create = function(req, res) {
    var traveller_name = req.body.traveller_name;
    var passport_no = req.body.passport_no;
    var plane_no = req.body.plane_no;
    var departure_date = req.body.departure_date;
    var arrival_date = req.body.arrival_date;
    var luggage_name = req.body.luggage_name;
    var luggage_information = req.body.luggage_information;
    var luggage_condition = req.body.luggage_condition;
    var journey_stop = req.body.stop;
    var checkin = req.body.checkin;
    var checkout = req.body.checkout;
        var newTraveller = new Traveller(); 
  
        newTraveller.traveller_name = traveller_name;
        newTraveller.passport_no = passport_no;
        newTraveller.plane_no = plane_no;
        newTraveller.departure_date = departure_date;
        newTraveller.arrival_date = arrival_date;
        newTraveller.luggage_name = luggage_name;
        newTraveller.luggage_information = luggage_information;
        newTraveller.luggage_condition = luggage_condition;
        newTraveller.luggage_new_status = 'In the departure airport';
        newTraveller.journey_stop = journey_stop;
        newTraveller.checkin = checkin;
        newTraveller.checkout = checkout;
 
        newTraveller.save().then(doc=> {
          if(doc) {
            res.status(201).json({message: "database created with tracking id: " + newTraveller._id });   
          } else {
            res.status(500).json({message: "Could not insert data . Error: " + err});
          }
  
        });
}