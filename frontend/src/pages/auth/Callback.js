import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";

export default function Callback() {
  const { isAuthenticated, isLoading, user, error } = useAuth0();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && isAuthenticated && user) {
      saveUser(user)
        .then(() => {
          navigate("/prompt", { replace: true });
        })
        .catch(() => {
          navigate("/login", { replace: true });
        });
    }
  }, [isLoading, isAuthenticated, user, navigate]);

  if (isLoading) return <CircularProgress size={40} />;
  if (error) return <p>Login failed.</p>;

  return null;
}

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
async function saveUser(user) {
  await axios.post(`${API_BASE_URL}/api/users`, {
    auth0Id: user.sub,
    email: user.email,
    emailVerified: user.email_verified,
    nickname: user.nickname,
    name: user.name,
    imageUrl: user.picture,
    updatedAt: user.updated_at
  });
}