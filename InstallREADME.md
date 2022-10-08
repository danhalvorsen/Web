https://learn.microsoft.com/en-us/azure/active-directory/develop/tutorial-v2-react

### Tutorial: Sign in users and call the Microsoft Graph API from a React single-page app (SPA) using auth code flow

In this tutorial, you build a React single-page application (SPA) that signs in users and calls Microsoft Graph by using the authorization code flow with PKCE. The SPA you build uses the Microsoft Authentication Library (MSAL) for React.

<b>In this tutorial:</b>

- Create a React project with npm
- Register the application in the Azure portal
- Add code to support user sign-in and sign-out
- Add code to call Microsoft Graph API
- Test the app
- MSAL React supports the authorization code flow in the browser instead of the implicit grant flow. MSAL React does <b>NOT</b> support the implicit flow.


#### Create the project


``` Console
npx create-react-app msal-react-tutorial # Create a new React app
cd msal-react-tutorial # Change to the app directory
npm install @azure/msal-browser @azure/msal-react # Install the MSAL packages
npm install react-bootstrap bootstrap # Install Bootstrap for styling
``` 
