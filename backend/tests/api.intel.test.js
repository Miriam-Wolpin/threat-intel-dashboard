const request = require('supertest');
const express = require('express');
const intelRouter = require('../src/routes/intel');

// Mock the service layer:
jest.mock('../src/services/ipService', () => ({
    fetchIntel: jest.fn(() => Promise.resolve({
        ip: '8.8.8.8',
        hostname: 'dns.google',
        isp: 'Google LLC',
        country: 'US',
        abuseScore: 5,
        recentReports: 3,
        vpnDetected: false,
        threatScore: 10
    }))
}));

const app = express();
app.use(express.json());
app.use('/api/intel', intelRouter);

describe('GET /api/intel', () => {
    test('returns valid result for a proper IP', async () => {
        const res = await request(app).get('/api/intel?ip=8.8.8.8');
        expect(res.status).toBe(200);
        expect(res.body.ip).toBe('8.8.8.8');
        expect(res.body.country).toBe('US');
    });

    test('returns 400 for invalid IP', async () => {
        const res = await request(app).get('/api/intel?ip=not.an.ip');
        expect(res.status).toBe(400);
    });
});
