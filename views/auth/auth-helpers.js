const bcrypt = require('bcryptjs');

const models = require('..db/models/index');


//compares the entered password with the encrypted password
function comparePass(userPassword, databasePassword) {
  return bcrypt.compareSync(userPassword, databasePassword);
};
