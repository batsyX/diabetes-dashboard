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

  console.log(date)
  const [currentDateEvents,setCurrentDateEvents] = useState([]);
  const [events, setEvents] = useState(() => {
    const storedEvents = JSON.parse(localStorage.getItem("events")) || [];
    return storedEvents;
  });
  const checkEventOverLap = (start, end) => {
    const parseTime = (time) => {
      const [hours, minutes] = time.split(':').map(Number);
      return hours * 60 + minutes; 
    };
  
    const rangeStart = parseTime(start);
    const rangeEnd = parseTime(end);
  
    console.log("Checking overlap:", rangeStart, rangeEnd);
  
    const event = events.find(event => {
      if (event.fulldate === date) {
        const eventStart = parseTime(event.startTime);
        const eventEnd = parseTime(event.endTime);
        console.log("Existing event:", eventStart, eventEnd);
        if (rangeStart < eventEnd && rangeEnd > eventStart) {
          return true;
        }
      }
      return false; 
    });
  
    if (event) {
      return true;
    }
  
    return false;
  };
  const checkEndBeforeStart = (start, end) => {
    const parseTime = (time) => {
      const [hours, minutes] = time.split(':').map(Number);
      return hours * 60 + minutes; 
    };
  
    const rangeStart = parseTime(start);
    const rangeEnd = parseTime(end);
  
    console.log("Checking overlap:", rangeStart, rangeEnd);
  
    if(rangeStart>rangeEnd){
      return true;
    }
    return false;
  }

  const handleEdit = (e,id) => {
    e.preventDefault();
    if(checkEventOverLap(e.target.start.value,e.target.end.value)){
      alert('Event already exists at this time!');
      return;
    }
    if(checkEndBeforeStart(e.target.start.value,e.target.end.value)){
      alert('End time cannot be before start time!');
      return;
    }
    const title = e.target.title.value;
    const description = e.target.desc.value;
    const start = e.target.start.value;
    const end = e.target.end.value;
    const updatedEvents = events.map(event => {
      if(event.startTime==start && event.fulldate==date){
        alert('Event already exists at this time!');
        return event;
      }
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
  const handleAdd = (e) => {
    if(checkEventOverLap(e.target.start.value,e.target.end.value)){
      alert('Event already exists at this time!');
      return;
    }
    if(checkEndBeforeStart(e.target.start.value,e.target.end.value)){
      alert('End time cannot be before start time!');
      return;
    }
    e.preventDefault();
    console.log(date)
    const title = e.target.title.value;
    const description = e.target.desc.value;
    const start = e.target.start.value;
    const end = e.target.end.value;
    const newEvent = {
      id: events.length + 1,
      fulldate: date,
      title,
      description,
      startTime: start,
      endTime: end
    }
    console.log(newEvent);
    setEvents([...events,newEvent]);
    
  }
  const handleDelete = (e,id) => {
    const updatedEvents = events.filter(event => event.id !== id);
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
    setCurrentDateEvents(events.filter(event => event.fulldate === date));
    console.log(currentDateEvents);
  }, [date, currentYear, currentMonth,events])


  return (
    <div className='w-full lg:min-h-screen text-white bg-gray-800 items-center flex flex-col'>
        <div className='w-11/12 max-lg:w-full flex justify-center items-center h-28 bg-gray-900 rounded-b-2xl'>
            <h1 className='font-bold text-xl'>Todays events!</h1>
        </div>
        
        { 
          currentDateEvents.length>0?  currentDateEvents.map((event,index) => (
            <div key={index} className='w-11/12 h-32 flex justify-center mt-3 '>
              
              <div className='relative w-11/12 h-32  flex flex-col justify-center items-center bg-purple-600 rounded-xl'>
                <h1 className='font-bold text-xl uppercase'>{event.title}</h1>
                <h2 className=' text-sm'>{event.description}</h2>
                <div className='flex gap-2'>
                  <h3>{`Start Time: ${event.startTime}`},</h3>
                  <h3>{`End Time: ${event.endTime}`}</h3>
                </div>
                <Dialog>
                  <DialogTrigger>
                  <div className='absolute bottom-0 left-0 bg-green-500 rounded-tr-xl rounded-bl-xl px-3'>
                    <h2>Edit</h2>
                  </div>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Edit current event</DialogTitle>
                    </DialogHeader>
                    
                    <div className="flex items-center space-x-2">
                      <form action="" className='flex flex-col gap-2' onSubmit={(e)=>handleEdit(e,event.id)}>
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
                <Dialog>
                  <DialogTrigger>
                  <div className='absolute bottom-0 right-0 bg-red-500 rounded-tl-xl rounded-br-xl px-3'>
                    <h2>Delete</h2>
                  </div>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Are you sure??</DialogTitle>
                    </DialogHeader>
                    
                    <div className="flex items-center space-x-2">
                      <form action="" className='flex flex-col gap-2' onSubmit={(e)=>handleDelete(e,event.id)}>
                        <div className="flex flex-1 gap-2 items-center">
                            <button className='bg-red-500 px-5 py-2 rounded-md text-white font-mono ' type='submit'>Delete</button>
                        </div>
                      </form>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          )):<div className='w-11/12 h-28  flex flex-col gap-3 justify-center items-center'>
              <h1 className='font-bold text-xl'>Nothing planned!</h1>

          </div>
        }
        <div className='pt-5'>
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
                      <form action="" className='flex flex-col gap-2' onSubmit={(e)=>handleAdd(e,event.id)}>
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
  )
}

export default EventBar