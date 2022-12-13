// Prototype for a user object

const sha1 = require('sha1');

function hashPwd(password) {
  const hashedPwd = sha1(password);
  return hashedPwd;
}

class UserObject {
  constructor(firstname, lastname, email, phone, password) {
    this.firstname = firstname;
    this.lastname = lastname;
    this.email = email;
    this.phone = phone;
    this.password = hashPwd(password);
    this.createdAt = new Date;
    this.updatedAt = new Date;
    this.schools = [];
    this.verifiedEmail = false;
  }
}

module.exports = UserObject;
