const Thread = require("../models/groupThread");

module.exports = (req, res, next) => {
  const threadId = req.body.threadId;
  Thread.findOne({_id, threadId}).then(
    document => {
      document.responsesCount = document.responsesCount + 1;
      Thread.updateOne({_id, threadId}, document).then(
        result => {
          console.log("responses count for " + threadId + " incremented");
          next();
        }
      ).catch(
        error => {
          console.log("error updating responses count for " + threadId);
        }
      );
    }
  ).catch(
    error => {
      console.log("error finding thread ", threadId);
    }
  );
}
