const Book = require('../models/bookModel');
const cloudinary = require('../util/cloudinary');

const getAllBooks = async (req, res) => {
  try {
    const books = await Book.find({});
    res.status(200).json({ books });
  } catch (error) {
    res.status(500).send({ msg: error });
  }
};

const createBook = async (req, res) => {
  try {
    const book = new Book({
      name: req.body.name,
      author: req.body.author,
      description: req.body.description,
      category: req.body.category,
      copies: req.body.copies,
      shelf: req.body.shelf,
      floor: req.body.floor,
    });

    const image = req.body.image;
    const result = await cloudinary.uploader.upload(image);

    book.image.public_id = result.public_id;
    book.image.url = result.url;

    const storedBook = await book.save();

    res.status(201).json(storedBook);
  } catch (error) {
    res.status(500).send({ msg: error });
  }
};

const getBook = async (req, res) => {
  try {
    const { bookId } = req.params;
    const book = await Book.findOne({ _id: bookId });

    if (!book) {
      return res.status(404).json({ msg: `No book with id: ${bookId}` });
    }

    res.status(200).json({ book });
  } catch (error) {
    res.status(500).send({ msg: error });
  }
};

const updateBook = async (req, res) => {
  try {
    const { bookId } = req.params;

    const book = await Book.findOneAndUpdate({ _id: bookId }, req.body, {
      new: true,
      runValidators: true,
    });

    if (!book) {
      return res.status(404).json({ msg: `No book with id: ${bookId}` });
    }
    res.status(200).json({ book });
  } catch (error) {
    res.status(500).send({ msg: error });
  }
};

const deleteBook = async (req, res) => {
  try {
    const { bookId } = req.params;
    const book = await Book.findOneAndDelete({ _id: bookId });

    if (!book) {
      return res.status(404).json({ msg: `No book with id: ${bookId}` });
    }
    res.status(200).json({ book });
  } catch (error) {
    res.status(500).send({ msg: error });
  }
};

module.exports = { getAllBooks, createBook, getBook, updateBook, deleteBook };
