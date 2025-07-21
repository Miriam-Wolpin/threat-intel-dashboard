export function getRiskLevel({ abuseScore, threatScore, vpnDetected }) {
  if (abuseScore >= 70 || threatScore >= 80) return 'High';
  if (abuseScore >= 30 || threatScore >= 50 || vpnDetected) return 'Medium';
  return 'Low';
}
