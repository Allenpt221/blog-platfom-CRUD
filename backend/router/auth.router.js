import express from 'express';
import { login, signup } from '../controller/auth.controller.js';
import { create, Delete, read, Update } from '../controller/blog.controller.js';

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);

router.post("/create", create);
router.get("/", read);
router.delete("/:id", Delete);
router.put("/:id", Update);

export default router;
