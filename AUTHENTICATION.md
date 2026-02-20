# User Authentication Feature

## Overview
The Business Transaction Manager now includes a complete user authentication system that allows multiple users to maintain separate transaction data on the same device.

## Features

### User Registration
- Create new accounts with username and password
- Username must be at least 3 characters
- Password must be at least 6 characters
- Password confirmation to prevent typos
- Duplicate username prevention

### User Login
- Secure login with username and password
- Simple client-side password hashing
- Session persistence (stays logged in after page refresh)
- Error messages for invalid credentials

### Session Management
- Automatic session persistence using localStorage
- User remains logged in until they explicitly logout
- Current username displayed in header

### Data Isolation
- Each user has completely separate transaction data
- Transactions are stored with user-specific keys
- No user can access another user's data
- First-time users get sample data automatically

### Logout
- Logout button in header
- Confirmation dialog to prevent accidental logout
- Clears session and returns to login screen

## How to Use

### Creating Your First Account

1. Open the application
2. You'll see the login screen
3. Click "Register" link below the login form
4. Enter a username (minimum 3 characters)
5. Enter a password (minimum 6 characters)
6. Confirm your password
7. Click "Register"
8. After successful registration, click "Login" to return to login form
9. Enter your credentials and login

### Logging In

1. Enter your username
2. Enter your password
3. Click "Login"
4. You'll be taken to the dashboard with your transactions

### Using the Application

Once logged in:
- Your username appears in the top right corner
- All transaction operations work the same as before
- Your data is automatically saved under your user account
- You can logout anytime using the "Logout" button

### Switching Users

1. Click "Logout" in the header
2. Confirm logout
3. Login with different credentials
4. Each user will see only their own transactions

## Technical Details

### Data Storage Structure

**Users**: Stored in `localStorage` with key `users`
```javascript
{
  "username": {
    "username": "string",
    "passwordHash": "string",
    "createdAt": timestamp
  }
}
```

**Transactions**: Stored per user with key `transactions_username`
```javascript
// Stored as: transactions_john
// Stored as: transactions_mary
```

**Current Session**: Stored with key `currentUser`
```javascript
// Value: "username"
```

### Security Notes

⚠️ **Important Security Information**

This is a **client-side only** authentication system suitable for:
- Personal use on your own device
- Demo/prototype applications
- Local data organization

This is **NOT suitable for**:
- Production web applications
- Storing sensitive financial data
- Multi-device access
- Protection against malicious actors with device access

**Why?**
- Passwords are hashed but anyone with console access can view localStorage
- No server-side validation
- No secure communication (no HTTPS requirement)
- No password recovery mechanism
- Hashing is simple and could be reversed

**For production use**, you would need:
- Server-side authentication
- Secure password hashing (bcrypt, Argon2)
- HTTPS encryption
- JWT or session tokens
- Password recovery flows
- Rate limiting on login attempts
- Multi-factor authentication

### Password Hashing

The application uses a simple hash function for passwords:
```javascript
function simpleHash(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash;
    }
    return hash.toString(36);
}
```

This provides basic protection but is not cryptographically secure.

## Testing the Feature

### Test Scenario 1: Multiple Users

1. Create user "Alice" with password "alice123"
2. Add some transactions for Alice
3. Logout
4. Create user "Bob" with password "bob456"
5. Add different transactions for Bob
6. Logout and login as Alice
7. Verify you only see Alice's transactions
8. Logout and login as Bob
9. Verify you only see Bob's transactions

### Test Scenario 2: Session Persistence

1. Login as any user
2. Add some transactions
3. Refresh the page (F5 or Cmd+R)
4. Verify you're still logged in
5. Verify your transactions are still there

### Test Scenario 3: Sample Data

1. Create a new user
2. Login for the first time
3. Verify sample data is automatically generated
4. Each new user gets their own sample data

## Common Issues & Solutions

### Issue: Can't login after registering
**Solution**: Make sure to click "Login" link after registration, then enter your credentials

### Issue: Lost password
**Solution**: Unfortunately, there's no password recovery. You'll need to:
- Use browser console: `localStorage.removeItem('users')` (deletes all users)
- Or create a new username

### Issue: Want to clear all data
**Solution**: Open browser console and run:
```javascript
// Clear everything
localStorage.clear();
location.reload();

// Or clear specific items
localStorage.removeItem('users');
localStorage.removeItem('currentUser');
localStorage.removeItem('transactions_username');
```

### Issue: Sample data appears every time I login
**Solution**: This shouldn't happen. If it does:
- Check browser console for errors
- Try clearing cache and hard reload

## Future Enhancements

Potential improvements for the authentication system:

- [ ] Password strength indicator
- [ ] "Remember me" checkbox
- [ ] Password reset via email (requires backend)
- [ ] Profile management (change password, delete account)
- [ ] Account creation timestamp display
- [ ] Activity log (last login time)
- [ ] Export/import user data with password
- [ ] Guest/demo mode without registration
- [ ] Social login integration (requires backend)
- [ ] Two-factor authentication

## Files Modified

- `index.html` - Added login screen and user menu UI
- `styles.css` - Added authentication styling
- `app.js` - Added complete authentication logic
- `PROJECT_LOG.md` - Documented new feature
- `AUTHENTICATION.md` - This documentation file

## Code Locations

### HTML
- Login screen: Lines 11-65 in `index.html`
- User menu: Lines 70-78 in `index.html`

### CSS
- Login styles: Lines 52-137 in `styles.css`
- User menu styles: Lines 162-178 in `styles.css`

### JavaScript
- Authentication functions: Lines 15-107 in `app.js`
- User-specific storage: Lines 112-145 in `app.js`
- Authentication UI: Lines 1050-1120 in `app.js`

---

**Feature Added**: February 20, 2026
**Status**: Fully Functional
**Tested**: ✅ Ready for use
