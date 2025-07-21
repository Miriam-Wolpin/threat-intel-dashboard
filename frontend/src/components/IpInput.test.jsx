import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import IpInput from './IpInput';
import { IntelProvider } from '../context/IntelContext';
import * as api from '../services/api';

vi.mock('../services/api');

describe('IpInput', () => {
    test('renders input and button', () => {
        render(
            <IntelProvider>
                <IpInput onResult={vi.fn()} />
            </IntelProvider>
        );
        expect(screen.getByPlaceholderText(/enter an ip address/i)).toBeInTheDocument();
        expect(screen.getByText(/check/i)).toBeInTheDocument();
    });

    test('shows error on rate limit', async () => {
        api.fetchIntel.mockRejectedValueOnce({ response: { status: 429 } });

        render(
            <IntelProvider>
                <IpInput onResult={vi.fn()} />
            </IntelProvider>
        ); fireEvent.change(screen.getByPlaceholderText(/enter/i), {
            target: { value: '8.8.8.8' }
        });
        fireEvent.click(screen.getByText(/check/i));

        await screen.findByText(/rate limit/i);
    });
});
