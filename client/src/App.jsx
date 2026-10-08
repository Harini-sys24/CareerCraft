import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  CheckCircle2, 
  XCircle, 
  Database, 
  Server, 
  Layout, 
  FileText, 
  Globe, 
  RefreshCw,
  ArrowRight
} from 'lucide-react';

export default function App() {
  const [health, setHealth] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastChecked, setLastChecked] = useState(null);

  const checkHealth = async () => {
    setLoading(true);
    setError(null);
    const startTime = performance.now();

    try {
      const res = await fetch('/api/health');
      const data = await res.json();
      const latency = Math.round(performance.now() - startTime);

      setHealth({ ...data, latency });
      setLastChecked(new Date().toLocaleTimeString());
    } catch (err) {
      setError(err.message || 'Failed to connect to backend');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkHealth();
  }, []);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Navbar */}
      <header style={{
        borderBottom: '1px solid var(--border-subtle)',
        background: 'var(--bg-surface-glass)',
        backdropFilter: 'blur(12px)',
        position: 'sticky',
        top: 0,
        zIndex: 10
      }}>
        <div className="container" style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '70px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: 'var(--radius-lg)',
              background: 'var(--gradient-brand)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: 'var(--shadow-glow)'
            }}>
              <Sparkles size={22} color="#ffffff" />
            </div>
            <div>
              <span style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'var(--font-size-xl)',
                fontWeight: 'var(--font-weight-extrabold)',
                letterSpacing: '-0.03em'
              }}>
                Career<span className="gradient-text">Craft</span>
              </span>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
            <span className="badge badge-primary">Phase 1 Complete</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main style={{ flex: 1, padding: 'var(--space-12) 0' }}>
        <div className="container">
          {/* Hero Section */}
          <div style={{ textAlign: 'center', maxWidth: '750px', margin: '0 auto var(--space-12)' }}>
            <div style={{ display: 'inline-flex', marginBottom: 'var(--space-4)' }}>
              <span className="badge badge-primary" style={{ padding: 'var(--space-2) var(--space-4)' }}>
                ⚡ Foundation & System Architecture Active
              </span>
            </div>
            <h1 style={{
              fontSize: 'clamp(2rem, 5vw, 3.25rem)',
              marginBottom: 'var(--space-4)',
              fontWeight: 800
            }}>
              Portfolio & Resume Builder <br />
              <span className="gradient-text">Single Profile, Dual Output</span>
            </h1>
            <p style={{ fontSize: 'var(--font-size-lg)', lineHeight: 1.6, color: 'var(--text-secondary)' }}>
              Enter your academic and professional details once. CareerCraft synchronizes your data across an
              ATS-compliant print resume and an interactive online portfolio website.
            </p>
          </div>

          {/* System Health Diagnostic Card */}
          <div className="card" style={{
            maxWidth: '850px',
            margin: '0 auto var(--space-12)',
            background: 'linear-gradient(180deg, var(--bg-surface) 0%, rgba(17, 22, 34, 0.95) 100%)',
            border: '1px solid var(--border-medium)'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: 'var(--space-6)',
              flexWrap: 'wrap',
              gap: 'var(--space-3)'
            }}>
              <div>
                <h2 style={{ fontSize: 'var(--font-size-xl)', marginBottom: 'var(--space-1)' }}>
                  System Health & Connectivity Check
                </h2>
                <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--text-muted)' }}>
                  Verifying live client-to-server proxy and SQLite database status via Prisma
                </p>
              </div>

              <button
                onClick={checkHealth}
                disabled={loading}
                className="btn btn-secondary"
                style={{ cursor: loading ? 'not-allowed' : 'pointer' }}
              >
                <RefreshCw size={16} style={{ animation: loading ? 'spin 1s linear infinite' : 'none' }} />
                <span>{loading ? 'Testing...' : 'Test Connection'}</span>
              </button>
            </div>

            {/* Health Status Badges */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: 'var(--space-4)'
            }}>
              {/* API Server Card */}
              <div style={{
                background: 'var(--bg-body)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-lg)',
                padding: 'var(--space-4)',
                display: 'flex',
                alignItems: 'flex-start',
                gap: 'var(--space-3)'
              }}>
                <Server size={24} color={health?.status === 'ok' ? 'var(--color-success)' : 'var(--color-warning)'} />
                <div>
                  <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                    Express API Server
                  </div>
                  <div style={{ fontWeight: 600, fontSize: 'var(--font-size-base)', marginTop: '2px' }}>
                    {loading ? 'Checking...' : health?.status === 'ok' ? 'Online (Port 5000)' : 'Unreachable'}
                  </div>
                  <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--text-secondary)', marginTop: '4px' }}>
                    {health?.latency ? `Response time: ${health.latency}ms` : 'Proxying /api/health'}
                  </div>
                </div>
              </div>

              {/* Database Card */}
              <div style={{
                background: 'var(--bg-body)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-lg)',
                padding: 'var(--space-4)',
                display: 'flex',
                alignItems: 'flex-start',
                gap: 'var(--space-3)'
              }}>
                <Database size={24} color={health?.database === 'connected' ? 'var(--color-success)' : 'var(--color-danger)'} />
                <div>
                  <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                    SQLite Database
                  </div>
                  <div style={{ fontWeight: 600, fontSize: 'var(--font-size-base)', marginTop: '2px' }}>
                    {loading ? 'Checking...' : health?.database === 'connected' ? 'Connected (Prisma)' : 'Disconnected'}
                  </div>
                  <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--text-secondary)', marginTop: '4px' }}>
                    SQLite file: server/dev.db
                  </div>
                </div>
              </div>

              {/* Status Indicator */}
              <div style={{
                background: 'var(--bg-body)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-lg)',
                padding: 'var(--space-4)',
                display: 'flex',
                alignItems: 'flex-start',
                gap: 'var(--space-3)'
              }}>
                {health?.status === 'ok' ? (
                  <CheckCircle2 size={24} color="var(--color-success)" />
                ) : (
                  <XCircle size={24} color="var(--color-danger)" />
                )}
                <div>
                  <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                    System Status
                  </div>
                  <div style={{ fontWeight: 600, fontSize: 'var(--font-size-base)', marginTop: '2px' }}>
                    {loading ? 'Checking...' : health?.status === 'ok' ? 'All Systems Operational' : 'Degraded'}
                  </div>
                  <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--text-secondary)', marginTop: '4px' }}>
                    {lastChecked ? `Last checked: ${lastChecked}` : 'Initial load'}
                  </div>
                </div>
              </div>
            </div>

            {error && (
              <div style={{
                marginTop: 'var(--space-4)',
                padding: 'var(--space-3)',
                background: 'var(--color-danger-bg)',
                border: '1px solid rgba(239, 68, 68, 0.3)',
                borderRadius: 'var(--radius-md)',
                color: 'var(--color-danger)',
                fontSize: 'var(--font-size-sm)'
              }}>
                Connection Error: {error}. Make sure the backend server is running on port 5000.
              </div>
            )}
          </div>

          {/* Phase 1 Verification Checklist */}
          <div style={{ maxWidth: '850px', margin: '0 auto' }}>
            <h3 style={{ fontSize: 'var(--font-size-lg)', marginBottom: 'var(--space-4)', color: 'var(--text-secondary)' }}>
              Phase 1 Deliverables Configured
            </h3>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: 'var(--space-4)'
            }}>
              <div className="card" style={{ padding: 'var(--space-5)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-2)' }}>
                  <CheckCircle2 size={18} color="var(--color-success)" />
                  <h4 style={{ fontSize: 'var(--font-size-base)' }}>React 18 + Vite</h4>
                </div>
                <p style={{ fontSize: 'var(--font-size-sm)' }}>
                  Hot module replacement with API proxy to port 5000.
                </p>
              </div>

              <div className="card" style={{ padding: 'var(--space-5)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-2)' }}>
                  <CheckCircle2 size={18} color="var(--color-success)" />
                  <h4 style={{ fontSize: 'var(--font-size-base)' }}>Vanilla CSS Design Tokens</h4>
                </div>
                <p style={{ fontSize: 'var(--font-size-sm)' }}>
                  Curated color palette, responsive typography, and print styles ready.
                </p>
              </div>

              <div className="card" style={{ padding: 'var(--space-5)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-2)' }}>
                  <CheckCircle2 size={18} color="var(--color-success)" />
                  <h4 style={{ fontSize: 'var(--font-size-base)' }}>Express API Skeleton</h4>
                </div>
                <p style={{ fontSize: 'var(--font-size-sm)' }}>
                  Modular architecture with CORS, error handling, and health route.
                </p>
              </div>

              <div className="card" style={{ padding: 'var(--space-5)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-2)' }}>
                  <CheckCircle2 size={18} color="var(--color-success)" />
                  <h4 style={{ fontSize: 'var(--font-size-base)' }}>SQLite + Prisma ORM</h4>
                </div>
                <p style={{ fontSize: 'var(--font-size-sm)' }}>
                  Complete schema for User, Profile, Education, Experience, Projects, Skills & Configs.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer style={{
        borderTop: '1px solid var(--border-subtle)',
        padding: 'var(--space-6) 0',
        textAlign: 'center',
        color: 'var(--text-muted)',
        fontSize: 'var(--font-size-sm)'
      }}>
        <div className="container">
          CareerCraft &copy; {new Date().getFullYear()} — Built for Students & Job Seekers. Phase 1 Verification.
        </div>
      </footer>

      {/* Spinner animation keyframe style */}
      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
