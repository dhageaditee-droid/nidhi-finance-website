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
  const envEmail = import.meta.env.VITE_ADMIN_EMAIL || 'dhageaditee@gmail.com';
  const envUser = import.meta.env.VITE_ADMIN_USERNAME || 'admin';
  const envPass = import.meta.env.VITE_ADMIN_PASSWORD || 'Admin@123';

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
 * Reset / set admin password directly for registered admin email
 */
export function resetAdminPassword(email, newPassword) {
  const cleanEmail = (email || '').trim().toLowerCase();
  const cleanPass = (newPassword || '').trim();

  if (!cleanEmail || !cleanPass) {
    return { success: false, message: 'Email and new password are required.' };
  }

  if (cleanPass.length < 4) {
    return { success: false, message: 'Password must be at least 4 characters long.' };
  }

  // Allow reset for authorized admin email
  const current = getAdminAccount();
  const allowed = [
    'dhageaditee@gmail.com',
    'admin',
    current.email.toLowerCase(),
    current.username.toLowerCase()
  ];

  if (!allowed.includes(cleanEmail)) {
    return { 
      success: false, 
      message: 'This email is not authorized as Admin. Use dhageaditee@gmail.com' 
    };
  }

  const updated = {
    email: cleanEmail.includes('@') ? cleanEmail : current.email,
    username: 'admin',
    password: cleanPass,
    updatedAt: new Date().toISOString()
  };

  try {
    localStorage.setItem(ADMIN_ACCOUNT_KEY, JSON.stringify(updated));

    // Auto login after resetting password
    const sessionToken = btoa(
      JSON.stringify({
        u: updated.username,
        email: updated.email,
        role: 'Administrator',
        iat: Date.now(),
        exp: Date.now() + 24 * 60 * 60 * 1000
      })
    );

    const userObj = {
      username: updated.username,
      email: updated.email,
      role: 'Administrator',
      loginTime: new Date().toISOString()
    };

    saveSession({
      user: userObj,
      token: sessionToken,
      expiresAt: Date.now() + 24 * 60 * 60 * 1000
    });

    return { success: true, user: userObj, token: sessionToken };
  } catch (err) {
    return { success: false, message: 'Failed to reset password. Please try again.' };
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

  // Match against configured email, username, or default admin email
  const matchesIdentifier =
    cleanId === account.email.toLowerCase() ||
    cleanId === account.username.toLowerCase() ||
    cleanId === 'dhageaditee@gmail.com' ||
    cleanId === 'admin';

  const isCustomAccount = !!localStorage.getItem(ADMIN_ACCOUNT_KEY);
  const matchesPassword =
    cleanPassword === account.password ||
    (!isCustomAccount && (cleanPassword === 'Admin@123' || cleanPassword === 'admin123'));

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
