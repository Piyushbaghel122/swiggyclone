'use client';

import React, { useState, useEffect } from 'react';

// Assuming your backend URL is set, using a relative path for now
// Update this if you have a configured API base URL
const API_BASE = 'http://127.0.0.1:8002/auth';

export default function SecuritySettings() {
  const [status, setStatus] = useState<boolean | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  
  const [qrCodeUrl, setQrCodeUrl] = useState<string>('');
  const [secret, setSecret] = useState<string>('');
  const [code, setCode] = useState<string>('');
  
  const [setupMode, setSetupMode] = useState<boolean>(false);

  // You might want to pass tokens if they aren't stored in cookies. 
  // Assuming httponly cookies are used as per your backend setup.
  const fetchStatus = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE}/2fa/status`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        // credentials: 'include' // Un-comment if using cookies across domains
      });
      if (response.ok) {
        const data = await response.json();
        setStatus(data.is_two_factor_enabled);
      } else {
        // If not authenticated or error, leave as null
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchStatus();
  }, []);

  const handleEnableClick = async () => {
    try {
      setError('');
      setLoading(true);
      const response = await fetch(`${API_BASE}/2fa/enable`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });
      
      if (!response.ok) {
        throw new Error('Failed to initiate 2FA setup');
      }

      const data = await response.json();
      setQrCodeUrl(data.qr_code_url);
      setSecret(data.secret);
      setSetupMode(true);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async () => {
    if (!code || code.length !== 6) {
      setError('Please enter a valid 6-digit code');
      return;
    }

    try {
      setError('');
      setLoading(true);
      const response = await fetch(`${API_BASE}/2fa/verify`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: code, id: '', user_id: '' }), // backend expects id/user_id in Verify2FA but actually pulls from token
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.detail || 'Failed to verify code');
      }

      // Success
      setStatus(true);
      setSetupMode(false);
      setCode('');
      setQrCodeUrl('');
      setSecret('');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-8 border border-gray-200 rounded-xl shadow-sm text-gray-800 font-sans">
      <h2 className="text-2xl font-bold mb-6 text-gray-900 border-b pb-4">Security Settings</h2>
      
      <div className="mb-6">
        <h3 className="text-lg font-semibold flex items-center gap-2 mb-2">
          <span className="text-xl">🔐</span> Two-Factor Authentication
        </h3>
        
        {loading && status === null ? (
          <p className="text-gray-500 animate-pulse">Loading status...</p>
        ) : (
          <div className="flex items-center justify-between bg-gray-50 p-4 rounded-lg">
            <span className="text-gray-600 font-medium">Status: </span>
            <span className={`px-3 py-1 rounded-full text-sm font-semibold ${status ? 'bg-green-100 text-green-700' : 'bg-gray-200 text-gray-600'}`}>
              {status ? 'Enabled' : 'Disabled'}
            </span>
          </div>
        )}
      </div>

      {!status && !setupMode && status !== null && (
        <button 
          onClick={handleEnableClick}
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors disabled:opacity-50"
        >
          {loading ? 'Processing...' : 'Enable 2FA'}
        </button>
      )}

      {error && (
        <div className="mt-4 p-3 bg-red-50 text-red-700 text-sm rounded-lg border border-red-200">
          {error}
        </div>
      )}

      {setupMode && (
        <div className="mt-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="border-t pt-6">
            <h4 className="text-lg font-semibold mb-4 text-center">📱 Scan this QR Code</h4>
            
            {qrCodeUrl && (
              <div className="flex justify-center mb-6 bg-white p-4 border rounded-xl shadow-sm inline-block mx-auto">
                <img src={qrCodeUrl} alt="2FA QR Code" className="w-48 h-48 object-contain" />
              </div>
            )}
            
            <div className="mb-6 text-center">
              <p className="text-sm text-gray-500 mb-1">Secret Key</p>
              <code className="bg-gray-100 px-4 py-2 rounded-lg font-mono text-gray-800 tracking-wider font-semibold border">
                {secret}
              </code>
            </div>

            <div className="space-y-3">
              <label htmlFor="code" className="block text-sm font-medium text-gray-700">Enter Code</label>
              <input
                id="code"
                type="text"
                maxLength={6}
                value={code}
                onChange={(e) => setCode(e.target.value.replace(/[^0-9]/g, ''))}
                className="w-full border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring-blue-500 p-3 text-center text-xl tracking-[0.25em]"
                placeholder="123456"
              />
              <button 
                onClick={handleVerify}
                disabled={loading || code.length !== 6}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-4 rounded-lg transition-colors mt-2 disabled:opacity-50"
              >
                {loading ? 'Verifying...' : 'Verify'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
