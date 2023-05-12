const Bookapi = {
  getAllBooks: async (token) => {
    const res = await fetch('https://lms-2.onrender.com/api/books/', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    return data;
  },

  getBook: async (bookId) => {
    const token = localStorage.getItem('token');
    const res = await fetch(`https://lms-2.onrender.com/api/books/${bookId}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    return data;
  },

  addBook: async (data) => {
    const token = localStorage.getItem('token');
    const res = await fetch('https://lms-2.onrender.com/api/books/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    return await res.json();
  },

  patchBook: async (bookId, data) => {
    const token = localStorage.getItem('token');
    const res = await fetch(`https://lms-2.onrender.com/api/books/${bookId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    return await res.json();
  },

  deleteBook: async (bookId) => {
    const token = localStorage.getItem('token');
    const res = await fetch(`https://lms-2.onrender.com/api/books/${bookId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.json();
  },

  fetchIssuedBooks: async () => {
    const res = await fetch('https://lms-2.onrender.com/api/issues/', {
      method: 'GET',
    });
    return res.json();
  },
};

module.exports = Bookapi;
