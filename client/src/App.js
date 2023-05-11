import './App.css';
import AdminDashboard from './components/Dashboard/Dashboard';
import { Routes, Route, Navigate } from 'react-router-dom';
import { BookForm } from './components/BookForm/BookForm';
import AdminLogin from './components/Login/AdminLogin/AdminLogin';
import IssueDashboard from './components/Dashboard/IssueDashboard';
import { IssueForm } from './components/BookForm/IssueForm';
import UserLogin from './components/UserLogin/UserLogin';
import UserSignUp from './components/UserSignUp/UserSignUp';
import HomePage from './components/UserDashBoard/UserDashBoard';
import BookDetails from './components/UserDashBoard/BookDetails';
function App() {
  return (
    <Routes>
      <Route exact path="/" element={<AdminLogin />} />
      <Route exact path="/dashboard" element={<AdminDashboard />} />
      <Route exact path="/addbook" element={<BookForm />} />
      <Route exact path="/addissue" element={<IssueForm />} />
      <Route exact path="/issue" element={<IssueDashboard />} />
      <Route exact path="/editbook/:bookId" element={<BookForm />} />
      <Route path="*" element={<Navigate to="/" />} />
      <Route exact path="/userlogin" element={<UserLogin />} />
      <Route exact path="/userSignUp" element={<UserSignUp />} />
      <Route exact path="/homepage" element={<HomePage />} />
      <Route path="/books/:id" element={<BookDetails />} />
    </Routes>
  );
}

export default App;
