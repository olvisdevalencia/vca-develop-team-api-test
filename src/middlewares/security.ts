export const security: object = {
  hsts: {
    maxAge: 31536000,
    includeSubDomains: true,
    preload: true,
  },
  permittedCrossDomainPolicies: {
    permittedPolicies: "none",
  },
  contentSecurityPolicy: {
    directives: {
      "default-src": ["'self' https: 'unsafe-inline'"],
      "base-uri": ["'self'"],
      "font-src": ["'self'"],
      "frame-ancestors": ["'self'"],
      "img-src": ["'self' data:"],
      "object-src": ["'self'"],
      "script-src": ["'self'"],
      "style-src": ["'self' https: 'unsafe-inline'"],
    },
    reportOnly: false,
  },
  referrerPolicy: { policy: "no-referrer" },
  frameguard: {
    action: "deny",
  },
};
