import { createContext, useContext, useState } from 'react';
import { useHistory } from '../hooks/useHistory';

const IntelContext = createContext();

export function IntelProvider({ children }) {
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const { history, addToHistory } = useHistory();

    return (
        <IntelContext.Provider value={{
            result,
            setResult,
            loading,
            setLoading,
            error,
            setError,
            history,
            addToHistory
        }}>
            {children}
        </IntelContext.Provider>
    );
}

export function useIntel() {
    return useContext(IntelContext);
}
