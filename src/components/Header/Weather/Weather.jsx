import { weatherAPI } from "../../../api/api";
import React, { useState, useEffect } from "react";
import { Spinner } from "react-bootstrap";

export default function Weather() {
  const [weather, setWeather] = useState({});

  useEffect(() => {
    weatherAPI.getWeather().then((res) => {
      setWeather(res);
    });
  }, []);

  return (
    <div>
      {weather.data ? (
        <span>{Math.round(weather.data.main.temp - 273.15)}°c</span>
      ) : (
        <Spinner animation="border" variant="secondary" />
      )}
    </div>
  );
}
