const LogSchema = require("../models/LogSchema");

class IssueService {
  static async getIssuesRequest(
    githubUser,
    repository,
    per_page,
    page,
    res,
    userIp
  ) {
    const request = await fetch(
      `https://api.github.com/repos/${githubUser}/${repository}/issues`,
      {
        params: {
          per_page: per_page,
          page: page,
        },

        headers: {
          Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        },
      }
    );

    if (!request.ok) {
      res.status(500).json({ message: "server error" });
    }

    const log = await LogSchema.create({
      ip: userIp,
      type: "search_issues",
    });

    if (!log) {
      return res.status(400).json({ message: "log wasn't save in server" });
    }

    const response = await request.json();
    return response;
  }

  static async getIssueRequest(githubUser, repository, issueId) {
    const request = await fetch(
      `https://api.github.com/repos/${githubUser}/${repository}/issues/${issueId}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        },
      }
    );

    const { number, created_at, title, body, user, id } = await request.json();
    return {
      number,
      created_at,
      title,
      body,
      id,
      user: {
        avatar: user.avatar_url,
        name: user.login,
      },
    };
  }
}

module.exports = IssueService;
