import React, { useState, useContext, useEffect } from "react";
import "./App.css";

import { useMsal } from "@azure/msal-react";
import { Button } from "react-bootstrap";
import { loginRequest } from "./authConfig";
import { WeatherComponent } from "./WeatherComponent";

export type AccessToken = {
  accessToken: string;
};

export const AccessTokenContext = React.createContext<AccessToken>({
  accessToken: "",
});

export interface IProfileContentProps {
  children: JSX.Element | JSX.Element[];
}
export const ProfileContent = (): JSX.Element => {
  const { instance, accounts, inProgress } = useMsal();
  const [accessToken, setAccessToken] = useState<AccessToken>({
    accessToken: "",
  });

  const name = accounts[0] && accounts[0].name;

  function RequestAccessToken() {
    const request = {
      ...loginRequest,
      account: accounts[0],
    };

    // Silently acquires an access token which is then attached to a request for Microsoft Graph data
    instance
      .acquireTokenSilent(request)
      .then((response) => {
        console.log(response.accessToken);
        const accessToken: AccessToken = {
          accessToken: response.accessToken,
        };
        setAccessToken(accessToken);
      })
      .catch((e) => {
        instance.acquireTokenPopup(request).then((response) => {
          console.error(response.accessToken);
          const accessToken: AccessToken = {
            accessToken: response.accessToken,
          };
          setAccessToken(accessToken);
        });
      });
  }

  return (
    <AccessTokenContext.Provider value={accessToken}>
      <h5 className="card-title">Welcome {name}</h5>
      {accessToken.accessToken ? (
        <>
          <p>Access Token Acquired!</p>
          <WeatherComponent />
        </>
      ) : (
        <div>
          <Button variant="secondary" onClick={RequestAccessToken}>
            Request Access Token
          </Button>
        </div>
      )}
    </AccessTokenContext.Provider>
  );
};
