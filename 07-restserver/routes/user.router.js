import { Router } from "express";
import {
  userGet,
  userPut,
  userPost,
  userPatch,
  userDelete,
} from "../controllers/user.controller.js";
const router = Router();

router.get("/", userGet);
router.put("/:id", userPut);
router.post("/", userPost);
router.patch("/", userPatch);
router.delete("/", userDelete);

export default router;
