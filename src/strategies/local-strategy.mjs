import passport from "passport";
import  { Strategy } from "passport-local"
import { mockUser } from "../utils/constants.mjs";

passport.serializeUser((user, done) => {
  console.log("inside serialize user");
  console.log(user);
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  console.log("inside deserialize")
  console.log(`deserialize user id ${id}`)
  try {
    const findUser = mockUser.find(user => user.id === id);
    if (!findUser) throw new Error("User not found");
    done(null, findUser);
  } catch (err) {
    done(err, null)
  }
})

export default passport.use(
  new Strategy((username, password, done) => {
    console.log(`username: ${username}, password: ${password}`)
    try {
      const findUser = mockUser.find(user => user.username == username);
      
      if (!findUser) throw new Error("User not found");
      if(findUser.password !== password) throw new ("Error is not correct");
      done(null, findUser);
    } catch (err) {
      done(err, null);
    }
     
  })
)