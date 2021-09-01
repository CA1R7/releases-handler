import { join } from "path";
import express, { Router } from "express";
import updatesManager from "./generale/updates_manager";

const router: Router = Router();

router.use("/updates", updatesManager);

// Added static releases folder conatins raw_binarys files.
router.use("/releases", express.static(join(__dirname, "../../releases")));

export default router;
