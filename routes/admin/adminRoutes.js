import express from "express";
const router = express.Router();
// import Welcome fuintion
import { adminWelcome } from "../../controllers/admin/adminController";

router.get("/", adminWelcome);

router.get("/welcome", adminWelcome);

export default router;
