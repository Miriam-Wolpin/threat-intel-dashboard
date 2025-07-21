const axios = require('axios');
const { fetchIntel } = require('../src/services/ipService');

jest.mock('axios');

describe('fetchIntel', () => {
    test('aggregates data from both APIs correctly', async () => {
        const abuseMock = {
            data: {
                data: {
                    ipAddress: '8.8.8.8',
                    hostname: 'dns.google',
                    countryCode: 'US',
                    abuseConfidenceScore: 5,
                    totalReports: 3,
                }
            }
        };

        const qualityMock = {
            data: {
                ISP: 'Google LLC',
                fraud_score: 10,
                vpn: false,
                proxy: false
            }
        };

        axios.get
            .mockResolvedValueOnce(abuseMock) // first call - abuseIPDB
            .mockResolvedValueOnce(qualityMock); // second call - IPQualityScore

        const result = await fetchIntel('8.8.8.8');

        expect(result).toEqual({
            ip: '8.8.8.8',
            hostname: 'dns.google',
            isp: 'Google LLC',
            country: 'US',
            abuseScore: 5,
            recentReports: 3,
            vpnDetected: false,
            threatScore: 10
        });
    });

    test('throws custom error on rate limit (429)', async () => {
        axios.get.mockRejectedValueOnce({
            response: { status: 429 },
            config: { url: 'https://api.abuseipdb.com/api/v2/check' }
        });

        await expect(fetchIntel('8.8.8.8')).rejects.toThrow('Rate limit exceeded from AbuseIPDB');
    });
});
