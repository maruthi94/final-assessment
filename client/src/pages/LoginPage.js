import React, { useState } from 'react';
import {
    Card,
    CardHeader,
    CardContent,
    Link,
    Box,
    TextField,
    Button,
    Typography,
} from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import useAuth from '../hooks/useAuth';
import { useNavigate, NavLink, useLocation } from 'react-router-dom';

const schema = yup.object({
    email: yup.string().email().required(),
    password: yup.string().min(6).max(16).required(),
});

const LoginPage = () => {
    const auth = useAuth();
    const [error, setError] = useState();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';
    const initData = {
        email: '',
        password: '',
    };
    const formik = useFormik({
        initialValues: initData,
        validationSchema: schema,
        validateOnMount:true,
        onSubmit: async values => {
            try {
                const { email, password } = values;
                await auth.login(email, password);
                navigate(from, { replace: true });
            } catch (error) {
                const message = error.message;
                setError(message);
            }
        },
    });

    return (
        <Card sx={{ width: '400px', height: '400px' }}>
            <CardHeader title="Login"></CardHeader>
            <CardContent>
                <Box
                    component="form"
                    onSubmit={formik.handleSubmit}
                    sx={{ display: 'flex', flexFlow: 'column nowrap', rowGap: '25px' }}
                >
                    <TextField
                        variant="outlined"
                        label="Email"
                        name="email"
                        value={formik.values.email}
                        error={!!(formik.touched.email && formik.errors.email)}
                        fullWidth
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        InputProps={{"data-testid":"email-field"}}
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
                        InputProps={{"data-testid":"password-field"}}
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
                            marginTop: '5px',
                            justifyContent: 'center',
                            alignItems: 'center',
                            display: 'flex',
                            flexFlow: 'column',
                            rowGap: 1,
                        }}
                    >
                        <Button
                            variant="contained"
                            type="submit"
                            size="large"
                            sx={{ width: 250, height: 46 }}
                            disableElevation
                            disabled={formik.isSubmitting || !formik.isValid}
                            data-testid='submit'
                        >
                            Submit
                        </Button>
                        <Typography color="textSecondary" variant="body2">
                            Don&apos;t have an account?{' '}
                            <Link
                                component={NavLink}
                                to="/create-account"
                                variant="subtitle2"
                                underline="hover"
                                sx={{
                                    cursor: 'pointer',
                                }}
                                data-testid="create-account"
                            >
                                Create Account
                            </Link>
                        </Typography>
                    </Box>
                </Box>
            </CardContent>
        </Card>
    );
};

export default LoginPage;
