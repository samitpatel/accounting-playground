# Contributing to Business Transaction Manager

First off, thank you for considering contributing to Business Transaction Manager! It's people like you that make this project great.

## Code of Conduct

This project and everyone participating in it is expected to uphold a respectful and inclusive environment. Be kind to others.

## How Can I Contribute?

### 🐛 Reporting Bugs

Before creating bug reports, please check the existing issues to avoid duplicates.

**How to submit a good bug report:**

1. **Use a clear and descriptive title**
2. **Describe the exact steps to reproduce the problem**
3. **Provide specific examples**
4. **Describe the behavior you observed and what you expected**
5. **Include screenshots if possible**
6. **Include browser information** (Chrome 120, Firefox 115, etc.)

**Template:**

```markdown
**Bug Description**
A clear description of what the bug is.

**To Reproduce**
Steps to reproduce the behavior:
1. Go to '...'
2. Click on '...'
3. Scroll down to '...'
4. See error

**Expected Behavior**
What you expected to happen.

**Screenshots**
If applicable, add screenshots.

**Environment:**
- Browser: [e.g., Chrome 120]
- OS: [e.g., macOS, Windows 11]
- Version: [e.g., 2.0.0]

**Additional Context**
Any other context about the problem.
```

### 💡 Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues.

**How to submit a good enhancement suggestion:**

1. **Use a clear and descriptive title**
2. **Provide a step-by-step description** of the suggested enhancement
3. **Provide specific examples** to demonstrate the steps
4. **Describe the current behavior** and **explain the desired behavior**
5. **Explain why this enhancement would be useful**

**Template:**

```markdown
**Feature Description**
A clear description of the feature.

**Problem It Solves**
What problem does this solve?

**Proposed Solution**
How you envision this working.

**Alternatives Considered**
Other solutions you've considered.

**Additional Context**
Screenshots, mockups, or examples.
```

### 🔧 Pull Requests

**Before submitting a pull request:**

1. Check if there's already a PR for this change
2. Discuss major changes in an issue first
3. Test your changes thoroughly
4. Update documentation if needed

**Pull Request Process:**

1. **Fork the repository**

```bash
# Click "Fork" button on GitHub
```

2. **Clone your fork**

```bash
git clone https://github.com/yourusername/business-transaction-manager.git
cd business-transaction-manager
```

3. **Create a branch**

```bash
git checkout -b feature/AmazingFeature
# or
git checkout -b fix/BugFix
```

**Branch naming conventions:**
- `feature/` - New features
- `fix/` - Bug fixes
- `docs/` - Documentation changes
- `style/` - Code style changes
- `refactor/` - Code refactoring
- `test/` - Adding tests
- `chore/` - Maintenance tasks

4. **Make your changes**

Follow the code style guidelines below.

5. **Test your changes**

- Test in multiple browsers (Chrome, Firefox, Safari)
- Test on mobile devices
- Test all affected features
- Verify no console errors

6. **Commit your changes**

```bash
git add .
git commit -m "Add some AmazingFeature"
```

**Commit message guidelines:**
- Use present tense ("Add feature" not "Added feature")
- Use imperative mood ("Move cursor to..." not "Moves cursor to...")
- First line should be 50 characters or less
- Reference issues and pull requests when relevant

**Examples:**
```
Add CSV import functionality
Fix transaction deletion bug
Update authentication documentation
Refactor chart rendering logic
```

7. **Push to your fork**

```bash
git push origin feature/AmazingFeature
```

8. **Open a Pull Request**

- Go to the original repository
- Click "New Pull Request"
- Select your branch
- Fill out the PR template
- Submit!

**Pull Request Template:**

```markdown
## Description
Brief description of changes.

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
How has this been tested?

## Checklist
- [ ] My code follows the style guidelines
- [ ] I have tested my changes
- [ ] I have updated the documentation
- [ ] I have added comments for complex logic
- [ ] My changes generate no new warnings
- [ ] I have checked my code for typos
```

## Development Guidelines

### Code Style

**JavaScript:**
- Use ES6+ features
- Use camelCase for variables and functions
- Use PascalCase for classes
- Use UPPER_CASE for constants
- Add comments for complex logic
- Keep functions small and focused
- Avoid deeply nested code

**Example:**
```javascript
// Good
function calculateTotalIncome(transactions) {
    return transactions
        .filter(t => t.type === 'income')
        .reduce((sum, t) => sum + t.amount, 0);
}

// Avoid
function calc(t) {
    var s = 0;
    for(var i = 0; i < t.length; i++) {
        if(t[i].type == 'income') s += t[i].amount;
    }
    return s;
}
```

**CSS:**
- Use CSS variables for colors and common values
- Use kebab-case for class names
- Group related properties
- Mobile-first responsive design
- Keep specificity low

**Example:**
```css
/* Good */
.transaction-card {
    background-color: var(--bg-primary);
    border-radius: var(--border-radius);
    padding: 1rem;
    margin-bottom: 1rem;
}

/* Avoid */
div.transactionCard {
    background-color: #ffffff !important;
    border-radius: 8px;
}
```

**HTML:**
- Use semantic HTML5 elements
- Use meaningful class names
- Keep nesting shallow
- Add ARIA attributes where needed
- Use kebab-case for IDs and classes

**Example:**
```html
<!-- Good -->
<section class="dashboard-view">
    <header class="view-header">
        <h2>Dashboard</h2>
    </header>
</section>

<!-- Avoid -->
<div class="dv">
    <div class="h">
        <h2>Dashboard</h2>
    </div>
</div>
```

### Documentation

- Update README.md for new features
- Add JSDoc comments for functions
- Update relevant .md files
- Include code examples
- Explain "why", not just "what"

**Example:**
```javascript
/**
 * Calculates the total income from an array of transactions
 * @param {Array} transactions - Array of transaction objects
 * @returns {number} Total income amount
 */
function calculateTotalIncome(transactions) {
    // Filter and sum logic
}
```

### Testing Checklist

Before submitting:

- [ ] Works in Chrome
- [ ] Works in Firefox
- [ ] Works in Safari
- [ ] Works on mobile (responsive)
- [ ] No console errors
- [ ] No console warnings
- [ ] localStorage works correctly
- [ ] All features functional
- [ ] Documentation updated
- [ ] No spelling errors

## Project Structure

```
business-transaction-manager/
├── index.html          # Main HTML structure
├── styles.css          # All styling
├── app.js             # All JavaScript logic
├── README.md          # Main documentation
├── AUTHENTICATION.md  # Auth documentation
├── COMPANIES.md       # Company feature docs
├── DEPLOYMENT.md      # Deployment guide
├── CONTRIBUTING.md    # This file
├── CHANGELOG.md       # Version history
├── QUICK_START.md     # Quick start guide
├── PROJECT_LOG.md     # Development log
├── LICENSE            # MIT License
└── .gitignore         # Git ignore rules
```

## Feature Implementation Guidelines

### Adding a New Feature

1. **Plan the feature**
   - What problem does it solve?
   - How will it work?
   - What's the user interface?

2. **Update data model** (if needed)
   - Modify transaction structure
   - Update localStorage schema
   - Consider backwards compatibility

3. **Implement UI**
   - Add HTML structure
   - Add CSS styling
   - Keep consistent with existing design

4. **Implement logic**
   - Add JavaScript functions
   - Update state management
   - Handle edge cases

5. **Test thoroughly**
   - Test happy path
   - Test edge cases
   - Test error handling

6. **Document**
   - Update README.md
   - Add code comments
   - Update relevant guides

### Example: Adding Dark Mode

**1. Plan:**
- Toggle button in header
- Store preference in localStorage
- Switch CSS variables

**2. HTML:**
```html
<button id="theme-toggle" class="btn btn-icon">🌙</button>
```

**3. CSS:**
```css
body.dark-mode {
    --bg-primary: #1a1a1a;
    --text-primary: #ffffff;
    /* ... other variables ... */
}
```

**4. JavaScript:**
```javascript
function toggleTheme() {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('theme',
        document.body.classList.contains('dark-mode') ? 'dark' : 'light'
    );
}
```

**5. Test & Document:**
- Test toggle works
- Test persistence
- Update README

## Getting Help

- **Questions**: Open a GitHub issue with "Question:" prefix
- **Discussions**: Use GitHub Discussions
- **Chat**: (Add Discord/Slack link if available)

## Recognition

Contributors will be recognized in:
- CHANGELOG.md (for significant contributions)
- GitHub contributors page
- Special thanks in releases

## Additional Resources

- [GitHub Guides](https://guides.github.com/)
- [How to Write a Git Commit Message](https://chris.beams.io/posts/git-commit/)
- [JavaScript Style Guide](https://github.com/airbnb/javascript)
- [HTML Best Practices](https://github.com/hail2u/html-best-practices)

## Thank You! 🎉

Your contributions make this project better for everyone. Thank you for taking the time to contribute!

---

**Questions?** Open an issue with the "Question" label.
**Need help?** We're here to help you contribute successfully!
