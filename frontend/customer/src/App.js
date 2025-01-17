import React, { useState, useEffect } from 'react';
import { login, getCustomer } from './services/api'; // Hàm login và getCustomer đã định nghĩa trong api.js

function App() {
  const [customer, setCustomer] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    // Khi component được mount, kiểm tra xem đã có token trong cookie chưa
    const token = document.cookie.split('; ').find(row => row.startsWith('access_token='));
    if (token) {
      const accessToken = token.split('=')[1];
      // Nếu có token, lấy thông tin customer từ API
      getCustomer(accessToken)
        .then((data) => setCustomer(data))
        .catch((err) => setError('Failed to fetch customer data.'));
    }
  }, []);

  const handleLogin = async () => {
    setError(null); // Reset lỗi trước khi thực hiện đăng nhập
    try {
      const response = await login(username, password); // Gọi API login
      console.log('Login successful:', response);
      // Sau khi đăng nhập thành công, tự động lấy thông tin customer
      const token = document.cookie.split('; ').find(row => row.startsWith('access_token='));
      const accessToken = token ? token.split('=')[1] : '';
      if (accessToken) {
        getCustomer(accessToken)
          .then((data) => setCustomer(data))
          .catch((err) => setError('Failed to fetch customer data.'));
      }
    } catch (err) {
      setError('Invalid login credentials.');
    }
  };

  const handleLogout = () => {
    // Xóa cookie và reset trạng thái khi người dùng đăng xuất
    document.cookie = 'access_token=; Max-Age=0; path=/;';
    setCustomer(null);
  };

  return (
    <div>
      <h1>React App with FastAPI Authentication</h1>

      {customer ? (
        <div>
          <h2>Welcome, {customer.name}!</h2>
          <p>Email: {customer.email}</p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <div>
          <h2>Login</h2>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={handleLogin}>Login</button>
          {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
      )}
    </div>
  );
}

export default App;
