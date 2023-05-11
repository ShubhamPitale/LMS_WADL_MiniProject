const Issueapi = {
  getAllIssues: async (token) => {
    const res = await fetch('http://localhost:5000/api/issues/', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    console.log(data);
    return data;
  },

  addIssue: async (issue) => {
    const token = localStorage.getItem('token');
    const res = await fetch('http://localhost:5000/api/issues/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(issue),
    });
    const data = await res.json();
    return data;
  },

  deleteAllIssues: async () => {
    const token = localStorage.getItem('token');
    const res = await fetch(`http://localhost:5000/api/issues/`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    return data;
  },
  updateIssue: async (issueId) => {
    const token = localStorage.getItem('token');
    const res = await fetch(`http://localhost:5000/api/issues/${issueId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    return await res.json();
  },
};

module.exports = { Issueapi };
