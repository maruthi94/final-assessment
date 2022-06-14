import {
    render,
    screen,
    cleanup,
    waitFor,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import React from 'react';
import { Router } from 'react-router-dom';
import fetchMock from 'jest-fetch-mock';

import '@testing-library/jest-dom';
import AuthProvider from '../components/AuthProvider';
import CreateAccountPage from './CreateAccountPage';

let history;
const renderApp = () => {
    history = createMemoryHistory();
    history.push('/create-account');
    return render(
        <AuthProvider>
            <Router location={history.location} navigator={history}>
                <CreateAccountPage />
            </Router>
        </AuthProvider>
    );
};

beforeAll(() => fetchMock.enableMocks());
afterAll(() => fetchMock.disableMocks());

beforeEach(() => {
    fetchMock.resetMocks();
});
afterEach(() => {
    cleanup();
});

const roleName = {
    firstName: 'First Name',
    lastName: 'Last Name',
};

const user = {
    firstName: 'test',
    lastName: 'hello',
    email: 'test@gmail.com',
    password: 'test@1234',
};

test('Clicking on the cancel should navigate to login page', async () => {
    renderApp();
    userEvent.click(screen.getByTestId('cancel'));
    expect(history.location.pathname).toBe('/login');
});

test('After entering the account details and  click on the Submit should make api call, if success navigate to login page', async () => {
    renderApp();
    fetchMock.mockResponse(JSON.stringify(user));

    await waitFor(() => {
        expect(screen.getByTestId('submit').disabled).toBe(true);
    });

    for (const key in user) {
        const regex = new RegExp(roleName[key] ?? key, 'i');
        await userEvent.type(screen.getByRole('textbox', { name: regex }), user[key], {
            delay: 10,
        });

        await waitFor(() => {
            expect(screen.getByTestId(`${key}-field`)).not.toHaveClass('Mui-error');
        });
    }
    userEvent.click(screen.getByTestId('submit'));

    await waitFor(() => {
        expect(history.location.pathname).toBe('/login');
    });
});

test('should show the error message,if entered user is already available', async () => {
    renderApp();
    fetch.mockReject(new Error('User already exits'));

    await waitFor(() => {
        expect(screen.getByTestId('submit').disabled).toBe(true);
    });

    for (const key in user) {
        const regex = new RegExp(roleName[key] ?? key, 'i');
        await userEvent.type(screen.getByRole('textbox', { name: regex }), user[key], {
            delay: 10,
        });

        await waitFor(() => {
            expect(screen.getByTestId(`${key}-field`)).not.toHaveClass('Mui-error');
        });
    }
    userEvent.click(screen.getByTestId('submit'));

    await waitFor(() => {
        expect(screen.getByTestId('error').textContent).toBe('User already exits');
    });
});
