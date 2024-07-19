import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import React, { useEffect, useState } from "react";
import { trpc } from "../../trpc";
import { useAuth } from "../../contexts/auth";
import { useNavigate } from "@tanstack/react-router";
import { Route } from "../../routes/user.login";
import { WarningBanner, WarningReasons } from "../../components/WarningBanner";

const LoginPage = (): React.JSX.Element => {
  const { wa: warning, prev } = Route.useSearch();
  const mutation = trpc.userAuth.googleAuthRedirect.useMutation();
  const [errorMessage, setError] = useState<string | null>(null);
  const { setAuthInfo, isLoggedIn } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      navigate({ to: "/" });
    }
  }, [isLoggedIn, navigate]);

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
      },
    );
  };

  const onGoogleLoginFail = () => {
    setError("Error logging in with Google. Please try again.");
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 p-4">
      <div className="flex-grow flex items-start w-full max-w-md mt-8">
        <div className="bg-white p-6 rounded-lg shadow-md w-full border border-gray-300">
          <p className="mb-4 text-center">
            Get started by logging in with Google and join the fun!
          </p>
          {warning === WarningReasons.UNAUTH_REDIR && (
            <WarningBanner reason={warning} prev={prev} />
          )}
          {mutation.isPending ? (
            <div className="text-center">Loading ...</div>
          ) : (
            <div className="flex justify-center mb-4">
              <GoogleLogin
                onSuccess={onGoogleLoginSuccess}
                onError={onGoogleLoginFail}
              />
            </div>
          )}
          {errorMessage && (
            <p className="text-red-500 mt-4">
              Something went wrong! {errorMessage}
            </p>
          )}
          {mutation.error && (
            <p className="text-red-500 mt-4">
              Something went wrong! {mutation.error.message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
