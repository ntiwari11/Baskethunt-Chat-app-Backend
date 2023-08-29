import express from "express";
const router = express.Router();
import {
  adminLogin,
  adminRegister,
  adminWelcome,
  getMySelfAdmin,
  updateAdminProfile,
} from "../../controllers/admin/adminController";
import { protect } from "../../middleware/authMiddleware";

router.get("/", adminWelcome);

router.post("/register", adminRegister);
router.post("/login", adminLogin);
router.get("/getmyself", protect, getMySelfAdmin);
router.put("/updateprofile", updateAdminProfile);
export default router;
