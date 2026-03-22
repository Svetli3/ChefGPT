import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;
const API_AUDIENCE = process.env.REACT_APP_JWT_AUDIENCE;

export default function Callback() {
  const { isAuthenticated, isLoading, getAccessTokenSilently, user, error } = useAuth0();
  const navigate = useNavigate();

  const hasSavedUser = useRef(false);

  useEffect(() => {
    if (isLoading || !isAuthenticated || !user || hasSavedUser.current) return;

    hasSavedUser.current = true;

    const saveUser = async () => {
      try {
        const token = await getAccessTokenSilently({ audience: API_AUDIENCE });

        const userData = {
          Id: Math.floor(Math.random() * 10000),
          Auth0Id: user.sub,
          Email: user.email,
          EmailVerified: user.email_verified,
          Nickname: user.nickname,
          Name: user.name,
          ImageUrl: user.picture,
          UpdatedAt: user.updated_at
        };

        await axios.post(`${API_URL}/api/users`, userData, {
          headers: { Authorization: `Bearer ${token}` }
        });

        navigate("/prompt");
      } catch (err) {
        console.error("Error saving user:", err);
        navigate("/login");
      }
    };

    saveUser();
  }, [isLoading, isAuthenticated, user, getAccessTokenSilently, navigate]);


  if (isLoading) return <CircularProgress size={40} />;
  if (error) return <p>Login failed.</p>;

  return null;
}