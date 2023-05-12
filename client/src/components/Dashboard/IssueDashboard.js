import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import MaterialButton from '@mui/material/Button';
import styles from './Dashboard.module.css';
import TablePagination from '@mui/material/TablePagination';
import 'bootstrap/dist/css/bootstrap.css';
import Issueapi from '../../BackendAPI/Issue';
import Navbar from '../Navbar/Navbar';
import CircularProgress from '@mui/material/CircularProgress';
import Stack from '@mui/material/Stack';

const IssueDashboard = () => {
  const [issues, setIssues] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const isAdmin = true;

  const fetchIssues = async (token) => {
    const issueS = await Issueapi.getAllIssues(token);
    console.log(issueS);
    const newIssue = issueS.filter((issue) => issue.returned == false);

    setIssues(newIssue);

    return 'Zhala re fetchissues';
  };
  const updateIssue = async (id) => {
    const res = await Issueapi.updateIssue(id);
    console.log(res);
    const token = localStorage.getItem('token');
    fetchIssues(token);
    return 'Update zhala issue';
  };

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate('/login');
    } else {
      setLoading(true);
      const token = localStorage.getItem('token');
      fetchIssues(token)
        .then((res) => console.log(res))
        .catch(console.error)
        .finally(() => {
          setLoading(false);
        });
    }
  }, [navigate]);

  return (
    <>
      {loading ? (
        <Stack alignItems="center">
          <CircularProgress
            size={'5rem'}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: '100vh',
            }}
          />
        </Stack>
      ) : (
        <div className={styles['dashboard']}>
          <Navbar />
          <div className={styles['dashboard-title']}>
            <h3>Issued Book List</h3>
          </div>
          {isAdmin && (
            <div className={styles['add-book-conatiner']}>
              <Link to={`/addissue`}>
                <MaterialButton
                  variant="contained"
                  style={{ backgroundColor: '#b18857' }}
                  size="large"
                  startIcon={<AddIcon />}
                >
                  Issue a book
                </MaterialButton>
              </Link>
            </div>
          )}
          <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            {issues.length > 0 ? (
              <>
                {(rowsPerPage > 0
                  ? issues.slice(
                      page * rowsPerPage,
                      page * rowsPerPage + rowsPerPage
                    )
                  : issues
                ).map((issue) => (
                  <div
                    className={styles['list-book-container']}
                    key={issue._id}
                    style={{ width: '30.2%' }}
                  >
                    <div className={styles['list-book-details-container']}>
                      <p>
                        <span className={styles['item-span']}>
                          Student ID:{' '}
                        </span>
                        {`${issue.student._id}`}
                      </p>
                      <p>
                        <span className={styles['item-span']}>
                          Student Email:{' '}
                        </span>
                        {`${issue.student.email}`}
                      </p>
                      <p>
                        <span className={styles['item-span']}>Book Id: </span>
                        {`${issue.book._id}`}
                      </p>
                      <p>
                        <span className={styles['item-span']}>Book Name: </span>
                        {`${issue.book.name}`}
                      </p>
                      <p>
                        <span className={styles['item-span']}>Issued At: </span>
                        {`${new Date(issue.createdAt).toLocaleDateString()}`}
                      </p>

                      <MaterialButton
                        variant="contained"
                        style={{ backgroundColor: '#b18857' }}
                        size="large"
                        onClick={() => updateIssue(issue._id)}
                        // onClick={() => updateIssue(issue._id)}
                      >
                        Return
                      </MaterialButton>
                    </div>
                  </div>
                ))}
              </>
            ) : (
              <h2 className={styles['nobooks-errormsg']}>
                No Books are Issued
              </h2>
            )}
          </div>

          <TablePagination
            onRowsPerPageChange={(e) => {
              setRowsPerPage(parseInt(e.target.value, 10));
              setPage(0);
            }}
            component="div"
            count={issues.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={(e, newPage) => setPage(newPage)}
          />
        </div>
      )}
    </>
  );
};

export default IssueDashboard;
