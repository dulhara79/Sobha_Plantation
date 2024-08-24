import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {Button, Carousel, ConfigProvider, Slider} from "antd";
import {LeftOutlined, RightOutlined} from "@ant-design/icons";

export default function WeatherComponent() {
    const [weatherData, setWeatherData] = useState(null);
    const [selectedDateIndex, setSelectedDateIndex] = useState(0);
    const apiKey = '1c3aceb8ef0f8038b5a8f22944913ef0';
    const availableDates = weatherData ? weatherData.list.map(forecast => new Date(forecast.dt * 1000)) : [];

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
        const formattedDate = new Intl.DateTimeFormat('en-US', options).format(date);
        return formattedDate.replace(',', ''); // Removing comma after the day
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
        />
    );

    const nextArrow = (
        <Button
            className="next-arrow"
            shape="circle"
            icon={<RightOutlined />}
            size="large"
        />
    );



    return (
        <div className={`inline-block w-[1050px]`}>
            <style>
                {`
          /* Normal dot */
          .ant-carousel .slick-dots li button {
            background-color: #9ca3af; /* Change the normal dot color here */
            height: 0.3rem; /* Change the normal dot height here */
        
          }
          
          /* Active dot */
          .ant-carousel .slick-dots li.slick-active button {
            background-color: #3b82f6; /* Change the active dot color here */
            height: 0.3rem; /* Change the active dot height here */
           
          }
          
          .ant-carousel .slick-slide > div {
            font-family: 'Circular Std', sans-serif; /* Change the font family here */
            padding-bottom: 1rem;
          }
        `}
            </style>
            <div className="flex flex-col bg-gradient-to-br from-blue-200 to-rose-200 rounded-3xl ">

                <Carousel dots={{className: "custom-dot-style"}} prevArrow={prevArrow} nextArrow={nextArrow}>
                    {groups.map((group, index) => (
                        <div key={index}>
                            <div className="flex flex-col">
                                <div className="overflow-x-auto">
                                    <table
                                        className="w-full mx-auto overflow-hidden text-gray-800 divide-y divide-gray-100">
                                        <thead className="text-gray-700">
                                        <tr>
                                            <th className="w-0 py-1.5"></th>
                                            {/* Adjust the width as needed */}
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
                                            <tr key={idx}
                                                className="transition-all duration-200 divide-y divide-gray-100 hover:bg-black hover:bg-opacity-5">
                                                <td className="w-0"></td>
                                                <td className="w-2/12 py-1 text-center text-sky-950">{formatDate(forecast.dt)}</td>
                                                <td className="w-2/12 py-1 text-center">
                                                    <div className="flex justify-center">
                                                        <img
                                                            src={getWeatherIconUrl(forecast.weather[0].icon)}
                                                            alt="Weather Icon"
                                                            className="w-10 h-10"
                                                        />
                                                        <div className="flex items-center text-xs text-gray-600 sup font-extralight">
                                                            {forecast.weather[0].description}
                                                        </div>
                                                    </div>
                                                </td>

                                                <td className="w-2/12 py-1 text-center">
                                                    <p className="flex flex-row items-center justify-center">
                                                        {forecast.temp.min}°
                                                        <div
                                                            className="w-24 h-1 mx-4 rounded-full bg-gradient-to-r from-blue-500 to-orange-300"></div>
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
    )
}
