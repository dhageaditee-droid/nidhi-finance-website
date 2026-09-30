// src/services/auth.js
const AUTH_STORAGE_KEY = 'nidhi_admin_session';
const ADMIN_ACCOUNT_KEY = 'nidhi_admin_account';

/**
 * Get current configured admin account credentials
 */
export function getAdminAccount() {
  try {
    const custom = localStorage.getItem(ADMIN_ACCOUNT_KEY);
    if (custom) {
      return JSON.parse(custom);
    }
  } catch (e) {
    console.error('Error reading admin account:', e);
  }

  // Default initial credentials (or from Vercel environment variables)
  const envEmail = import.meta.env.VITE_ADMIN_EMAIL || 'nidhifinance@outlook.com';
  const envUser = import.meta.env.VITE_ADMIN_USERNAME || 'admin';
  const envPass = import.meta.env.VITE_ADMIN_PASSWORD || 'admin123';

  return {
    email: envEmail,
    username: envUser,
    password: envPass
  };
}

/**
 * Update custom admin account credentials (email, username, password)
 */
export function updateAdminAccount({ email, username, password }) {
  try {
    const current = getAdminAccount();
    const updated = {
      email: email ? email.trim() : current.email,
      username: username ? username.trim() : current.username,
      password: password ? password.trim() : current.password,
      updatedAt: new Date().toISOString()
    };
    localStorage.setItem(ADMIN_ACCOUNT_KEY, JSON.stringify(updated));
    return { success: true, account: updated };
  } catch (err) {
    console.error('Error updating admin account:', err);
    return { success: false, message: 'Failed to save account changes' };
  }
}

/**
 * Perform admin login using email/username and password
 */
export async function loginAdmin(identifier, password) {
  const cleanId = identifier ? identifier.trim().toLowerCase() : '';
  const cleanPassword = password ? password.trim() : '';

  if (!cleanId || !cleanPassword) {
    return { success: false, message: 'Email/Username and password are required.' };
  }

  const account = getAdminAccount();

  // Match against either email or username
  const matchesIdentifier =
    cleanId === account.email.toLowerCase() ||
    cleanId === account.username.toLowerCase();

  const matchesPassword = cleanPassword === account.password;

  if (matchesIdentifier && matchesPassword) {
    const sessionToken = btoa(
      JSON.stringify({
        u: account.username,
        email: account.email,
        role: 'Administrator',
        iat: Date.now(),
        exp: Date.now() + 24 * 60 * 60 * 1000 // 24 hours validity
      })
    );

    const userObj = {
      username: account.username,
      email: account.email,
      role: 'Administrator',
      loginTime: new Date().toISOString()
    };

    saveSession({
      user: userObj,
      token: sessionToken,
      expiresAt: Date.now() + 24 * 60 * 60 * 1000
    });

    return { success: true, user: userObj, token: sessionToken };
  }

  return {
    success: false,
    message: 'Invalid email/username or password. Please verify your credentials.'
  };
}

/**
 * Save session to localStorage
 */
export function saveSession(sessionData) {
  try {
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(sessionData));
  } catch (err) {
    console.error('Failed to save admin session:', err);
  }
}

/**
 * Get active session
 */
export function getSession() {
  try {
    const raw = localStorage.getItem(AUTH_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (parsed.expiresAt && parsed.expiresAt < Date.now()) {
      clearSession();
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
}

/**
 * Check if current visitor has an active authenticated admin session
 */
export function isAuthenticated() {
  const session = getSession();
  return Boolean(session && session.token && session.user);
}

/**
 * Get logged-in user details
 */
export function getAdminUser() {
  const session = getSession();
  return session ? session.user : null;
}

/**
 * Clear session / Logout
 */
export function clearSession() {
  try {
    localStorage.removeItem(AUTH_STORAGE_KEY);
    localStorage.removeItem('nidhi_admin_auth');
  } catch (err) {
    console.error('Failed to clear admin session:', err);
  }
}
