import React from "react";


const Login = () => {
  const handleGoogleLogin = () => {
    window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.REACT_APP_GOOGLE_AUTH_CLIENT_ID}&redirect_uri=${process.env.REACT_APP_GOOGLE_AUTH_REDIRECT_URI}&response_type=code&scope=email profile`;

  };

 return (
    <button className="loginButton" onClick={handleGoogleLogin}>
      로그인
    </button>
  );
};

export default Login;

