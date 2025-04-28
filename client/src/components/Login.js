import { useState } from 'react';

function Login() {
  const [count, setCount] = useState(0);

  return (
    <>
      <h1>Login</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </div>
    </>
  );
}

export default Login;
