import express from "express";
import {
  signin,
  signup,
  googleLogin,
  googleSignup,
} from "../controllers/userController.js";

const router = express.Router();

router.route("/signup").post(signup);
router.route("/signin").post(signin);
router.route("/googlelogin").post(googleLogin);
router.route("/googlesignup").post(googleSignup);

export default router;
