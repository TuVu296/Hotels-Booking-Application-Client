import React from 'react'
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import MailList from "../../components/mailList/MailList";
import Navbar from "../../components/navbar/Navbar";
import Transaction from '../../components/transaction/Transaction';
import './transDash.css'

const TransactionDashboard = () => {
  return (
    <div>
      <Navbar />
      <Header/>
      <div className='mt-5 trans-con'>
        <h3>Your Transactions</h3>
        <Transaction />
      </div>
      <MailList/>
      <Footer/>
    </div>
  );
};

export default TransactionDashboard;
