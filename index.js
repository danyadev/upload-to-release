const core = require('@actions/core');
const { GitHub, context } = require('@actions/github');
const fs = require('fs');

void async function() {
  try {
    const github = new GitHub(process.env.GITHUB_TOKEN);
    const { owner, repo } = context.repo;
    const files = core.getInput('files', { required: true }).split('\n');

    const { data: [release] } = await github.repos.listReleases({
      owner,
      repo
    });

    for (const fileString of files) {
      const [file, name, type] = fileString.trim().slice(1, -1).split(', ');

      await github.repos.uploadReleaseAsset({
        data: fs.readFileSync(file),
        name,
        url: release.upload_url,
        headers: {
          'content-type': type,
          'content-length': fs.statSync(file).size
        }
      });
    }
  } catch (err) {
    core.setFailed(err ? err.stack : err);
  }
}();
