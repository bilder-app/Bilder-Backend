import { Router } from "express";
import glob from "glob";

export default glob
  .sync("**/*.?(js|ts)", { cwd: `${__dirname}/` })
  .map((filename) => require(`./${filename}`))
  .map((file) => file.default)
  .filter((file) => !!file)
  .filter((router) => Object.getPrototypeOf(router) == Router)
  .reduce(
    (rootRouter, router) => rootRouter.use(router),
    Router({ mergeParams: true })
  );
