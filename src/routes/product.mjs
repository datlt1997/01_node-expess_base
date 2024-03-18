import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  req.sessionStore.get(req.session.id, (err, sessionData) => {
    if (err) {
      console.log(err);
      throw err;
    }
  })
  if (req.signedCookies.hello && req.signedCookies.hello === 'world')
    return res.send({ id:123, name: "chicken breast", price: 12.99})
  return res.send({ msg: "Sorry. You need the correct cookies"})
})
export default router