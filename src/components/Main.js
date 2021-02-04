import React, {useState, useEffect} from 'react';
import { betterColors, getCurrentTime, getTimeAxe, getVanueAxe } from '../utils/index.js';
import { formatDate } from '../utils/formatDate.js';
import DatePicker from 'react-datepicker';
import { HoursColumn } from './HoursColumn.js';
import Axios from 'axios';
import { url } from '../env'

import { updatePlay } from '../actions/playActions'
import { updateTheater } from '../actions/theaterActions'

import { connect } from 'react-redux'


import "react-datepicker/dist/react-datepicker.css";


const Main = ({dispatch, theater, history}) => {
  const [events, setEvents] = useState()
  const [columns, setColumns] = useState([])
  const [startDate, setStartDate] = useState(new Date());
  const [calendarView, setCalendarView] = useState(false);

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
      top: 300,
      behavior: 'smooth'
    });
    getPlays();
  }, [])  

  useEffect(() => {
    const getTheater = () => {
      Axios.get(url.theater)
      .then((res) => {
          setColumns(res.data)
          console.log(res.data)
      })
      .catch((err) => {
          console.log(err)
          alert(err)
      })  
    }
    getTheater();
  }, []) 


  const selectPlay = (event, columns) => {
    for(let i in columns){
      if(columns[i].id === event.theaterId){
        dispatch(updateTheater(columns[i]))
        localStorage.setItem('totalSeats', JSON.stringify(columns[i]));
        localStorage.setItem('play', JSON.stringify(event));
      }
    }
    dispatch(updatePlay(event))
    history.push('/play')
  }

  const getName = (id) => {
    for(let i in columns) {
      if(columns[i].id === id)
        return columns[i].name
    }
  }
  
  return (
    <div>
      <header>
        <h1>Select the date:</h1>
        <div className='date-picker'>

          <DatePicker dateFormat="yyyy/MM/dd" selected={startDate} onChange={date => setStartDate(date)} /> 
        </div>
        {
          calendarView ?
          <ul className='columns'>
            {columns?.map((column, index) => <li key={index} style={{ width: `${100/columns.length}%`}} >{column.name}</li>)}
          </ul> : 
          <div style={{display:'none'}}></div>
        }
        { !calendarView ? 
          <button className='main-page-view-button' onClick={() => setCalendarView(!calendarView)}>Calendar View</button>:
          <button className='main-page-view-button' onClick={() => setCalendarView(!calendarView)}>List View</button>
        }
      </header>
      { calendarView &&
        <div className="wrapper">
          <HoursColumn />

          {/* MAPPING AND REDERING THE EVENTS */}
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
                } : {display:'none'}} onClick={() => selectPlay(event, columns)}>
                  <p>{ event.name }</p>
                </div>
              )
            })}
          </div>

        </div>
      }

     {
        !calendarView && 
        <div className='list-view'>
          {events?.map((play, key) => {
            return (
              <div key={key} className='play-details-list' style={ play.start.substring(0,10) === formatDate(startDate) ? {} : {display:'none'}}>
                <div>
                  <label htmlFor="theater-list-view">Theater:</label>
                  <div
                    name='theater-list-view'
                    style={{marginLeft:'20px', marginTop:'5px'}}
                  >
                    <span>
                      {getName(play.theaterId)}
                    </span>
                  </div>
                </div>
                <div>
                  
                  <div
                    name='name-list-view'
                    style={{marginTop:'5px'}}
                  >
                    <span>
                      {play.name}
                    </span>
                  </div>
                </div>
                <div>
                  <label htmlFor="name-list-view">Starting hour:</label>
                  
                  <div
                    style={{marginTop:'5px'}}
                    name='edit-start'
                  >
                    <span>
                      {play.start.slice(11,19)}
                    </span>
                  </div>
                </div>
                <div>
                  <label htmlFor="end-list-view">Ending hour:</label>
                  <div
                    style={{marginTop:'5px'}}
                    name='end-list-view'
                  >
                    <span>
                      {play.end.slice(11,19)}
                    </span>
                  </div>
                </div>
                <div>
                  <label htmlFor="date-list-view">Date:</label>
                  <div
                    style={{marginTop:'5px'}}
                    name='date-list-view'
                  >
                    <span>
                      {play.start.slice(0,10)}
                    </span>
                  </div>
                </div>
                <button className='choose-button' onClick={() => selectPlay(play, columns)}>Choose</button>
              </div>
            )
          })}
          <dir className='footer'></dir>
        </div>
      }
    </div>
  );
}


const mapStateToProps = state => {
  return {
    theater: state.theaterReducer.theater,
  }
}

export default connect(mapStateToProps)(Main)