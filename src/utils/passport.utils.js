const passport = require('passport');

const passportCall = (strategy) => {
    return async (req, res, next) => {
        passport.authenticate(strategy, function (err, user, info) {
            //console.log("entrou", user, err, info?.message);
            if (info?.message === "No auth token") {
                return res.send("No auth token found");
            }
            if (err) return next(err);
            if (!user) {
                return res.status(401).send({ error: info.message ? info.message : info.toString() });
            }
            //console.log(user)
            req.user = user;
            next();
        })(req, res, next);
    }
}


module.exports = passportCall;