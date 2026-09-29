// src/services/auth.js
const AUTH_STORAGE_KEY = 'nidhi_admin_session';

/**
 * Perform admin login against configured environment variables or defaults
 */
export async function loginAdmin(username, password) {
  const cleanUsername = username ? username.trim() : '';
  const cleanPassword = password ? password.trim() : '';

  if (!cleanUsername || !cleanPassword) {
    return { success: false, message: 'Username and password are required' };
  }

  // Configured credentials from Vercel / .env environment variables (default: admin / admin123)
  const envUser = import.meta.env.VITE_ADMIN_USERNAME || 'admin';
  const envPass = import.meta.env.VITE_ADMIN_PASSWORD || 'admin123';

  if (
    cleanUsername.toLowerCase() === envUser.toLowerCase() &&
    cleanPassword === envPass
  ) {
    const sessionToken = btoa(
      JSON.stringify({
        u: cleanUsername,
        role: 'Administrator',
        iat: Date.now(),
        exp: Date.now() + 24 * 60 * 60 * 1000 // 24 hours validity
      })
    );

    const userObj = {
      username: cleanUsername,
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
    message: 'Invalid username or password. Please verify your credentials.'
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
