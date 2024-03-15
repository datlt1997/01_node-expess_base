import { mockUser } from "./constants.mjs";
export const middlewareUserId = (req, res, next) => {
  const { params : { id }} = req;
  const parseId = parseInt(id);
  if(isNaN(parseId)) return res.sendStatus(400);
  const findIndex = mockUser.findIndex(user => user.id == parseId);
  console.log(findIndex)

  if (findIndex === -1) return res.sendStatus(404);
  req.findIndex = findIndex;
  next();
}