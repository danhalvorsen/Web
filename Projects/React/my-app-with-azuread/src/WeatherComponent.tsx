import { useContext, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { AccessTokenContext } from "./ProfileService";

export class WeatherData {
  "date": string;
  "temperatureC": number;
  "temperatureF": number;
  "summary": string;
}

// export interface WeatherComponentProps {
//   children: JSX.Element | JSX.Element[];
// }
export const WeatherComponent = () => {
  const accessTokenContext = useContext(AccessTokenContext);
  const [weatherData, setWeatherData] = useState<Array<WeatherData>>([]);

  const fetchPost = async () => {
    const resource = {
      URL: {
        url: "https://localhost:49153/WeatherForecast",
      },
    };
    // const reqInfo: RequestInfo = {
    //   mode: "no-cors",
    //   method: "GET",
    //   headers: new Headers({
    //     "Content-Type": "application/json",
    //     Authentication: `Bearer ${accessToken.accessToken}`,
    //   }),
    //   url: "http://localhost:49153/WeatherForecast",
    // };

    if (
      accessTokenContext !== undefined &&
      accessTokenContext.accessToken.length > 20
    ) {
      const authenticationHeader: string = `Bearer ${accessTokenContext.accessToken}`;
      const myHeaders = new Headers();
      console.log(authenticationHeader);
      myHeaders.append("Authentication", authenticationHeader);
      // myHeaders.append("Content", "text/xml");
      // myHeaders.append("access-control-allow-origin", "origin");
      //const request = await fetch("http://localhost:49153/WeatherForecast");

      const request = await fetch("http://localhost:49159/WeatherForecast", {
        method: "GET",
        headers: { Authentication: authenticationHeader },
      });

      const data: Array<WeatherData> = await request.json();
      setWeatherData(data);
    }
  };

  useEffect(() => {
    fetchPost();
  }, []);
  return (
    <div>
      <h3>Hello from Weather component</h3>
      <button onClick={fetchPost}>Get Weather Data</button>
    </div>
  );
};
