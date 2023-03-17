import "./hotel.css";
import React from "react";
import { useParams } from "react-router-dom";
import api from '../../api/api'
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import MailList from "../../components/mailList/MailList";
import Footer from "../../components/footer/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleArrowLeft,
  faCircleArrowRight,
  faCircleXmark,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import Booking from "../../components/booking/Booking";

const Hotel = () => {
  let { id } = useParams();
  const [hotel, setHotel] = React.useState(null)
  const [slideNumber, setSlideNumber] = useState(0);
  const [open, setOpen] = useState(false);
  const [openBooking, setOpenBooking] = useState(false)

  const fetchHotel = async () => {
    try {
      const response = await api.hotelById(id)
      setHotel(response.data.hotel)
    } catch (e) {
      alert(e.message)
    }
  }

  React.useEffect(() => {
    fetchHotel()
  }, [])


  const { title, address, featured, cheapestPrice, desc, distance, photos, rating } = hotel || {}


  const handleOpen = (i) => {
    setSlideNumber(i);
    setOpen(true);
  };

  const handleMove = (direction) => {
    let newSlideNumber;

    if (direction === "l") {
      newSlideNumber = slideNumber === 0 ? 5 : slideNumber - 1;
    } else {
      newSlideNumber = slideNumber === 5 ? 0 : slideNumber + 1;
    }

    setSlideNumber(newSlideNumber)
  };

  if (!hotel) {
    return null
  }
  return (
    <div>
      <Navbar />
      <Header type="list" />
      <div className="hotelContainer">
        {open && (
          <div className="slider">
            <FontAwesomeIcon
              icon={faCircleXmark}
              className="close"
              onClick={() => setOpen(false)}
            />
            <FontAwesomeIcon
              icon={faCircleArrowLeft}
              className="arrow"
              onClick={() => handleMove("l")}
            />
            <div className="sliderWrapper">
              <img src={photos[slideNumber].src} alt="" className="sliderImg" />
            </div>
            <FontAwesomeIcon
              icon={faCircleArrowRight}
              className="arrow"
              onClick={() => handleMove("r")}
            />
          </div>
        )}
        <div className="hotelWrapper">
          <button className="bookNow">Reserve or Book Now!</button>
          <h1 className="hotelTitle">{title}</h1>
          <div className="hotelAddress">
            <FontAwesomeIcon icon={faLocationDot} />
            <span>{address}</span>
          </div>
          <span className="hotelDistance">
            Excellent location – {distance} from center
          </span>
          <span className="hotelPriceHighlight">
            Book a stay over ${cheapestPrice} {featured ? 'at this property and get a free airport taxi' : ''}
          </span>
          <div className="hotelImages">
            {photos.map((photo, index) => (
              <div className="hotelImgWrapper" key={index}>
                <img
                  onClick={() => handleOpen(index)}
                  src={photo}
                  alt=""
                  className="hotelImg"
                />
              </div>
            ))}
          </div>
          <div className="hotelDetails">
            <div className="hotelDetailsTexts">
              <h1 className="hotelTitle">{title}</h1>
              <p className="hotelDesc">
                {desc}
              </p>
            </div>
            <div className="hotelDetailsPrice">
              <h1>Perfect for a 1-night stay!</h1>
              <span>
                Located in the real heart of Krakow, this property has an
                excellent location score of {rating}!
              </span>
              <h2>
                <b>${cheapestPrice}</b> (1 nights)
              </h2>
              <button onClick={() => {setOpenBooking(true)}}>Reserve or Book Now!</button>
            </div>
          </div>
          {
          openBooking && <Booking hotelId={id} />
        }
        </div>
       
        <MailList />
        <Footer />
      </div>
    </div>
  );
};

export default Hotel;
