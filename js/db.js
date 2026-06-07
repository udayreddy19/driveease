// ========================================
// DriveEase — IndexedDB Database Layer
// ========================================

const DB_NAME = 'DriveEaseDB';
const DB_VERSION = 1;

class DriveEaseDB {
  constructor() {
    this.db = null;
    this.ready = false;
  }

  // ---- Initialize Database ----
  init() {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(DB_NAME, DB_VERSION);

      request.onerror = () => reject(request.error);

      request.onupgradeneeded = (event) => {
        const db = event.target.result;

        // Users table
        if (!db.objectStoreNames.contains('users')) {
          const users = db.createObjectStore('users', { keyPath: 'id', autoIncrement: true });
          users.createIndex('email', 'email', { unique: true });
          users.createIndex('role', 'role', { unique: false });
          users.createIndex('phone', 'phone', { unique: false });
        }

        // Cars table
        if (!db.objectStoreNames.contains('cars')) {
          const cars = db.createObjectStore('cars', { keyPath: 'id', autoIncrement: true });
          cars.createIndex('city', 'city', { unique: false });
          cars.createIndex('type', 'type', { unique: false });
          cars.createIndex('fuel', 'fuel', { unique: false });
          cars.createIndex('available', 'available', { unique: false });
          cars.createIndex('hostId', 'hostId', { unique: false });
        }

        // Bookings table
        if (!db.objectStoreNames.contains('bookings')) {
          const bookings = db.createObjectStore('bookings', { keyPath: 'id', autoIncrement: true });
          bookings.createIndex('userId', 'userId', { unique: false });
          bookings.createIndex('carId', 'carId', { unique: false });
          bookings.createIndex('status', 'status', { unique: false });
          bookings.createIndex('createdAt', 'createdAt', { unique: false });
        }

        // Payments table
        if (!db.objectStoreNames.contains('payments')) {
          const payments = db.createObjectStore('payments', { keyPath: 'id', autoIncrement: true });
          payments.createIndex('userId', 'userId', { unique: false });
          payments.createIndex('bookingId', 'bookingId', { unique: false });
          payments.createIndex('type', 'type', { unique: false });
          payments.createIndex('createdAt', 'createdAt', { unique: false });
        }

        // Reviews table
        if (!db.objectStoreNames.contains('reviews')) {
          const reviews = db.createObjectStore('reviews', { keyPath: 'id', autoIncrement: true });
          reviews.createIndex('carId', 'carId', { unique: false });
          reviews.createIndex('userId', 'userId', { unique: false });
        }

        // Favorites table
        if (!db.objectStoreNames.contains('favorites')) {
          const favorites = db.createObjectStore('favorites', { keyPath: 'id', autoIncrement: true });
          favorites.createIndex('userId', 'userId', { unique: false });
          favorites.createIndex('carId', 'carId', { unique: false });
          favorites.createIndex('userCar', ['userId', 'carId'], { unique: true });
        }

        // Earnings table (host earnings)
        if (!db.objectStoreNames.contains('earnings')) {
          const earnings = db.createObjectStore('earnings', { keyPath: 'id', autoIncrement: true });
          earnings.createIndex('hostId', 'hostId', { unique: false });
          earnings.createIndex('bookingId', 'bookingId', { unique: false });
          earnings.createIndex('createdAt', 'createdAt', { unique: false });
        }

        // Wallet table
        if (!db.objectStoreNames.contains('wallet')) {
          const wallet = db.createObjectStore('wallet', { keyPath: 'id', autoIncrement: true });
          wallet.createIndex('userId', 'userId', { unique: false });
          wallet.createIndex('type', 'type', { unique: false });
          wallet.createIndex('createdAt', 'createdAt', { unique: false });
        }

        // Invoices table
        if (!db.objectStoreNames.contains('invoices')) {
          const invoices = db.createObjectStore('invoices', { keyPath: 'id', autoIncrement: true });
          invoices.createIndex('userId', 'userId', { unique: false });
          invoices.createIndex('bookingId', 'bookingId', { unique: false });
          invoices.createIndex('createdAt', 'createdAt', { unique: false });
        }
      };

      request.onsuccess = (event) => {
        this.db = event.target.result;
        this.ready = true;
        resolve(this.db);
      };
    });
  }

  // ---- Generic CRUD Operations ----
  _getStore(storeName, mode = 'readonly') {
    const tx = this.db.transaction(storeName, mode);
    return tx.objectStore(storeName);
  }

  add(storeName, data) {
    return new Promise((resolve, reject) => {
      const store = this._getStore(storeName, 'readwrite');
      const request = store.add(data);
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  put(storeName, data) {
    return new Promise((resolve, reject) => {
      const store = this._getStore(storeName, 'readwrite');
      const request = store.put(data);
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  get(storeName, id) {
    return new Promise((resolve, reject) => {
      const store = this._getStore(storeName);
      const request = store.get(id);
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  getAll(storeName) {
    return new Promise((resolve, reject) => {
      const store = this._getStore(storeName);
      const request = store.getAll();
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  getByIndex(storeName, indexName, value) {
    return new Promise((resolve, reject) => {
      const store = this._getStore(storeName);
      const index = store.index(indexName);
      const request = index.getAll(value);
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  delete(storeName, id) {
    return new Promise((resolve, reject) => {
      const store = this._getStore(storeName, 'readwrite');
      const request = store.delete(id);
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }

  count(storeName) {
    return new Promise((resolve, reject) => {
      const store = this._getStore(storeName);
      const request = store.count();
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  clear(storeName) {
    return new Promise((resolve, reject) => {
      const store = this._getStore(storeName, 'readwrite');
      const request = store.clear();
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }

  // ---- Seed Data ----
  async seedData() {
    const carCount = await this.count('cars');
    if (carCount > 0) return; // Already seeded

    console.log('🌱 Seeding DriveEase database...');

    // Seed Admin user
    await this.add('users', {
      id: 1,
      name: 'Admin',
      email: 'admin@driveease.com',
      phone: '+91 90000 00000',
      password: 'admin123',
      role: 'admin',
      walletBalance: 0,
      joinDate: '2023-01-01',
      status: 'active',
    });

    // Seed demo user
    await this.add('users', {
      id: 2,
      name: 'Demo User',
      email: 'demo@driveease.com',
      phone: '+91 98765 43210',
      password: 'demo123',
      role: 'user',
      walletBalance: 5000,
      joinDate: '2024-06-15',
      status: 'active',
    });

    // Seed host user
    await this.add('users', {
      id: 3,
      name: 'Rahul Kumar',
      email: 'rahul@driveease.com',
      phone: '+91 87654 32100',
      password: 'host123',
      role: 'host',
      walletBalance: 45000,
      joinDate: '2023-08-20',
      status: 'active',
    });

    // Seed cars from AppData
    for (const car of AppData.CARS) {
      await this.add('cars', { ...car, hostId: 3, status: 'active', createdAt: new Date().toISOString() });
    }

    // Seed reviews from AppData
    for (const review of AppData.REVIEWS) {
      await this.add('reviews', { ...review, userId: 2, createdAt: new Date().toISOString() });
    }

    // Seed sample bookings
    const sampleBookings = [
      {
        id: 1, userId: 2, carId: 2, carName: 'Hyundai Creta', carEmoji: '🚙',
        pickup: '2026-06-10T10:00', dropoff: '2026-06-12T10:00', location: 'hub',
        addons: ['insurance'], baseFare: 4998, addonTotal: 299, gst: 953, total: 6250,
        status: 'upcoming', createdAt: '2026-06-05T14:30:00Z',
      },
      {
        id: 2, userId: 2, carId: 5, carName: 'Mahindra Thar', carEmoji: '🛻',
        pickup: '2026-05-20T09:00', dropoff: '2026-05-22T09:00', location: 'airport',
        addons: [], baseFare: 6598, addonTotal: 0, gst: 1188, total: 7986,
        status: 'completed', createdAt: '2026-05-18T11:00:00Z',
      },
      {
        id: 3, userId: 2, carId: 11, carName: 'BMW 3 Series', carEmoji: '🏎️',
        pickup: '2026-05-01T14:00', dropoff: '2026-05-03T14:00', location: 'delivery',
        addons: ['insurance', 'fuel_package'], baseFare: 13998, addonTotal: 798, gst: 2663, total: 17459,
        status: 'completed', createdAt: '2026-04-29T16:00:00Z',
      },
    ];

    for (const booking of sampleBookings) {
      await this.add('bookings', booking);
    }

    // Seed sample payments
    const samplePayments = [
      { id: 1, userId: 2, bookingId: 1, amount: 6250, type: 'booking', method: 'card', cardLast4: '4242', status: 'success', createdAt: '2026-06-05T14:30:00Z' },
      { id: 2, userId: 2, bookingId: 2, amount: 7986, type: 'booking', method: 'card', cardLast4: '8888', status: 'success', createdAt: '2026-05-18T11:00:00Z' },
      { id: 3, userId: 2, bookingId: 3, amount: 17459, type: 'booking', method: 'upi', status: 'success', createdAt: '2026-04-29T16:00:00Z' },
      { id: 4, userId: 2, bookingId: null, amount: 5000, type: 'wallet_topup', method: 'card', cardLast4: '4242', status: 'success', createdAt: '2026-04-20T10:00:00Z' },
    ];

    for (const payment of samplePayments) {
      await this.add('payments', payment);
    }

    // Seed host earnings
    const sampleEarnings = [
      { id: 1, hostId: 3, bookingId: 2, carId: 5, amount: 5277, commission: 1319, net: 3958, status: 'paid', createdAt: '2026-05-23T00:00:00Z' },
      { id: 2, hostId: 3, bookingId: 3, carId: 11, amount: 11838, commission: 2960, net: 8879, status: 'paid', createdAt: '2026-05-05T00:00:00Z' },
    ];

    for (const earning of sampleEarnings) {
      await this.add('earnings', earning);
    }

    // Seed invoices
    const sampleInvoices = [
      {
        id: 1, userId: 2, bookingId: 2, invoiceNo: 'INV-2026-0001',
        carName: 'Mahindra Thar', pickup: '2026-05-20T09:00', dropoff: '2026-05-22T09:00',
        baseFare: 6598, addonTotal: 0, gst: 1188, total: 7986,
        status: 'paid', createdAt: '2026-05-18T11:00:00Z',
      },
      {
        id: 2, userId: 2, bookingId: 3, invoiceNo: 'INV-2026-0002',
        carName: 'BMW 3 Series', pickup: '2026-05-01T14:00', dropoff: '2026-05-03T14:00',
        baseFare: 13998, addonTotal: 798, gst: 2663, total: 17459,
        status: 'paid', createdAt: '2026-04-29T16:00:00Z',
      },
    ];

    for (const invoice of sampleInvoices) {
      await this.add('invoices', invoice);
    }

    // Seed wallet transactions
    const walletTxns = [
      { id: 1, userId: 2, amount: 5000, type: 'credit', description: 'Wallet Top-up', balance: 5000, createdAt: '2026-04-20T10:00:00Z' },
      { id: 2, userId: 2, amount: 500, type: 'credit', description: 'Referral Bonus', balance: 5500, createdAt: '2026-05-01T00:00:00Z' },
      { id: 3, userId: 2, amount: 500, type: 'debit', description: 'Booking Discount Applied', balance: 5000, createdAt: '2026-05-18T11:00:00Z' },
    ];

    for (const txn of walletTxns) {
      await this.add('wallet', txn);
    }

    console.log('✅ Database seeded successfully!');
  }

  // ---- Helper Queries ----
  async getUserByEmail(email) {
    const users = await this.getByIndex('users', 'email', email);
    return users[0] || null;
  }

  async getCarsByCity(city) {
    return this.getByIndex('cars', 'city', city);
  }

  async getBookingsByUser(userId) {
    return this.getByIndex('bookings', 'userId', userId);
  }

  async getPaymentsByUser(userId) {
    return this.getByIndex('payments', 'userId', userId);
  }

  async getReviewsByCar(carId) {
    return this.getByIndex('reviews', 'carId', carId);
  }

  async getUserFavorites(userId) {
    return this.getByIndex('favorites', 'userId', userId);
  }

  async getHostEarnings(hostId) {
    return this.getByIndex('earnings', 'hostId', hostId);
  }

  async getWalletTransactions(userId) {
    return this.getByIndex('wallet', 'userId', userId);
  }

  async getInvoicesByUser(userId) {
    return this.getByIndex('invoices', 'userId', userId);
  }

  async getTotalRevenue() {
    const payments = await this.getAll('payments');
    return payments.filter(p => p.status === 'success' && p.type === 'booking').reduce((sum, p) => sum + p.amount, 0);
  }

  async getMonthlyRevenue() {
    const payments = await this.getAll('payments');
    const monthly = {};
    payments.filter(p => p.status === 'success' && p.type === 'booking').forEach(p => {
      const month = p.createdAt.slice(0, 7); // YYYY-MM
      monthly[month] = (monthly[month] || 0) + p.amount;
    });
    return monthly;
  }
}

// Global DB instance
const db = new DriveEaseDB();
