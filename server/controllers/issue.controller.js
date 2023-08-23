const LogSchema = require("../models/LogSchema");
const IssueService = require("../services/issue.servise");

class IssueController {
  async getAllIssues(req, res) {
    const { user, repository } = req.params;
    const { per_page, page } = req.query;
    const userIp = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
    const issues = await IssueService.getIssuesRequest(
      user,
      repository,
      per_page,
      page,
      res,
      userIp
    );

    const log = await LogSchema.create({
      ip: userIp,
      type: "get_issues",
    });

    if (!log) {
      return res.status(400).json({ message: "log wasn't save in server" });
    }

    if (issues.length === 0) res.json({ mesage: "issues not found" });
    return res.json({ issues });
  }

  async getIssueById(req, res) {
    const { user, repository, issueId } = req.params;
    const userIp =
      req.headers["x-forwarded-for"] || req.connection.remoteAddress;

    const issue = await IssueService.getIssueRequest(user, repository, issueId);
    const log = await LogSchema.create({
      ip: userIp,
      type: "get_issue",
    });

    if (!log) {
      return res.status(400).json({ message: "log wasn't save in server" });
    }

    if (issue.length === 0) res.json({ mesage: "issues not found" });
    return res.json({ issue });
  }
}

module.exports = new IssueController();
