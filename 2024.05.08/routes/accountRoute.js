import { Router } from "express";
import {
  getAllAccounts,
  getAccount,
  getAccountBalance,
  postAccount,
  deleteAccount,
  deleteAllAccounts,
} from "../controllers/accountControllers.js";

const router = Router();

router.get("/", getAllAccounts); // GET /accounts
router.get("/:id", getAccount); // GET /accounts/:id
router.get("/:id/balance", getAccountBalance); // GET /accounts/:id/balance
router.post("/", postAccount); // POST /accounts
router.delete("/:id", deleteAccount); // DELETE /accounts/:id
router.delete("/", deleteAllAccounts); // DELETE /accounts

export default router;
