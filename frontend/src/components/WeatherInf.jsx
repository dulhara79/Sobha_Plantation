import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Button, Carousel } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";

export default function WeatherComponent() {
    const [weatherData, setWeatherData] = useState(null);
    const apiKey = '1c3aceb8ef0f8038b5a8f22944913ef0';

    useEffect(() => {
        const fetchData = async () => {
            try {
                const url = `https://pro.openweathermap.org/data/2.5/forecast/climate?lat=7.851732&lon=80.098774&appid=${apiKey}&units=metric`;
                const { data } = await axios.get(url);
                setWeatherData(data);
            } catch (error) {
                console.error('Error fetching weather data:', error);
            }
        };

        fetchData();
    }, [apiKey]);

    const getWeatherIconUrl = (iconCode) => {
        return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
    };

    const formatDate = (timestamp) => {
        const date = new Date(timestamp * 1000);
        const options = { day: '2-digit', weekday: 'short', month: 'long' };
        return new Intl.DateTimeFormat('en-US', options).format(date).replace(',', '');
    };

    let groups = [];
    if (weatherData) {
        for (let i = 0; i < weatherData.list.length; i += 5) {
            groups.push(weatherData.list.slice(i, i + 5));
        }
    }

    const prevArrow = (
        <Button
            className="prev-arrow"
            shape="circle"
            icon={<LeftOutlined />}
            size="large"
            style={{ backgroundColor: "#006B54", color: "white" }} // Darker green background and white text
        />
    );

    const nextArrow = (
        <Button
            className="next-arrow"
            shape="circle"
            icon={<RightOutlined />}
            size="large"
            style={{ backgroundColor: "#006B54", color: "white" }} // Darker green background and white text
        />
    );

    return (
        <div className="inline-block w-[1050px]">
            <style>
                {`
                /* Dot styles */
                .ant-carousel .slick-dots li button {
                    background-color: #005844; /* Darker green dots */
                    height: 0.3rem;
                }
                .ant-carousel .slick-dots li.slick-active button {
                    background-color: #004531; /* Even darker green for active dot */
                    height: 0.3rem;
                }
                /* Carousel slide padding */
                .ant-carousel .slick-slide > div {
                    font-family: 'Circular Std', sans-serif;
                    padding-bottom: 1rem;
                }
                `}
            </style>
            <div className="flex flex-col bg-gradient-to-br from-green-700 to-gray-900 text-white rounded-3xl">
                <Carousel dots={{ className: "custom-dot-style" }} prevArrow={prevArrow} nextArrow={nextArrow}>
                    {groups.map((group, index) => (
                        <div key={index}>
                            <div className="flex flex-col">
                                <div className="overflow-x-auto">
                                    <table className="w-full mx-auto text-gray-200 divide-y divide-gray-700">
                                        <thead className="text-green-300">
                                            <tr>
                                                <th className="w-0 py-1.5"></th>
                                                <th className="w-2/12 py-1.5 text-center">Date</th>
                                                <th className="w-2/12 py-1.5 text-center">Weather</th>
                                                <th className="w-2/12 py-1.5 text-center">Temperature Range</th>
                                                <th className="w-2/12 py-1.5 text-center">Feels Like</th>
                                                <th className="w-1/12 py-1.5 text-center">Humidity</th>
                                                <th className="w-1/12 py-1.5 text-center">Pressure</th>
                                                <th className="w-1/12 py-1.5 text-center">Wind Speed</th>
                                                <th className="w-1/12 py-1.5 text-center">Cloudiness</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {group.map((forecast, idx) => (
                                                <tr key={idx} className="hover:bg-gray-700 divide-y divide-gray-600">
                                                    <td className="w-0"></td>
                                                    <td className="w-2/12 py-1 text-center text-green-200">{formatDate(forecast.dt)}</td>
                                                    <td className="w-2/12 py-1 text-center">
                                                        <div className="flex justify-center">
                                                            <img
                                                                src={getWeatherIconUrl(forecast.weather[0].icon)}
                                                                alt="Weather Icon"
                                                                className="w-10 h-10"
                                                            />
                                                            <div className="flex items-center text-xs text-gray-400 sup font-extralight">
                                                                {forecast.weather[0].description}
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="w-2/12 py-1 text-center">
                                                        <p className="flex flex-row items-center justify-center">
                                                            {forecast.temp.min}°
                                                            <div className="w-24 h-1 mx-4 rounded-full bg-gradient-to-r from-green-400 to-gray-600"></div>
                                                            {forecast.temp.max}°
                                                        </p>
                                                    </td>
                                                    <td className="w-2/12 py-1 text-center">{forecast.feels_like.day}°C</td>
                                                    <td className="w-1/12 py-1 text-center">{forecast.humidity}%</td>
                                                    <td className="w-1/12 py-1 text-center">{forecast.pressure} hPa</td>
                                                    <td className="w-1/12 py-1 text-center">{forecast.speed} m/s</td>
                                                    <td className="w-1/12 py-1 text-center">{forecast.clouds}%</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    ))}
                </Carousel>
            </div>
        </div>
    );
}
