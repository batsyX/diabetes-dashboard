import React, { useEffect } from 'react'

const EventBar = ({date}) => {

  const events = JSON.parse(localStorage.getItem("events"));
  const currentDateEvents=events.filter(event => event.fulldate === date);
  useEffect(() => {
    console.log(date);
  }, [date])
  return (
    <div className='w-full h-full text-white bg-gray-800 justify-center flex'>
        <div className='w-11/12 flex justify-center items-center h-28 bg-gray-900 rounded-b-2xl'>
            <h1 className='font-bold text-xl'>Todays events!</h1>
        </div>
    </div>
  )
}

export default EventBar