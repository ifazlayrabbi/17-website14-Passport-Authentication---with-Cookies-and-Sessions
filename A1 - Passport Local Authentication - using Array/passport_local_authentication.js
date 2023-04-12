
// passport local authentication - using array

const LocalStrategy = require('passport-local')
const bcrypt = require('bcrypt')








exports.passport_login_authentication = (passport, getUserByEmail, getUserById) => {
  
  passport.use(new LocalStrategy({usernameField: 'email'}, authenticateUser))
  passport.serializeUser ((user, done) => done(null, user._id))
  passport.deserializeUser ((_id, done) => done(null, getUserById(_id)))


  async function authenticateUser (email, password, done) {
    const user = getUserByEmail(email)
    if(user == null)
      return done(null, false, {message: 'No user with that email.'})
    try{
      if(await bcrypt.compare(password, user.password))
        return done(null, user)
      else
        return done(null, false, {message: 'Password incorrect.'})
    }
    catch (err) {return done(err)}
  }
}

