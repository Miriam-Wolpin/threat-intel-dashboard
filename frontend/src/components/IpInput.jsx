import { useState } from 'react';
import { fetchIntel } from '../services/api';
import { useIntel } from '../context/IntelContext';

export default function IpInput() {
  const [ip, setIp] = useState('');
  const {
    setResult,
    setLoading,
    setError,
    addToHistory,
    loading,
    error
  } = useIntel();

  const handleCheck = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await fetchIntel(ip);
      setResult(result);
      addToHistory(result.ip);
    } catch (err) {
      if (err.response?.status === 429) {
        setError('Rate limit reached. Please try again later.');
      } else {
        setError('Something went wrong. Please make sure the IP is valid.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={ip}
        onChange={(e) => setIp(e.target.value)}
        placeholder="Enter an IP address"
      />
      <button onClick={handleCheck} disabled={loading}>
        Check
      </button>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}
