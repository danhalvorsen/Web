import {
  InteractionRequiredAuthError,
  InteractionStatus,
} from "@azure/msal-browser";
import { AuthenticatedTemplate, useMsal } from "@azure/msal-react";
import { useEffect, useState } from "react";
import { scopes } from "./authConfig";

export const ProtectedComponent = (): JSX.Element => {
  const { instance, inProgress, accounts } = useMsal();
  const [apiData, setApiData] = useState(null);

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
          console.log(accessToken);
        })
        .catch((error) => {
          if (error instanceof InteractionRequiredAuthError) {
            instance.acquireTokenRedirect(accessTokenRequest);
          }
          console.log(error);
        });
    }
  }, [instance, accounts, inProgress, apiData]);

  return (
    <div>
      <h5>ProtectedComponent</h5>
    </div>
  );
};
