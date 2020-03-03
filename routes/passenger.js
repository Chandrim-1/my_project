var Traveller = require('../models/traveller').traveller;
exports.show = function(req, res) {
    var id = req.params.id;
    Traveller.findById(id).select('traveller_name luggage_name luggage_information luggage_new_status luggage_prev_status luggage_condition updatedAt').exec().then(doc=>{
      if(doc) {
        res.status(200).json(doc);
      }
      else {
        res.status(404).json({ message: "passenger not found."});
      }
    }).catch(err=>{
      res.status(500).json({ message: "Error loading to database." + err});
    });
  }