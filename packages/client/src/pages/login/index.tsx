import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import React, { useEffect, useState } from "react";
import { trpc } from "../../trpc";
import { useAuth } from "../../contexts/auth";
import { useNavigate } from "@tanstack/react-router";

const LoginPage = (): React.JSX.Element => {
  const mutation = trpc.userAuth.googleAuthRedirect.useMutation();
  const [errorMessage, setError] = useState<string | null>(null);
  const { setAuthInfo, isLoggedIn } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      navigate({ to: "/" });
    }
  }, [isLoggedIn]);

  const onGoogleLoginSuccess = ({ credential }: CredentialResponse) => {
    if (!credential) {
      setError("Error fetching credentials from Google. Please try again.");
      return;
    }

    mutation.mutate(
      { credential },
      {
        onSuccess({ expiresAt, id, email }) {
          setAuthInfo({ expiresAt, id, email });
        },
      }
    );
  };

  const onGoogleLoginFail = () => {
    setError("Error logging in with Google. Please try again.");
  };

  return (
    <div>
      {mutation.isPending ? (
        <div>Loading ...</div>
      ) : (
        <GoogleLogin
          onSuccess={onGoogleLoginSuccess}
          onError={onGoogleLoginFail}
        />
      )}

      {errorMessage && <p>Something went wrong! {errorMessage}</p>}
      {mutation.error && <p>Something went wrong! {mutation.error.message}</p>}
    </div>
  );
};

export default LoginPage;
