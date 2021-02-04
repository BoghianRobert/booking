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
  const [isEditing, setIsEditing] = useState(0)
  const [editTheaterId, setEditTheaterId] = useState()
  const [editName, setEditName] = useState()
  const [editStart, setEditStart] = useState()
  const [editEnd, setEditEnd] = useState()
  const [editDate, setEditDate] = useState()
  const [tickets, setTickets] = useState()

  useEffect(() => {
    const getPlays = () => {
      Axios.get(url.play)
      .then((res) => {
          setEvents(res.data)
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
      })
      .catch((err) => {
          console.log(err)
          alert(err)
      })  
    }
    getTheater();
  }, []) 

  useEffect(() => {
    const getTicket = () => {
      Axios.get(url.ticket)
      .then((res) => {
          setTickets(res.data)
      })
      .catch((err) => {
          console.log(err)
          alert(err)
      })  
    }
    getTicket();
  }, []) 

  const postNewPlay = () => {
    let start = buildDateNewPlay(startDate, startTime)
    let end = buildDateNewPlay(startDate, endTime)
    Axios.post(url.play, {theaterId:theaterId ,name: playName, start, end})
    .then((res) => {
        console.log(res.data)
    })
    .catch((err) => {
        console.log(err)
        alert(err)
    })
  }

  const startEditing = (play) => {
    setIsEditing(play.id)
    setEditTheaterId(play.theaterId)
    setEditName(play.name)
    setEditStart(play.start.slice(11,19))
    setEditEnd(play.end.slice(11,19))
    setEditDate(play.start.slice(0,10))
  }

  const editHandler = () => {
    if (!editStart.includes(':') || !editEnd.includes(':')) {
      alert('The hour format is: "00:00:00"')
      return 0
    }
    for(let i in events) {
      if (events[i].id !== isEditing && events[i].theaterId === editTheaterId && events[i].start.slice(0,10) === editDate && 
          ((events[i].start.slice(11,13) >= editStart.slice(0,2)  && events[i].start.slice(11,13) < editEnd.slice(0,2) ) || 
          (events[i].end.slice(11,13) > editStart.slice(0,2) && events[i].end.slice(11,13) <= editEnd.slice(0,2)) )) {
        alert("There is another play during that time at that theatre!")
        return 0
      }
    }
  
    let start = editDate + 'T' + editStart + '.000+00:00'
    let end = editDate + 'T' + editEnd + '.000+00:00'
    Axios.put(url.play, {id:isEditing ,theaterId:editTheaterId, name: editName, start, end})
      .then((res) => {
          console.log(res.data)
      })
      .catch((err) => {
          console.log(err)
          alert(err)
      })
    setIsEditing(0)
  }

  const deletePlay = (play) => {
    let id = play.id
    for (let i in tickets) {
      if(tickets[i].playId === id && tickets[i].customerId !== null && play.start.slice(0,10) > formatDate(startDate)){
        alert('You cannnot delete plays with sold tickets!')
        return 0
      }
    }
    Axios.delete(url.play, {id})
    .then((res) => {
        console.log(res.data)
        alert("Play deleted successfully")
    })
    .catch((err) => {
        console.log(err)
        alert(err)
    })
  }

  const getName = (id) => {
    for(let i in columns) {
      if(columns[i].id === id)
        return columns[i].name
    }
  }

  
  return (
    <div>
      <div className='header-cont'>
        <div className='control-panel'>Control Panel</div>
        <div className='create-play-form'>
            <div>
                <label htmlFor="theater">Theater:</label>
                <select name="theater" id="theater" onChange={e => setTheaterId(e.target.value)}>
                    {columns?.map((theater, index) => <option key={index} value={theater.id}>{theater.name}</option>)}
                </select>
            </div>
            <div>
                <label htmlFor="name">Name:</label>
                <input type="text" name='name' placeholder='name' onChange={e => setPlayName(e.target.value)}/>
            </div>
            <div>
                <label htmlFor="start">Start:</label>
                <input type="text" name='start' placeholder='00:00:00' onChange={e => setStartTime(e.target.value)}/>
            </div>
            <div>
                <label htmlFor="end">End:</label>
                <input type="text" name='end' placeholder='00:00:00' onChange={e => setEndTime(e.target.value)}/>
            </div>
            <div className='date-picker-control'>
                <label htmlFor="date">Enter date:</label>
                <DatePicker name='date' dateFormat="yyyy/MM/dd" selected={startDate} onChange={date => setStartDate(date)} /> 
            </div>
            <button className='create-play' onClick={() => postNewPlay()}>Create Play</button>
        </div>

        {hideCalendar ?
            <button className='show-calendar' onClick={() => setHideCalendar(!hideCalendar)}>Show Calendar</button>:
            <button className='show-calendar' onClick={() => setHideCalendar(!hideCalendar)}>Edit Plays</button>
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

            {formatDate(startDate) === formatDate(new Date()) ? 
            <div 
              className='current-time-bar' 
              style={{
                top: `${getCurrentTime()}%`
              }}
            ></div> :
            <div style={{display:'none'}}></div>
            }

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
      { hideCalendar && 
        <div className='editable'>
          {events?.map((play, key) => {
            return (
              <div key={key} className='play-details'>
                <div >
                  <label htmlFor="edit-id">Theater :</label>
                  {isEditing === play.id ? (
                    <input
                      name='edit-id'
                      onChange={e => setEditTheaterId(e.target.value)}
                      placeholder={getName(play.theaterId)}
                    >
                    </input>
                  ) : (
                    <div
                      name='edit-id'
                      style={{marginLeft:'20px', marginTop:'5px'}}
                    >
                      <span>
                        {getName(play.theaterId)}
                      </span>
                    </div>
                  )}
                </div>
                <div>
                  <label htmlFor="edit-name">Play name:</label>
                  {isEditing === play.id ? (
                    <input
                      name='edit-name'
                      onChange={e => setEditName(e.target.value)}
                      placeholder={play.name}
                    >
                    </input>
                  ) : (
                    <div
                      name='edit-name'
                      style={{marginTop:'5px'}}
                    >
                      <span>
                        {play.name}
                      </span>
                    </div>
                  )}
                </div>
                <div>
                  <label htmlFor="edit-start">Starting hour:</label>
                  {isEditing === play.id ? (
                    <input
                      name='edit-start'
                      onChange={e => setEditStart(e.target.value)}
                      placeholder={play.start.slice(11,19)}
                    >
                    </input>
                  ) : (
                    <div
                      style={{marginTop:'5px'}}
                      name='edit-start'
                    >
                      <span>
                        {play.start.slice(11,19)}
                      </span>
                    </div>
                  )}
                </div>
                <div>
                  <label htmlFor="edit-end">Ending hour:</label>
                  {isEditing === play.id ? (
                    <input
                      name='edit-end'
                      onChange={e => setEditEnd(e.target.value)}
                      placeholder={play.end.slice(11,19)}
                    >
                    </input>
                  ) : (
                    <div
                      style={{marginTop:'5px'}}
                      name='edit-end'
                    >
                      <span>
                        {play.end.slice(11,19)}
                      </span>
                    </div>
                  )}
                </div>
                <div>
                  <label htmlFor="edit-date">Date:</label>
                  {isEditing === play.id ? (
                    <input
                      name='edit-date'
                      onChange={e => setEditDate(e.target.value)}
                      placeholder={play.start.slice(0,10)}
                    >
                    </input>
                  ) : (
                    <div
                      style={{marginTop:'5px'}}
                      name='edit-date'
                    >
                      <span>
                        {play.start.slice(0,10)}
                      </span>
                    </div>
                  )}
                </div>
                { isEditing === play.id ?
                  <button className='abort-changes' onClick={() => setIsEditing(0)}>Abort changes</button> : 
                  <div style={{display:'none'}}></div>
                }
                {isEditing === play.id ?
                  <button className='edit-button' onClick={() => editHandler()}> Save changes</button> :
                  <button className='edit-button' onClick={() => startEditing(play)}> Edit play</button>
                }
                <button className='delete-button' onClick={() => deletePlay(play)}>Delete</button>
              </div>
            )
          })}
          <dir className='footer'></dir>
        </div>
      }
    </div>
  );
}



export default ControlPanel