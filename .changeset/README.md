# Changesets

This folder is for [changesets](https://github.com/changesets/changesets).

When you make a change that should appear in the changelog, run:

```bash
pnpm changeset
```

It will ask you which packages changed and the semver bump (patch / minor / major), and create a markdown file here. Commit it with your PR.

On merge to `main`, a "Version Packages" PR is opened. Merging that PR releases.
