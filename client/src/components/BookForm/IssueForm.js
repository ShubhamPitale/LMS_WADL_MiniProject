import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Paper,
  Container,
  Button,
  TextField,
  FormGroup,
  FormControl,
  Typography,
} from '@mui/material';
import styles from './BookForm.module.css';
import Issueapi from '../../BackendAPI/Issue';

export const IssueForm = () => {
  const navigate = useNavigate();
  const [isInvalid, setIsInvalid] = useState(true);
  const [issue, setIssue] = useState({
    student: '',
    book: '',
  });
  const [errors, setErrors] = useState({
    student: '',
    book: '',
  });

  const formSubmit = (event) => {
    event.preventDefault();
    if (!isInvalid) {
      if (issue) {
        console.log(issue);
        Issueapi.addIssue(issue).then(() => navigate('/issue'));
      }
    }
  };

  const updateIssueField = (event) => {
    const field = event.target;
    setIssue((issue) => ({ ...issue, [field.name]: field.value }));
    setIsInvalid(() => {
      return issue.student.trim() === undefined
        ? true
        : false || issue.book.trim() === '';
    });
  };

  const validateForm = (event) => {
    const { name, value } = event.target;
    if (['student', 'book'].includes(name)) {
      setIssue((prevProd) => ({ ...prevProd, [name]: value.trim() }));
      if (!value.trim().length) {
        setErrors({ ...errors, [name]: `${name} can't be empty` });
      } else if (value.trim().length !== 24) {
        setErrors({ ...errors, [name]: `${name} id must be of 24 characters` });
      } else {
        setErrors({ ...errors, [name]: '' });
      }
    }
  };

  return (
    <div
      className={styles['bookform-container']}
      style={{ minHeight: '100vh' }}
    >
      <Container component={Paper} className={styles.wrapper}>
        <Typography className={styles.pageHeader} variant="h5">
          Create a Issue
        </Typography>
        <form noValidate autoComplete="off" onSubmit={formSubmit}>
          <FormGroup>
            <FormControl className={styles.mb2}>
              <TextField
                label="Enter Student ID"
                name="student"
                required
                value={issue.student}
                onChange={updateIssueField}
                onBlur={validateForm}
                error={errors.student.length > 0}
                helperText={errors.student}
                sx={{
                  '& .MuiOutlinedInput-root.Mui-disabled': {
                    '& > fieldset': { border: '1px solid #c08c4d' },
                  },
                }}
              />
            </FormControl>
            <FormControl className={styles.mb2}>
              <TextField
                label="Enter Book ID"
                name="book"
                required
                value={issue.book}
                onChange={updateIssueField}
                onBlur={validateForm}
                error={errors.book.length > 0}
                helperText={errors.book}
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
              style={{ backgroundColor: '#b18857' }}
              onClick={() => {
                navigate(-1);
              }}
            >
              Cancel
            </Button>
            <Button type="submit" variant="contained" disabled={isInvalid}>
              Create Issue
            </Button>
          </div>
        </form>
      </Container>
    </div>
  );
};
