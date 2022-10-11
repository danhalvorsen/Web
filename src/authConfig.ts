export const msalConfig = {
  auth: {
    clientId: '482763f4-3227-4a34-9805-c5eaee06baa6',
    authority:
      'https://login.microsoftonline.com/894bb6ff-9aa9-4e88-a347-9ba2cd922522', // This is a URL (e.g. https://login.microsoftonline.com/{your tenant ID})
    redirectUri: 'http://localhost:3000',
  },
  cache: {
    cacheLocation: 'sessionStorage', // This configures where your cache will be stored
    storeAuthStateInCookie: false, // Set this to "true" if you are having issues on IE11 or Edge
  },
}

// Add scopes here for ID token to be used at Microsoft identity platform endpoints.
export const loginRequest = {
  scopes: [
    'https://halvorsenorg.onmicrosoft.com/ad5f4924-a821-4e12-8580-8d42dab855e2/api.full.access',
  ],
}

// Add the endpoints here for Microsoft Graph API services you'd like to use.
export const graphConfig = {
  graphMeEndpoint: 'Enter_the_Graph_Endpoint_Here/v1.0/me',
}
