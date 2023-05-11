const User = require('../models/userModel');
const Book = require('../models/bookModel');
const Issue = require('../models/issueModel');

//////////
// Normal User
/////////

const getAllIssuesStudent = async (req, res) => {
  try {
    const issues = await Issue.find({ student: req.user._id })
      .populate('student')
      .populate('book');
    if (issues) {
      res
        .status(200)
        .setHeader('Content-Type', 'application/json')
        .json(issues);
    } else {
      res.status(200).json([]);
    }
  } catch (error) {
    res.status(500).send({ msg: error });
  }
};

const getSpecficIssue = async (req, res) => {
  try {
    const issue = await Issue.findById(req.params.issueId)
      .populate('student')
      .populate('book');

    if (issue && issue.student.id == req.user._id) {
      res.status(200).setHeader('Content-Type', 'application/json').json(issue);
    } else if (!issue) {
      res.status(404).json({ msg: 'Issue Not Found' });
    } else {
      res.status(401).json({ msg: 'Not Authenicated ' });
    }
  } catch (error) {
    res.status(500).send({ msg: error });
  }
};

/////////
// Admin
////////

const updateIssueToReturned = async (req, res) => {
  try {
    const requiredIssue = await Issue.findById(req.params.issueId);

    if (requiredIssue) {
      const requiredBook = await Book.findById(requiredIssue.book);
      if (requiredBook) {
        const issue = await Issue.findByIdAndUpdate(
          req.params.issueId,
          {
            $set: { returned: true },
          },
          { new: true }
        );

        if (issue) {
          const book = await Book.findByIdAndUpdate(
            issue.book,
            {
              $set: { copies: requiredBook.copies + 1 },
            },
            {
              new: true,
            }
          );
          if (book) {
            res
              .status(200)
              .setHeader('Content-Type', 'application/json')
              .json(issue);
          } else {
            res.status(404).json({ msg: 'Book Not Updated' });
          }
        } else {
          res.status(404).json({ msg: 'Issue Not Updated' });
        }
      } else {
        res.status(404).json({ msg: 'Book Not Found' });
      }
    } else {
      res.status(404).json({ msg: 'Issue Not Found' });
    }
  } catch (error) {
    res.status(500).send({ msg: error });
  }
};

const getAllIssues = async (req, res) => {
  try {
    const issues = await Issue.find({}).populate('student').populate('book');
    if (issues) {
      res
        .status(200)
        .setHeader('Content-Type', 'application/json')
        .json(issues);
    } else {
      res.status(200).json([]);
    }
  } catch (error) {
    res.status(500).send({ msg: error });
  }
};

const createNewIssue = async (req, res) => {
  try {
    const book = await Book.findById(req.body.book);
    const student = await User.findById(req.body.student);

    if (!book) res.status(404).json({ msg: 'Book not found' });
    if (!student) res.status(404).json({ msg: 'Student Not Found' });

    if (book && student) {
      const issues = await Issue.find({ student: req.body.student });
      if (issues) {
        const notReturned = issues.filter((issue) => !issue.returned);
        if (notReturned && notReturned.length >= 3) {
          res.status(400).json({
            msg: 'The student has already issued 3 books. Please return them first',
          });
        } else {
          if (book.copies > 0) {
            const issue = await Issue.create(req.body);
            const populatedIssue = await Issue.findById(issue._id)
              .populate('student')
              .populate('book');
            const updatedBook = await Book.findByIdAndUpdate(
              req.body.book,
              {
                $set: { copies: book.copies - 1 },
              },
              { new: true }
            );

            res.status(200).json(populatedIssue);
          } else {
            res.status(400).json({
              msg: 'The book is not available. You can wait for some days, until the book is returned to library',
            });
          }
        }
      } else {
        res.status(404).json({ msg: 'The Issue Not Found' });
      }
    }
  } catch (error) {
    res.status(500).send({ msg: error });
  }
};

const deleteAllIssues = async (req, res) => {
  try {
    const issue = await Issue.remove({});
    if (issue) {
      res.status(200).setHeader('Content-Type', 'application/json').json(issue);
    }
  } catch (error) {
    res.status(500).send({ msg: error });
  }
};

module.exports = {
  getAllIssuesStudent,
  getSpecficIssue,
  updateIssueToReturned,
  getAllIssues,
  createNewIssue,
  deleteAllIssues,
};
