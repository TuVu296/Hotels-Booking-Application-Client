import React from "react"
import api from "../../api/api"
import dayjs from 'dayjs'
import classNames from "classnames"
import './transaction.css'


const Transaction = () => {
  const [trans, setTrans] = React.useState([])
  const getTransactions = async () => {
    try {
      const res = await api.getTransactionUser()
      setTrans(res.data)
    } catch (e) {
      alert(e.message)
    }
  }

  React.useEffect(() => {
    getTransactions()
  }, [])

  return (
    <>
      <table className="table table-bordered">
        <thead>
          <tr className='table-info'>
            <th scope="col">#</th>
            <th scope="col">Hotel</th>
            <th scope="col">Room</th>
            <th scope="col">Date</th>
            <th scope="col">Price</th>
            <th scope="col">Payment Menthod</th>
            <th scope="col">Status</th>
          </tr>
        </thead>
        <tbody>
          {
            trans.map(({hotel, room, dateStart, dateEnd, price, payment, status}, index) => (
              <tr>
                <th scope="row">{index + 1}</th>
                <td>{hotel.name}</td>
                <td>{room.join(',')}</td>
                <td>{ `${dayjs(dateStart).format('DD/MM/YYYY')} - ${dayjs(dateEnd).format('DD/MM/YYYY')}` }</td>
                <td>$ {price}</td>
                <td className='text-capitalize'>{payment.split('_').join(' ')}</td>
                <td><div className={classNames('text-color px-2 py-2 d-inline-block', { [`${status.toLowerCase()}-color`]: status })}>{status}</div></td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </>
  )
}

export default Transaction