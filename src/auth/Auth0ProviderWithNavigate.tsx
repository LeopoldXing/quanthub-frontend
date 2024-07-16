import React from 'react';
import { AppState, Auth0Provider, User } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";

const Auth0ProviderWithNavigate = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const domain = import.meta.env.VITE_AUTH0_DOMAIN;
  const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID;
  const redirectUri = import.meta.env.VITE_AUTH0_CALLBACK_URL;
  const audience = import.meta.env.VITE_AUTH0_AUDIENCE;

  console.log("domain", domain);
  console.log("clientId", clientId);
  console.log("redirectUri", redirectUri);
  console.log("audience", audience);

  if (!domain || !clientId || !redirectUri || !audience) {
    throw new Error(`Unable to initialize auth0, domain=${domain}, clientId=${clientId}, redirectUri=${redirectUri}, audience=${audience}`);
  }

  const onRedirectCallback = (appState?: AppState, user?: User) => {
    console.log("USER login callback, user -> ", user);
    console.log("USER login callback, appState -> ", appState);
    navigate("/auth-callback");
  }

  return (
      <Auth0Provider domain={domain} clientId={clientId} authorizationParams={{ redirect_uri: redirectUri, audience }}
                     onRedirectCallback={onRedirectCallback}>
        {children}
      </Auth0Provider>
  )
};

export default Auth0ProviderWithNavigate;
