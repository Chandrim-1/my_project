var Traveller = require('../models/traveller').traveller;
exports.show = function(req, res) {
    var luggage_name = req.params.id;
    Traveller.find({luggage_name}).select('traveller_name luggage_condition').exec().then(doc=>{
      if(doc.length>0) {
        res.status(200).json(doc);
      }
      else {
        res.status(404).json({ message: "Luggage not found."});
      }
    }).catch(err=>{
      res.status(500).json({ message: "Error loading to database." + err});
    });
  }