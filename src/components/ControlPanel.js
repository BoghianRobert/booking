import React, {useState, useEffect} from 'react';
import { betterColors, getCurrentTime, getTimeAxe, getVanueAxe } from '../utils/index.js';
import { formatDate } from '../utils/formatDate.js';
import { buildDateNewPlay } from '../utils/buildDateNewPlay';
import DatePicker from 'react-datepicker';
import { HoursColumn } from './HoursColumn.js';
import Axios from 'axios';
import { url } from '../env'


import "react-datepicker/dist/react-datepicker.css";


const ControlPanel = ({history}) => {
  const [events, setEvents] = useState()
  const [columns, setColumns] = useState([])
  const [startDate, setStartDate] = useState(new Date());
  const [hideCalendar, setHideCalendar] = useState(true)
  const [theaterId, setTheaterId] = useState()
  const [playName, setPlayName] = useState('')
  const [startTime, setStartTime] = useState('')
  const [endTime, setEndTime] = useState('')

  useEffect(() => {
    const getPlays = () => {
      Axios.get(url.play)
      .then((res) => {
          setEvents(res.data)
          console.log(res.data)
      })
      .catch((err) => {
          console.log(err)
          alert(err)
      })  
    }
    
    window.scrollTo({
      top: 400,
      behavior: 'smooth'
    });
    getPlays();
  }, [])  

  useEffect(() => {
    const getTheater = () => {
      Axios.get(url.theater)
      .then((res) => {
          setColumns(res.data)
          setTheaterId(res.data[0].id)
          console.log(res.data)
      })
      .catch((err) => {
          console.log(err)
          alert(err)
      })  
    }
    getTheater();
  }, []) 

  const postNewPlay = () => {
    let start = buildDateNewPlay(startTime)
    let end = buildDateNewPlay(endTime)
    console.log(theaterId, playName, start, end)
    Axios.post(url.play, {theaterId:theaterId ,name: playName, start, end})
    .then((res) => {
        console.log(res.data)
    })
    .catch((err) => {
        console.log(err)
        alert(err)
    })
  }

  
  return (
    <div>
      <div className='header-cont'>
        <div className='control-panel'>Control Panel</div>
        <div className='create-play-form'>
            <div>
                <label htmlFor="theater">Choose a theater:</label>
                <select name="theater" id="theater" onChange={e => setTheaterId(e.target.value)}>
                    {columns?.map((theater, index) => <option key={index} value={theater.id}>{theater.name}</option>)}
                </select>
            </div>
            <div>
                <label htmlFor="name">Choose a name for the play:</label>
                <input type="text" name='name' placeholder='name' onChange={e => setPlayName(e.target.value)}/>
            </div>
            <div>
                <label htmlFor="start">Choose a starting hour:</label>
                <input type="text" name='start' placeholder='00:00:00' onChange={e => setStartTime(e.target.value)}/>
            </div>
            <div>
                <label htmlFor="end">Choose an ending hour:</label>
                <input type="text" name='end' placeholder='00:00:00' onChange={e => setEndTime(e.target.value)}/>
            </div>
            <div className='date-picker-control'>
                <label htmlFor="date">Enter date:</label>
                <DatePicker name='date' dateFormat="yyyy/MM/dd" selected={startDate} onChange={date => setStartDate(date)} /> 
            </div>
            <button onClick={() => postNewPlay()}>Create Play</button>
        </div>

        {hideCalendar ?
            <button className='show-calendar' onClick={() => setHideCalendar(!hideCalendar)}>Show Calendar</button>:
            <button className='show-calendar' onClick={() => setHideCalendar(!hideCalendar)}>Hide Calendar</button>
        }
        {hideCalendar ? 
            <div style={{display: 'none'}}></div> :
            <ul className='columns'>
            {columns?.map((column, index) => <li key={index} style={{ width: `${100/columns.length}%`}} >{column.name}</li>)}
            </ul> 
        }
        <button className='payment-history' onClick={() => history.push('/payment-history')}>Payment History</button>

      </div>
      {!hideCalendar &&

        <div className="wr">
            <HoursColumn />

            <div className="events-canvas">

            <div 
                className='current-time-bar' 
                style={{
                top: `${getCurrentTime()}%`
                }}
            ></div>
            {events?.map((event, index)=> {        
                return(
                <div key={index} style={event.start.substring(0,10) === formatDate(startDate) ? {
                    position: 'absolute',
                    top: `${getTimeAxe(event.start[11]+event.start[12], event.start[14]+event.start[15])}%`,
                    left: `${getVanueAxe(event, columns)}%`,
                    height: `${(parseInt(event.end[11]+event.end[12])*60) - (parseInt(event.start[11]+event.start[12])*60)}px`,
                    width: `${100/columns.length}%`,
                    backgroundColor: `${betterColors()}`,
                    color: 'white'
                } : {display:'none'}}>
                    <p>{ event.name }</p>
                </div>
                )
            })}
            </div>

        </div>
      }
    </div>
  );
}



export default ControlPanel