const passport = require("passport");
const local = require("passport-local");
const userService = require("../dao/services/users.service");
const { createHash, isValidPassword } = require("../service/utils");

const initializePassport = () => {
    passport.use("register", new local.Strategy({ passReqToCallback: true, usernameField: "email"},
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
                //console.log("Is password valid?", isPasswordValidTest);
                if (isPasswordValidTest) {
                    return done(null, userFound);
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