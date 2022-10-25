import React, { useContext } from "react";
import {
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
} from "@azure/msal-react";
import { PageLayout } from "./PageLayout";
import { ProfileContent } from "./ProfileService";
import { WeatherComponent } from "./WeatherComponent";

function App() {
  return (
    <PageLayout>
      <AuthenticatedTemplate>
        <ProfileContent />
        <WeatherComponent></WeatherComponent>
      </AuthenticatedTemplate>

      <UnauthenticatedTemplate>
        <p>You are not signed in! Please sign in.</p>
      </UnauthenticatedTemplate>
    </PageLayout>
  );
}
export default App;
