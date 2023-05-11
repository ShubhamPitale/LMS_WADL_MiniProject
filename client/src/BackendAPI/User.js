const Userapi = {
  verifyUser: async (data) => {
    console.log(data);
    const res = await fetch('http://localhost:5000/api/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return await res.json();
  },
};

module.exports = { Userapi };
