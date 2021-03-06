var Traveller = require('../models/traveller').traveller;
var User = require('../models/login').user;
const bcrypt = require('bcrypt');


/*exports.show = function(req, res) {
    var plane_no = req.params.id; 
    Traveller.find({"plane_no":plane_no}).select('traveller_name luggage_new_status luggage_condition').exec().then(doc=>{
      if(doc.length>0) {
        res.status(200).json(doc);
      }
      else {
        res.status(404).json({ message: "plane not found,kindly give input correctly."});
      }
    }).catch(err=>{
      res.status(500).json({ message: "Error loading to database." + err});
    });
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
  
exports.load_update = function(req,res){
    let luggage_information = req.body.info;
    let luggage_condition = req.body.condition;
    let id = req.body.id;
    let collected_from = req.body.collected_from;
    Traveller.findById(id).exec().then(doc=>{
        if(doc) {
          doc.luggage_prev_status = doc.luggage_new_status; 
          doc.luggage_new_status = ("loaded from " +collected_from); 
          doc.luggage_condition = luggage_condition;
          doc.luggage_information = luggage_information;
          doc.save().then(result=> {
              res.status(200).json({message: " updated " });    
            }).catch(err=> {
              res.status(500).json({message: "Could not update database." + err});
            })
        } else {
          res.status(404).json({ message: "Could not find traveller,please input id correctly."});
        }
      }).catch(err=>{
        res.status(500).json({ message: "Could not update database." + err});
      })
}

exports.unload_update = function(req,res){
    let luggage_information = req.body.info;
    let luggage_condition = req.body.condition;
    let id = req.body.id;
    let recieved_from = req.body.recieved_from;
    Traveller.findById(id).exec().then(doc=>{
      if(doc) {
        doc.luggage_prev_status = doc.luggage_new_status; 
        doc.luggage_new_status = ("Unloaded from "+ recieved_from); 
        doc.luggage_condition = luggage_condition;
        doc.luggage_information = luggage_information;
        doc.save().then(result=> {
            res.status(200).json({message: " updated " });    
          }).catch(err=> {
            res.status(500).json({message: "Could not update database." + err});
          })
      } else {
        res.status(404).json({ message: "Could not find traveller,please input id correctly."});
      }
    }).catch(err=>{
      res.status(500).json({ message: "Could not update database." + err});
    })
}


/*exports.load_update = function(req,res) {
    let luggage_information = req.body.info;
    let luggage_condition = req.body.condition;
    let id = req.body.id;
    const UpdateOps = {};
    for(const Ops of req.body){
      UpdateOps[Ops.propName]=Ops.value;
    }
    product.update({_id:id},{ $set : updateOps }).exec().then(result=>{
      res.status(200).json({message: " updated " });
    })
}*/