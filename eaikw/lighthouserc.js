module.exports = {
  ci: {
    collect: {
      startServerCommand: "npm run serve",
      url: ["http://localhost:8080/"],
      numberOfRuns: 3,
    },
    assert: {
      preset: "lighthouse:recommended",
      assertions: {
        "categories:performance": ["error", { minScore: 0.95 }],
        "categories:accessibility": ["error", { minScore: 1 }],
        "categories:best-practices": ["error", { minScore: 1 }],
        "categories:seo": ["error", { minScore: 1 }],

        // Performance budgets
        "first-contentful-paint": ["error", { maxNumericValue: 2000 }],
        "largest-contentful-paint": ["error", { maxNumericValue: 2500 }],
        "cumulative-layout-shift": ["error", { maxNumericValue: 0.1 }],
        "total-blocking-time": ["error", { maxNumericValue: 300 }],

        // Resource budgets
        "resource-summary:script:size": ["error", { maxNumericValue: 50000 }], // 50KB
        "resource-summary:stylesheet:size": ["error", { maxNumericValue: 30000 }], // 30KB
        "resource-summary:image:size": ["error", { maxNumericValue: 200000 }], // 200KB
        "resource-summary:total:size": ["error", { maxNumericValue: 500000 }], // 500KB
      },
    },
    upload: {
      target: "temporary-public-storage",
    },
  },
};
