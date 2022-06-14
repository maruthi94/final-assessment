import {
    render,
    screen,
    cleanup,
    fireEvent,
    getByRole,
    waitFor,
    getByTestId,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import React from 'react';
import { Router } from 'react-router-dom';
import fetchMock from 'jest-fetch-mock';

import '@testing-library/jest-dom';
import LoginPage from './LoginPage';
import AuthProvider from '../components/AuthProvider';

let history;
const renderApp = () => {
    history = createMemoryHistory();
    history.push('/login');
    return render(
        <AuthProvider>
            <Router location={history.location} navigator={history}>
                <LoginPage />
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

test('Clicking on the create-account should navigate to create account page', async () => {
    renderApp();
    userEvent.click(screen.getByTestId('create-account'));
    expect(history.location.pathname).toBe('/create-account');
});

test('After entering the username and password click on the Submit should make api call, if success navigate to home page', async () => {
    renderApp();
    const response = {
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyIkX18iOnsiYWN0aXZlUGF0aHMiOnsicGF0aHMiOnsiX2lkIjoiaW5pdCIsImZpcnN0TmFtZSI6ImluaXQiLCJsYXN0TmFtZSI6ImluaXQiLCJlbWFpbCI6ImluaXQiLCJwYXNzd29yZCI6ImluaXQiLCJfX3YiOiJpbml0In0sInN0YXRlcyI6eyJpZ25vcmUiOnt9LCJkZWZhdWx0Ijp7fSwiaW5pdCI6eyJfaWQiOnRydWUsImZpcnN0TmFtZSI6dHJ1ZSwibGFzdE5hbWUiOnRydWUsImVtYWlsIjp0cnVlLCJwYXNzd29yZCI6dHJ1ZSwiX192Ijp0cnVlfSwibW9kaWZ5Ijp7fSwicmVxdWlyZSI6e319LCJzdGF0ZU5hbWVzIjpbInJlcXVpcmUiLCJtb2RpZnkiLCJpbml0IiwiZGVmYXVsdCIsImlnbm9yZSJdfSwic2tpcElkIjp0cnVlLCJzdHJpY3RNb2RlIjp0cnVlLCJzZWxlY3RlZCI6e30sImZpZWxkcyI6e30sImV4Y2x1ZGUiOm51bGx9LCIkaXNOZXciOmZhbHNlLCJfZG9jIjp7Il9pZCI6IjYyYTYyMzhjNGUyNDA4OGZmYmI4NDkyNCIsImZpcnN0TmFtZSI6IkJyYWQiLCJsYXN0TmFtZSI6IlBpdHQiLCJlbWFpbCI6ImJyYWQzQGdtYWlsLmNvbSIsInBhc3N3b3JkIjoiJDJiJDEwJDdvb3AybnV2ay5FWXB4dGhtUFFmdXU4YmgzUHlkQnRXWDlQdXptSVljZ2dnMWdsREIyMUZXIiwiX192IjowfSwiaWF0IjoxNjU1MDU1NDM1LCJleHAiOjE2NTUwNzcwMzV9.DwwSDHaqz5BnTsuUJP4ScFm95_m_5MSDgns46WIMIUU',
    };
    fetchMock.mockResponse(JSON.stringify(response));

    await waitFor(() => {
        expect(screen.getByTestId('submit').disabled).toBe(true);
    });
    await userEvent.type(screen.getByRole('textbox', { name: /email/i }), 'test@g.com', {
        delay: 10,
    });

    await waitFor(() => {
        expect(screen.getByTestId('email-field')).not.toHaveClass('Mui-error');
    });

    await userEvent.type(screen.getByRole('textbox', { name: /password/i }), 'pwd@1234', {
        delay: 10,
    });

    await waitFor(() => {
        expect(screen.getByTestId('password-field')).not.toHaveClass('Mui-error');
    });

    userEvent.click(screen.getByTestId('submit'));

    await waitFor(() => {
        expect(history.location.pathname).toBe('/');
    });
});

test('After entering the username and password click on the Submit should make api call, if error should show the error message', async () => {
    renderApp();
    fetch.mockReject(new Error('Incorrect Password'));

    await waitFor(() => {
        expect(screen.getByTestId('submit').disabled).toBe(true);
    });
    await userEvent.type(screen.getByRole('textbox', { name: /email/i }), 'test@g.com', {
        delay: 10,
    });

    await waitFor(() => {
        expect(screen.getByTestId('email-field')).not.toHaveClass('Mui-error');
    });

    await userEvent.type(screen.getByRole('textbox', { name: /password/i }), 'pwd@1234', {
        delay: 10,
    });

    await waitFor(() => {
        expect(screen.getByTestId('password-field')).not.toHaveClass('Mui-error');
    });

    userEvent.click(screen.getByTestId('submit'));

    await waitFor(() => {
        expect(screen.getByTestId('error').textContent).toBe('Incorrect Password');
    });
});

