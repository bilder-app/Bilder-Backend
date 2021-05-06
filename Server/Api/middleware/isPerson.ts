import { NextFunction, Request, Response } from "express";

export default async (req: Request, res: Response, next: NextFunction) => {
  const person = await req.user?.$get("person");
  if (!person) return res.sendStatus(401);
  req.person = person;
  next();
};
