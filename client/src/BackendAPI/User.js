const Userapi = {
  verifyUser: async (data) => {
    console.log(data);
    const res = await fetch('https://lms-2.onrender.com/api/users/login', {
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
