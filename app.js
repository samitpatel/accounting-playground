// ============================================================================
// DATA MODEL & CONSTANTS
// ============================================================================

const CATEGORIES = {
    income: ['Sales', 'Services', 'Other Income'],
    expense: ['Office Supplies', 'Travel', 'Utilities', 'Rent', 'Salaries', 'Marketing', 'Equipment', 'Other Expenses']
};

const ITEMS_PER_PAGE = 20;

const DEFAULT_COMPANIES = [
    { id: 'tech-innovations', name: 'Tech Innovations Inc.', industry: 'Technology' },
    { id: 'green-energy', name: 'Green Energy Solutions', industry: 'Energy' },
    { id: 'creative-studio', name: 'Creative Studio LLC', industry: 'Media' },
    { id: 'food-services', name: 'Gourmet Food Services', industry: 'Food & Beverage' },
    { id: 'consulting-group', name: 'Elite Consulting Group', industry: 'Consulting' }
];

// ============================================================================
// AUTHENTICATION & COMPANY MANAGEMENT
// ============================================================================

let currentUser = null;
let currentCompany = null;

function simpleHash(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash;
    }
    return hash.toString(36);
}

function loadUsers() {
    try {
        const data = localStorage.getItem('users');
        return data ? JSON.parse(data) : {};
    } catch (error) {
        console.error('Error loading users:', error);
        return {};
    }
}

function saveUsers(users) {
    try {
        localStorage.setItem('users', JSON.stringify(users));
        return true;
    } catch (error) {
        console.error('Error saving users:', error);
        return false;
    }
}

function registerUser(username, password) {
    const users = loadUsers();

    if (users[username]) {
        return { success: false, error: 'Username already exists' };
    }

    if (username.length < 3) {
        return { success: false, error: 'Username must be at least 3 characters' };
    }

    if (password.length < 6) {
        return { success: false, error: 'Password must be at least 6 characters' };
    }

    users[username] = {
        username: username,
        passwordHash: simpleHash(password),
        createdAt: Date.now()
    };

    saveUsers(users);
    return { success: true };
}

function loginUser(username, password) {
    const users = loadUsers();
    const user = users[username];

    if (!user) {
        return { success: false, error: 'Invalid username or password' };
    }

    if (user.passwordHash !== simpleHash(password)) {
        return { success: false, error: 'Invalid username or password' };
    }

    currentUser = username;
    localStorage.setItem('currentUser', username);
    return { success: true };
}

function logoutUser() {
    currentUser = null;
    currentCompany = null;
    localStorage.removeItem('currentUser');
}

function getCurrentUser() {
    if (!currentUser) {
        currentUser = localStorage.getItem('currentUser');
    }
    return currentUser;
}

function isAuthenticated() {
    return getCurrentUser() !== null;
}

// ============================================================================
// COMPANY MANAGEMENT
// ============================================================================

function loadCompanies() {
    try {
        const data = localStorage.getItem('companies');
        if (data) {
            return JSON.parse(data);
        } else {
            // Initialize with default companies
            saveCompanies(DEFAULT_COMPANIES);
            return DEFAULT_COMPANIES;
        }
    } catch (error) {
        console.error('Error loading companies:', error);
        return DEFAULT_COMPANIES;
    }
}

function saveCompanies(companies) {
    try {
        localStorage.setItem('companies', JSON.stringify(companies));
        return true;
    } catch (error) {
        console.error('Error saving companies:', error);
        return false;
    }
}

function getCurrentCompany() {
    if (!currentCompany) {
        const user = getCurrentUser();
        if (user) {
            const stored = localStorage.getItem(`currentCompany_${user}`);
            if (stored) {
                currentCompany = stored;
            } else {
                // Default to first company
                const companies = loadCompanies();
                currentCompany = companies[0].id;
                localStorage.setItem(`currentCompany_${user}`, currentCompany);
            }
        }
    }
    return currentCompany;
}

function setCurrentCompany(companyId) {
    const user = getCurrentUser();
    if (user) {
        currentCompany = companyId;
        localStorage.setItem(`currentCompany_${user}`, companyId);
        return true;
    }
    return false;
}

function getCompanyById(companyId) {
    const companies = loadCompanies();
    return companies.find(c => c.id === companyId);
}

function getCompanyTransactionCount(companyId) {
    const user = getCurrentUser();
    if (!user) return 0;

    try {
        const key = `transactions_${user}_${companyId}`;
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data).length : 0;
    } catch (error) {
        return 0;
    }
}

// ============================================================================
// STATE MANAGEMENT
// ============================================================================

let state = {
    transactions: [],
    filteredTransactions: [],
    currentPage: 1,
    sortField: 'date',
    sortDirection: 'desc',
    filters: {
        search: '',
        type: '',
        category: '',
        dateStart: '',
        dateEnd: ''
    },
    editingId: null,
    listenersInitialized: false
};

let charts = {
    categoryPie: null,
    incomeExpense: null,
    topCategories: null
};

// ============================================================================
// LOCALSTORAGE OPERATIONS
// ============================================================================

function getTransactionKey() {
    const user = getCurrentUser();
    const company = getCurrentCompany();
    if (user && company) {
        return `transactions_${user}_${company}`;
    }
    return 'transactions';
}

function loadTransactions() {
    try {
        const key = getTransactionKey();
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : [];
    } catch (error) {
        console.error('Error loading transactions:', error);
        return [];
    }
}

function saveTransactions(transactions) {
    try {
        const key = getTransactionKey();
        localStorage.setItem(key, JSON.stringify(transactions));
        return true;
    } catch (error) {
        if (error.name === 'QuotaExceededError') {
            alert('Storage quota exceeded. Please export and delete some old transactions.');
        } else {
            console.error('Error saving transactions:', error);
        }
        return false;
    }
}

// ============================================================================
// TRANSACTION CRUD OPERATIONS
// ============================================================================

function createTransaction(transactionData) {
    const transaction = {
        id: crypto.randomUUID(),
        type: transactionData.type,
        amount: parseFloat(transactionData.amount),
        category: transactionData.category,
        tags: transactionData.tags || [],
        description: transactionData.description || '',
        date: transactionData.date,
        createdAt: Date.now(),
        updatedAt: Date.now()
    };

    state.transactions.push(transaction);
    saveTransactions(state.transactions);
    return transaction;
}

function updateTransaction(id, transactionData) {
    const index = state.transactions.findIndex(t => t.id === id);
    if (index === -1) return null;

    state.transactions[index] = {
        ...state.transactions[index],
        type: transactionData.type,
        amount: parseFloat(transactionData.amount),
        category: transactionData.category,
        tags: transactionData.tags || [],
        description: transactionData.description || '',
        date: transactionData.date,
        updatedAt: Date.now()
    };

    saveTransactions(state.transactions);
    return state.transactions[index];
}

function deleteTransaction(id) {
    state.transactions = state.transactions.filter(t => t.id !== id);
    saveTransactions(state.transactions);
}

function getTransaction(id) {
    return state.transactions.find(t => t.id === id);
}

// ============================================================================
// DATA FILTERING & SORTING
// ============================================================================

function applyFilters() {
    let filtered = [...state.transactions];

    // Search filter
    if (state.filters.search) {
        const search = state.filters.search.toLowerCase();
        filtered = filtered.filter(t =>
            t.description.toLowerCase().includes(search) ||
            t.category.toLowerCase().includes(search) ||
            t.amount.toString().includes(search) ||
            t.tags.some(tag => tag.toLowerCase().includes(search))
        );
    }

    // Type filter
    if (state.filters.type) {
        filtered = filtered.filter(t => t.type === state.filters.type);
    }

    // Category filter
    if (state.filters.category) {
        filtered = filtered.filter(t => t.category === state.filters.category);
    }

    // Date range filter
    if (state.filters.dateStart) {
        filtered = filtered.filter(t => t.date >= state.filters.dateStart);
    }
    if (state.filters.dateEnd) {
        filtered = filtered.filter(t => t.date <= state.filters.dateEnd);
    }

    state.filteredTransactions = filtered;
    applySorting();
}

function applySorting() {
    state.filteredTransactions.sort((a, b) => {
        let aVal = a[state.sortField];
        let bVal = b[state.sortField];

        if (state.sortField === 'amount') {
            aVal = parseFloat(aVal);
            bVal = parseFloat(bVal);
        }

        if (aVal < bVal) return state.sortDirection === 'asc' ? -1 : 1;
        if (aVal > bVal) return state.sortDirection === 'asc' ? 1 : -1;
        return 0;
    });

    state.currentPage = 1;
}

function getFilteredTransactionsByDateRange(days) {
    if (days === 'all') return state.transactions;

    const now = new Date();
    const startDate = new Date(now.getTime() - days * 24 * 60 * 60 * 1000);

    return state.transactions.filter(t => new Date(t.date) >= startDate);
}

// ============================================================================
// DASHBOARD CALCULATIONS
// ============================================================================

function calculateSummary(transactions) {
    const summary = {
        totalIncome: 0,
        totalExpenses: 0,
        netBalance: 0,
        transactionCount: transactions.length
    };

    transactions.forEach(t => {
        if (t.type === 'income') {
            summary.totalIncome += t.amount;
        } else {
            summary.totalExpenses += t.amount;
        }
    });

    summary.netBalance = summary.totalIncome - summary.totalExpenses;
    return summary;
}

function groupByCategory(transactions) {
    const groups = {};
    transactions.forEach(t => {
        if (!groups[t.category]) {
            groups[t.category] = 0;
        }
        groups[t.category] += t.amount;
    });
    return groups;
}

function groupByMonth(transactions) {
    const groups = {};
    transactions.forEach(t => {
        const date = new Date(t.date);
        const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;

        if (!groups[monthKey]) {
            groups[monthKey] = { income: 0, expense: 0 };
        }

        if (t.type === 'income') {
            groups[monthKey].income += t.amount;
        } else {
            groups[monthKey].expense += t.amount;
        }
    });
    return groups;
}

// ============================================================================
// UI RENDERING - DASHBOARD
// ============================================================================

function renderDashboard() {
    const dateRange = document.getElementById('dashboard-date-range').value;
    const transactions = getFilteredTransactionsByDateRange(dateRange === 'all' ? 'all' : parseInt(dateRange));

    renderSummaryCards(transactions);
    renderCharts(transactions);
}

function renderSummaryCards(transactions) {
    const summary = calculateSummary(transactions);

    document.getElementById('total-income').textContent = formatCurrency(summary.totalIncome);
    document.getElementById('total-expenses').textContent = formatCurrency(summary.totalExpenses);
    document.getElementById('net-balance').textContent = formatCurrency(summary.netBalance);
    document.getElementById('transaction-count').textContent = summary.transactionCount;
}

function renderCharts(transactions) {
    renderCategoryPieChart(transactions);
    renderIncomeExpenseChart(transactions);
    renderTopCategoriesChart(transactions);
}

function renderCategoryPieChart(transactions) {
    const expenses = transactions.filter(t => t.type === 'expense');
    const categoryData = groupByCategory(expenses);

    const labels = Object.keys(categoryData);
    const data = Object.values(categoryData);

    if (charts.categoryPie) {
        charts.categoryPie.destroy();
    }

    const ctx = document.getElementById('category-pie-chart').getContext('2d');
    charts.categoryPie = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: labels,
            datasets: [{
                data: data,
                backgroundColor: [
                    '#ef4444', '#f97316', '#f59e0b', '#84cc16',
                    '#10b981', '#14b8a6', '#06b6d4', '#3b82f6',
                    '#6366f1', '#8b5cf6', '#a855f7', '#ec4899'
                ]
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    position: 'bottom'
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return context.label + ': ' + formatCurrency(context.parsed);
                        }
                    }
                }
            }
        }
    });
}

function renderIncomeExpenseChart(transactions) {
    const monthlyData = groupByMonth(transactions);
    const sortedMonths = Object.keys(monthlyData).sort();

    const labels = sortedMonths.map(m => {
        const [year, month] = m.split('-');
        return new Date(year, month - 1).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
    });

    const incomeData = sortedMonths.map(m => monthlyData[m].income);
    const expenseData = sortedMonths.map(m => monthlyData[m].expense);

    if (charts.incomeExpense) {
        charts.incomeExpense.destroy();
    }

    const ctx = document.getElementById('income-expense-chart').getContext('2d');
    charts.incomeExpense = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [
                {
                    label: 'Income',
                    data: incomeData,
                    borderColor: '#10b981',
                    backgroundColor: 'rgba(16, 185, 129, 0.1)',
                    tension: 0.3
                },
                {
                    label: 'Expenses',
                    data: expenseData,
                    borderColor: '#ef4444',
                    backgroundColor: 'rgba(239, 68, 68, 0.1)',
                    tension: 0.3
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    position: 'bottom'
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return context.dataset.label + ': ' + formatCurrency(context.parsed.y);
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            return '$' + value.toLocaleString();
                        }
                    }
                }
            }
        }
    });
}

function renderTopCategoriesChart(transactions) {
    const expenses = transactions.filter(t => t.type === 'expense');
    const categoryData = groupByCategory(expenses);

    const sorted = Object.entries(categoryData)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 10);

    const labels = sorted.map(s => s[0]);
    const data = sorted.map(s => s[1]);

    if (charts.topCategories) {
        charts.topCategories.destroy();
    }

    const ctx = document.getElementById('top-categories-chart').getContext('2d');
    charts.topCategories = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Amount',
                data: data,
                backgroundColor: '#2563eb'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return formatCurrency(context.parsed.y);
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            return '$' + value.toLocaleString();
                        }
                    }
                }
            }
        }
    });
}

// ============================================================================
// UI RENDERING - TRANSACTIONS
// ============================================================================

function renderTransactionsTable() {
    const tbody = document.getElementById('transactions-tbody');
    const emptyState = document.getElementById('empty-state');

    if (state.filteredTransactions.length === 0) {
        tbody.innerHTML = '';
        emptyState.style.display = 'block';
        updatePagination();
        return;
    }

    emptyState.style.display = 'none';

    const start = (state.currentPage - 1) * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;
    const pageTransactions = state.filteredTransactions.slice(start, end);

    tbody.innerHTML = pageTransactions.map(t => `
        <tr>
            <td>${formatDate(t.date)}</td>
            <td><span class="type-badge ${t.type}">${t.type}</span></td>
            <td>${t.category}</td>
            <td>${t.description || '-'}</td>
            <td>
                <div class="tags-container">
                    ${t.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                </div>
            </td>
            <td class="amount-cell ${t.type}">${formatCurrency(t.amount)}</td>
            <td>
                <div class="action-buttons">
                    <button class="btn-icon" onclick="editTransaction('${t.id}')">✎</button>
                    <button class="btn-icon delete" onclick="confirmDelete('${t.id}')">✕</button>
                </div>
            </td>
        </tr>
    `).join('');

    updatePagination();
}

function updatePagination() {
    const totalPages = Math.ceil(state.filteredTransactions.length / ITEMS_PER_PAGE);

    document.getElementById('page-info').textContent = `Page ${state.currentPage} of ${totalPages || 1}`;
    document.getElementById('prev-page-btn').disabled = state.currentPage <= 1;
    document.getElementById('next-page-btn').disabled = state.currentPage >= totalPages;
}

function renderCategoryDropdown(selectId, type = null) {
    const select = document.getElementById(selectId);
    select.innerHTML = '<option value="">Select category</option>';

    if (type) {
        CATEGORIES[type].forEach(category => {
            const option = document.createElement('option');
            option.value = category;
            option.textContent = category;
            select.appendChild(option);
        });
    } else {
        // For filter dropdown, show all categories
        const allCategories = [...CATEGORIES.income, ...CATEGORIES.expense];
        allCategories.forEach(category => {
            const option = document.createElement('option');
            option.value = category;
            option.textContent = category;
            select.appendChild(option);
        });
    }
}

function updateTransactionTypeCategories() {
    const type = document.getElementById('transaction-type').value;
    renderCategoryDropdown('transaction-category', type);
}

// ============================================================================
// MODAL OPERATIONS
// ============================================================================

function openModal(modalId) {
    document.getElementById(modalId).classList.add('active');
}

function closeModal(modalId) {
    document.getElementById(modalId).classList.remove('active');
}

function openAddTransactionModal() {
    state.editingId = null;
    document.getElementById('modal-title').textContent = 'Add Transaction';
    document.getElementById('transaction-form').reset();
    document.getElementById('transaction-id').value = '';
    document.getElementById('transaction-date').value = new Date().toISOString().split('T')[0];
    updateTransactionTypeCategories();
    openModal('transaction-modal');
}

function editTransaction(id) {
    const transaction = getTransaction(id);
    if (!transaction) return;

    state.editingId = id;
    document.getElementById('modal-title').textContent = 'Edit Transaction';
    document.getElementById('transaction-id').value = transaction.id;
    document.getElementById('transaction-type').value = transaction.type;
    updateTransactionTypeCategories();
    document.getElementById('transaction-category').value = transaction.category;
    document.getElementById('transaction-amount').value = transaction.amount;
    document.getElementById('transaction-date').value = transaction.date;
    document.getElementById('transaction-description').value = transaction.description;
    document.getElementById('transaction-tags').value = transaction.tags.join(', ');

    openModal('transaction-modal');
}

function confirmDelete(id) {
    state.editingId = id;
    openModal('delete-modal');
}

// ============================================================================
// FORM HANDLING
// ============================================================================

function handleTransactionSubmit(e) {
    e.preventDefault();

    const formData = {
        type: document.getElementById('transaction-type').value,
        amount: document.getElementById('transaction-amount').value,
        category: document.getElementById('transaction-category').value,
        date: document.getElementById('transaction-date').value,
        description: document.getElementById('transaction-description').value,
        tags: document.getElementById('transaction-tags').value
            .split(',')
            .map(tag => tag.trim())
            .filter(tag => tag.length > 0)
    };

    const id = document.getElementById('transaction-id').value;

    if (id) {
        updateTransaction(id, formData);
    } else {
        createTransaction(formData);
    }

    closeModal('transaction-modal');
    applyFilters();
    renderTransactionsTable();
    renderDashboard();
}

function handleDeleteConfirm() {
    if (state.editingId) {
        deleteTransaction(state.editingId);
        state.editingId = null;
        closeModal('delete-modal');
        applyFilters();
        renderTransactionsTable();
        renderDashboard();
    }
}

// ============================================================================
// EXPORT FUNCTIONALITY
// ============================================================================

function exportToCSV() {
    const transactions = state.filteredTransactions.length > 0
        ? state.filteredTransactions
        : state.transactions;

    if (transactions.length === 0) {
        alert('No transactions to export');
        return;
    }

    const headers = ['Date', 'Type', 'Category', 'Description', 'Tags', 'Amount'];
    const rows = transactions.map(t => [
        t.date,
        t.type,
        t.category,
        escapeCsvField(t.description),
        escapeCsvField(t.tags.join(', ')),
        t.amount.toFixed(2)
    ]);

    const csvContent = [
        headers.join(','),
        ...rows.map(row => row.join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);

    link.setAttribute('href', url);
    link.setAttribute('download', `transactions_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

function escapeCsvField(field) {
    if (field.includes(',') || field.includes('"') || field.includes('\n')) {
        return `"${field.replace(/"/g, '""')}"`;
    }
    return field;
}

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

function formatCurrency(amount) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(amount);
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
}

function getAllTags() {
    const tags = new Set();
    state.transactions.forEach(t => {
        t.tags.forEach(tag => tags.add(tag));
    });
    return Array.from(tags);
}

// ============================================================================
// TAG AUTOCOMPLETE
// ============================================================================

function showTagSuggestions() {
    const input = document.getElementById('transaction-tags');
    const suggestionsDiv = document.getElementById('tag-suggestions');
    const currentValue = input.value.split(',').pop().trim();

    if (currentValue.length < 2) {
        suggestionsDiv.classList.remove('active');
        return;
    }

    const allTags = getAllTags();
    const matchingTags = allTags.filter(tag =>
        tag.toLowerCase().includes(currentValue.toLowerCase())
    );

    if (matchingTags.length === 0) {
        suggestionsDiv.classList.remove('active');
        return;
    }

    suggestionsDiv.innerHTML = matchingTags
        .slice(0, 10)
        .map(tag => `<span class="tag-suggestion" onclick="selectTag('${tag}')">${tag}</span>`)
        .join('');

    suggestionsDiv.classList.add('active');
}

function selectTag(tag) {
    const input = document.getElementById('transaction-tags');
    const values = input.value.split(',').map(v => v.trim());
    values.pop();
    values.push(tag);
    input.value = values.join(', ') + ', ';
    document.getElementById('tag-suggestions').classList.remove('active');
    input.focus();
}

// ============================================================================
// EVENT LISTENERS
// ============================================================================

function initEventListeners() {
    // Navigation
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const view = e.target.dataset.view;
            switchView(view);
        });
    });

    // Add transaction buttons
    document.getElementById('add-transaction-btn').addEventListener('click', openAddTransactionModal);
    document.getElementById('fab-add-btn').addEventListener('click', openAddTransactionModal);

    // Modal close
    document.getElementById('modal-close-btn').addEventListener('click', () => closeModal('transaction-modal'));
    document.getElementById('cancel-btn').addEventListener('click', () => closeModal('transaction-modal'));
    document.getElementById('cancel-delete-btn').addEventListener('click', () => closeModal('delete-modal'));

    // Form submit
    document.getElementById('transaction-form').addEventListener('submit', handleTransactionSubmit);
    document.getElementById('confirm-delete-btn').addEventListener('click', handleDeleteConfirm);

    // Transaction type change
    document.getElementById('transaction-type').addEventListener('change', updateTransactionTypeCategories);

    // Filters
    document.getElementById('search-input').addEventListener('input', (e) => {
        state.filters.search = e.target.value;
        applyFilters();
        renderTransactionsTable();
    });

    document.getElementById('filter-type').addEventListener('change', (e) => {
        state.filters.type = e.target.value;
        applyFilters();
        renderTransactionsTable();
    });

    document.getElementById('filter-category').addEventListener('change', (e) => {
        state.filters.category = e.target.value;
        applyFilters();
        renderTransactionsTable();
    });

    document.getElementById('filter-date-start').addEventListener('change', (e) => {
        state.filters.dateStart = e.target.value;
        applyFilters();
        renderTransactionsTable();
    });

    document.getElementById('filter-date-end').addEventListener('change', (e) => {
        state.filters.dateEnd = e.target.value;
        applyFilters();
        renderTransactionsTable();
    });

    document.getElementById('clear-filters-btn').addEventListener('click', () => {
        state.filters = {
            search: '',
            type: '',
            category: '',
            dateStart: '',
            dateEnd: ''
        };
        document.getElementById('search-input').value = '';
        document.getElementById('filter-type').value = '';
        document.getElementById('filter-category').value = '';
        document.getElementById('filter-date-start').value = '';
        document.getElementById('filter-date-end').value = '';
        applyFilters();
        renderTransactionsTable();
    });

    // Export
    document.getElementById('export-csv-btn').addEventListener('click', exportToCSV);

    // Dashboard date range
    document.getElementById('dashboard-date-range').addEventListener('change', renderDashboard);

    // Pagination
    document.getElementById('prev-page-btn').addEventListener('click', () => {
        if (state.currentPage > 1) {
            state.currentPage--;
            renderTransactionsTable();
        }
    });

    document.getElementById('next-page-btn').addEventListener('click', () => {
        const totalPages = Math.ceil(state.filteredTransactions.length / ITEMS_PER_PAGE);
        if (state.currentPage < totalPages) {
            state.currentPage++;
            renderTransactionsTable();
        }
    });

    // Table sorting
    document.querySelectorAll('.transactions-table th[data-sort]').forEach(th => {
        th.addEventListener('click', () => {
            const field = th.dataset.sort;

            if (state.sortField === field) {
                state.sortDirection = state.sortDirection === 'asc' ? 'desc' : 'asc';
            } else {
                state.sortField = field;
                state.sortDirection = 'asc';
            }

            // Update UI
            document.querySelectorAll('.transactions-table th').forEach(h => {
                h.classList.remove('sorted-asc', 'sorted-desc');
            });
            th.classList.add(`sorted-${state.sortDirection}`);

            applySorting();
            renderTransactionsTable();
        });
    });

    // Tag autocomplete
    document.getElementById('transaction-tags').addEventListener('input', showTagSuggestions);

    // Close modal on overlay click
    document.querySelectorAll('.modal-overlay').forEach(overlay => {
        overlay.addEventListener('click', (e) => {
            const modal = e.target.closest('.modal');
            if (modal) {
                closeModal(modal.id);
            }
        });
    });
}

function switchView(viewName) {
    // Update navigation
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`[data-view="${viewName}"]`).classList.add('active');

    // Update views
    document.querySelectorAll('.view').forEach(view => {
        view.classList.remove('active');
    });
    document.getElementById(`${viewName}-view`).classList.add('active');

    // Render appropriate content
    if (viewName === 'dashboard') {
        renderDashboard();
    } else if (viewName === 'transactions') {
        renderTransactionsTable();
    }
}

// ============================================================================
// INITIALIZATION
// ============================================================================

function generateRandomAmount(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function generateRandomDate(startDate, endDate) {
    const start = new Date(startDate).getTime();
    const end = new Date(endDate).getTime();
    const randomTime = start + Math.random() * (end - start);
    return new Date(randomTime).toISOString().split('T')[0];
}

function generateSampleDataForCompany(companyId, transactionCount) {
    const templates = {
        income: {
            Sales: [
                { desc: 'Product sales', tags: ['revenue', 'product'], range: [1000, 8000] },
                { desc: 'Online store sales', tags: ['ecommerce', 'product'], range: [500, 5000] },
                { desc: 'Wholesale order', tags: ['wholesale', 'b2b'], range: [2000, 10000] },
                { desc: 'Retail sales', tags: ['retail', 'revenue'], range: [800, 4000] }
            ],
            Services: [
                { desc: 'Consulting services', tags: ['consulting', 'service'], range: [1500, 7000] },
                { desc: 'Web development project', tags: ['project', 'web'], range: [2000, 8000] },
                { desc: 'Design services', tags: ['design', 'creative'], range: [1000, 5000] },
                { desc: 'Support contract', tags: ['support', 'recurring'], range: [500, 3000] }
            ],
            'Other Income': [
                { desc: 'Refund received', tags: ['refund'], range: [100, 1000] },
                { desc: 'Interest income', tags: ['finance', 'passive'], range: [50, 500] },
                { desc: 'Miscellaneous income', tags: ['other'], range: [100, 2000] }
            ]
        },
        expense: {
            Rent: [
                { desc: 'Office rent', tags: ['monthly', 'fixed'], range: [800, 3000] }
            ],
            Utilities: [
                { desc: 'Electricity and internet', tags: ['monthly', 'utilities'], range: [200, 800] },
                { desc: 'Water and heating', tags: ['monthly', 'utilities'], range: [100, 400] }
            ],
            Salaries: [
                { desc: 'Staff salaries', tags: ['payroll', 'monthly'], range: [2000, 8000] },
                { desc: 'Contractor payment', tags: ['contractor', 'freelance'], range: [500, 3000] }
            ],
            Marketing: [
                { desc: 'Social media ads', tags: ['advertising', 'online'], range: [300, 2000] },
                { desc: 'Google Ads campaign', tags: ['advertising', 'ppc'], range: [400, 3000] },
                { desc: 'Content marketing', tags: ['content', 'marketing'], range: [500, 2500] },
                { desc: 'Email marketing', tags: ['marketing', 'email'], range: [100, 800] }
            ],
            Travel: [
                { desc: 'Client meeting travel', tags: ['client', 'business-trip'], range: [200, 1500] },
                { desc: 'Conference attendance', tags: ['networking', 'conference'], range: [300, 2000] },
                { desc: 'Business trip expenses', tags: ['travel', 'business'], range: [400, 2500] }
            ],
            'Office Supplies': [
                { desc: 'Stationery and supplies', tags: ['supplies', 'office'], range: [50, 500] },
                { desc: 'Printer supplies', tags: ['supplies', 'tech'], range: [100, 400] },
                { desc: 'Pantry supplies', tags: ['pantry', 'office'], range: [80, 300] }
            ],
            Equipment: [
                { desc: 'Computer equipment', tags: ['tech', 'capital'], range: [800, 3000] },
                { desc: 'Office furniture', tags: ['furniture', 'office'], range: [300, 2000] },
                { desc: 'Software licenses', tags: ['software', 'tech'], range: [100, 1000] }
            ],
            'Other Expenses': [
                { desc: 'Miscellaneous expense', tags: ['other'], range: [50, 500] },
                { desc: 'Bank fees', tags: ['finance', 'fees'], range: [20, 200] }
            ]
        }
    };

    // Temporarily set the company context
    const originalCompany = currentCompany;
    currentCompany = companyId;

    for (let i = 0; i < transactionCount; i++) {
        const type = Math.random() > 0.4 ? 'expense' : 'income';
        const categories = Object.keys(templates[type]);
        const category = categories[Math.floor(Math.random() * categories.length)];
        const categoryTemplates = templates[type][category];
        const template = categoryTemplates[Math.floor(Math.random() * categoryTemplates.length)];

        const amount = generateRandomAmount(template.range[0], template.range[1]);
        const date = generateRandomDate('2025-06-01', '2026-02-20');

        createTransaction({
            type: type,
            amount: amount,
            category: category,
            description: template.desc,
            tags: template.tags,
            date: date
        });
    }

    // Restore original company context
    currentCompany = originalCompany;
}

function generateAllCompanySampleData() {
    const companies = loadCompanies();
    companies.forEach(company => {
        // Check if company already has data
        const existingCount = getCompanyTransactionCount(company.id);
        if (existingCount === 0) {
            // Generate between 20 and 100 transactions
            const count = generateRandomAmount(20, 100);
            generateSampleDataForCompany(company.id, count);
        }
    });
}

// ============================================================================
// AUTHENTICATION UI
// ============================================================================

function showAuthError(message) {
    const errorDiv = document.getElementById('auth-error');
    errorDiv.textContent = message;
    errorDiv.style.display = 'block';
    setTimeout(() => {
        errorDiv.style.display = 'none';
    }, 5000);
}

function showLoginForm() {
    document.getElementById('login-form').style.display = 'block';
    document.getElementById('register-form').style.display = 'none';
    document.getElementById('auth-error').style.display = 'none';
}

function showRegisterForm() {
    document.getElementById('login-form').style.display = 'none';
    document.getElementById('register-form').style.display = 'block';
    document.getElementById('auth-error').style.display = 'none';
}

function handleLogin(e) {
    e.preventDefault();
    const username = document.getElementById('login-username').value.trim();
    const password = document.getElementById('login-password').value;

    const result = loginUser(username, password);

    if (result.success) {
        showMainApp();
    } else {
        showAuthError(result.error);
    }
}

function handleRegister(e) {
    e.preventDefault();
    const username = document.getElementById('register-username').value.trim();
    const password = document.getElementById('register-password').value;
    const confirm = document.getElementById('register-confirm').value;

    if (password !== confirm) {
        showAuthError('Passwords do not match');
        return;
    }

    const result = registerUser(username, password);

    if (result.success) {
        showAuthError('Registration successful! Please login.');
        setTimeout(() => {
            showLoginForm();
            document.getElementById('register-form').reset();
        }, 1500);
    } else {
        showAuthError(result.error);
    }
}

function handleLogout() {
    if (confirm('Are you sure you want to logout?')) {
        logoutUser();
        showLoginScreen();
    }
}

function showLoginScreen() {
    document.getElementById('login-screen').style.display = 'flex';
    document.getElementById('main-header').style.display = 'none';
    document.getElementById('main-content').style.display = 'none';
    document.getElementById('fab-add-btn').style.display = 'none';
    document.getElementById('login-form').reset();
    document.getElementById('register-form').reset();
    showLoginForm();
}

function showMainApp() {
    document.getElementById('login-screen').style.display = 'none';
    document.getElementById('main-header').style.display = 'block';
    document.getElementById('main-content').style.display = 'block';

    // Show FAB on mobile
    if (window.innerWidth <= 768) {
        document.getElementById('fab-add-btn').style.display = 'flex';
    }

    // Update user display
    document.getElementById('current-user-name').textContent = getCurrentUser();

    // Initialize app
    initMainApp();
}

function initAuthListeners() {
    document.getElementById('login-form').addEventListener('submit', handleLogin);
    document.getElementById('register-form').addEventListener('submit', handleRegister);
    document.getElementById('show-register').addEventListener('click', (e) => {
        e.preventDefault();
        showRegisterForm();
    });
    document.getElementById('show-login').addEventListener('click', (e) => {
        e.preventDefault();
        showLoginForm();
    });
    document.getElementById('logout-btn').addEventListener('click', handleLogout);
}

function renderCompanySelector() {
    const companies = loadCompanies();
    const currentCompanyId = getCurrentCompany();
    const currentComp = getCompanyById(currentCompanyId);

    // Update header display
    if (currentComp) {
        document.getElementById('current-company-name').textContent = currentComp.name;
    }

    // Render company list in modal
    const companyList = document.getElementById('company-list');
    companyList.innerHTML = companies.map(company => {
        const transactionCount = getCompanyTransactionCount(company.id);
        const isActive = company.id === currentCompanyId;

        return `
            <div class="company-item ${isActive ? 'active' : ''}" data-company-id="${company.id}">
                <div class="company-item-header">
                    <div class="company-item-name">${company.name}</div>
                    ${isActive ? '<span class="company-item-badge">Current</span>' : ''}
                </div>
                <div class="company-item-stats">
                    <div class="company-item-stat">
                        <span>📊 ${transactionCount} transactions</span>
                    </div>
                    <div class="company-item-stat">
                        <span>🏢 ${company.industry}</span>
                    </div>
                </div>
            </div>
        `;
    }).join('');

    // Add click handlers
    document.querySelectorAll('.company-item').forEach(item => {
        item.addEventListener('click', () => {
            const companyId = item.dataset.companyId;
            switchCompany(companyId);
        });
    });
}

function switchCompany(companyId) {
    setCurrentCompany(companyId);
    closeModal('company-modal');

    // Reload data for new company
    state.transactions = loadTransactions();
    applyFilters();

    // Update UI
    renderCompanySelector();
    renderDashboard();
    renderTransactionsTable();
}

function openCompanySelector() {
    renderCompanySelector();
    openModal('company-modal');
}

function initMainApp() {
    // Ensure current company is set
    getCurrentCompany();

    // Generate sample data for all companies if needed
    generateAllCompanySampleData();

    // Load data for current company
    state.transactions = loadTransactions();

    // Initialize filters and sorting
    applyFilters();

    // Render category dropdowns
    renderCategoryDropdown('filter-category');

    // Render company selector
    renderCompanySelector();

    // Initialize event listeners (only once)
    if (!state.listenersInitialized) {
        initEventListeners();
        initCompanyListeners();
        state.listenersInitialized = true;
    }

    // Render initial view
    renderDashboard();
    renderTransactionsTable();
}

function initCompanyListeners() {
    document.getElementById('company-selector-btn').addEventListener('click', openCompanySelector);
    document.getElementById('company-modal-close').addEventListener('click', () => closeModal('company-modal'));
}

function init() {
    // Initialize authentication listeners
    initAuthListeners();

    // Check if user is already logged in
    if (isAuthenticated()) {
        showMainApp();
    } else {
        showLoginScreen();
    }
}

// Start the application
document.addEventListener('DOMContentLoaded', init);
