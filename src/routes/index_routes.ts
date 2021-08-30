import { Router } from "express";
import updatesManager from "./generale/updates_manager";

const router: Router = Router();

router.use("/updates", updatesManager);

export default router;
