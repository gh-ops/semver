const core = require("@actions/core");
const semver = require("semver");
const cp = require("child_process");

function getRepositoryVersions() {
  let versions = cp
    .execSync("git tag -l")
    .toString()
    .split("\n")
    .map(semver.parse)
    .filter((l) => l != null);

  versions.sort(semver.compare);

  return versions;
}

async function run() {
  let versions = getRepositoryVersions();
  let latestVersion = versions[versions.length - 1];

  core.setOutput("latest_version", latestVersion.version);

  let nextMajor = semver.inc(latestVersion, "major");
  let nextMinor = semver.inc(latestVersion, "minor");
  let nextPatch = semver.inc(latestVersion, "patch");

  core.setOutput("next_major", nextMajor);
  core.setOutput("next_minor", nextMinor);
  core.setOutput("next_patch", nextPatch);
}

if (require.main === module) {
  run();
}
