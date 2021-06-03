import { Router } from "express";
import isPerson from "../../middleware/isPerson";
import User from "../../../Models/User";

const ROUTE = "/user/me";

export default Router({ mergeParams: true }).get(
  ROUTE,
  isPerson,
  (req, res) => {
    
    const user =  req.person.dataValues
    
    return res.json({...user, email: req.user?.email});
  }
);
