import type { Scene } from '@graphlearning/flow'
import { card, row } from '../kit'

// §7.5 — OAuth/OIDC as the message flow it is (login at the identity provider, tokens back, the token
// presented to the API), because every term in the section — authn, authz, scopes, bearer — is a
// step on this path. The cards then cover protection of data and of the network.
export const sdSecurity: Scene = {
  id: 'sd-security',
  padding: 0.12,
  flow: 'TB',
  nodes: [
    {
      id: 'flow',
      label: 'OAuth 2.0 / OIDC authorization-code flow',
      pattern: 'network',
      icon: 'shield',
      flow: 'LR',
      children: [
        { id: 'user', label: 'User', pattern: 'user', icon: 'user', sub: 'logs in once' },
        { id: 'app', label: 'App (client)', pattern: 'service', icon: 'server', sub: 'holds tokens' },
        { id: 'idp', label: 'Identity provider', pattern: 'external', icon: 'shield', sub: 'authenticates (+ MFA)' },
        { id: 'api', label: 'API (resource server)', pattern: 'storage', icon: 'database', sub: 'checks token + scope' },
      ],
      edges: [
        { source: 'user', target: 'app', label: '1 sign in' },
        { source: 'app', target: 'idp', bidirectional: true, label: '2 redirect + PKCE · 3 tokens back' },
        { source: 'app', target: 'api', label: '4 Bearer token' },
      ],
    },
    row('who', 'Who, and what may they do', [
      card('authn', 'Authentication', 'service', ['Who are you? Passwords, MFA, passkeys', 'OIDC adds an ID token (identity)']),
      card('authz', 'Authorization', 'network', ['What may you do? Roles, scopes, policies', 'OAuth gives an access token with scopes']),
      card('lp', 'Least privilege', 'warn', ['Minimum rights, for the minimum time', 'Short-lived, narrowly scoped tokens']),
    ]),
    row('protect', 'Protecting data and the network', [
      card('enc', 'Encryption', 'storage', ['In transit: TLS · at rest: AES-256', 'Envelope encryption: keys held in a KMS']),
      card('sec', 'Secrets', 'external', ['Never in code or git', 'A secrets manager; rotate; short-lived']),
      card('zt', 'Zero trust', 'warn', ['No trust from network location', 'Authenticate every request; mTLS between services']),
    ]),
    row('sd-security-put', 'Putting it to work', [
      card('sd-security-w', 'Worked example & failure', 'service', ['Access token 15 min + refresh token: a leak is a 15-min window, not forever', 'Keys in git; IAM policy ; tokens in browser storage readable by XSS', '401 = unknown caller · 403 = known, not allowed']),
      card('sd-security-t', 'Your turn', 'external', ['401 or 403: no token · valid token, no permission?', 'Design: access model for an admin panel']),
    ]),
  ],
  edges: [],
}
