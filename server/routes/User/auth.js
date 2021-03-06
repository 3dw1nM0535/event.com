// User sign authentication route

import express from "express";
import Developer from "../../models/developer";

import { sendConfirmationEmail } from "../../mailer/authMailer";
import { parseError } from "../../utils/parseErrors";

const router = express.Router();

// Sign up route handler
router.post("/", (req, res) => {
  const {
    email,
    firstname,
    lastname,
    password,
  } = req.body.data;
  const user = new Developer({
    email,
    firstname,
    lastname,
  });
  user.setPassword(password);
  user.setConfirmationToken();
  user.save().then((userRecord) => {
    sendConfirmationEmail(userRecord);
    res.json({ user: userRecord });
  }).catch(err => res.status(400).json({ errors: parseError(err.errors) }));
});

export default router;
