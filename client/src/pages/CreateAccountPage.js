import React, { useState } from 'react';
import { Card, CardHeader, CardContent, Box, TextField, Button, Typography } from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import useAuth from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const schema = yup.object({
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().min(6).max(16).required(),
});

const CreateAccountPage = () => {
    const auth = useAuth();
    const [error, setError] = useState();
    const navigate = useNavigate();
    const initData = {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
    };
    const formik = useFormik({
        initialValues: initData,
        validationSchema: schema,
        validateOnMount: true,
        onSubmit: async values => {
            try {
                await auth.createAccount(values);
                navigate('/login', { replace: true });
            } catch (error) {
                const message = error.message;
                setError(message);
            }
        },
    });

    const handleCancel = () => navigate('/login', { replace: true });

    return (
        <Card sx={{ width: '400px', height: '550px' }}>
            <CardHeader
                title="Create Account"
                data-testid="create-account-card-header"
            ></CardHeader>
            <CardContent>
                <Box
                    component="form"
                    onSubmit={formik.handleSubmit}
                    sx={{ display: 'flex', flexFlow: 'column nowrap', rowGap: '25px' }}
                >
                    <TextField
                        variant="outlined"
                        name="firstName"
                        label="First Name"
                        value={formik.values.firstName}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={!!(formik.touched.firstName && formik.errors.firstName)}
                        fullWidth
                        inputProps={{ 'data-testid': 'firstName-field' }}
                    />
                    <TextField
                        variant="outlined"
                        name="lastName"
                        label="Last Name"
                        value={formik.values.lastName}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={!!(formik.touched.lastName && formik.errors.lastName)}
                        fullWidth
                        inputProps={{ 'data-testid': 'lastName-field' }}
                    />
                    <TextField
                        variant="outlined"
                        name="email"
                        label="Email"
                        value={formik.values.email}
                        error={!!(formik.touched.email && formik.errors.email)}
                        fullWidth
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        inputProps={{ 'data-testid': 'email-field' }}
                    />
                    <TextField
                        variant="outlined"
                        name="password"
                        value={formik.values.password}
                        error={!!(formik.touched.password && formik.errors.password)}
                        label="Password"
                        fullWidth
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        inputProps={{ 'data-testid': 'password-field' }}
                    />
                    {error && (
                        <Typography
                            data-testid="error"
                            variant="body2"
                            color="error"
                            sx={{ textAlign: 'center' }}
                        >
                            {error}
                        </Typography>
                    )}

                    <Box
                        sx={{
                            marginTop: '10px',
                            justifyContent: 'center',
                            display: 'flex',
                            columnGap: '10px',
                        }}
                    >
                        <Button
                            variant="contained"
                            sx={{ width: 200, height: 46 }}
                            disableElevation
                            onClick={handleCancel}
                            data-testid="cancel"
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="contained"
                            type="submit"
                            sx={{ width: 200, height: 46 }}
                            disableElevation
                            disabled={formik.isSubmitting || !formik.isValid}
                            data-testid="submit"
                        >
                            Submit
                        </Button>
                    </Box>
                </Box>
            </CardContent>
        </Card>
    );
};

export default CreateAccountPage;
