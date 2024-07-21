import { useAuth0 } from "@auth0/auth0-react";
import { useCreateMyUser } from "@/api/MyUserApi.ts";
import { useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const AuthCallbackPage = () => {
  const { user } = useAuth0();
  const { createUser } = useCreateMyUser();
  const navigate = useNavigate();
  const location = useLocation();
  const targetPath = location.state.returnTo;

  const hasCreatedUser = useRef(false);

  useEffect(() => {
    if (user?.sub && user?.email && !hasCreatedUser.current) {
      createUser({ auth0Id: user.sub, email: user.email });
      hasCreatedUser.current = true;
    }
    navigate(targetPath || '/');
  }, [createUser, navigate, user]);

  return (
      <em>Loading...</em>
  );
};

export default AuthCallbackPage;
