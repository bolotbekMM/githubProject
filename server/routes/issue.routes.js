const issuesController = require("../controllers/issue.controller");
const { Router } = require("express");
const issuesRoutes = Router();

issuesRoutes.get("/issues/:user/:repository", issuesController.getAllIssues);
issuesRoutes.get("/issues/:user/:repository/:issueId", issuesController.getIssueById);

module.exports = issuesRoutes;
