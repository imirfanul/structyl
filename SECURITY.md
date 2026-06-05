# Security Policy

We take the security of structyl and its users seriously. Thank you for helping
keep the project and its community safe.

## Supported Versions

Security fixes are applied to the latest published release of each package. We
recommend always running the most recent version.

| Version | Supported          |
| ------- | ------------------ |
| latest  | :white_check_mark: |
| < latest| :x:                |

structyl ships as independently-versioned packages under the `@structyl/*`
scope. "Latest" means the most recent release of the affected package on npm.

## Reporting a Vulnerability

**Please do not report security vulnerabilities through public GitHub issues,
discussions, or pull requests.**

Instead, report them privately through GitHub's private vulnerability reporting:

➡️ **[Open a private security advisory](https://github.com/imirfanul/structyl/security/advisories/new)**

This keeps the details private until a fix is available and lets us coordinate a
responsible disclosure.

When reporting, please include as much of the following as you can:

- The affected package(s) and version(s) (e.g. `@structyl/styled@1.1.0`)
- A description of the vulnerability and its potential impact
- Step-by-step instructions to reproduce it
- A minimal proof-of-concept, if possible
- Any suggested remediation

## What to Expect

- **Acknowledgement** within 3 business days of your report.
- An initial **assessment** of severity and scope within 7 business days.
- Regular updates on our progress toward a fix.
- **Credit** for the discovery once a fix is released, unless you prefer to
  remain anonymous.

We ask that you give us a reasonable amount of time to investigate and release a
fix before any public disclosure.

## Scope

In scope:

- The `@structyl/*` packages published to npm
- The structyl CLI (`@structyl/cli`)
- Code in this repository

Out of scope:

- Vulnerabilities in third-party dependencies (please report those upstream;
  let us know so we can bump the dependency)
- Issues that require a misconfigured or compromised host to exploit
- The documentation site infrastructure (report site issues as a normal bug)

## Safe Harbor

We consider security research conducted in good faith and in accordance with
this policy to be authorized. We will not pursue or support legal action against
researchers who follow it. If in doubt, ask us first via a private advisory.

Thank you for helping keep structyl secure. 🛡️
