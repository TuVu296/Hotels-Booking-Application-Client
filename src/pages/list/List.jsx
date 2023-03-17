import "./list.css";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import api from '../../api/api'

import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { format } from "date-fns";
import { DateRange } from "react-date-range";
import SearchItem from "../../components/searchItem/SearchItem";
import dayjs from 'dayjs'

const List = () => {
  const location = useLocation();
  const [destination, setDestination] = useState(location.state.destination);
  const [date, setDate] = useState(location.state.date);
  const [openDate, setOpenDate] = useState(false);
  const [options, setOptions] = useState(location.state.options);
  const [listHotel, setListHotel] = useState([])
  
  const onSearch = async () => {
    const data = {
      location: destination, 
      fromDate: dayjs(date[0].startDate).format("YYYY-MM-DD"),
      toDate: dayjs(date[0].endDate).format("YYYY-MM-DD"),
      totalPeople: options.adult + options.children, 
      rooms: options.room
    }
    try {
      const response = await api.searchHotels(data)
      setListHotel(response.data)
    }
    catch (e) {
      alert(e.response.data.message)
    }

  }

  useEffect(() => {
    onSearch()
  }, [])

  return (
    <div>
      <Navbar />
      <Header type="list" />
      <div className="listContainer">
        <div className="listWrapper">
          <div className="listSearch">
            <h1 className="lsTitle">Search</h1>
            <div className="lsItem">
              <label>Destination</label>
              <input value={destination} onChange={(e) => setDestination(e.target.value)} type="text" />
            </div>
            <div className="lsItem">
              <label>Check-in Date</label>
              <span onClick={() => setOpenDate(!openDate)}>{`${format(
                date[0].startDate,
                "MM/dd/yyyy"
              )} to ${format(date[0].endDate, "MM/dd/yyyy")}`}</span>
              {openDate && (
                <DateRange
                  onChange={(item) => setDate([item.selection])}
                  minDate={new Date()}
                  ranges={date}
                />
              )}
            </div>
            <div className="lsItem">
              <label>Options</label>
              <div className="lsOptions">
                <div className="lsOptionItem">
                  <span className="lsOptionText">
                    Min price <small>per night</small>
                  </span>
                  <input type="number" className="lsOptionInput" />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">
                    Max price <small>per night</small>
                  </span>
                  <input type="number" className="lsOptionInput" />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">Adult</span>
                  <input
                    type="number"
                    min={1}
                    className="lsOptionInput"
                    onChange={(e) => setOptions({
                      ...options,
                      adult: e.target.value
                    })}
                    value={options.adult}
                  />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">Children</span>
                  <input
                    type="number"
                    min={0}
                    className="lsOptionInput"
                    onChange={(e) => setOptions({
                      ...options,
                      children: e.target.value
                    })}
                    value={options.children}
                  />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">Room</span>
                  <input
                    type="number"
                    min={1}
                    className="lsOptionInput"
                    onChange={(e) => setOptions({
                      ...options,
                      room: e.target.value
                    })}
                    value={options.room}
                  />
                </div>
              </div>
            </div>
            <button onClick={onSearch}>Search</button>
          </div>
          <div className="listResult">
            {
              listHotel.map((hotel, index) => (
                <SearchItem key={index} {...hotel} />

              ))
            }
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default List;
