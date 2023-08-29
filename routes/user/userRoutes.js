import express from "express";
const router = express.Router();
import { userWelcome } from "../../controllers/user/userController";

router.get("/", userWelcome);

// router.post("/login",)
export default router;
