import { Router } from "express";
import { searchAny } from "../controllers/search.controller.js";

const router = Router();

router.get("/:collection/:term", searchAny);

export default router;
