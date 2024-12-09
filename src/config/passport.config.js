const passport = require("passport");
const local = require("passport-local");
const jwt = require("passport-jwt");
const { createHash, isValidPassword } = require("../utils/utils");
const { generateToken } = require("../utils/jwt.utils");
const userService = require("../dao/services/users.service");

const JWTStrategy = jwt.Strategy;
const ExtractJWT = jwt.ExtractJwt;

const cookieExtractor = (req) => {
    let token = null;
    if (req && req.cookies) {
        return (token = req.cookies["accessToken"]);
    }
};


const initializePassport = () => {
    passport.use("jwt", new JWTStrategy({
        jwtFromRequest: ExtractJWT.fromExtractors([cookieExtractor]),
        secretOrKey: process.env.JWT_PRIVATE_KEY,
    },
        async (jwt_payload, done) => {
            try {
                return done(null, jwt_payload);
            } catch (error) {
                return done(error);
            }
        }
    )
    );

    // Local strategies
    passport.use("register", new local.Strategy({ passReqToCallback: true, usernameField: "email" },
        async (req, username, password, done) => {
            const { first_name, last_name, email, role } = req.body;
            try {
                let user = await userService.getUsersByEmail(email)
                if (user) {
                    console.log("user exists");
                    return done(null, false);
                }
                const newPass = await createHash(password);
                const newUser = {
                    first_name,
                    last_name,
                    email,
                    password: newPass,
                    role,
                }
                return done(null, await userService.createUser(newUser))
            } catch (error) {
                return done(`Erro ao obter user ${error}`);
            }
        }
    )
    );

    passport.use("login", new local.Strategy({ usernameField: "email" },
        async (username, password, done) => {
            try {
                //console.log("entrou")
                const userFound = await userService.getUsersByEmail(username)
                if (!userFound) {
                    console.log("user not found");
                    return done(null, false);
                }
                const isPasswordValidTest = await isValidPassword(password, userFound);

                if (isPasswordValidTest) {
                    let user = [userFound];
                    user = user.map((u) => u.toJSON());
                    console.log(user)
                    delete user[0].password;
                    const accessToken = generateToken(user[0]);
                    user[0].token = accessToken;
                    console.log(user)
                    return done(null, user[0]);
                } else {
                    return done(null, false);
                }
            } catch (error) {
                return done(`Erro ao obter user ${error}`);
            }
        }
    )
    );
    passport.serializeUser((user, done) => {
        //console.log(user)
        done(null, user._id);
    });

    passport.deserializeUser(async (id, done) => {
        try {
            const user = await userService.getUsersById(id);
            done(null, user);
        } catch (error) {
            done(`Erro ao obter user ${error}`);
        }
    });
};

module.exports = initializePassport;