import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { decodeJwt } from "jose";
import axios from 'axios';
import cookie from 'js-cookie';
import { useUser } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
const Login = () => {
  const { login } = useUser();
  const navigate = useNavigate();
  const handleLogin = async(response) => {
    try {
      if (response.credential) {
        console.log('Google login successful:', response);
        // Handle the response
        const decodedToken = decodeJwt(response.credential);
        console.log('Decoded Token:', decodedToken);
        const res = await axios.post('http://localhost:3000/api/customer/google', {
          firstName: decodedToken.given_name,
          lastName: decodedToken.family_name,
          email: decodedToken.email,
          googleLogin: true
      });
      cookie.set('token', res.data.body.jwt);
      login(res.data.body.jwt);
      navigate('/');
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };
  

  return (
    <GoogleOAuthProvider clientId="834479469866-ngd7l0n4mgib9huajku15ajrvk8rpudr.apps.googleusercontent.com">
      <GoogleLogin onSuccess={handleLogin} onError={handleLogin} />
    </GoogleOAuthProvider>
  );
};

export default Login;
