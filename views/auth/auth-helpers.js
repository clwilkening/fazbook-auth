const bcrypt = require('bcryptjs');
const models = require('..db/models/index');


//compares the entered password with the encrypted password
function comparePass(userPassword, databasePassword) {
  return bcrypt.compareSync(userPassword, databasePassword);
};

function loginRedirect(req, res, next) {
  if (req.user) return res.status(401).json(
    { status: 'You are already loggin in' }
  );
  return next();
}

function createUser(req, res) {
  const salt = bcrypt.genSaltSync();
  const hash =bcrypt.hashSync(req.body.password, salt);

  return models.User.create({
    username: req.body.username,
    password: hash,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    dob: req.body.dob
  }).then(() => {
    res.redirect('/');
  });
}

//requires user to be logged in before viewing page.
function loginRequired(req, res, next) {
  if (!req.user) return res.status(401).json({ status: 'Please log in' });

  return next();
}

module.exports = {
  comparePass,
  loginRedirect,
  loginRequired,
  createUser
}
