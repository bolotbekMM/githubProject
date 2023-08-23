const LogSchema = require("../models/LogSchema");

class LogController {
  async getLogs(req, res) {
    const logs = await LogSchema.find().catch((error) => {
      return res.status(400).json({ message: "logs not found" });
    });
    return res.json({ logs });
  }
}

module.exports = new LogController();
