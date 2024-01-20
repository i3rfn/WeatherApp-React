import React, { useEffect, useState } from "react";
import {
  faCompass,
  faHouse,
  faLocationDot,
  faNewspaper,
  faSearch,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import "./WeatherApp.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Lottie from "lottie-react";
import Sunny from "../../Media/Sunny.json";
import Clouds from "../../Media/Clouds.json";
import Drizzle from "../../Media/Drizzle.json";
import Rain from "../../Media/Rain.json";
import Snow from "../../Media/Snow.json";
import Thunderstorm from "../../Media/Thunderstorm.json";
import Mist from "../../Media/Mist.json";
import Fog from "../../Media/Fog.json";
import Haze from "../../Media/Haze.json";
import Sand from "../../Media/Sand.json";
import Ash from "../../Media/Ash.json";
import Wind from "../../Media/Wind.json";
import Humidity from "../../Media/Humidity.json";
import Des from "../../Media/Des.json";
import Temp from "../../Media/Temp.json";
import Cat from "../../Media/Cat.json";

const WeatherApp = () => {
  const apiKey = "3045dd712ffe6e702e3245525ac7fa38";
  const [value, setValue] = useState("");
  const [weather, setWeather] = useState([]);
  const [noData, setNoData] = useState(false);

  const fetchWeather = async () => {
    try {
      setWeather([]);
      let data = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${value}&appid=${apiKey}`
      );
      let res = await data.json();
      setWeather([res]);
    } catch (error) {
      if (error) {
        alert("Search Failed , Please Try Again :)");
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (value.trim() === "") {
      alert("Please Fill the Field Below :)");
      return;
    }
    fetchWeather();
    setNoData(false);
  };

  useEffect(() => {
    setValue("");
    if (weather.length === 0) setNoData(true);
    else setNoData(false);
  }, [weather]);

  const weatherAnimations = {
    Clear: Sunny,
    Clouds: Clouds,
    Drizzle: Drizzle,
    Rain: Rain,
    Snow: Snow,
    Thunderstorm: Thunderstorm,
    Mist: Mist,
    Smoke: Fog,
    Haze: Haze,
    Dust: Sand,
    Fog: Fog,
    Sand: Sand,
    Ash: Ash,
    Squall: Wind,
    Tornado: Wind,
  };

  return (
    <>
      <div className="container-fluid w-full h-[100vh] flex justify-center items-center bg-[#161A30] select-none">
        <div className="w-[400px] h-[620px] rounded-3xl shadow-2xl flex flex-col justify-center items-center bg-[#31304D] py-2 pt-5 relative">
          <div className="top w-full h-[10%] flex justify-between items-center px-7 z-[999]">
            <form className="w-full" onSubmit={handleSubmit}>
              <input
                type="text"
                name="search"
                id="search"
                onChange={(e) => setValue(e.target.value)}
                placeholder="Search Here..."
                value={value}
                className="w-[92%] h-[50px] rounded-xl  outline-none p-3 text-white text-sm bg-[#2b2a44] capitalize shadow-inner"
              />
            </form>
            <FontAwesomeIcon
              icon={faSearch}
              className="text-xl text-gray-300 cursor-pointer hover:text-blue-700 transition-all duration-100 ease-linear"
              onClick={handleSubmit}
              id="submit"
            />
          </div>

          <div className="middle w-full h-[80%] flex flex-col justify-start items-center py-2 overflow-hidden">
            {weather &&
              weather.map((elem) => (
                <div key={elem.id}>
                  <div className="city w-full h-[50px] flex justify-start items-center px-8 gap-2 text-white">
                    <FontAwesomeIcon
                      icon={faLocationDot}
                      className="text-xl text-blue-700 mb-1"
                    />
                    <div className="w-full h-full flex justify-between items-center">
                      <p>
                        {elem.name}, {elem.sys.country}
                      </p>
                      <p>
                        {new Intl.DateTimeFormat("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        }).format(new Date(elem.dt * 1000))}
                      </p>
                    </div>
                  </div>

                  <div className="animation w-full h-[240px] flex justify-center items-center">
                    <Lottie
                      animationData={weatherAnimations[elem.weather[0].main]}
                      loop={true}
                      className="w-[65%] z-[999]"
                    />
                  </div>

                  <div className="temp w-full h-[80px] flex justify-center items-center text-white">
                    <Lottie
                      animationData={Temp}
                      loop={true}
                      className="w-[12%]"
                    />
                    <p className="text-4xl font-semibold">
                      {Math.round(elem.main.temp - 273.15)}
                      <span className="text-blue-600 font-normal">°</span>
                    </p>
                  </div>

                  <div className="other w-full h-[100px] flex justify-center items-center text-white">
                    <div className="w-[33%] h-full flex flex-col justify-center items-center gap-2">
                      <Lottie
                        animationData={Des}
                        loop={true}
                        className="w-[30%]"
                      />
                      <p className="font-bold text-sm">
                        {elem.weather[0].main}
                      </p>
                    </div>
                    <div className="w-[33%] h-full flex flex-col justify-center items-center gap-2">
                      <Lottie
                        animationData={Wind}
                        loop={true}
                        className="w-[30%]"
                      />
                      <p className="text-sm font-bold">
                        {elem.wind.speed} KM
                        <span className="text-blue-600">/</span>H
                      </p>
                    </div>
                    <div className="w-[33%] h-full flex flex-col justify-center items-center gap-2">
                      <Lottie
                        animationData={Humidity}
                        loop={true}
                        className="w-[30%]"
                      />
                      <p className="text-sm font-bold">
                        {elem.main.humidity}
                        <span className="text-blue-600">%</span>
                      </p>
                    </div>
                  </div>
                </div>
              ))}
          </div>
          {noData && (
            <div className="no-data w-full flex flex-col justify-start items-center gap-5 text-white absolute top-[-90px]">
              <Lottie animationData={Cat} loop={true} className="w-[60%]" />
              <p className="text-sm">Designed by Erfn Qane - github/@i3rfn</p>
            </div>
          )}

          <div className="bottom w-full h-[10%] flex justify-between items-center px-10">
            <FontAwesomeIcon
              icon={faHouse}
              className="text-2xl text-gray-300 cursor-pointer hover:text-blue-700 transition-all duration-100"
            />
            <FontAwesomeIcon
              icon={faNewspaper}
              className="text-2xl text-gray-300 cursor-pointer hover:text-blue-700 transition-all duration-100"
            />
            <FontAwesomeIcon
              icon={faCompass}
              className="text-2xl text-gray-300 cursor-pointer hover:text-blue-700 transition-all duration-100"
            />
            <FontAwesomeIcon
              icon={faUser}
              className="text-2xl text-gray-300 cursor-pointer hover:text-blue-700 transition-all duration-100"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default WeatherApp;
