
function authenticate (req, res, next) { 
 const withoutAuth = [ '/register']
console.log(withoutAuth.includes(req.url));
    if (!req.session.id || !req.session.id_user) {
      console.log(req.session.id);
      console.log(req.session.id_user);
      const err = new Error('You are not authenticated!');
       err.statusCode = 401;
       next(err);
     

    } else {
      console.log(req.session.id);
    next();
  }
}

  module.exports = {authenticate} 