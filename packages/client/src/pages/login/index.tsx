import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import React, { useState } from "react";
import { trpc } from "../../trpc";

const LoginPage = (): React.JSX.Element => {
  const mutation = trpc.userAuth.googleAuth.useMutation();
  const [errorMessage, setError] = useState<string | null>(null);

  const onGoogleLoginSuccess = ({ credential }: CredentialResponse) => {
    if (!credential) {
      setError("Error fetching credentials from Google. Please try again.");
      return;
    }

    mutation.mutate({ credential });
  };

  const onGoogleLoginFail = () => {
    console.log("Login failed");
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
