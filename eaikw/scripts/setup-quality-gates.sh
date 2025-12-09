#!/bin/bash

# Quality Gates Setup Script
# This script installs and configures all quality gate tools

set -e

echo "🚀 Installing Quality Gate Dependencies..."
echo ""

# Install dev dependencies
echo "📦 Installing ESLint..."
npm install --save-dev eslint

echo "📦 Installing Prettier..."
npm install --save-dev prettier

echo "📦 Installing Stylelint..."
npm install --save-dev stylelint stylelint-config-standard

echo "📦 Installing markdownlint..."
npm install --save-dev markdownlint-cli2

echo "📦 Installing Husky..."
npm install --save-dev husky

echo "📦 Installing lint-staged..."
npm install --save-dev lint-staged

echo "📦 Installing commitlint..."
npm install --save-dev @commitlint/cli @commitlint/config-conventional

echo ""
echo "🔧 Setting up Git hooks..."
echo ""

# Initialize Husky
npx husky install

# Create pre-commit hook
echo "📝 Creating pre-commit hook..."
npx husky add .husky/pre-commit "npx lint-staged"

# Create commit-msg hook
echo "📝 Creating commit-msg hook..."
npx husky add .husky/commit-msg 'npx --no -- commitlint --edit $1'

# Make hooks executable
chmod +x .husky/pre-commit
chmod +x .husky/commit-msg

echo ""
echo "✅ Quality gates setup complete!"
echo ""
echo "📋 Next steps:"
echo "  1. Run 'npm run lint' to check your code"
echo "  2. Run 'npm run lint:fix' to auto-fix issues"
echo "  3. Run 'npm run format' to format all files"
echo "  4. Try making a commit - hooks will run automatically!"
echo ""
echo "📚 See QUALITY_GATES.md for full documentation"
echo ""
