import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import axios from 'axios';
import SearchComponent from '../src/components/SearchComponent';

jest.mock('axios');

describe('SearchComponent', () => {
    test('renders the search component', () => {
        render(<SearchComponent />);
        expect(screen.getByText('Search By')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Search by name')).toBeInTheDocument();
    });

    test('performs a search by name', async () => {
        axios.get.mockResolvedValue({
            data: [
                { Applicant: 'Test Truck', Address: '123 Test St', Status: 'APPROVED' }
            ]
        });

        render(<SearchComponent />);

        fireEvent.change(screen.getByPlaceholderText('Search by name'), {
            target: { value: 'Test' }
        });
        fireEvent.click(screen.getByText('Search'));

        const results = await screen.findByText('Test Truck');
        expect(results).toBeInTheDocument();
    });

    test('performs a search by address', async () => {
        axios.get.mockResolvedValue({
            data: [
                { Applicant: 'Test Truck', Address: '123 Test St', Status: 'APPROVED' }
            ]
        });

        render(<SearchComponent />);

        fireEvent.change(screen.getByLabelText('Search By'), { target: { value: 'address' } });
        fireEvent.change(screen.getByPlaceholderText('Search by address'), {
            target: { value: 'Test St' }
        });
        fireEvent.click(screen.getByText('Search'));

        const results = await screen.findByText('Test Truck');
        expect(results).toBeInTheDocument();
    });

    test('performs a search by location', async () => {
        axios.get.mockResolvedValue({
            data: [
                { Applicant: 'Test Truck', Address: '123 Test St', Status: 'APPROVED', distance: 1.2 }
            ]
        });

        render(<SearchComponent />);

        fireEvent.change(screen.getByLabelText('Search By'), { target: { value: 'location' } });
        fireEvent.change(screen.getByPlaceholderText('Enter latitude'), {
            target: { value: '37.7749' }
        });
        fireEvent.change(screen.getByPlaceholderText('Enter longitude'), {
            target: { value: '-122.4194' }
        });
        fireEvent.click(screen.getByText('Search'));

        const results = await screen.findByText('Test Truck');
        expect(results).toBeInTheDocument();
        expect(screen.getByText('1.2')).toBeInTheDocument();
    });
});
