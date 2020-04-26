const cp = require("child_process");
const path = require("path");

const semverTestRepo = "https://github.com/gh-ops/semver-test.git";
const semverTestPath = path.join(__dirname, "semver-test");

beforeAll(() => {
  cp.execSync(`git clone ${semverTestRepo}`);
});

afterAll(() => {
  cp.execSync(`rm -Rf ${semverTestPath}`);
});

checkout = (ref) => {
  cp.execSync(`git checkout ${ref}`, { cwd: semverTestPath });
};

test("test runs", () => {
  const ip = path.join(__dirname, "index.js");
  let output = cp
    .execSync(`node ${ip}`, { cwd: semverTestPath })
    .toString()
    .split("\n");

  console.log(output);

  expect(output.length).toBe(5);
  expect(output[0]).toBe("::set-output name=latest_version::0.1.0");
  expect(output[1]).toBe("::set-output name=next_major::1.0.0");
  expect(output[2]).toBe("::set-output name=next_minor::0.2.0");
  expect(output[3]).toBe("::set-output name=next_patch::0.1.1");

  // Empty line at end of output
  expect(output[output.length - 1]).toBe("");
});
