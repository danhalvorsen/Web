import {
  InteractionRequiredAuthError,
  InteractionStatus,
} from "@azure/msal-browser";
import { AuthenticatedTemplate, useMsal } from "@azure/msal-react";
import { useEffect, useState, useContext, createContext } from "react";
import { scopes } from "./authConfig";

export const ProtectedComponent = (): JSX.Element => {
  const Context = createContext("Default Value");
  const { instance, inProgress, accounts } = useMsal();
  const [apiData, setApiData] = useState(null);
  const [accessToken, setAccessToken] = useState("");

  useEffect(() => {
    const accessTokenRequest = {
      scopes: scopes.scopes,
      account: accounts[0],
    };
    if (!apiData && inProgress === InteractionStatus.None) {
      instance
        .acquireTokenSilent(accessTokenRequest)
        .then((accessTokenResponse) => {
          // Acquire token silent success
          let accessToken = accessTokenResponse.accessToken;
          setAccessToken(accessToken);
          console.log(accessToken);
        })
        .catch((error) => {
          if (error instanceof InteractionRequiredAuthError) {
            setAccessToken("");
            instance.acquireTokenRedirect(accessTokenRequest);
          }
          console.log(error);
        });
    }
  }, [instance, accounts, inProgress, apiData]);

  return (
    <div>
      <h5>ProtectedComponent</h5>
      <Context.Provider value="{{accessToken}}"></Context.Provider>
    </div>
  );
};
