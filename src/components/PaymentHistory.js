import React, {useEffect, useState} from 'react'

import Axios from 'axios';
import { url } from '../env'



const PaymentHistory = () => {
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
        <div>
            {payments?.map((payment,key) => {
                return (
                    <div key={key}>
                        customer {payment.customerId} bought the ticket number {payment.ticketId} with the price of {payment.amount} on {payment.dateTime} 
                    </div>
            )
            })}
        </div>
    )
}

export default PaymentHistory;
