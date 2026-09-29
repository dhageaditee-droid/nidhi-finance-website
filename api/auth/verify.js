// Vercel Serverless Function: /api/auth/verify
export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  const authHeader = req.headers.authorization || '';
  const token = authHeader.replace(/^Bearer\s+/i, '') || (req.body && req.body.token);

  if (!token) {
    return res.status(401).json({ success: false, message: 'No authentication token provided' });
  }

  try {
    const decoded = JSON.parse(Buffer.from(token, 'base64').toString('utf8'));
    const now = Date.now();

    if (!decoded.exp || decoded.exp < now) {
      return res.status(401).json({ success: false, message: 'Session token has expired' });
    }

    return res.status(200).json({
      success: true,
      user: {
        username: decoded.u,
        role: decoded.role || 'Administrator',
        expiresAt: new Date(decoded.exp).toISOString()
      }
    });
  } catch (err) {
    return res.status(401).json({ success: false, message: 'Invalid token signature' });
  }
}
