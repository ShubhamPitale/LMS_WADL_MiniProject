import { useEffect } from 'react';
// import { Navbar, Nav, Form, FormControl, Button, Row, Col, Card } from 'react-bootstrap';
import './UserDashBoard.css';

import { Link, useNavigation } from 'react-router-dom';

import BookDetails from './BookDetails';

import { useState } from 'react';
import {
  Navbar,
  Nav,
  Form,
  FormControl,
  Button,
  Row,
  Col,
  Card,
  Pagination,
} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import logo from '../../img/logo.png';

function HomePage() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [books, setBooks] = useState([
    // { id:1,  name: 'The Great Gatsby', author: 'F. Scott Fitzgerald', category: 'Classic' },
    // { id: 2, name: 'To Kill a Mockingbird', author: 'Harper Lee', category: 'Classic' },
    // { id: 3, name: '1984', author: 'George Orwell', category: 'Dystopian' },
    // { id: 4, name: 'The Hobbit', author: 'J.R.R. Tolkien', category: 'Fantasy' },
    // { id: 5, name: 'Pride and Prejudice', author: 'Jane Austen', category: 'Romance' },
    // { id: 6, name: 'The Catcher in the Rye', author: 'J.D. Salinger', category: 'Classic' },
    // { id: 7, name: 'Brave New World', author: 'Aldous Huxley', category: 'Dystopian' },
    // { id: 8, name: 'The Lord of the Rings', author: 'J.R.R. Tolkien', category: 'Fantasy' },
    // { id: 9, name: 'Sense and Sensibility', author: 'Jane Austen', category: 'Romance' },
    // { id: 10, name: 'The Picture of Dorian Gray', author: 'Oscar Wilde', category: 'Classic' },
    // { id: 11, name: 'Fahrenheit 451', author: 'Ray Bradbury', category: 'Dystopian' },
    // { id: 12, name: 'Harry Potter and the Philosopher\'s Stone', author: 'J.K. Rowling', category: 'Fantasy' },
    // { id: 13, name: 'Emma', author: 'Jane Austen', category: 'Romance' },
  ]);
  const [mybooks, setmybooks] = useState([
    {
      id: 1,
      name: 'The Great Gatsby',
      author: 'F. Scott Fitzgerald',
      category: 'Classic',
    },
  ]);
  const [currentPage, setCurrentPage] = useState(1);
  const [booksPerPage, setBooksPerPage] = useState(4);
  const [showmybook, setshowmybook] = useState(true);

  function handleSearch(event) {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  }

  function handleGenreChange(event) {
    // const { value, checked } = event.target;

    // if (checked) {
    //   setSelectedGenres([...selectedGenres, value]);
    // } else {
    //   setSelectedGenres(selectedGenres.filter((genre) => genre !== value));
    // }
    setSelectedGenres(event.target.value);
    setCurrentPage(1);
  }

  function getFilteredBooks() {
    let filteredBooks = books;

    if (searchTerm !== '') {
      filteredBooks = filteredBooks.filter(
        (book) =>
          book.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          book.author.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedGenres.length > 0) {
      filteredBooks = filteredBooks.filter((book) =>
        selectedGenres.includes(book.category)
      );
    }

    return filteredBooks;
  }

  const totalBooks = getFilteredBooks().length;
  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = getFilteredBooks().slice(
    indexOfFirstBook,
    indexOfLastBook
  );

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalBooks / booksPerPage); i++) {
    pageNumbers.push(i);
  }

  function handlePageChange(event) {
    setCurrentPage(Number(event.target.text));
  }

  const handleViewDetailClick = (book) => {
    navigate(`/book/${book}`);
  };
  useEffect(() => {
    async function fetchdata() {
      const token = JSON.parse(localStorage.getItem('token'));
      console.log('hii', token);
      const responce = await fetch('http://localhost:5000/api/books/', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await responce.json();
      // console.log(data.books);
      setBooks(data.books);
    }
    fetchdata();
    async function fetchdata1() {
      const token = JSON.parse(localStorage.getItem('token'));
      console.log('hii', token);
      const responce = await fetch(
        'http://localhost:5000/api/issues/student/',
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await responce.json();
      console.log(data);
      const newData = data.filter((issue) => issue.returned == false);
      //  setBooks(data.books);
      setmybooks(newData);
    }
    fetchdata1();
  }, []);

  const logouthandler = () => {
    localStorage.clear();
    navigate('/userlogin');
  };

  return (
    <>
      <Navbar
        bg="#CC9966"
        expand="lg"
        style={{ backgroundColor: 'rgb(177, 136, 87)' }}
      >
        <Navbar.Brand style={{ marginLeft: '20px' }} href="#home">
          <div className="logo">
            {' '}
            <img src={logo}></img>
          </div>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link
              href="./homepage"
              onClick={() => setshowmybook(true)}
              style={{ color: 'black' }}
            >
              Home
            </Nav.Link>
            <Nav.Link
              href="#link"
              onClick={() => setshowmybook(false)}
              style={{ color: 'black' }}
            >
              Issues
            </Nav.Link>
          </Nav>
          {showmybook ? (
            <Form
              className="searchbar"
              inline="true"
              style={{ display: 'flex', marginLeft: '5%' }}
            >
              <FormControl
                type="text"
                placeholder="Search"
                className="mr-sm-2"
                value={searchTerm}
                onChange={handleSearch}
              />
            </Form>
          ) : (
            ''
          )}
        </Navbar.Collapse>
      </Navbar>
      <Row className="mt-0" style={{ height: '800px' }}>
        <Col
          xs={12}
          md={2}
          style={{ backgroundColor: 'rgb(195 170 49 / 47%)' }}
        >
          {showmybook ? (
            <div>
              {' '}
              <h4 style={{ margin: '5%' }}>Filter by genre</h4>
              <Form style={{ marginLeft: '10px' }}>
                <Form.Check
                  type="radio"
                  name="genre"
                  label="All"
                  onChange={() => {
                    document.location.reload();
                  }}
                />
                <Form.Check
                  type="radio"
                  name="genre"
                  id="technology"
                  label="Technology"
                  value="Technology"
                  onChange={handleGenreChange}
                />
                <Form.Check
                  type="radio"
                  name="genre"
                  id="computerscience"
                  label="Computer Science"
                  value="Computer Science"
                  onChange={handleGenreChange}
                />
                <Form.Check
                  type="radio"
                  name="genre"
                  id="management"
                  label="Management"
                  value="Management"
                  onChange={handleGenreChange}
                />
                <Form.Check
                  type="radio"
                  name="genre"
                  id="romance"
                  label="Romance"
                  value="Romance"
                  onChange={handleGenreChange}
                />
                <Form.Check
                  type="radio"
                  name="genre"
                  id="electronics"
                  label="Electronics"
                  value="Electronics"
                  onChange={handleGenreChange}
                />
                <Form.Check
                  type="radio"
                  name="genre"
                  id="physics"
                  label="Physics"
                  value="Physics"
                  onChange={handleGenreChange}
                />
                <Form.Check
                  type="radio"
                  name="genre"
                  id="chemistry"
                  label="Chemistry"
                  value="Chemistry"
                  onChange={handleGenreChange}
                />
                <Form.Check
                  type="radio"
                  name="genre"
                  id="mathematics"
                  label="Mathematics"
                  value="Mathematics"
                  onChange={handleGenreChange}
                />
                <Form.Check
                  type="radio"
                  name="genre"
                  id="fiction"
                  label="Fiction"
                  value="Fiction"
                  onChange={handleGenreChange}
                />
                <Form.Check
                  type="radio"
                  name="genre"
                  id="philosophy"
                  label="Language"
                  value="Language"
                  onChange={handleGenreChange}
                />
                <Form.Check
                  type="radio"
                  name="genre"
                  id="arts"
                  label="Arts"
                  value="Arts"
                  onChange={handleGenreChange}
                />
                <Form.Check
                  type="radio"
                  name="genre"
                  label="Other"
                  value="Other"
                  onChange={handleGenreChange}
                />
              </Form>
            </div>
          ) : (
            ''
          )}

          <Button
            style={{
              // marginTop: '200px',
              // marginLeft: '20px',
              position: 'fixed',
              bottom: '3%',
              left: '1%',
              backgroundColor: '#990000',
            }}
            onClick={logouthandler}
          >
            Logout
          </Button>
        </Col>
        <Col xs={12} md={10} style={{ backgroundColor: '#eddca9' }}>
          {showmybook ? (
            <h2
              style={{
                textAlign: 'center',
                marginTop: '20px',
                marginBottom: '20px',
              }}
            >
              Books
            </h2>
          ) : (
            <h2
              style={{
                textAlign: 'center',
                marginTop: '20px',
                marginBottom: '20px',
              }}
            >
              {' '}
              Issued Books
            </h2>
          )}
          <Row>
            {showmybook ? (
              currentBooks.length === 0 ? (
                <h3>No Books Found</h3>
              ) : (
                currentBooks.map((book) => (
                  <Col xs={12} md={11} key={book._id}>
                    <Card className="mb-4">
                      <Card.Body>
                        <Card.Title>{book.name}</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">
                          {book.author}
                        </Card.Subtitle>
                        <Card.Text>{book.category}</Card.Text>

                        <Button>
                          <Link
                            style={{ color: 'black', textDecoration: 'none' }}
                            to={`/books/${book._id}`}
                          >
                            View details
                          </Link>{' '}
                        </Button>
                      </Card.Body>
                    </Card>
                  </Col>
                ))
              )
            ) : mybooks.length == 0 ? (
              <h3>No Issues Found</h3>
            ) : (
              mybooks.map((issue) => (
                <Col xs={12} md={11} key={issue._id}>
                  <Card className="mb-4">
                    <Card.Body>
                      <Card.Title>{issue.book.name}</Card.Title>
                      <Card.Subtitle className="mb-2 text-muted">
                        {issue.book.author}
                      </Card.Subtitle>
                      <Card.Text>{issue.book.category}</Card.Text>
                      <Card.Text>
                        Issued at:{' '}
                        {new Date(issue.createdAt).toLocaleDateString()}
                      </Card.Text>

                      <Button>
                        <Link
                          style={{ color: 'black', textDecoration: 'none' }}
                          to={`/books/${issue.book._id}`}
                        >
                          View details
                        </Link>{' '}
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
              ))
            )}
          </Row>
          <Pagination>
            {pageNumbers.map((number) => (
              <Pagination.Item
                key={number}
                active={number === currentPage}
                onClick={handlePageChange}
              >
                {number}
              </Pagination.Item>
            ))}
          </Pagination>
        </Col>
      </Row>
    </>
  );
}

export default HomePage;
