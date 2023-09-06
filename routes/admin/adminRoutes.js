import express from "express";
const router = express.Router();
import {
  adminLogin,
  adminRegister,
  adminWelcome,
  getMySelfAdmin,
  updateAdminProfile,
  logout,
  getAllUsers,
  getSingleUsersDetails,
} from "../../controllers/admin/adminController";
import {
  authorizeRolesAdmin,
  isAuthenticatedUsers,
} from "../../middleware/authMiddleware";

/**
 * @Route : http://localhost:4000/
 * @Access : Public
 * @Description : Welcom Route
 */
router.get("/", adminWelcome);

/**
 * @Route : http://localhost:4000/api/v1/admin/register
 * @Access : Public
 * @Description : Admin user Registration
 */
router.post("/register", adminRegister);

/**
 * @Route : http://localhost:4000/api/v1/admin/login
 * @Access : Public
 * @Description : Admin user Login
 */
router.post("/login", adminLogin);

/**
 * @Route : http://localhost:4000/api/v1/admin/getmyself
 * @Access : private
 * @Description : Get Admin user details itself
 */
router.get("/getmyself", isAuthenticatedUsers, getMySelfAdmin);

/**
 * @Route : http://localhost:4000/api/v1/admin/updateprofile
 * @Access : private
 * @Description : update user details itself
 */
router.put("/updateprofile", isAuthenticatedUsers, updateAdminProfile);

/**
 * @Route : http://localhost:4000/api/v1/admin/getalluser
 * @Access : private
 * @Description : Getting all users including admin and users both
 */
router.get(
  "/getalluser",
  isAuthenticatedUsers,
  authorizeRolesAdmin("admin"),
  getAllUsers
);

/**
 * @Route : http://localhost:4000/api/v1/admin/getsingleuser/:id
 * @Access : private
 * @Description : getting single user based on the id
 */
router.get(
  "/getsingleuser/:id",
  isAuthenticatedUsers,
  authorizeRolesAdmin("admin"),
  getSingleUsersDetails
);

/**
 * @Route : http://localhost:4000/api/v1/admin/logout
 * @Access : Public
 * @Description : Logout the user
 */
router.get("/logout", logout);
export default router;
