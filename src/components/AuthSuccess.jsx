import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const AuthSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [status, setStatus] = useState('Verifying authentication...');

  useEffect(() => {
    const handleAuth = async () => {
      const params = new URLSearchParams(location.search);
      const token = params.get('token');

      if (token) {
        // Store token temporarily
        localStorage.setItem('authToken', token);
        setStatus('Authentication successful!');
        
        // Verify session with backend
        try {
          const response = await fetch('http://127.0.0.1:5000/api/user', {
            method: 'GET',
            credentials: 'include',
            headers: {
              'Content-Type': 'application/json',
            }
          });

          if (response.ok) {
            const data = await response.json();
            if (data.authenticated) {
              setStatus('Redirecting to dashboard...');
              // Small delay for better UX
              setTimeout(() => {
                navigate('/', { replace: true });
              }, 500);
            } else {
              setStatus('Authentication failed. Redirecting...');
              setTimeout(() => {
                navigate('/', { replace: true });
              }, 1500);
            }
          } else {
            setStatus('Session verification failed. Redirecting...');
            setTimeout(() => {
              navigate('/', { replace: true });
            }, 1500);
          }
        } catch (error) {
          console.error('Auth verification error:', error);
          setStatus('Error occurred. Redirecting...');
          setTimeout(() => {
            navigate('/', { replace: true });
          }, 1500);
        }
      } else {
        setStatus('No authentication token found. Redirecting...');
        setTimeout(() => {
          navigate('/', { replace: true });
        }, 1000);
      }
    };

    handleAuth();
  }, [navigate, location]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto mb-4"></div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Please Wait</h2>
        <p className="text-gray-600">{status}</p>
      </div>
    </div>
  );
};

export default AuthSuccess;