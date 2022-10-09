import React from "react";
import "./App.css";
import { InteractionType } from "@azure/msal-browser";
import { MsalAuthenticationTemplate, useMsal } from "@azure/msal-react";
import { ProfileContent } from "./ProfileService";

function WelcomeUser() {
  const { accounts } = useMsal();
  const username = accounts[0].username;
  return <p>Welcome, {username}</p>;
}

function App() {
  return (
    <MsalAuthenticationTemplate interactionType={InteractionType.Redirect}>
      <p>This will only render if a user is signed-in.</p>
      <WelcomeUser />
      <ProfileContent />
    </MsalAuthenticationTemplate>
  );
}

export default App;
