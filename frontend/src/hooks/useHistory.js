import { useState, useEffect } from 'react';

const STORAGE_KEY = 'ip-history';
const MAX_HISTORY = 10;

export function useHistory() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      setHistory(JSON.parse(saved));
    }
  }, []);

  const addToHistory = (ip) => {
    setHistory((prev) => {
      const updated = [ip, ...prev.filter((i) => i !== ip)].slice(0, MAX_HISTORY);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  };

  return { history, addToHistory };
}
