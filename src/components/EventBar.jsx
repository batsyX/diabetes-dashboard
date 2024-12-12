import React, { useEffect, useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"


const EventBar = ({date,currentYear,currentMonth}) => {

  const [currentDateEvents,setCurrentDateEvents] = useState([]);
  const [events, setEvents] = useState([]);
  const handleSubmit = (e,id) => {
    e.preventDefault();
    const title = e.target.title.value;
    const description = e.target.desc.value;
    const start = e.target.start.value;
    const end = e.target.end.value;
    const updatedEvents = events.map(event => {
      if(event.id === id){
        return {
          ...event,
          title,
          description,
          startTime: start,
          endTime: end
        }
      }
      return event;
    })
    setEvents(updatedEvents);
  }

  useEffect(() => {
    const storedEvents = JSON.parse(localStorage.getItem("events")) || [];
    setEvents(storedEvents);
  }, []);
  useEffect(() => {
    localStorage.setItem("events", JSON.stringify(events));
  }, [events]);

  useEffect(() => {
    console.log(date)
    setCurrentDateEvents(events.filter(event => event.fulldate === date));
    console.log(currentDateEvents);
  }, [date, currentYear, currentMonth,events])


  return (
    <div className='w-full h-full text-white bg-gray-800 items-center flex flex-col'>
        <div className='w-11/12 flex justify-center items-center h-28 bg-gray-900 rounded-b-2xl'>
            <h1 className='font-bold text-xl'>Todays events!</h1>
        </div>
        { 
          currentDateEvents.length>0?currentDateEvents.map((event,index) => (
            <div key={index} className='w-11/12 h-32 flex justify-center mt-3 '>
              <div className='relative w-11/12 h-32  flex flex-col justify-center items-center bg-purple-600 rounded-xl'>
                <h1 className='font-bold text-xl'>{`->`+event.title}</h1>
                <h2 className=' text-sm'>{event.description}</h2>
                <div className='flex gap-2'>
                  <h3>{`Start Time: ${event.startTime}`},</h3>
                  <h3>{`End Time: ${event.endTime}`}</h3>
                </div>
                <Dialog>
                  <DialogTrigger>
                  <div className='absolute bottom-0 right-0 bg-green-500 rounded-md px-3'>
                    <h2>Edit</h2>
                  </div>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Edit current event</DialogTitle>
                    </DialogHeader>
                    
                    <div className="flex items-center space-x-2">
                      <form action="" className='flex flex-col gap-2' onSubmit={(e)=>handleSubmit(e,event.id)}>
                        <div className="flex flex-1 gap-2 items-center">
                          <label className='font-mono uppercase' htmlFor="title">Title:</label>
                          <input required className='p-1 border border-gray-600 rounded-xl outline-none' type="text" name="title" id="" />
                        </div>
                        <div className="flex flex-1 gap-2 items-center">
                          <label className='font-mono uppercase' htmlFor="desc">Description:</label>
                          <input required className='p-1 border border-gray-600 rounded-xl outline-none' type="text" name="desc" id="" />
                        </div>
                        <div className="flex flex-1 gap-2 items-center">
                          <label className='font-mono uppercase' htmlFor="start">Start time:</label>
                          <input required type="time" name="start" id="" />
                        </div>
                        <div className="flex flex-1 gap-2 items-center">
                          <label className='font-mono uppercase' htmlFor="end">End time:</label>
                          <input required type="time" name="end" id="" />
                        </div>
                        <div className="flex flex-1 gap-2 items-center">
                            <button className='bg-green-500 px-5 py-2 rounded-md text-white font-mono ' type='submit'>Submit</button>
                        </div>
                      </form>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          )):<div className='w-11/12 h-28  flex flex-col gap-3 justify-center items-center'>
              <h1 className='font-bold text-xl'>Nothing planned!</h1>
              
              <Dialog>
                <DialogTrigger>
                <div className='w-7 h-7 bg-green-400 rounded-xl px-10 py-3  flex justify-center items-center text-2xl font-mono hover:scale-105 transition-all duration-200'>
                  <p>Add</p>
                </div>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add a new Event!</DialogTitle>
                  </DialogHeader>
                  <div className="flex items-center space-x-2">
                      <form action="" className='flex flex-col gap-2' onSubmit={(e)=>handleSubmit(e,event.id)}>
                        <div className="flex flex-1 gap-2 items-center">
                          <label className='font-mono uppercase' htmlFor="title">Title:</label>
                          <input required className='p-1 border border-gray-600 rounded-xl outline-none' type="text" name="title" id="" />
                        </div>
                        <div className="flex flex-1 gap-2 items-center">
                          <label className='font-mono uppercase' htmlFor="desc">Description:</label>
                          <input required className='p-1 border border-gray-600 rounded-xl outline-none' type="text" name="desc" id="" />
                        </div>
                        <div className="flex flex-1 gap-2 items-center">
                          <label className='font-mono uppercase' htmlFor="start">Start time:</label>
                          <input required type="time" name="start" id="" />
                        </div>
                        <div className="flex flex-1 gap-2 items-center">
                          <label className='font-mono uppercase' htmlFor="end">End time:</label>
                          <input required type="time" name="end" id="" />
                        </div>
                        <div className="flex flex-1 gap-2 items-center">
                            <button className='bg-green-500 px-5 py-2 rounded-md text-white font-mono ' type='submit'>Submit</button>
                        </div>
                      </form>
                    </div>
                </DialogContent>
              </Dialog>
          </div>
        }
    </div>
  )
}

export default EventBar