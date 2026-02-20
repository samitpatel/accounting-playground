# Company Management Feature

## Overview
The Business Transaction Manager now supports managing multiple companies within a single user account. Users can switch between companies seamlessly without logging out, and each company maintains its own separate transaction data.

## Features

### Multiple Company Support
- Manage transactions for up to 5 different companies
- Each company has completely isolated transaction data
- Switch between companies instantly without data loss
- Company preference saved per user

### Default Companies

The application comes with 5 pre-configured companies:

1. **Tech Innovations Inc.**
   - Industry: Technology
   - Sample: 20-100 transactions with tech-focused activities

2. **Green Energy Solutions**
   - Industry: Energy
   - Sample: 20-100 transactions with energy sector patterns

3. **Creative Studio LLC**
   - Industry: Media
   - Sample: 20-100 transactions with creative services

4. **Gourmet Food Services**
   - Industry: Food & Beverage
   - Sample: 20-100 transactions with food business operations

5. **Elite Consulting Group**
   - Industry: Consulting
   - Sample: 20-100 transactions with consulting activities

### Company Selector UI
- **Header Display**: Current company name shown in header
- **Easy Access**: Click company name to open selector
- **Visual Feedback**: Current company highlighted with badge
- **Transaction Stats**: See transaction count for each company
- **Industry Labels**: Quick reference to company type

## How to Use

### Switching Between Companies

1. **Open Company Selector**
   - Click the company name button in the header (shows current company)
   - The company selector modal will appear

2. **Select a Company**
   - View all available companies with their stats
   - Current company is highlighted with "Current" badge
   - See transaction count for each company
   - Click on any company to switch to it

3. **Automatic Data Loading**
   - Application instantly loads that company's transactions
   - Dashboard updates with company-specific analytics
   - All filters and views remain functional

### First-Time Company Setup

When you first login:
- Default company is automatically selected (Tech Innovations Inc.)
- Each company is pre-populated with sample transactions
- Transaction count varies between 20-100 per company
- Data is diverse and realistic for each industry

### Working with Company Data

**Current Company Context**:
- All transactions you create are saved to the current company
- Filters and searches work within current company only
- Dashboard shows analytics for current company
- CSV exports include current company's transactions

**Switching Companies**:
- No need to logout or reload
- Instant switching with automatic save
- Your work in one company doesn't affect others
- Last selected company is remembered

## Data Storage Structure

### Per-User Per-Company Storage

Transactions are stored with the key format:
```
transactions_{username}_{companyId}
```

**Examples**:
- `transactions_john_tech-innovations`
- `transactions_john_green-energy`
- `transactions_mary_creative-studio`

### Company Preference Storage

Current company selection is stored per user:
```
currentCompany_{username}
```

**Example**:
- `currentCompany_john` = "tech-innovations"

### Company List Storage

Companies are stored globally (shared across all users):
```
companies
```

This contains the array of company objects with id, name, and industry.

## Sample Data Generation

### Smart Transaction Templates

Each company gets transactions generated from realistic templates:

**Income Templates**:
- Product sales (varied amounts and descriptions)
- Service contracts
- Consulting fees
- Wholesale orders
- Retail sales

**Expense Templates**:
- Office rent (fixed monthly)
- Utilities (electricity, internet, water)
- Salaries and contractor payments
- Marketing (social media, PPC, content)
- Travel expenses
- Office supplies
- Equipment purchases
- Software licenses

### Transaction Variety

- **Amount Ranges**: Realistic ranges per category (e.g., rent: $800-$3000)
- **Date Distribution**: Spread across 9 months (June 2025 - February 2026)
- **Tags**: Industry-appropriate tags for filtering
- **Descriptions**: Varied descriptions within each category
- **Volume**: 20-100 transactions per company (random)

## Use Cases

### Freelancers & Consultants
Manage finances for multiple client projects as separate companies

### Small Business Owners
Track multiple business ventures or subsidiaries

### Accountants
Maintain books for multiple small business clients

### Testing & Demo
Explore features with different business scenarios without mixing data

### Personal Finance
Separate business and personal finances, or track multiple income streams

## Technical Details

### Company Data Model

```javascript
{
  id: 'tech-innovations',        // Unique identifier (kebab-case)
  name: 'Tech Innovations Inc.',  // Display name
  industry: 'Technology'          // Industry category
}
```

### Transaction Context

When creating/editing transactions:
1. System gets current company ID
2. Transaction is saved to company-specific storage key
3. Company context is transparent to user

### Performance Considerations

- Each company's data loads independently
- Only current company's transactions are in memory
- Switching companies triggers fresh data load
- No performance impact from number of companies

## Customization

### Adding More Companies (Future Enhancement)

Currently, the system uses 5 default companies. To add more:

1. Update `DEFAULT_COMPANIES` array in `app.js`
2. Add new company object with unique ID, name, and industry
3. Sample data will automatically generate

```javascript
const DEFAULT_COMPANIES = [
    // ... existing companies ...
    { id: 'new-company', name: 'New Company Name', industry: 'Industry' }
];
```

### Company Management UI (Future Enhancement)

Potential features:
- Create custom companies
- Edit company names and industries
- Delete companies (with data)
- Import/export company data
- Company logos and branding
- Industry-specific categories

## Common Scenarios

### Scenario 1: Switching to Review Previous Month

1. Select "Green Energy Solutions"
2. Filter transactions by last month
3. Review expenses and income
4. Export to CSV for records
5. Switch to "Tech Innovations Inc."
6. Continue working without data loss

### Scenario 2: Comparing Company Performance

1. Open "Tech Innovations Inc."
2. Note total income and expenses from dashboard
3. Switch to "Creative Studio LLC"
4. Compare metrics
5. Switch between companies to analyze trends

### Scenario 3: Adding Transactions to Multiple Companies

1. Start in "Tech Innovations Inc."
2. Add Q1 transactions
3. Switch to "Consulting Group"
4. Add different Q1 transactions
5. Both companies maintain separate data

## Tips & Best Practices

1. **Regular Switching**: It's safe to switch companies frequently
2. **Naming Context**: Company names help identify data context quickly
3. **Export Regularly**: Export each company's data separately for backups
4. **Transaction Tags**: Use consistent tags within each company
5. **Dashboard Review**: Check each company's dashboard periodically

## Troubleshooting

### Issue: Don't see company selector
**Solution**: Make sure you're logged in. Company selector only appears after authentication.

### Issue: Switched companies accidentally
**Solution**: Click company selector and switch back. Your data is safe.

### Issue: Transaction appears in wrong company
**Solution**: Each transaction is locked to its company. Delete and recreate in correct company.

### Issue: Want to merge company data
**Solution**: Currently not supported. Export both to CSV and merge externally.

### Issue: Lost which company I was in
**Solution**: Current company name is always displayed in the header.

## Future Enhancements

Potential features for future versions:

- [ ] Create custom companies
- [ ] Edit company details
- [ ] Delete companies with confirmation
- [ ] Transfer transactions between companies
- [ ] Company search/filter
- [ ] Company-specific categories
- [ ] Company color coding
- [ ] Consolidated multi-company reports
- [ ] Company logos and branding
- [ ] Company notes and descriptions
- [ ] Archive inactive companies
- [ ] Company duplication (clone settings)

## Files Modified

- `index.html` - Added company selector UI and modal
- `styles.css` - Added company selector and item styling
- `app.js` - Complete company management logic
- `PROJECT_LOG.md` - Documented feature
- `COMPANIES.md` - This documentation file

## Code Locations

### HTML
- Company selector button: Line ~73 in `index.html`
- Company modal: Lines ~285-296 in `index.html`

### CSS
- Company selector styles: Lines ~165-230 in `styles.css`
- Company modal responsiveness: Lines ~734-747 in `styles.css`

### JavaScript
- Company constants: Lines ~15-21 in `app.js`
- Company management: Lines ~115-180 in `app.js`
- Sample data generation: Lines ~1082-1195 in `app.js`
- Company UI rendering: Lines ~1270-1310 in `app.js`

---

**Feature Added**: February 20, 2026
**Status**: Fully Functional
**Companies**: 5 default companies
**Transactions Per Company**: 20-100 (automatically generated)
**Tested**: ✅ Ready for multi-company use
