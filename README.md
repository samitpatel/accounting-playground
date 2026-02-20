# Business Transaction & Expense Management Website

[![Version](https://img.shields.io/badge/version-2.0.0-blue.svg)](https://github.com/yourusername/business-transaction-manager)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
[![GitHub Pages](https://img.shields.io/badge/demo-live-brightgreen.svg)](https://yourusername.github.io/business-transaction-manager/)

A full-featured, single-page web application for managing business transactions and expenses. Built with vanilla HTML, CSS, and JavaScript with localStorage for data persistence.

![Business Transaction Manager](https://via.placeholder.com/800x400/2563eb/ffffff?text=Business+Transaction+Manager)

> 📝 **Note**: Replace the placeholder image above with an actual screenshot of your application once deployed.

## 🌟 Live Demo

**[View Live Demo](https://yourusername.github.io/business-transaction-manager/)** ← Click to try it now!

> 🔒 All data is stored locally in your browser. Nothing is sent to any server.

## Features

- **User Authentication**: Secure login and registration system with user-specific data
- **Multi-Company Management**: Manage transactions for up to 5 different companies within one account
- **Transaction Management**: Add, edit, delete, and view all business transactions
- **Categories & Tags**: Organize transactions with predefined categories and custom tags
- **Dashboard**: Visual analytics with charts showing income vs expenses, category breakdowns, and spending trends
- **Filtering & Search**: Filter transactions by type, category, date range, or search by keyword
- **Data Export**: Export transactions to CSV format for use in Excel or other tools
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Data Persistence**: All data saved locally in browser using localStorage
- **Multi-User Support**: Multiple users can maintain separate transaction data on the same device
- **Sample Data**: Each company comes with 20-100 realistic transactions automatically

## 📸 Screenshots

### Dashboard
*Beautiful analytics dashboard with charts and summary cards*

### Transaction Management
*Complete transaction table with filtering and search*

### Company Selector
*Switch between multiple companies seamlessly*

> 📝 **Note**: Add actual screenshots after deploying to GitHub Pages

## 🛠️ Technology Stack

- **HTML5** - Semantic structure and layout
- **CSS3** - Modern styling with Grid, Flexbox, and CSS Variables
- **Vanilla JavaScript** - All functionality and state management
- **Chart.js** - Dashboard visualizations (loaded via CDN)
- **localStorage** - Client-side data persistence

**No build process required!** Just open `index.html` in a browser.

## Getting Started

### Installation

1. Clone or download the repository
2. Open `index.html` in your web browser

That's it! No build process, no dependencies to install. The application runs entirely in your browser.

### First Time Setup

1. When you first open the application, you'll see a login screen
2. Click "Register" to create your first account
3. Enter a username (minimum 3 characters) and password (minimum 6 characters)
4. After registration, click "Login" and enter your credentials
5. You'll be automatically provided with sample transactions to explore the features

### User Authentication

- **Register**: Create a new account with username and password
- **Login**: Access your personal transaction data
- **Logout**: Click the logout button in the header to switch users
- **Multiple Users**: Each user has completely separate transaction data
- **Session Persistence**: Stay logged in even after closing the browser

For detailed authentication information, see [AUTHENTICATION.md](AUTHENTICATION.md).

### Managing Multiple Companies

1. After logging in, you'll see the current company name in the header
2. Click the company name to open the company selector
3. Choose from 5 pre-configured companies:
   - **Tech Innovations Inc.** (Technology)
   - **Green Energy Solutions** (Energy)
   - **Creative Studio LLC** (Media)
   - **Gourmet Food Services** (Food & Beverage)
   - **Elite Consulting Group** (Consulting)
4. Each company has its own separate transactions (20-100 sample transactions each)
5. Switch between companies anytime without logging out

For detailed company management information, see [COMPANIES.md](COMPANIES.md).

### File Structure

```
.
├── index.html          # Main HTML structure
├── styles.css          # All styling
├── app.js             # Application logic and data management
└── README.md          # This file
```

## Usage

### Adding Transactions

1. Click the "+ Add Transaction" button (or the floating action button on mobile)
2. Fill in the transaction details:
   - **Type**: Income or Expense
   - **Amount**: Transaction amount (positive numbers only)
   - **Category**: Select from predefined categories (changes based on type)
   - **Date**: Transaction date
   - **Description**: Optional description
   - **Tags**: Optional comma-separated tags (with autocomplete)
3. Click "Save Transaction"

### Viewing Transactions

- Navigate to the "Transactions" tab to view all transactions in a table
- Click column headers to sort by Date, Type, Category, or Amount
- Use the search bar to find specific transactions
- Apply filters to narrow down results by type, category, or date range

### Editing & Deleting

- Click the edit icon (✎) next to any transaction to modify it
- Click the delete icon (✕) to remove a transaction (requires confirmation)

### Dashboard Analytics

The dashboard provides several visualizations:

- **Summary Cards**: Total income, expenses, net balance, and transaction count
- **Expenses by Category**: Pie chart showing expense distribution
- **Income vs Expenses**: Line chart showing trends over time
- **Top Spending Categories**: Bar chart of highest expense categories

Use the date range selector to filter dashboard data (last 7/30/90/365 days or all time).

### Exporting Data

1. Navigate to the "Transactions" tab
2. Optionally apply filters to export specific transactions
3. Click "Export CSV"
4. The file will download automatically as `transactions_YYYY-MM-DD.csv`

## Default Categories

### Income Categories
- Sales
- Services
- Other Income

### Expense Categories
- Office Supplies
- Travel
- Utilities
- Rent
- Salaries
- Marketing
- Equipment
- Other Expenses

## Data Storage

All transaction data is stored in your browser's localStorage. This means:

- ✅ Data persists between sessions
- ✅ No server required
- ✅ Complete privacy (data never leaves your device)
- ⚠️ Data is tied to your browser (clearing browser data will delete transactions)
- ⚠️ Storage limit is typically 5-10MB per domain

**Backup Recommendation**: Regularly export your data to CSV as a backup.

## Browser Compatibility

Works in all modern browsers that support:
- ES6 JavaScript features
- CSS Grid and Flexbox
- localStorage API
- Canvas API (for charts)

Tested on:
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Sample Data

On first load, the application generates 10 sample transactions to demonstrate functionality. You can delete these and add your own, or keep them for testing.

## Keyboard Shortcuts

- Press `Esc` to close any open modal

## Customization

### Changing Categories

Edit the `CATEGORIES` object in `app.js` (lines 6-10):

```javascript
const CATEGORIES = {
    income: ['Sales', 'Services', 'Other Income'],
    expense: ['Office Supplies', 'Travel', 'Utilities', 'Rent', 'Salaries', 'Marketing', 'Equipment', 'Other Expenses']
};
```

### Adjusting Items Per Page

Change the `ITEMS_PER_PAGE` constant in `app.js` (line 12):

```javascript
const ITEMS_PER_PAGE = 20; // Change to desired number
```

### Modifying Colors

Edit CSS variables in `styles.css` (lines 2-14):

```css
:root {
    --primary-color: #2563eb;
    --success-color: #10b981;
    --danger-color: #ef4444;
    /* ... other colors ... */
}
```

## Troubleshooting

### Data not saving
- Check that localStorage is enabled in your browser
- Ensure you're not in private/incognito mode
- Check browser console for errors

### Charts not displaying
- Verify internet connection (Chart.js loads from CDN)
- Check browser console for loading errors

### Storage quota exceeded
- Export transactions to CSV
- Delete old transactions you no longer need
- Consider archiving old data externally

## 🚀 Deployment

This application is ready to deploy to GitHub Pages!

See **[DEPLOYMENT.md](DEPLOYMENT.md)** for complete step-by-step instructions.

**Quick Deploy**:
1. Fork this repository
2. Enable GitHub Pages in Settings → Pages
3. Select `main` branch and `/ (root)` folder
4. Your site will be live at `https://yourusername.github.io/business-transaction-manager/`

## 📚 Documentation

- **[README.md](README.md)** - This file (overview and features)
- **[QUICK_START.md](QUICK_START.md)** - 5-minute getting started guide
- **[AUTHENTICATION.md](AUTHENTICATION.md)** - User authentication details
- **[COMPANIES.md](COMPANIES.md)** - Multi-company management guide
- **[DEPLOYMENT.md](DEPLOYMENT.md)** - GitHub Pages deployment guide
- **[CHANGELOG.md](CHANGELOG.md)** - Version history and updates
- **[PROJECT_LOG.md](PROJECT_LOG.md)** - Development tracking

## 🎯 Use Cases

- **Freelancers**: Track income and expenses for multiple clients
- **Small Businesses**: Manage finances for different business ventures
- **Students**: Learn business finance management
- **Accountants**: Maintain books for multiple small business clients
- **Personal Finance**: Separate business and personal transactions
- **Demo/Portfolio**: Showcase financial management skills

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/AmazingFeature`
3. **Commit your changes**: `git commit -m 'Add some AmazingFeature'`
4. **Push to the branch**: `git push origin feature/AmazingFeature`
5. **Open a Pull Request**

### Development Guidelines

- Keep code simple and readable
- Follow existing code style
- Test all features before submitting
- Update documentation for new features
- Add comments for complex logic

## 📝 Future Enhancements

Potential features for future versions:
- [ ] Recurring transactions
- [ ] Multi-currency support
- [ ] Budget tracking and alerts
- [ ] Data import from CSV
- [ ] Custom category creation
- [ ] Report generation (PDF)
- [ ] Dark mode theme
- [ ] Custom company creation
- [ ] Transaction attachments
- [ ] Advanced analytics

See [CHANGELOG.md](CHANGELOG.md) for planned features by version.

## ⚠️ Important Notes

### Data Privacy
- All data is stored **locally** in your browser's localStorage
- **Nothing is sent to any server**
- Data is **not synced** across devices
- Clearing browser data will **delete all transactions**

### Security
- Client-side authentication is for **demonstration purposes**
- **Not suitable** for storing real sensitive financial data online
- Use for personal projects, demos, and learning
- For production use, implement proper backend authentication

### Browser Support
- Requires modern browser with ES6 support
- localStorage must be enabled
- Not compatible with Internet Explorer

## 🐛 Known Issues

None currently. Please report issues on the [Issues](https://github.com/yourusername/business-transaction-manager/issues) page.

## 📄 License

This project is open source and available under the MIT License.

See [LICENSE](LICENSE) file for more details.

## 👏 Acknowledgments

- [Chart.js](https://www.chartjs.org/) - Beautiful JavaScript charts
- [GitHub Pages](https://pages.github.com/) - Free hosting for static sites
- Inspired by real-world business finance management needs

## 📧 Contact

For questions or feedback:
- Open an [issue](https://github.com/yourusername/business-transaction-manager/issues)
- Submit a [pull request](https://github.com/yourusername/business-transaction-manager/pulls)

## ⭐ Show Your Support

If you find this project helpful, please give it a ⭐ on GitHub!

## 📊 Project Stats

- **Version**: 2.0.0
- **Lines of Code**: ~4,000+
- **Files**: 11 (8 documentation files)
- **Features**: 30+
- **Companies**: 5 pre-configured
- **Sample Transactions**: 100-500 across all companies
- **Zero Dependencies**: Just vanilla JavaScript

---

**Made with ❤️ for business owners, freelancers, and finance enthusiasts**

**Version**: 2.0.0 | **Last Updated**: February 2026 | **Status**: Production Ready ✅
