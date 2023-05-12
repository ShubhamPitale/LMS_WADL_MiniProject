import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Paper,
  Container,
  Button,
  TextField,
  FormGroup,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
} from '@mui/material';
import styles from './BookForm.module.css';
import Bookapi from '../../BackendAPI/Book';

export const BookForm = () => {
  const { bookId } = useParams();
  const navigate = useNavigate();
  const [isInvalid, setIsInvalid] = useState(true);
  const [book, setBook] = useState({
    _id: '',
    name: '',
    author: '',
    category: '',
    description: '',
    image: '',
    copies: '',
    shelf: '',
    floor: '',
  });
  const [errors, setErrors] = useState({
    _id: '',
    name: '',
    author: '',
    category: '',
    description: '',
    image: '',
    shelf: '',
    floor: '',
    copies: '',
  });

  const formSubmit = (event) => {
    event.preventDefault();
    if (!isInvalid) {
      if (bookId) {
        Bookapi.patchBook(bookId, {
          ...book,
        }).then(() => navigate(-1));
      } else {
        console.log(book);
        Bookapi.addBook(book).then(() => navigate('/dashboard'));
      }
    }
  };

  const transformFile = (file) => {
    const reader = new FileReader();

    if (file) {
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setBook((book) => ({ ...book, image: reader.result }));
      };
    } else {
      setBook((book) => ({ ...book, image: '' }));
    }
  };

  const updateBookField = (event) => {
    const field = event.target;
    if (field.name === 'image') {
      transformFile(field.files[0]);
      console.log(book.image);
    } else {
      setBook((book) => ({ ...book, [field.name]: field.value }));
    }
    setIsInvalid(() => {
      return book.name.trim() === undefined
        ? true
        : false || book.category.trim() === '';
    });
  };

  const validateForm = (event) => {
    const { name, value } = event.target;
    if (
      [
        'name',
        '_id',
        'author',
        'description',
        'copies',
        'shelf',
        'floor',
      ].includes(name)
    ) {
      setBook((prevProd) => ({ ...prevProd, [name]: value.trim() }));
      if (!value.trim().length) {
        setErrors({ ...errors, [name]: `${name} can't be empty` });
      } else {
        setErrors({ ...errors, [name]: '' });
      }
    }
    if (['price', 'copies', 'shelf', 'floor'].includes(name)) {
      if (isNaN(Number(value))) {
        setErrors({ ...errors, [name]: 'Only numbers are allowed' });
      } else {
        if (Number(value) < 0) {
          setErrors({ ...errors, [name]: 'negative value not allowed' });
        } else {
          setErrors({ ...errors, [name]: '' });
        }
      }
    }
    if (['image'].includes(name)) {
      if (!value) {
        setErrors({ ...errors, [name]: 'Please select an image' });
      } else {
        setErrors({ ...errors, [name]: '' });
      }
    }
  };

  useEffect(() => {
    if (bookId) {
      Bookapi.getBook(bookId).then(({ book, error }) => {
        if (error) {
          navigate('/login');
        } else {
          setBook(book);
        }
      });
    }
  }, [bookId, navigate]);

  return (
    <div className={styles['bookform-container']}>
      <Container component={Paper} className={styles.wrapper}>
        <Typography className={styles.pageHeader} variant="h5">
          {bookId ? 'Update Book' : 'Add Book'}
        </Typography>
        <form noValidate autoComplete="off" onSubmit={formSubmit}>
          <FormGroup>
            {bookId && (
              <FormControl className={styles.mb2}>
                <TextField
                  label="Id"
                  name="_id"
                  required
                  value={book._id}
                  onChange={updateBookField}
                  onBlur={validateForm}
                  error={errors._id.length > 0}
                  helperText={errors._id}
                  disabled={true}
                  sx={{
                    '& .MuiOutlinedInput-root.Mui-disabled': {
                      '& > fieldset': { border: '1px solid #c08c4d' },
                    },
                  }}
                />
              </FormControl>
            )}
            <FormControl className={styles.mb2}>
              <TextField
                label="Name"
                name="name"
                required
                value={book.name}
                onChange={updateBookField}
                onBlur={validateForm}
                error={errors.name.length > 0}
                helperText={errors.name}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '& > fieldset': { border: '1px solid #c08c4d' },
                  },
                }}
              />
            </FormControl>
            <FormControl className={styles.mb2}>
              <TextField
                label="Author"
                name="author"
                type="text"
                value={book.author}
                onChange={updateBookField}
                onBlur={validateForm}
                error={errors.author.length > 0}
                helperText={errors.author}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '& > fieldset': { border: '1px solid #c08c4d' },
                  },
                }}
              />
            </FormControl>
            <FormControl
              className={styles.mb2}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& > fieldset': { border: '1px solid #c08c4d' },
                },
              }}
            >
              <InputLabel>Category</InputLabel>
              <Select
                name="category"
                value={book.category}
                onChange={updateBookField}
                required
              >
                <MenuItem value="Romance">Romance</MenuItem>
                <MenuItem value="Technology">Technology</MenuItem>
                <MenuItem value="Computer Science">Computer Science</MenuItem>
                <MenuItem value="Management">Management</MenuItem>
                <MenuItem value="Electronics">Electronics</MenuItem>
                <MenuItem value="Thriller">Thriller</MenuItem>
                <MenuItem value="Physics">Physics</MenuItem>
                <MenuItem value="Chemistry">Chemistry</MenuItem>
                <MenuItem value="Mathematics">Mathematics</MenuItem>
                <MenuItem value="Fiction">Fiction</MenuItem>
                <MenuItem value="Philosophy">Philosophy</MenuItem>
                <MenuItem value="Language">Language</MenuItem>
                <MenuItem value="Arts">Arts</MenuItem>
                <MenuItem value="Other">Other</MenuItem>
              </Select>
            </FormControl>
            <FormControl className={styles.mb2}>
              <TextField
                label="Description"
                name="description"
                type="text"
                value={book.description}
                onChange={updateBookField}
                onBlur={validateForm}
                error={errors.description.length > 0}
                helperText={errors.description}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '& > fieldset': { border: '1px solid #c08c4d' },
                  },
                }}
              />
            </FormControl>
            <FormControl className={styles.mb2}>
              <TextField
                label="Copies"
                name="copies"
                type="text"
                value={book.copies}
                onChange={updateBookField}
                onBlur={validateForm}
                error={errors.copies.length > 0}
                helperText={errors.copies}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '& > fieldset': { border: '1px solid #c08c4d' },
                  },
                }}
              />
            </FormControl>
            <FormControl className={styles.mb2}>
              <TextField
                label="Floor no"
                name="floor"
                type="text"
                value={book.floor}
                onChange={updateBookField}
                onBlur={validateForm}
                error={errors.floor.length > 0}
                helperText={errors.floor}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '& > fieldset': { border: '1px solid #c08c4d' },
                  },
                }}
              />
            </FormControl>
            <FormControl className={styles.mb2}>
              <TextField
                label="Shelf no"
                name="shelf"
                type="text"
                value={book.shelf}
                onChange={updateBookField}
                onBlur={validateForm}
                error={errors.shelf.length > 0}
                helperText={errors.shelf}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '& > fieldset': { border: '1px solid #c08c4d' },
                  },
                }}
              />
            </FormControl>
            {!bookId && (
              <FormControl className={styles.mb2}>
                <TextField
                  name="image"
                  type="file"
                  onChange={updateBookField}
                  onBlur={validateForm}
                />
              </FormControl>
            )}
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
              {bookId ? 'Update Book' : 'Add Book'}
            </Button>
          </div>
        </form>
      </Container>
    </div>
  );
};
