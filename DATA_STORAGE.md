# Data Storage Architecture

## 📍 Storage Location

All data is stored in your **browser's localStorage** - a built-in browser feature for storing data locally.

**Path**: Your browser stores this data somewhere like:
- **Chrome (Mac)**: `~/Library/Application Support/Google/Chrome/Default/Local Storage`
- **Chrome (Windows)**: `C:\Users\YourName\AppData\Local\Google\Chrome\User Data\Default\Local Storage`
- **Firefox**: `~/Library/Application Support/Firefox/Profiles/xxx.default/storage`
- **Safari**: `~/Library/Safari/LocalStorage`

> 💡 **Important**: You never need to access these files directly! The browser manages them for you.

## 🗄️ Storage Structure

### localStorage Keys Used

The application uses the following localStorage keys:

| Key | Stores | Example |
|-----|--------|---------|
| `users` | All user accounts | `{"john": {...}, "mary": {...}}` |
| `currentUser` | Currently logged in user | `"john"` |
| `currentCompany_{username}` | User's selected company | `"tech-innovations"` |
| `transactions_{username}_{companyId}` | Company transactions | Array of transaction objects |
| `companies` | List of companies | Array of company objects |

### Example Storage Keys

If user "**john**" has data in "**Tech Innovations Inc.**" and "**Green Energy Solutions**":

```
localStorage keys:
├── users
├── currentUser
├── currentCompany_john
├── companies
├── transactions_john_tech-innovations
└── transactions_john_green-energy
```

If user "**mary**" also uses the app on the same browser:

```
localStorage keys:
├── users
├── currentUser
├── currentCompany_john
├── currentCompany_mary
├── companies
├── transactions_john_tech-innovations
├── transactions_john_green-energy
├── transactions_mary_tech-innovations
└── transactions_mary_creative-studio
```

## 📊 Data Formats

### Users Data
```javascript
// Key: "users"
{
  "john": {
    "username": "john",
    "passwordHash": "abc123xyz",
    "createdAt": 1708473600000
  },
  "mary": {
    "username": "mary",
    "passwordHash": "def456uvw",
    "createdAt": 1708560000000
  }
}
```

### Companies Data
```javascript
// Key: "companies"
[
  {
    "id": "tech-innovations",
    "name": "Tech Innovations Inc.",
    "industry": "Technology"
  },
  {
    "id": "green-energy",
    "name": "Green Energy Solutions",
    "industry": "Energy"
  }
  // ... 3 more companies
]
```

### Transactions Data
```javascript
// Key: "transactions_john_tech-innovations"
[
  {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "type": "income",
    "amount": 5000,
    "category": "Sales",
    "tags": ["revenue", "product"],
    "description": "Product sales for January",
    "date": "2026-01-15",
    "createdAt": 1708473600000,
    "updatedAt": 1708473600000
  },
  {
    "id": "660e8400-e29b-41d4-a716-446655440001",
    "type": "expense",
    "amount": 1200,
    "category": "Rent",
    "tags": ["monthly", "fixed"],
    "description": "Office rent",
    "date": "2026-01-01",
    "createdAt": 1708387200000,
    "updatedAt": 1708387200000
  }
  // ... more transactions
]
```

### Current User
```javascript
// Key: "currentUser"
"john"
```

### Current Company (per user)
```javascript
// Key: "currentCompany_john"
"tech-innovations"
```

## 🔍 How to View Your Data

### Option 1: Browser DevTools (Easy)

1. **Open DevTools**:
   - Chrome/Edge: Press `F12` or `Cmd+Option+I` (Mac) / `Ctrl+Shift+I` (Windows)
   - Firefox: Press `F12`
   - Safari: `Cmd+Option+C`

2. **Navigate to Storage**:
   - **Chrome/Edge**: Go to **Application** tab → **Storage** → **Local Storage** → `file://` or your domain
   - **Firefox**: Go to **Storage** tab → **Local Storage**
   - **Safari**: Go to **Storage** tab → **Local Storage**

3. **View Data**:
   - You'll see all the keys listed (users, companies, transactions_john_tech-innovations, etc.)
   - Click any key to see its JSON data

### Option 2: JavaScript Console

Open browser console (`F12` → **Console** tab) and run:

```javascript
// View all localStorage keys
console.log(Object.keys(localStorage));

// View all users
console.log(JSON.parse(localStorage.getItem('users')));

// View all companies
console.log(JSON.parse(localStorage.getItem('companies')));

// View your transactions (replace with your username and company)
console.log(JSON.parse(localStorage.getItem('transactions_john_tech-innovations')));

// View current user
console.log(localStorage.getItem('currentUser'));

// See total storage used
let total = 0;
for (let key in localStorage) {
    if (localStorage.hasOwnProperty(key)) {
        total += localStorage[key].length + key.length;
    }
}
console.log(`Total localStorage used: ${(total / 1024).toFixed(2)} KB`);
```

## 💾 Storage Limits

### Browser Limits

| Browser | localStorage Limit |
|---------|-------------------|
| Chrome | ~10 MB |
| Firefox | ~10 MB |
| Safari | ~5 MB |
| Edge | ~10 MB |

### Estimated Capacity

**Per Transaction**: ~200-300 bytes

**Example Calculations**:
- 100 transactions ≈ 25 KB
- 500 transactions ≈ 125 KB
- 1,000 transactions ≈ 250 KB
- 5,000 transactions ≈ 1.25 MB

With 10 MB limit, you can store:
- **~35,000-50,000 transactions** before hitting the limit
- Multiple users, each with 5 companies
- Years of transaction data!

## 🔒 Data Privacy & Security

### ✅ Good News

1. **Local Only**: Data never leaves your computer
2. **Browser Isolated**: Each browser has separate storage
3. **Domain Isolated**: Data only accessible from the same origin
4. **No Server**: Nothing is uploaded or synced
5. **Private**: Other users on your computer see their own data

### ⚠️ Important Warnings

1. **Browser-Specific**: Data in Chrome ≠ Data in Firefox
2. **Device-Specific**: Data on laptop ≠ Data on phone
3. **Not Synced**: No cloud backup or sync across devices
4. **Clears with Browser**: Clearing browser data deletes everything
5. **Incognito Mode**: Data is lost when closing incognito window
6. **Accessible Locally**: Anyone with access to your computer can view localStorage

### 🔐 Security Considerations

**Passwords**:
- Stored as simple hashes (NOT cryptographically secure)
- Anyone with console access can view localStorage
- **Not suitable for real sensitive data**

**Best For**:
- Personal use on your own devices
- Demo applications
- Learning projects
- Non-sensitive financial tracking

**NOT Suitable For**:
- Shared computers
- Public computers
- Storing real sensitive financial data
- Multi-device sync needs
- Collaborative work

## 🗑️ Managing Your Data

### Clear All Data

Open console (`F12`) and run:

```javascript
// Clear everything (ALL users, ALL data)
localStorage.clear();
location.reload();
```

### Clear Specific User's Data

```javascript
// Clear only John's data
for (let key in localStorage) {
    if (key.includes('john')) {
        localStorage.removeItem(key);
    }
}
location.reload();
```

### Clear Specific Company's Data

```javascript
// Clear only Tech Innovations data for John
localStorage.removeItem('transactions_john_tech-innovations');
location.reload();
```

### Export Before Clearing

Before clearing data, export to CSV:
1. Login to the application
2. Go to each company
3. Go to Transactions tab
4. Click "Export CSV"
5. Save the file
6. Repeat for all companies

## 📤 Backup Your Data

### Manual Backup

**Option 1: Export to CSV**
1. Login to app
2. Switch to each company
3. Export each company's transactions
4. Save all CSV files

**Option 2: Console Export**
```javascript
// Export all data as JSON
const backup = {
    users: localStorage.getItem('users'),
    companies: localStorage.getItem('companies'),
    transactions: {}
};

// Export all transaction keys
for (let key in localStorage) {
    if (key.startsWith('transactions_')) {
        backup.transactions[key] = localStorage.getItem(key);
    }
}

// Download as JSON file
const dataStr = JSON.stringify(backup, null, 2);
const dataBlob = new Blob([dataStr], {type: 'application/json'});
const url = URL.createObjectURL(dataBlob);
const link = document.createElement('a');
link.href = url;
link.download = 'backup_' + new Date().toISOString().split('T')[0] + '.json';
link.click();
```

### Restore from Backup

```javascript
// Load your backup JSON file content, then:
const backup = /* paste your backup JSON here */;

localStorage.setItem('users', backup.users);
localStorage.setItem('companies', backup.companies);

for (let key in backup.transactions) {
    localStorage.setItem(key, backup.transactions[key]);
}

location.reload();
```

## 🔄 When Data is Saved

Data is automatically saved:
- ✅ When you create a new transaction
- ✅ When you edit a transaction
- ✅ When you delete a transaction
- ✅ When you register a new user
- ✅ When you login
- ✅ When you switch companies

**No manual save needed!** Everything is instant and automatic.

## 🌐 After Deployment to GitHub Pages

When you deploy to GitHub Pages:

**Each User's Browser**:
- Data stored in their browser's localStorage
- URL: `https://yourusername.github.io/business-transaction-manager/`
- Storage key becomes domain-based: `https://yourusername.github.io`

**Example**:
- Alice visits your site → Her data in her browser
- Bob visits your site → His data in his browser
- Alice and Bob **cannot** see each other's data
- Each person maintains separate, private data

**Storage Keys on GitHub Pages**:
```
Origin: https://yourusername.github.io
localStorage:
├── users (Alice's account on her browser)
├── currentUser (Alice on her browser)
├── companies (shared list)
└── transactions_alice_tech-innovations (Alice's data)

vs

Origin: https://yourusername.github.io
localStorage:
├── users (Bob's account on his browser)
├── currentUser (Bob on his browser)
├── companies (shared list)
└── transactions_bob_tech-innovations (Bob's data)
```

## ❓ Common Questions

**Q: Can others see my data?**
A: Only if they have physical access to your computer and your browser. Data is stored locally and never sent to any server.

**Q: Will data sync across my devices?**
A: No. Data is stored per-browser, per-device. Use CSV export to transfer data.

**Q: What happens if I clear my browser cache?**
A: If you clear "Site Data" or "Cookies and Site Data", you'll lose all transactions. Export regularly!

**Q: Is there a database?**
A: No traditional database. It uses browser localStorage (like a mini database in your browser).

**Q: Can I move data to another computer?**
A: Yes! Export to CSV from one computer, then manually add transactions on the other.

**Q: How secure is this?**
A: Secure for personal use. Not suitable for storing real sensitive financial data on shared/public computers.

**Q: What if localStorage is full?**
A: The app will show an error. Export old data to CSV, then delete old transactions.

## 🔧 Troubleshooting

### Data Not Saving

**Check localStorage is enabled**:
```javascript
// Run in console
try {
    localStorage.setItem('test', '1');
    localStorage.removeItem('test');
    console.log('✅ localStorage is working');
} catch(e) {
    console.log('❌ localStorage is disabled:', e);
}
```

**Common Causes**:
- Private/Incognito mode (some browsers limit localStorage)
- Browser settings disable storage
- Storage quota exceeded
- Browser extensions blocking storage

### Data Disappeared

**Possible Reasons**:
- Cleared browser data
- Different browser or device
- Incognito mode closed
- Browser updated and reset data
- Storage quota exceeded and data was cleared

**Solution**: Restore from CSV exports or backup JSON

## 📋 Summary

**Storage Type**: Browser localStorage
**Location**: Browser's local storage (managed automatically)
**Structure**: JSON data with specific key patterns
**Capacity**: ~10 MB (35,000+ transactions)
**Privacy**: Completely local, never sent to servers
**Backup**: Export to CSV regularly
**Security**: Suitable for personal use, not for sensitive data
**Sync**: No sync - device and browser specific

---

**Best Practice**: Export your data to CSV monthly for backup! 💾
