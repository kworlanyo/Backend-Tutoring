import Account from "../models/Account.js";
import createHttpError from "http-errors";

// get all accounts
export async function getAllAccounts(req, res, next) {
  let accounts;

  try {
    accounts = await Account.find();
  } catch (error) {
    return next(createHttpError(500, "Server error"));
  }

  // To show only the owners and not the amounts, we map through all the accounts and create a new array with owners.
  const mappedAccounts = accounts.map((account) => account.owner);

  res.json(mappedAccounts);
}

// get one account
export async function getAccount(req, res, next) {
  // We can destructure the id from the req.params before using it
  const { id } = req.params;
  let account;

  try {
    account = await Account.findById(id);
  } catch (error) {
    return next(createHttpError(500, "Server error"));
  }

  if (account) {
    res.json(account);
  } else {
    next(createHttpError(404, "Account not found"));
  }
}

// get account balance
export async function getAccountBalance(req, res, next) {
  let account;

  try {
    account = await Account.findById(req.params.id);
  } catch (error) {
    return next(createHttpError(500, "Server error"));
  }

  if (account) {
    res.json({ amount: account.amount });
  } else {
    next(createHttpError(404, "Account not found"));
  }
}

// post account
export async function postAccount(req, res, next) {
  const { owner, amount } = req.body;

  // check if owner is a string
  if (typeof owner !== "string") {
    return next(createHttpError(400, "Owner must be a string"));
  }

  // check if amount is a number
  if (typeof amount !== "number") {
    return next(createHttpError(400, "amount must be a number"));
  }

  let newAccount;

  try {
    newAccount = await Account.findOne({ owner });
  } catch (error) {
    return next(createHttpError(500, "Server error"));
  }

  if (!newAccount) {
    newAccount = await Account.create(req.body);
    res.status(201).json(newAccount);
  } else {
    next(createHttpError(409, "Account already exists"));
  }
}

// delete one account
export async function deleteAccount(req, res, next) {
  let deletedAccount;

  try {
    deletedAccount = await Account.findByIdAndDelete(req.params.id);
  } catch (error) {
    return next(createHttpError(500, "Server error"));
  }

  if (deletedAccount) {
    res.json({ message: `Account ${deletedAccount.id} deleted` });
  } else {
    next(createHttpError(404, "Account not found"));
  }
}

// delete all accounts
export async function deleteAllAccounts(req, res, next) {
  let result;

  try {
    result = await Account.deleteMany();
  } catch (error) {
    return next(createHttpError(500, "Server error"));
  }

  res.json({ message: `${result.deletedCount} accounts have been deleted` });
}
