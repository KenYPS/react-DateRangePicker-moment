import React, { useState } from 'react'
import DateRangePicker from './dateRangepicker/index'
import moment from 'moment'
import './App.css';

function App() {
   const [startDate, setStartDate] = useState(moment().subtract(1, 'month'))
   const [endDate, setEndDate] = useState(moment)
   const handleDateClick = ({
     startDate: callbackStartDate,
     endDate: callbackEndDate,
   }) => {
     setStartDate(callbackStartDate)
     setEndDate(callbackEndDate)
   }
  return (
    <div className="App">
      <DateRangePicker
        startDate={startDate}
        endDate={endDate}
        onChange={handleDateClick}
      />
    </div>
  )
}

export default App;
