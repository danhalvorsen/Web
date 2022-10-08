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
npm install @azure/msal-browser @azure/msal-react 
# Install the MSAL packages
npm install react-bootstrap bootstrap # Install Bootstrap for styling
``` 

#### Register your application
Follow the steps in Single-page application: 
App registration to create an app registration for your SPA by using the Azure portal.
##### Single-page application: App registration

<b>Note: I will setup the only supported flow, PKCE</b>
To register a single-page application (SPA) in the Microsoft identity platform, complete the following steps. The registration steps differ between MSAL.js 1.0, which supports the ~~implicit grant flow~~, and MSAL.js 2.0, which supports the authorization code flow with PKCE.

###### Create the app registration
For both MSAL.js 1.0- and 2.0-based applications, start by completing the following steps to create the initial app registration.

1. Sign in to the Azure portal.
2. If you have access to multiple tenants, use the Directories + subscriptions filter  in the top menu to select the tenant in which you want to register an application.
3. Search for and select Azure Active Directory.
4. Under Manage, select App registrations > New registration.
5. Enter a Name for your application. Users of your app might see this name, and you can change it later.
6. Choose the Supported account types for the application. Do NOT enter a Redirect URI. For a description of the different account types, see the Register an application.
7. Select Register to create the app registration.
Next, configure the app registration with a Redirect URI to specify where the Microsoft identity platform should redirect the client along with any security tokens. Use the steps appropriate for the version of MSAL.js you're using in your application:

MSAL.js 2.0 with auth code flow (recommended)
~~MSAL.js 1.0 with implicit flow~~

In the Redirect URI: MSAL.js 2.0 with auth code flow step, enter http://localhost:3000, the default location where create-react-app will serve your application.


#### Application code configuration
In an MSAL library, the application registration information is passed as configuration during the library initialization.

Using: REACT 


#### Single-page application: Sign-in and Sign-out

Learn how to add sign-in to the code for your single-page application.

Before you can get tokens to access APIs in your application, you need an authenticated user context. You can sign in users to your application in MSAL.js in two ways:

Pop-up window, by using the loginPopup method
Redirect, by using the loginRedirect method
You can also optionally pass the scopes of the APIs for which you need the user to consent at the time of sign-in.

If your application already has access to an authenticated user context or ID token, you can skip the login step, and directly acquire tokens. For details, see SSO with user hint.

<b>Dan: Trying out the pop-box experience</b>
##### Sign-in with a pop-up window
 
