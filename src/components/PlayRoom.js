import React , { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { getSeats } from '../utils/getSeats'
import { findSeat } from '../utils/findSeat'
import { getSeatPrice } from '../utils/getSeatPrice'
import { getTotalPrice } from '../utils/getTotalPrice'
import Axios from 'axios'
import { url } from '../env'



const PlayRoom = ({play, theater, history}) => {
    const [seats, setSeats] = useState([])
    const [tickets, setTickets] = useState([])
    const [takenTickets, setTakenTickets] = useState([])
    const [selectedSeats, setSelectedSeats] = useState([])
    const [showOrder, setShowOrder] = useState(false)
    const [customerData, setCustomerData] = useState({})

    useEffect(() => {
        const getTickets = () => {
          Axios.get(url.ticket)
          .then((res) => {
              setTickets(res.data)
          })
          .catch((err) => {
              console.log(err)
              alert(err)
          })  
        }
        getTickets();
      }, [])

    useEffect(() => {
        setSeats(getSeats(theater))
        setTakenTickets(findSeat(play,tickets))
    }, [theater, play, tickets]) 

    const chooseSeat = (seat) => {
        if (takenTickets.includes(seat) === true) {
            return 0
        }
        if (!selectedSeats.includes(seat))
            setSelectedSeats(selectedSeats => [...selectedSeats, seat]);
        else {
            setSelectedSeats(selectedSeats.filter(item => item !== seat))
        }
    }

    const completeOrder = () =>  {
        console.log(customerData)
    }

    return (
        <div>
            <div className='screen'>STAGE</div>
            <div className='seat-wrap'>
                
                {seats?.map((seat, index) => {
                    return (
                        <div key={index} 
                        style={takenTickets.includes(seat) ? {backgroundColor: 'red', cursor:'not-allowed'} : selectedSeats.includes(seat) ? {backgroundColor: '#00cc00', cursor:'pointer'} : {backgroundColor: '#ddd', cursor:'pointer'}}
                        onClick={() => chooseSeat(seat)}>
                            <p>Seat no. {seat} - ${getSeatPrice(seat)}</p>
                        </div>
                    )
                })}
            </div> 
            {selectedSeats.length > 0 &&
                <button className='start-order' onClick={() => setShowOrder(true)}>Place Order</button>
            }
            { showOrder && 
                <div className="customer-form">
                    <form className='form-container'>
                        <input type="text" name='fullName' placeholder='Full Name'  onChange={e=> setCustomerData({...customerData, [e.target.name]: e.target.value})} />
                        <input type="number" name='phoneNumber' placeholder='Phone Number' onChange={e=> setCustomerData({...customerData, [e.target.name]: e.target.value})} />
                        <input type="email" name='email' placeholder='Email' onChange={e=> setCustomerData({...customerData, [e.target.name]: e.target.value})} />

                        <div onClick={e => completeOrder() } className='place-order'>Complete Order - ${getTotalPrice(selectedSeats)}</div>
                        <div onClick={e => setShowOrder(false) } className='close-button'>Cancel</div>
                    </form>
                </div> 
            }
        </div>
    )
}

const mapStateToProps = state => {
    return {
      play: state.playReducer.play,
      theater: state.theaterReducer.theater,
    }
}
  
export default connect(mapStateToProps)(PlayRoom)
