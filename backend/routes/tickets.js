const express = require("express");
const Ticket = require("../models/ticket");
const authCheck = require("../middleware/check-auth");
const mongoose = require("mongoose");

const router = express.Router();

router.post("/createTicket", authCheck, (req, res, next)=>{
  let newTicket = req.body;

  const ticket = new Ticket({
    _id: mongoose.Types.ObjectId(),
    content: newTicket.content,
    userEmail: newTicket.content,
    userId: req.userData.userId,
    fullname: newTicket.fullname,
    unread: true,
  })

  ticket.save().then(
    newTicket => {
      res.status(201).json({
        message: "Ticket saved successfully"
      });
    }
  );
})

module.exports = router;
