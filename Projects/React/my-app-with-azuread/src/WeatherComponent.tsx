import { useContext, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { AccessTokenContext } from "./ProfileService";

export class WeatherData {
  "date": string;
  "temperatureC": number;
  "temperatureF": number;
  "summary": string;
}

export const WeatherComponent = () => {
  const accessToken = useContext(AccessTokenContext);
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

    const myHeaders = new Headers();

    myHeaders.append(
      "Authentication",
      "Bearer eyJ0eXAiOiJKV1QiLCJub25jZSI6IjEtVTB1eUZJbXl5Y3JfcG9kMi03NkxvOXJUbjkyWlNDS09qV3F0amhFbGsiLCJhbGciOiJSUzI1NiIsIng1dCI6IjJaUXBKM1VwYmpBWVhZR2FYRUpsOGxWMFRPSSIsImtpZCI6IjJaUXBKM1VwYmpBWVhZR2FYRUpsOGxWMFRPSSJ9.eyJhdWQiOiIwMDAwMDAwMy0wMDAwLTAwMDAtYzAwMC0wMDAwMDAwMDAwMDAiLCJpc3MiOiJodHRwczovL3N0cy53aW5kb3dzLm5ldC84OTRiYjZmZi05YWE5LTRlODgtYTM0Ny05YmEyY2Q5MjI1MjIvIiwiaWF0IjoxNjY2Njk3MTkyLCJuYmYiOjE2NjY2OTcxOTIsImV4cCI6MTY2NjcwMjYyNiwiYWNjdCI6MCwiYWNyIjoiMSIsImFpbyI6IkFWUUFxLzhUQUFBQWNiNjhlOE11empmU3kvY2FiNmI2NWxsRkJRTE1vZG8xaFoxS2dnZndCbDFUd2Irbk1naU9NcjRLdmExaU5yU0VtOXVXaklkdHp4OWxiQkZkcG92ZGZ3U1lwZFJBTDdsbGhwa215alRXWkxVPSIsImFtciI6WyJwd2QiLCJtZmEiXSwiYXBwX2Rpc3BsYXluYW1lIjoid2ViLWFwcC1hY3F1aXJlVG9rZW5TaWxlbnQiLCJhcHBpZCI6IjQ4Mjc2M2Y0LTMyMjctNGEzNC05ODA1LWM1ZWFlZTA2YmFhNiIsImFwcGlkYWNyIjoiMCIsImZhbWlseV9uYW1lIjoiSGFsdm9yc2VuIiwiZ2l2ZW5fbmFtZSI6IkRhbiIsImlkdHlwIjoidXNlciIsImlwYWRkciI6IjIxMy4yMzYuMTQ4LjQ1IiwibmFtZSI6IkRhbiIsIm9pZCI6IjFhZmI1MWRjLTFhMDQtNDZhNy04MjhkLWU5YjBlODI2OTBhMiIsInBsYXRmIjoiMyIsInB1aWQiOiIxMDAzMjAwMjM5RUZERkYxIiwicmgiOiIwLkFTSUFfN1pMaWFtYWlFNmpSNXVpelpJbElnTUFBQUFBQUFBQXdBQUFBQUFBQUFBakFENC4iLCJzY3AiOiJvcGVuaWQgcHJvZmlsZSBVc2VyLlJlYWQgZW1haWwiLCJzaWduaW5fc3RhdGUiOlsia21zaSJdLCJzdWIiOiJwb0d1U1Z1Tng1bGhKVktGc3ZyYzFEQjJ2VnhIV3dua3pMQVE0em5oYW9rIiwidGVuYW50X3JlZ2lvbl9zY29wZSI6IkVVIiwidGlkIjoiODk0YmI2ZmYtOWFhOS00ZTg4LWEzNDctOWJhMmNkOTIyNTIyIiwidW5pcXVlX25hbWUiOiJkYW5AaGFsdm9yc2Vub3JnLm9ubWljcm9zb2Z0LmNvbSIsInVwbiI6ImRhbkBoYWx2b3JzZW5vcmcub25taWNyb3NvZnQuY29tIiwidXRpIjoiS1BTN2tWX3pXMEtCV0dCTkY1a2VBQSIsInZlciI6IjEuMCIsIndpZHMiOlsiY2YxYzM4ZTUtMzYyMS00MDA0LWE3Y2ItODc5NjI0ZGNlZDdjIiwiYjc5ZmJmNGQtM2VmOS00Njg5LTgxNDMtNzZiMTk0ZTg1NTA5Il0sInhtc19zdCI6eyJzdWIiOiJrTXdtVnRjc0FZdDVUd0tlS25GaF83UFBxNlYzdFEzWVZVbHBJRWZESXZZIn0sInhtc190Y2R0IjoxNjM2NjM3NjkxLCJ4bXNfdGRiciI6IkVVIn0.ZXxTdsSm4nIEIw5bO_QjWksGElmDZiawyF-THJUgGlmQZTj61KAs_nVWwF-E-JwEaySi8JNgLX9l9lMEsauGPBsnmziEorgK9IP-NUsEE4Tt46V4E8htywh0nvMDrFCHQNTVysa8Zed-XxIPn4zL54c1OwyRxG9F1UD9bMKWFPbqI0ZNMmORv-MmW7vyQaRfhMIb4Zld5Zbxzv7PQGUMu0hZds4WBZnG0LkN9DyiPr0WqrZeg7UH4PWbLUIIbzJfHzd1fM1_nLpv0BfHrgzFE2WkUtjcy5nOvnhuBW4F0y7LRTuw5OVz-PzDaV8mUFBoIPc7abe2TeoLFmCVh7mNiA"
    );

    myHeaders.append("Content", "text/xml");
    myHeaders.append("access-control-allow-origin", "origin");

    //const request = await fetch("http://localhost:49153/WeatherForecast");

    const newRequest = new Request("http://localhost:49153/WeatherForecast", {
      method: "GET",
      mode: "no-cors",
      headers: myHeaders,
    });
    const request = await fetch(newRequest);
    console.log(request.headers.forEach((k, v) => console.log(k + "  " + v)));
    const data: Array<WeatherData> = await request.json();
    setWeatherData(data);
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
