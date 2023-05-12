import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { Button, Card } from 'react-bootstrap';
const BookDetails = () => {
  const { id } = useParams();
  // use the book ID to fetch book details from your API
  // and display them in your component
  const [book, setBooks] = useState([]);
  console.log(id);
  useEffect(() => {
    async function fetchdata() {
      const token = JSON.parse(localStorage.getItem('token'));
      // console.log('hii',token);
      const responce = await fetch(
        `https://lms-2.onrender.com/api/books/${id}`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await responce.json();
      //console.log(data);
      setBooks(data.book);
    }
    fetchdata();
  }, [id]);

  console.log(book);
  if (book.length === 0) {
    return <h1>loading.....</h1>;
  }
  return (
    <body style={{ backgroundColor: 'rgb(195 170 49 / 47%)' }}>
      <div className="container">
        <div className="row justify-content-center mt-3">
          <div className="col-md-6">
            <Card style={{ background: '#F5F5F5' }}>
              {book.image.url && (
                <Card.Img
                  variant="top"
                  src={book.image.url}
                  alt="vdv"
                  style={{ height: '400px' }}
                />
              )}

              <Card.Body>
                <Card.Title>{book.name}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  {book.author}
                </Card.Subtitle>
                <Card.Text>{book.description}</Card.Text>
                <p>
                  <strong>Category:</strong> {book.category}
                </p>
                <p>
                  <strong>Copies:</strong> {book.copies}
                </p>
                <p>
                  <strong>Floor:</strong> {book.floor}
                </p>
                <p>
                  <strong>Shelf:</strong> {book.shelf}
                </p>
                <Button
                  variant="secondary"
                  onClick={() => window.history.back()}
                >
                  Go back
                </Button>
              </Card.Body>
            </Card>
          </div>
        </div>
      </div>
    </body>
  );
};
export default BookDetails;
