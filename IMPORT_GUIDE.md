# QuickBooks Import Guide

This guide explains how to import transactions from QuickBooks into Business Transaction Manager.

## 📥 Quick Start

1. Export transactions from QuickBooks as CSV
2. In Business Transaction Manager, go to **Transactions** tab
3. Click **"Import QuickBooks"** button
4. Select your CSV file
5. Review the preview
6. Click **"Import"** to add transactions to current company

### 🎯 Try It Now!

A sample QuickBooks CSV file is included: `sample_quickbooks.csv`

This file contains 18 sample transactions you can import to test the feature:
- 6 Income transactions (Invoices, Deposits)
- 12 Expense transactions (Bills, Expenses, Checks)
- Various categories (Sales, Rent, Utilities, Salaries, etc.)
- Dates from January-February 2026

**To test**: Click "Import QuickBooks" and select `sample_quickbooks.csv`

## 📊 Exporting from QuickBooks

### QuickBooks Online

1. Go to **Reports** → **Custom Reports** → **Transaction List**
2. Select date range you want to export
3. Click **"Export"** → **"Export to Excel"**
4. Save the file as CSV format

Or:

1. Go to **Reports** → **Who owes you** → **Customer Balance Detail**
2. Or **Reports** → **What you owe** → **Vendor Balance Detail**
3. Click gear icon → **Export to Excel**
4. Save as CSV

### QuickBooks Desktop

1. Go to **Reports** → **Custom Reports** → **Transaction Detail**
2. Select date range
3. Click **Export** button
4. Choose **CSV** format
5. Save the file

### Alternative: Use Transaction List

1. **Reports** → **Accountant & Taxes** → **Transaction List by Date**
2. Set your date range
3. Click **Excel** button → **Create New Worksheet**
4. In Excel, **File** → **Save As** → Choose **CSV** format

## 📋 Required CSV Format

Your CSV file should include these columns (column names may vary):

| Column | Alternative Names | Required | Description |
|--------|------------------|----------|-------------|
| Date | Transaction Date, Txn Date | ✅ Yes | Transaction date |
| Type | Transaction Type | ✅ Yes | Transaction type (Invoice, Bill, etc.) |
| Amount | Total, Debit, Credit | ✅ Yes | Transaction amount |
| Name | Customer, Vendor | ⚠️ Optional | Customer or vendor name |
| Memo | Description, Memo/Description | ⚠️ Optional | Transaction details |
| Account | Account Name, Category | ⚠️ Optional | Account for categorization |

### Example CSV Format

```csv
Date,Type,Name,Memo,Account,Amount
01/15/2026,Invoice,Acme Corp,Website design services,Sales,5000.00
01/20/2026,Expense,Office Depot,Office supplies,Supplies,250.00
01/25/2026,Bill,Landlord LLC,Office rent - January,Rent,1200.00
02/01/2026,Deposit,First Bank,Client payment,Sales,3500.00
02/05/2026,Check,Electric Co,Utility bill,Utilities,450.00
```

## 🔄 How Import Works

### 1. Transaction Type Mapping

The importer automatically determines if a transaction is income or expense:

**Income Types** (imported as Income):
- Invoice
- Deposit
- Payment
- Sales Receipt
- Payment Received
- Income

**Expense Types** (imported as Expense):
- Bill
- Expense
- Check
- Credit Card
- Purchase
- Vendor Payment

### 2. Category Mapping

QuickBooks accounts are automatically mapped to our categories:

**Income Categories**:
- Sales accounts → **Sales**
- Service accounts → **Services**
- Other → **Other Income**

**Expense Categories**:
- Rent/Lease → **Rent**
- Utilities/Electric/Water/Internet → **Utilities**
- Salary/Payroll/Wages → **Salaries**
- Marketing/Advertising/Ads → **Marketing**
- Travel/Mileage → **Travel**
- Office/Supplies → **Office Supplies**
- Equipment/Computer/Software → **Equipment**
- Other → **Other Expenses**

### 3. Amount Handling

- Positive amounts are treated based on transaction type
- Negative amounts are automatically converted to expenses
- Amounts are always stored as positive numbers
- Currency symbols are stripped automatically

### 4. Date Formats Supported

The importer recognizes these date formats:
- `MM/DD/YYYY` (QuickBooks US format) - e.g., 01/15/2026
- `YYYY-MM-DD` (ISO format) - e.g., 2026-01-15
- `MM-DD-YYYY` (Alternative format) - e.g., 01-15-2026

### 5. Tags Creation

- Customer/Vendor names are automatically added as tags
- Names are converted to lowercase and spaces replaced with hyphens
- Example: "Acme Corp" becomes tag "acme-corp"

## 📝 Step-by-Step Import Process

### Step 1: Prepare Your CSV File

1. Export from QuickBooks (see above)
2. Open in Excel or text editor
3. Verify required columns are present
4. Check date format is consistent
5. Save as CSV if needed

### Step 2: Import in Application

1. **Login** to Business Transaction Manager
2. **Select Company** where you want to import (use company selector)
3. Go to **Transactions** tab
4. Click **"Import QuickBooks"** button
5. Instructions modal appears

### Step 3: Select File

1. Click anywhere in the modal or use file selector
2. Browse to your CSV file
3. Select the file
4. File is automatically processed

### Step 4: Review Preview

The preview shows:
- ✅ Number of transactions found
- ✅ Count of income vs expense transactions
- ✅ First 50 transactions in table format
- ✅ How each transaction will be imported (date, type, category, amount)

**Review for:**
- Correct dates
- Proper income/expense classification
- Appropriate category mapping
- Reasonable amounts

### Step 5: Import or Cancel

- Click **"Import X Transactions"** to add all to current company
- Or click **"Cancel"** to abort and try again
- Imported transactions are added immediately
- Dashboard and charts update automatically

## ✅ Post-Import

After importing:

1. **Review Dashboard** - Check totals make sense
2. **Check Transactions Table** - Verify all imported correctly
3. **Edit if Needed** - You can edit any transaction
4. **Add Tags** - Manually add more specific tags if desired
5. **Categorize** - Change categories if auto-mapping was incorrect

## 🎯 Best Practices

### Before Importing

- ✅ **Backup Current Data**: Export current transactions to CSV first
- ✅ **Clean Your Data**: Remove unnecessary columns from QuickBooks export
- ✅ **Check Date Range**: Don't import duplicates - verify date range
- ✅ **Select Right Company**: Make sure you're importing to correct company
- ✅ **Test with Small File**: Try importing 10-20 transactions first

### During Import

- ✅ **Review Preview Carefully**: Check categories and types before confirming
- ✅ **Watch for Errors**: If preview shows unexpected data, cancel and fix CSV
- ✅ **Note Missing Data**: Some fields may be blank if not in CSV

### After Importing

- ✅ **Verify Totals**: Compare dashboard totals with QuickBooks
- ✅ **Spot Check**: Review random transactions for accuracy
- ✅ **Fix Categories**: Update any incorrectly categorized items
- ✅ **Add Descriptions**: Enhance descriptions if they're generic
- ✅ **Export Backup**: Export the merged data as backup

## 🔧 Troubleshooting

### Issue: "No valid data found in CSV file"

**Causes:**
- CSV file is empty
- CSV has only headers, no data rows
- File encoding is incorrect

**Solutions:**
- Open CSV in text editor to verify data exists
- Re-export from QuickBooks
- Ensure file is saved as UTF-8 CSV

### Issue: "Could not parse any valid transactions"

**Causes:**
- Missing required columns (Date, Type, Amount)
- Date format not recognized
- Amounts are not numeric

**Solutions:**
- Verify CSV has Date, Type, and Amount columns
- Check dates are in supported format (MM/DD/YYYY)
- Ensure amounts are numbers (remove $ or other symbols)
- Open CSV in Excel and check data structure

### Issue: Wrong transaction types (income showing as expense)

**Causes:**
- QuickBooks Type column has unexpected values
- Amount is negative

**Solutions:**
- Check Type column in CSV for correct values
- Manually edit CSV to use standard types (Invoice, Bill, etc.)
- After import, edit transactions to change type

### Issue: Categories are "Other Expenses" or "Other Income"

**Cause:**
- Account names don't match our mapping keywords

**Solution:**
- After import, manually update categories
- Or edit CSV Account column to use these keywords:
  - For Rent: Use "Rent" or "Lease"
  - For Utilities: Use "Utilities" or "Electric"
  - For Salaries: Use "Salary" or "Payroll"
  - etc.

### Issue: Dates are incorrect

**Causes:**
- Date format confusion (MM/DD vs DD/MM)
- Dates in unsupported format

**Solutions:**
- Check CSV date format
- Convert dates to MM/DD/YYYY format in Excel before export
- Example: If dates show as 2026-01-15, that's fine
- If dates show as 15-Jan-2026, convert to MM/DD/YYYY

### Issue: Duplicate transactions after import

**Cause:**
- Imported same file twice
- Date range overlaps with existing transactions

**Solution:**
- Before importing, check existing transaction dates
- Don't import same date range twice
- If duplicates exist, manually delete them

### Issue: Special characters look wrong

**Cause:**
- Encoding issue with CSV

**Solution:**
- Save CSV as UTF-8 encoding
- In Excel: Save As → CSV UTF-8
- Or use Notepad++ to convert encoding

## 📊 Example Scenarios

### Scenario 1: Monthly Import

**Goal**: Import last month's transactions from QuickBooks

1. In QuickBooks: Export transactions for last month only
2. Save as `january_2026.csv`
3. In Business Transaction Manager:
   - Select the company (e.g., "Tech Innovations Inc.")
   - Click "Import QuickBooks"
   - Select `january_2026.csv`
   - Review 50 transactions preview
   - Confirm import
4. Check dashboard shows updated totals
5. Export backup: `tech_innovations_through_jan_2026.csv`

### Scenario 2: Year-End Import

**Goal**: Import entire year for tax preparation

1. In QuickBooks: Export full year (01/01/2025 - 12/31/2025)
2. Save as `year_2025.csv`
3. In Business Transaction Manager:
   - Create dedicated company for 2025 tax prep (or use existing)
   - Import the CSV file
   - Review categories for tax purposes
   - Add tax-related tags (e.g., "tax-deductible", "business-expense")
4. Export by category for tax forms

### Scenario 3: Multi-Company Setup

**Goal**: Import different QuickBooks accounts as separate companies

1. Export from QuickBooks Company A
2. In Business Transaction Manager:
   - Switch to Company A (e.g., "Tech Innovations")
   - Import QuickBooks CSV
3. Export from QuickBooks Company B
4. In Business Transaction Manager:
   - Switch to Company B (e.g., "Consulting Group")
   - Import QuickBooks CSV
5. Compare performance across companies using dashboard

## ⚠️ Important Notes

### Data Privacy
- Import happens entirely in your browser
- CSV file is never uploaded to any server
- Data stays in your browser's localStorage

### Limitations
- Maximum CSV file size: ~5 MB (depends on browser)
- Large files may take a moment to process
- Preview limited to first 50 transactions (all are imported)

### What's NOT Imported
- ❌ Customer/Vendor contact information
- ❌ Account balances
- ❌ Invoices details (line items)
- ❌ Payment methods
- ❌ Check numbers
- ❌ Class/Department tracking
- ❌ Job/Project details

Only core transaction data (date, type, amount, description) is imported.

## 🆘 Need Help?

### Common Questions

**Q: Can I import from other accounting software?**
A: Yes! As long as it exports to CSV with Date, Type, and Amount columns. You may need to adjust column names to match QuickBooks format.

**Q: Can I undo an import?**
A: No automatic undo. Before importing, export current transactions as backup. You can then manually delete imported transactions if needed.

**Q: Will this overwrite my existing transactions?**
A: No. Import adds new transactions, doesn't modify existing ones. You may get duplicates if you import the same data twice.

**Q: Can I import to multiple companies at once?**
A: No. Import happens to current company only. Switch companies and import separately for each.

**Q: What if my CSV has different column names?**
A: The importer tries multiple column name variations (Date/Transaction Date/Txn Date, etc.). If it doesn't work, rename your columns to match the format above.

## 📚 Related Documentation

- **[README.md](README.md)** - Main documentation
- **[QUICK_START.md](QUICK_START.md)** - Getting started guide
- **[DATA_STORAGE.md](DATA_STORAGE.md)** - How data is stored

## 🎉 Success Tips

1. **Start Small**: Import 1 month before importing full year
2. **Review Categories**: Auto-mapping is smart but not perfect
3. **Add Tags**: Enhance imported data with custom tags
4. **Export Regularly**: Keep CSV backups of all data
5. **Clean As You Go**: Fix categories and descriptions after import

---

**Feature Added**: February 2026
**Supported Format**: QuickBooks CSV exports
**Status**: ✅ Ready to use!
