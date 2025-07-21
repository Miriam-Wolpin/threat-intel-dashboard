const { isValidIp } = require('../src/utils/validateIp');

describe('isValidIp', () => {
    test('valid IPs should return true', () => {
        expect(isValidIp('8.8.8.8')).toBe(true);
        expect(isValidIp('192.168.1.1')).toBe(true);
        expect(isValidIp('255.255.255.255')).toBe(true);
    });

    test('invalid IPs should return false', () => {
        expect(isValidIp('999.999.999.999')).toBe(false);
        expect(isValidIp('abc.def.ghi.jkl')).toBe(false);
        expect(isValidIp('123')).toBe(false);
        expect(isValidIp('')).toBe(false);
    });
});
