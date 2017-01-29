const passport = require('passport');
const models = require('../db/models/index');

//exports passport function to serialize and deserialize user.
//serialize allows info to be used in session memory
module.exports = () => {
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });


passport.deserializeUser((id, done) => {
  models.User.findById(id)
  .then((user) => { done(null, user); })
  .catch((err) => { done(err, null); });
  });
};
