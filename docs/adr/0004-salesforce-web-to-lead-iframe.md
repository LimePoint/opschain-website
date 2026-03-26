# ADR-0004: Salesforce Web-to-Lead via Hidden Iframe

- **Date:** 2026-03-24
- **Status:** Accepted

## Context

Need to submit lead forms to Salesforce without a backend server. Previous implementation used `fetch` with `mode: 'no-cors'` which silently failed. The original Docusaurus site had an Airtable iframe with no Salesforce integration.

## Decision

Standard HTML form POST to Salesforce's Web-to-Lead endpoint, targeting a hidden iframe. The form has `action` and `method="POST"` attributes with `target="sf_submit_frame"`.

## Consequences

### Positive

- Works with static export (no server needed).
- Uses Salesforce's standard Web-to-Lead mechanism.
- UTM parameters injected as hidden fields.
- GTM events fired on submission.

### Negative

- Cannot read Salesforce's response (cross-origin iframe).
- Submission errors only visible via Salesforce debug emails.
- 3-second timeout fallback assumes success.

### Risk

Silent failures if Salesforce rejects the submission (e.g. duplicate rules). Mitigated by Salesforce debug email configuration.

## Alternatives Considered

| Option | Reason for Rejection |
|---|---|
| `fetch` with `mode: 'no-cors'` | Opaque response, Salesforce may reject non-form POSTs. |
| Salesforce REST API | Requires server-side auth, not compatible with static export. |
| Third-party form service (Formspree/Basin) | Adds dependency, still need SF integration. |
| Server-side API route | Incompatible with `output: 'export'`. |
