import { NextFunction, Request, Response } from "express";

export default async (req: Request, res: Response, next: NextFunction) => {
  const business = await req.user?.$get("business");
  if (!business) return res.sendStatus(401);
  req.business = business;
  next();
};
