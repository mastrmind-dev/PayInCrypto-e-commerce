const chatbot = require("../chatbot/chatbot");

module.exports = (app) => {
  app.post("/api/df_text_query", async (req, res) => {
    res.send(await chatbot(req.body.text));
  });
};
