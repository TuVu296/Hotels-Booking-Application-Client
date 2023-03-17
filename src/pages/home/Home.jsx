import React from 'react'
import api from '../../api/api'
import Featured from "../../components/featured/Featured";
import FeaturedProperties from "../../components/featuredProperties/FeaturedProperties";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import MailList from "../../components/mailList/MailList";
import Navbar from "../../components/navbar/Navbar";
import PropertyList from "../../components/propertyList/PropertyList";
import "./home.css";

const Home = () => {
  const [hotelInfo, setHotelInfo] = React.useState(null)

  const fetchInfo = async () => {
    try {
      const response = await api.hotels()
      setHotelInfo(response.data)
    } catch (e) {
      alert(e.message)
    }
  }

  React.useEffect(() => {
    fetchInfo()
  }, [])

  const { areas, top3, types } = hotelInfo || {}

  return (
    <div>
      <Navbar />
      <Header/>
      <div className="homeContainer">
        <Featured areas={areas}/>
        <h1 className="homeTitle">Browse by property type</h1>
        <PropertyList types={types}/>
        <h1 className="homeTitle">Homes guests love</h1>
        <FeaturedProperties top3={top3}/>
        <MailList/>
        <Footer/>
      </div>
    </div>
  );
};

export default Home;
