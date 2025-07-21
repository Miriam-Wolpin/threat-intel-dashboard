const axios = require('axios');

const abuseIPDB_KEY = process.env.ABUSE_IPDB_KEY;
const qualityScoreKey = process.env.IP_QUALITY_KEY;

async function fetchIntel(ip) {
  const abuseRes = await axios.get(`https://api.abuseipdb.com/api/v2/check`, {
    params: { ipAddress: ip, maxAgeInDays: 90 },
    headers: {
      Key: abuseIPDB_KEY,
      Accept: 'application/json',
    },
  });

  const qualityRes = await axios.get(`https://ipqualityscore.com/api/json/ip/${qualityScoreKey}/${ip}`);

  const abuseData = abuseRes.data.data;
  const qualityData = qualityRes.data;

  return {
    ip: abuseData.ipAddress,
    hostname: abuseData.hostname || null,
    isp: qualityData.ISP || null,
    country: abuseData.countryCode,
    abuseScore: abuseData.abuseConfidenceScore,
    recentReports: abuseData.totalReports,
    vpnDetected: qualityData.vpn || qualityData.proxy,
    threatScore: qualityData.fraud_score,
  };
}

module.exports = { fetchIntel };
