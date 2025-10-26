import React, { useEffect, type JSX } from 'react';
import { useNavigate } from 'react-router-dom';
import { getToken } from '../../helper/utils';

interface ProtectedRouteProps {
  children: JSX.Element;
}


const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const navigate = useNavigate();
  const token = getToken();

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  // Optional: prevent rendering children until token check
  if (!token) {
    return null; // or a loading spinner
  }

  return <>{children}</>;
};

export default ProtectedRoute
