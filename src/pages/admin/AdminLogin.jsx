import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { setAdminAuth } from '../../utils/storage';
import { 
  ShieldCheck, 
  Lock, 
  User, 
  ArrowRight, 
  CheckCircle2, 
  AlertCircle,
  Eye,
  EyeOff,
  Building
} from 'lucide-react';

export default function AdminLogin() {
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('admin123');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');

    if (!username.trim() || !password.trim()) {
      setError('Please enter both username and password.');
      return;
    }

    setLoading(true);

    setTimeout(() => {
      // Demo authentication acceptance
      if (
        (username.toLowerCase() === 'admin' && password === 'admin123') ||
        (username.toLowerCase() === 'aditee' && password === 'admin123') ||
        username.trim().length > 0
      ) {
        setAdminAuth({
          username: username.trim(),
          role: 'Administrator',
          loginTime: new Date().toISOString()
        });
        navigate('/admin');
      } else {
        setError('Invalid credentials. (Hint: Use admin / admin123)');
      }
      setLoading(false);
    }, 400);
  };

  const handleQuickDemo = () => {
    setUsername('admin');
    setPassword('admin123');
    setAdminAuth({
      username: 'admin',
      role: 'Administrator',
      loginTime: new Date().toISOString()
    });
    navigate('/admin');
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col justify-center items-center p-4 relative overflow-hidden font-sans">
      
      {/* Background glow */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="w-full max-w-md relative z-10 space-y-6">
        
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <Link to="/" className="inline-flex items-center gap-3 group">
            <img 
              src="/logo.jpg" 
              alt="Nidhi Finance Logo" 
              className="h-16 w-auto object-contain rounded-2xl bg-white p-1.5 shadow-xl group-hover:scale-105 transition-transform" 
            />
          </Link>
          <h1 className="text-2xl font-extrabold text-white tracking-tight">
            Nidhi Finance Admin Portal
          </h1>
          <p className="text-xs text-slate-400">
            Sign in to access applications, lead management, and customer records.
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-slate-900/90 backdrop-blur-xl p-7 sm:p-8 rounded-3xl border border-slate-800 shadow-2xl space-y-6">
          
          {error && (
            <div className="p-3.5 rounded-xl bg-rose-950/80 border border-rose-800 text-rose-300 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            
            {/* Username */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-blue-400" />
                <span>Admin Username</span>
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="admin"
                className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300 flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <Lock className="w-3.5 h-3.5 text-amber-400" />
                  <span>Password</span>
                </span>
                <span className="text-[11px] text-slate-500 font-normal">Demo: admin123</span>
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm shadow-lg shadow-blue-600/30 transition-all flex items-center justify-center gap-2 mt-2 disabled:opacity-50"
            >
              {loading ? (
                <span>Signing in...</span>
              ) : (
                <>
                  <span>Sign In to Dashboard</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

          </form>

          {/* Quick 1-Click Demo Login */}
          <div className="pt-4 border-t border-slate-800 space-y-3">
            <button
              type="button"
              onClick={handleQuickDemo}
              className="w-full py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 hover:text-white text-xs font-semibold transition-all flex items-center justify-center gap-2"
            >
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>1-Click Demo Admin Login</span>
            </button>

            <div className="text-center">
              <Link
                to="/"
                className="text-xs text-slate-400 hover:text-amber-400 transition-colors"
              >
                &larr; Back to Public Website
              </Link>
            </div>
          </div>

        </div>

        {/* Footer info */}
        <div className="text-center text-[11px] text-slate-500">
          Nidhi Finance Admin Management Console • Secure Session
        </div>

      </div>

    </div>
  );
}
