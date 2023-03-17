import React from "react"
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // them
import './booking.css'
import api from '../../api/api'
import dayjs from 'dayjs'
import { useNavigate } from "react-router-dom";




const RoomNumber = (props) => {
  const {num, onChecked} = props

  const [checked, setChecked] = React.useState(false)

  React.useEffect(() => {
    if (onChecked) {
      onChecked({
        num,
        checked
      })
    }
  }, [checked])

  return (
   <>
      <label className="d-inline-flex flex-column">
        <span>{num}</span>
        <input type="checkbox" checked={checked} onChange={e => setChecked(e.target.checked)}/>
      </label>
   </>
  )
}

const Room = (props) => {
  const { title: name, desc, maxPeople: qty, price, roomNumbers = [], onCheckedHandle } = props

  const onChecked = (value) => {
    const data = {...value, price}
    if (onCheckedHandle) {
      onCheckedHandle(data)
    }
  }

  return(
    <div className="d-flex gap-5 align-items-center">
      <div>
        <div className='fw-bold fs-5'>{name}</div>
        <div className="fw-lighter fs-5">{desc}</div>
        <div className="fw-semibold">Max people: <span className="fw-bold">{qty}</span></div>
        <div className="fw-bold fs-5">${price}</div>        
      </div>
      <div className='d-flex gap-3 '>
        {
          roomNumbers.map((num, index) => (
           <RoomNumber key={index} num={num} onChecked={onChecked} />
          ))
        }
      </div>
    </div>
  )}


const Booking = (props) => {
  const { hotelId } = props
  const [roomList, setRoomList] = React.useState([])
  const [paymentMethod, setMethod] = React.useState('')

  const userData = JSON.parse(window.localStorage.getItem('userLogin'))?.user?.username || 'Full Name'


  const navigate = useNavigate()
  const [date, setDate] = React.useState([
    {
      startDate: dayjs().add(1, 'day').toDate(),
      endDate: dayjs().add(1, 'day').toDate(),
      key: "selection",
    },
  ]);
  const [selectedRooms, setSelectedRooms] = React.useState([])
  const totalPerDay = selectedRooms.reduce((value, { price }) => value + price, 0)
  const numberOfDay = dayjs(date[0].endDate).add(1, 'day').diff(dayjs(date[0].startDate), 'day')

  const onChecked = (value) => {
    const { checked, ...data } = value
    let newSelectedRooms = []
    if (checked) {
      newSelectedRooms = [...selectedRooms, data]
    } else {
      newSelectedRooms = selectedRooms.filter(({ num, price }) => !(num === data.num && price === data.price))
    }
    setSelectedRooms(newSelectedRooms)
  }

  const updateRoomList = async () => {
    const [{ startDate, endDate }] = date
    const response = await api.validRoomByHotelId({
      fromDate: dayjs(startDate).format('YYYY-MM-DD'),
      toDate: dayjs(endDate).format('YYYY-MM-DD')
    }, hotelId)
    setRoomList(response.data.rooms)
  }

  React.useEffect(() => {
    updateRoomList()
  }, [date])

  const onCreateTransaction = async () => {
    try {
      const [{ startDate, endDate }] = date
      if(!selectedRooms.length)  {
        return alert('Chua chon phong')
      }
      if(!startDate)  {
        return alert('Chua chon startDate')
      }
      if(!endDate)  {
        return alert('Chua chon endDate')
      }
      if(!paymentMethod)  {
        return alert('Chua chon payment')
      }

      const data = {
        hotel: hotelId,
        roomNumber: selectedRooms.map(({num}) => num), 
        startDate: dayjs(startDate).format('YYYY-MM-DD'), 
        endDate: dayjs(endDate).format('YYYY-MM-DD'), 
        price: totalPerDay * numberOfDay, 
        payment: paymentMethod
      }

      await api.createTransaction(data)
      navigate('/transaction')
    
    } catch (e) {
      alert(e.response.data.message)
    }
  }

  
 
  return (
    <>
      <div className='d-flex w-100 gap-3 mb-5'>
        <div>
          <h4>Dates</h4>
        <div className="booking-date position-relative" style={{ width: 332 }}>
          <DateRange
            editableDateInputs={true}
            onChange={(item) => setDate([item.selection])}
            moveRangeOnFirstSelection={false}
            ranges={date}
            className="date"
            minDate={new Date()}
            showDateDisplay
          />
        </div>
        </div>
        <div style={{flex: 1}}>
          <h4>Reserve Info</h4>
          <div>
            <p>Your Full Name</p>
            <input className="w-100" placeholder={userData} />
          </div>
          <div>
            <p>Your Email</p>
            <input className="w-100" placeholder="Email" />
          </div>
          <div>
            <p>Your Phone Number</p>
            <input className="w-100" placeholder="Phone Number" />
          </div>
          <div>
            <p>Your Identity Card Number</p>
            <input className="w-100" placeholder="Card Number" />
          </div>
        </div>
      </div>
      <div>
        <h4>Select Room</h4>
        <div className='d-flex gap-4'>
          {
          roomList.map((room, index) => (
            <Room key={index} {...room} onCheckedHandle={onChecked} />
          ))
          }
        </div>
      </div>
      <div>
        <p className='fs-4 fw-bold'>Total Bill: ${totalPerDay * numberOfDay}</p>
        <div className="d-flex gap-5 align-items-center">
          <div style={{width: '400px'}}>
            <select onChange={e => setMethod(e.target.value)} value={paymentMethod} class="form-select" aria-label="Default select example">
              <option selected value="" >Select Payment Method</option>
              <option value="credit_card">Credit Card</option>
              <option value="cash">Cash</option>
            </select>
          </div>
          <button onClick={onCreateTransaction} className='btn btn-primary px-4 py-2'>Reserve Now!</button>
        </div>
      </div>
    </>
  )
}

export default Booking