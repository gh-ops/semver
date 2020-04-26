# GitHub Semantic Version Action

This action generate semantic versions for your GitHub repository.

## Inputs

## Outputs

### `latest_version`

The latest version tagged in the repository.

### `next_major`

The next version increasing major.

### `next_minor`

The next version increasing minor.

### `next_patch`

The next version increasing patch.

## Example usage

```
jobs:
  sample:
    runs-on: ubuntu-latest
    name: A sample job
    steps:
    - name: Checkout
      uses: actions/checkout@v1

    - name: Get versions
      uses: gh-ops/semver@v1
      id: semver

    - name: Dump versions
      id: hello
      run: -
        echo "Latest Version: ${{ steps.semver.outputs.latest_version }}"
        echo "Next Major: ${{ steps.semver.outputs.next_major }}"
        echo "Next Minor: ${{ steps.semver.outputs.next_minor }}"
        echo "Next Patch: ${{ steps.semver.outputs.next_patch }}"
```

