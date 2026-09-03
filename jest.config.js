const nextJest = require('next/jest');
module.exports = nextJest({ dir: './' })({ testEnvironment: 'node', testMatch: ['**/tests/**/*.test.ts'] });
