// Vercel Serverless Function: /api/auth/login
export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }

  try {
    const { username, password } = req.body || {};

    if (!username || !password) {
      return res.status(400).json({ success: false, message: 'Username and password are required' });
    }

    // Configured admin credentials from Vercel environment variables
    const validUsername = process.env.ADMIN_USERNAME || process.env.VITE_ADMIN_USERNAME || 'admin';
    const validPassword = process.env.ADMIN_PASSWORD || process.env.VITE_ADMIN_PASSWORD || 'admin123';

    if (username.trim().toLowerCase() === validUsername.trim().toLowerCase() && password === validPassword) {
      const now = Date.now();
      const sessionToken = Buffer.from(
        JSON.stringify({
          u: username.trim(),
          role: 'Administrator',
          iat: now,
          exp: now + 24 * 60 * 60 * 1000 // 24 hours
        })
      ).toString('base64');

      return res.status(200).json({
        success: true,
        message: 'Authentication successful',
        user: {
          username: username.trim(),
          role: 'Administrator',
          loginTime: new Date(now).toISOString()
        },
        token: sessionToken
      });
    }

    return res.status(401).json({
      success: false,
      message: 'Invalid username or password. Please verify your credentials.'
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Internal server error during authentication'
    });
  }
}
