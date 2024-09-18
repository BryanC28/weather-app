import React, { useEffect, useState } from "react";

const monthName = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const dayName = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const DateTime = () => {
  const [time, setTime] = useState("");
  useEffect(() => {
    const datetime = () => {
      let date = new Date();
      let d = dayName[date.getDay()];
      let m = monthName[date.getMonth()];
      let displayShow =
        d + "," + date.getDate() + " " + m + " " + date.getFullYear();
      return displayShow;
    };
    // console.log(datetime());
    setTime(datetime());
  }, []);
  return <span className="time">{time}</span>;
};

export default DateTime;
