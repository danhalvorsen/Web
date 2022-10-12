import React from "react";
import "./App.css";
import { InteractionType } from "@azure/msal-browser";
import {
  AuthenticatedTemplate,
  MsalAuthenticationTemplate,
  useMsal,
} from "@azure/msal-react";
import { ProfileContent } from "./ProfileService";
import { ProtectedComponent } from "./ProtectedComponent";

function WelcomeUser() {
  const { accounts } = useMsal();
  const username = accounts[0].username;
  return <p>Welcome, {username}</p>;
}

function App() {
  return (
    <AuthenticatedTemplate>
      <ProtectedComponent />
    </AuthenticatedTemplate>
  );
}

export default App;
