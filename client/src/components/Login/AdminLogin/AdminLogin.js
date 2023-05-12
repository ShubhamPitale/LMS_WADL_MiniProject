import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, TextField, FormGroup, FormControl } from '@mui/material';
import styles from './AdminLogin.module.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Userapi from '../../../BackendAPI/User';

const AdminLoginnew = () => {
  const navigate = useNavigate();
  const [isInvalid, setIsValid] = useState({
    email: false,
    password: false,
  });

  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({
    email: '',
    password: '',
  });

  const updateUserField = (event) => {
    const field = event.target;
    setUser((user) => ({ ...user, [field.name]: field.value }));
  };

  const validateUser = (event) => {
    const { name, value } = event.target;
    let emailRegularExpression =
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    let passwordRegularExpression = /^[a-zA-Z0-9!@#$%^&*]{5,16}$/;
    if (['email'].includes(name)) {
      setUser((prevProd) => ({ ...prevProd, [name]: value.trim() }));
      if (!value.trim().length) {
        setErrors({ ...errors, [name]: `${name} can't be empty` });
      } else {
        if (!emailRegularExpression.test(value)) {
          setErrors({ ...errors, [name]: 'Not a valid E-mail' });
        } else {
          setErrors({ ...errors, [name]: '' });
          setIsValid((Prevstate) => ({ ...Prevstate, [name]: true }));
        }
      }
    }
    if (['password'].includes(name)) {
      if (value.length < 5) {
        setErrors({
          ...errors,
          [name]: 'Password must be at least 5 characters',
        });
      } else {
        if (!passwordRegularExpression.test(value)) {
          setErrors({
            ...errors,
            [name]:
              'password should contain atleast one number or one special character',
          });
        } else {
          setErrors({ ...errors, [name]: '' });
          setIsValid((Prevstate) => ({ ...Prevstate, [name]: true }));
        }
      }
    }
  };

  const loginFormSubmit = (event) => {
    event.preventDefault();
    console.log(isInvalid);
    if (isInvalid.email && isInvalid.password) {
      Userapi.verifyUser(user)
        .then((res) => {
          if (Object.keys(res).length === 1) {
            toast.error(res.error, {
              position: 'top-right',
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
            });
          } else {
            toast.success('Login Successfull', {
              position: 'top-right',
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
            });
            console.log(res);
            localStorage.setItem('token', res.token);
            localStorage.setItem('admin', res.admin);
            navigate('/dashboard');
          }
        })
        .catch((err) => {
          console.log('login failed due to: ' + err);
        });
    }
  };

  return (
    <div className={styles['login-container']}>
      <div className={styles['login-modal']}>
        <h2 className={styles['modal-title']}>Admin Login</h2>
        <form noValidate autoComplete="off" onSubmit={loginFormSubmit}>
          <FormGroup>
            <FormControl className={styles.mb2}>
              <TextField
                label="Enter Email"
                name="email"
                type="email"
                required
                value={user.email}
                onChange={updateUserField}
                onBlur={validateUser}
                error={errors.email.length > 0}
                helperText={errors.email}
                sx={{
                  '& .MuiOutlinedInput-root.Mui-disabled': {
                    '& > fieldset': { border: '1px solid #c08c4d' },
                  },
                }}
              />
            </FormControl>
            <FormControl className={styles.mb2}>
              <TextField
                label="Enter Password"
                name="password"
                type="password"
                required
                value={user.password}
                onChange={updateUserField}
                onBlur={validateUser}
                error={errors.password.length > 0}
                helperText={errors.password}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '& > fieldset': { border: '1px solid #c08c4d' },
                  },
                }}
              />
            </FormControl>
          </FormGroup>
          <div className={styles.btnContainer}>
            <Button
              variant="contained"
              onClick={() => navigate('/userlogin')}
              size="large"
            >
              Log In as user
            </Button>
            <Button
              variant="contained"
              style={{ backgroundColor: '#b18857' }}
              type="submit"
              size="large"
            >
              Log In as admin
            </Button>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default AdminLoginnew;
