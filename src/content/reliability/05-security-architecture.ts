import type { Section } from '../types'

export const securityArchitecture: Section = {
  id: 'security-architecture',
  title: 'Security architecture',
  scene: 'sd-security',
  focus: 'flow',
  slide: `## Security architecture

*Prove who is calling, limit what they can do, and assume the network is hostile.*

### Model
- **Authentication** (who) vs **authorization** (what). **OAuth 2.0** = delegated access; **OIDC** adds identity
- **Encryption**: TLS in transit, AES at rest, keys in a KMS. **Secrets**: manager, rotation
- **Zero trust**: verify every request. **Least privilege**: minimum rights, minimum time

### Worked example & failure
- Access token 15 min + refresh token: a leak is a **15-min** window, not forever
- Keys in git; IAM policy \`*\`; tokens in browser storage readable by XSS

### Your turn
- 401 or 403: no token · valid token, no permission?
- Design: access model for an admin panel`,
  narration:
    "Security architecture is about deciding, in the design, who can do what, and how data stays protected, instead of bolting protection on at the end. Start with two questions that are constantly confused. Authentication answers who you are: a password, a second factor, a passkey. Authorization answers what you're allowed to do. They are separate steps, and mixing them is behind many vulnerabilities. In HTTP terms, a four-oh-one means you haven't proven who you are, and a four-oh-three means you're known but not allowed. The standard for both across applications is OAuth 2.0 and OpenID Connect, and the scene shows the flow. The user signs in, not to the app, but to an identity provider. The app redirects there, with a code-challenge, PKCE, that protects the exchange. The provider authenticates the user, including multi-factor, and returns tokens: an ID token, which is OpenID Connect's addition and says who the user is, and an access token, which OAuth uses to say what the app may do, with scopes. The app presents the access token to the API as a bearer token, and the API validates it and checks the scope. The password never reaches the app. A short token lifetime, say fifteen minutes, with a refresh token, means a leaked token is useful for fifteen minutes, not forever. That is least privilege in action: grant the minimum rights for the minimum time. Next, protecting the data. Encrypt in transit with TLS, and at rest with strong encryption, usually AES-256, using envelope encryption: data keys are encrypted by a master key held in a key management service, kept separate from the data. Secrets, such as database passwords and API keys, never go in code or in version control. They live in a secrets manager, are rotated, and where possible are short-lived. And zero trust is the stance that being inside the network proves nothing: every request is authenticated and authorised, and services authenticate each other, with mutual TLS. Typical failures: keys committed to git, IAM policies that grant everything, and tokens stored where a script injected into the page can read them. Your turn. No token at all is a four-oh-one, and a valid token without permission is a four-oh-three. And the design problem: design the access model for an administrator panel, with roles, multi-factor authentication, short sessions, an audit log of every action, and a separate path for emergency access.",
}
