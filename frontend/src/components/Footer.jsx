import React from "react";
import { Link } from "react-router-dom";
import { MdEmail } from "react-icons/md";
import { FaPhone, FaLocationArrow } from "react-icons/fa";

const Footer = () => {
  const hours = [
    {
      id: 1,
      day: "Monday",
      time: "9:00 AM - 11:00 PM",
    },
    {
      id: 2,
      day: "Tuesday",
      time: "12:00 PM - 12:00 AM",
    },
    {
      id: 3,
      day: "Wednesday",
      time: "10:00 AM - 10:00 PM",
    },
    {
      id: 4,
      day: "Thursday",
      time: "9:00 AM - 9:00 PM",
    },
    {
      id: 5,
      day: "Friday",
      time: "3:00 PM - 9:00 PM",
    },
  ];

  return (
    <>
      <footer className="container">
        <hr />

        <div className="content">
          <div>
            <img
              src="/logo.png"
              alt="logo"
              className="logo-img"
              style={{ width: "150px" }}
            />
          </div>
          <div>
            <h4>Quick Links</h4>
            <ul>
              <Link to={"/"}>Home</Link>
              <Link to={"/appointment"}>Appointment</Link>
              <Link to={"/about"}>About</Link>
            </ul>
          </div>
          <div>
            <h4>Hours</h4>
            {hours.map((element) => {
              return (
                <li key={element.id}>
                  <span>{element.day}</span>
                  <span>{element.time}</span>
                </li>
              );
            })}
          </div>
          <h4>Contact</h4>
          <div>
            <FaPhone /> <span>123-456-7890</span>
          </div>
          <div>
            <MdEmail /> <span>6x8qA@example.com</span>
          </div>
          <div>
            <FaLocationArrow /> <span>123 Main St. Anytown, USA 12345</span>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
