import { useState } from 'react';
import { getRiskLevel } from './utils/riskLevel';
import { useHistory } from './hooks/useHistory';


import IpInput from './components/IpInput';

function App() {
  const [result, setResult] = useState(null);
  const { history, addToHistory } = useHistory();

  const handleResult = (res) => {
    setResult(res);
    addToHistory(res.ip);
  };

  const riskLevel = result ? getRiskLevel(result) : null;

  const riskColor = {
    High: 'red',
    Medium: 'orange',
    Low: 'green',
  }[riskLevel];

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>IP Threat Intelligence Checker</h1>
      <IpInput onResult={handleResult} />
      {result && (
        <div style={{ marginTop: '2rem' }}>
          <h2>Result:</h2>
          <ul>
            <li><strong>IP:</strong> {result.ip}</li>
            <li><strong>Hostname:</strong> {result.hostname || 'N/A'}</li>
            <li><strong>ISP:</strong> {result.isp || 'N/A'}</li>
            <li><strong>Country:</strong> {result.country}</li>
            <li><strong>Abuse Score:</strong> {result.abuseScore}</li>
            <li><strong>Recent Reports:</strong> {result.recentReports}</li>
            <li><strong>VPN/Proxy:</strong> {result.vpnDetected ? 'Yes' : 'No'}</li>
            <li><strong>Threat Score:</strong> {result.threatScore}</li>
            <li>
              <strong>Overall Risk:</strong>{' '}
              <span style={{ color: riskColor, fontWeight: 'bold' }}>{riskLevel}</span>
            </li>
          </ul>
        </div>
      )}
      {history.length > 0 && (
        <div style={{ marginTop: '1rem' }}>
          <h3>Recent IPs:</h3>
          <ul>
            {history.map((ip) => (
              <li key={ip}>
                <button onClick={() => fetchIntel(ip).then(handleResult)}>
                  {ip}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
