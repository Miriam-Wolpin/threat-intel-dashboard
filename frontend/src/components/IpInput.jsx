import { useState } from 'react';
import { fetchIntel } from '../services/api';

export default function IpInput({ onResult }) {
  const [ip, setIp] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleCheck = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await fetchIntel(ip);
      onResult(result); // Pass result to parent
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
