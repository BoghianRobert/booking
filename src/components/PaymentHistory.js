import React, {useEffect, useState} from 'react'

import Axios from 'axios';
import { url } from '../env'



const PaymentHistory = ({history}) => {
    const [payments, setPayments] = useState()

    useEffect(() => {
        const getTickets = () => {
          Axios.get(url.payment)
          .then((res) => {
              setPayments(res.data)
          })
          .catch((err) => {
              console.log(err)
              alert(err)
          })  
        }
        getTickets();
      }, [])

    return (
        <div className='big-payment-comp'>
            <div className='payment-history-component'>
                <div className='ph-header'>
                    <button className='go-back-payment'onClick={() => history.push('/control-panel')}>Back</button>
                    <div className='div-in-header'>Payment History</div>
                </div>
                {payments?.map((payment,key) => {
                    return (
                        <div key={key} className='payment-table'>
                            <div>
                                <label htmlFor="payment-id">Customer Name:</label>
                                <div
                                style={{marginTop:'5px'}}
                                name='payment-id'
                                >
                                    <span>
                                        {payment.customerName}
                                    </span>
                                </div>
                            </div>
                            <div>
                                <label htmlFor="amount">Amount:</label>
                                <div
                                style={{marginTop:'5px'}}
                                name='amount'
                                >
                                    <span>
                                        {payment.amount}
                                    </span>
                                </div>
                            </div>
                            <div>
                                <label htmlFor="date">Date:</label>
                                <div
                                style={{marginTop:'5px'}}
                                name='date'
                                >
                                    <span>
                                        {payment.dateTime.slice(0,10)}
                                    </span>
                                </div>
                            </div>
                            <div>
                                <label htmlFor="hour">Hour:</label>
                                <div
                                style={{marginTop:'5px'}}
                                name='date'
                                >
                                    <span>
                                        {payment.dateTime.slice(11,19)}
                                    </span>
                                </div>
                            </div>
                            {/* <div key={key} className='payment-history-div'>
                                customer {payment.customerId} bought the ticket number {payment.ticketId} with the price of {payment.amount} on {payment.dateTime.slice(0,10)} 
                            </div> */}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default PaymentHistory;
