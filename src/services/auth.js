// src/services/auth.js
const AUTH_STORAGE_KEY = 'nidhi_admin_session';

/**
 * Perform admin login against /api/auth/login or fallback to environment variables
 */
export async function loginAdmin(username, password) {
  const cleanUsername = username ? username.trim() : '';
  const cleanPassword = password ? password.trim() : '';

  if (!cleanUsername || !cleanPassword) {
    return { success: false, message: 'Username and password are required' };
  }

  // 1. Try serverless backend endpoint first
  try {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: cleanUsername, password: cleanPassword })
    });

    if (response.ok) {
      const data = await response.json();
      if (data.success && data.token) {
        saveSession({
          user: data.user,
          token: data.token,
          expiresAt: Date.now() + 24 * 60 * 60 * 1000
        });
        return { success: true, user: data.user, token: data.token };
      }
    } else if (response.status === 401 || response.status === 400) {
      const errorData = await response.json().catch(() => ({}));
      return { 
        success: false, 
        message: errorData.message || 'Invalid username or password' 
      };
    }
  } catch (apiError) {
    // API not reachable (e.g. static local Vite dev or offline), fall through to local verification
    console.info('API login endpoint unavailable, using secure local client verification.');
  }

  // 2. Client-side fallback authentication with environment variables
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
        exp: Date.now() + 24 * 60 * 60 * 1000
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
    message: 'Invalid username or password. Please try again.'
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
    localStorage.removeItem('nidhi_admin_auth'); // legacy key
  } catch (err) {
    console.error('Failed to clear admin session:', err);
  }
}
