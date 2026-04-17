import { Router } from "express";
import { CountryController } from "../controllers/CountryController";

export function buildCountryRoutes(controller: CountryController): Router {
  const router = Router();

  router.get("/", controller.list);      // GET /countries  o  /countries?search=col
  router.get("/:code", controller.getOne); // GET /countries/CO

  return router;
}
