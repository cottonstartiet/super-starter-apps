import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Box, Button, Container, Grid, Link, TextField, Typography } from '@mui/material';
import { Google as GoogleIcon } from '../icons/Google';
import { Link as RouterLink, Navigate } from 'react-router-dom';
import { auth } from '../services';
import { useAuthState } from 'react-firebase-hooks/auth';
import Loading from '../components/Loading';
import { GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword } from "firebase/auth";
import { useState } from 'react';

const googleProvider = new GoogleAuthProvider();
const signInWithGoogle = async () => {
  try {
    await signInWithPopup(auth, googleProvider);
  } catch (err: any) {
    console.error(err);
    alert(err.message);
  }
};

const Login = () => {
  const [user, loading, error] = useAuthState(auth);
  const [loginError, setLoginError] = useState('');
  console.log(error);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: Yup.object({
      email: Yup
        .string()
        .email(
          'Must be a valid email')
        .max(255)
        .required(
          'Email is required'),
      password: Yup
        .string()
        .max(255)
        .required(
          'Password is required')
    }),
    onSubmit: ({ email, password }, actions) => {
      setLoginError('');
      signInWithEmailAndPassword(auth, email, password)
        .catch((error: any) => {
          setLoginError(error.message);
          actions.setSubmitting(false);
        });
    }
  });

  if (loading) {
    return (
      <Loading />
    );
  }

  if (!!user) {
    return (
      <Navigate to={'/app'} replace={true} />
    );
  }

  return (
    <>
      {/* <Head>
        <title>Login | Material Kit</title>
      </Head> */}
      <Box
        component="main"
        sx={{
          alignItems: 'center',
          display: 'flex',
          flexGrow: 1,
          minHeight: '100%'
        }}
      >
        <Container maxWidth="sm">
          {/* <RouterLink
            to="/"
          >
            <Button
              component="a"
              startIcon={<ArrowBackIcon fontSize="small" />}
            >
              Dashboard
            </Button>
          </RouterLink> */}
          <form onSubmit={formik.handleSubmit}>
            <Box sx={{ my: 3 }}>
              <Typography
                color="textPrimary"
                variant="h4"
              >
                Sign in
              </Typography>
              {/* <Typography
                color="textSecondary"
                gutterBottom
                variant="body2"
              >
                Sign in on the internal platform
              </Typography> */}
            </Box>
            <Grid
              container
              spacing={3}
            >
              {/* <Grid
                item
                xs={12}
                md={6}
              >
                <Button
                  color="info"
                  fullWidth
                  startIcon={<FacebookIcon />}
                  onClick={formik.handleSubmit as any}
                  size="large"
                  variant="contained"
                >
                  Login with Facebook
                </Button>
              </Grid> */}
              <Grid
                item
                xs={12}
                md={12}
              >
                <Button
                  fullWidth
                  color="error"
                  startIcon={<GoogleIcon />}
                  onClick={signInWithGoogle}
                  size="large"
                  variant="contained"
                >
                  Login with Google
                </Button>
              </Grid>
            </Grid>
            <Box
              sx={{
                pb: 1,
                pt: 3
              }}
            >
              <Typography
                align="center"
                color="textSecondary"
                variant="body1"
              >
                or login with email address
              </Typography>
            </Box>
            <TextField
              error={Boolean(formik.touched.email && formik.errors.email)}
              fullWidth
              helperText={formik.touched.email && formik.errors.email}
              label="Email Address"
              margin="normal"
              name="email"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="email"
              value={formik.values.email}
              variant="outlined"
            />
            <TextField
              error={Boolean(formik.touched.password && formik.errors.password)}
              fullWidth
              helperText={formik.touched.password && formik.errors.password}
              label="Password"
              margin="normal"
              name="password"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="password"
              value={formik.values.password}
              variant="outlined"
            />
            {!!loginError && <div>{loginError}</div>}
            <Box sx={{ py: 2 }}>
              <Button
                color="primary"
                disabled={formik.isSubmitting}
                fullWidth
                size="large"
                type="submit"
                variant="contained"
                onClick={formik.submitForm}
              >
                Sign In
              </Button>
            </Box>
            <Typography
              color="textSecondary"
              variant="body2"
            >
              Don&apos;t have an account?
              {' '}
              <RouterLink
                to="/register"
              >
                <Link
                  href='/register'
                  variant="subtitle2"
                  underline="hover"
                  sx={{
                    cursor: 'pointer'
                  } as any}
                >
                  Sign Up
                </Link>
              </RouterLink>
            </Typography>
          </form>
        </Container>
      </Box>
    </>
  );
};

export default Login;
