import { renderHook, act } from '@testing-library/react';
import { useHistory } from './useHistory';

beforeEach(() => {
    localStorage.clear();
});

test('loads from localStorage', () => {
    localStorage.setItem('ip-history', JSON.stringify(['1.1.1.1']));
    const { result } = renderHook(() => useHistory());
    expect(result.current.history).toContain('1.1.1.1');
});

test('adds new IP and updates localStorage', () => {
    const { result } = renderHook(() => useHistory());
    act(() => {
        result.current.addToHistory('2.2.2.2');
    });
    expect(result.current.history).toContain('2.2.2.2');
    expect(JSON.parse(localStorage.getItem('ip-history'))).toContain('2.2.2.2');
});
