import { PassportStatic } from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import User from "./Models/User";
import bcrypt from "bcryptjs";

export default (passport: PassportStatic) => {
  passport.use(
    new LocalStrategy({ usernameField: "email" }, (email, password, done) => {
      User.findOne({ where: { email } })
        .then((user) => {
          if (!user) return done(null, false);
          bcrypt
            .compare(password, user.password)
            .then((matches) => {
              if (matches) return done(null, user);
              else return done(null, false);
            })
            .catch((err) => done(err));
        })
        .catch((err) => done(err));
    })
  );

  passport.serializeUser(function (user: any, done) {
    done(null, user.email);
  });

  passport.deserializeUser(function (email: string, done) {
    User.findOne({ where: { email } })
      .then(function (user) {
        if (!user) return done(null, false);
        done(null, user);
      })
      .catch((err) => done(err));
  });
};
