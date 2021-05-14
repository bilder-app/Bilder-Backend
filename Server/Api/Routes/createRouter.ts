import { Router } from "express";
import glob from "glob";

// so that both:
// route/:id
// route/staticRoute
// work
const idLast = (name: string) => {
  if (name.toLowerCase().includes("id")) return 1;
  return -1;
};

export default glob
  .sync("**/*.?(js|ts)", { cwd: `${__dirname}/` })
  .sort(idLast)
  .map((filename) => require(`./${filename}`))
  .map((file) => file.default)
  .filter((file) => !!file)
  .filter((router) => Object.getPrototypeOf(router) == Router)
  .reduce(
    (rootRouter, router) => rootRouter.use(router),
    Router({ mergeParams: true })
  );
