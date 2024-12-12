import dayjs from "dayjs";
import Calendar from "./components/Calendar";
import EventBar from "./components/EventBar";
import { useEffect, useState } from "react";


const customEvents=[
  {
    id: 1,
    fulldate: "2024-11-11",
    title: "My birthday!",
    startTime: "12:00",
    endTime: "12:30",
    description: "Happy birthday to me!",
  },
  {
    id: 2,
    fulldate: "2024-11-11",
    title: "college opening",
    startTime: "09:00",
    endTime: "12:00",
    description: "college opening day",
  },
  {
    id: 3,
    fulldate: "2024-11-11",
    title: "college opening",
    startTime: "09:00",
    endTime: "12:00",
    description: "college opening day",
  },
  {
    id: 4,
    fulldate: "2024-11-11",
    title: "college opening",
    startTime: "09:00",
    endTime: "12:00",
    description: "college opening day",
  },
  {
    id: 5,
    fulldate: "2024-11-11",
    title: "college opening",
    startTime: "09:00",
    endTime: "12:00",
    description: "college opening day",
  },
  {
    id: 6,
    fulldate: "2024-11-11",
    title: "college opening",
    startTime: "09:00",
    endTime: "12:00",
    description: "college opening day",
  },
]

function App() {

  const [events,setEvents] = useState(() => {
    const storedEvents = localStorage.getItem("events");
    return storedEvents ? JSON.parse(storedEvents) : [];
  });
  useEffect(() => {
    localStorage.setItem("events", JSON.stringify(events));
  }, []);
  const [date,setDate] = useState(`${dayjs().year()}-${dayjs().month()+1}-${dayjs().date()}`);

  const handleDate = (date,currentMonth,currentYear) => {
    // console.log(date,currentMonth,currentYear);
    setDate(`${currentYear}-${currentMonth}-${date}`);
  }
  return (
    <div className="w-full max-lg:h-screen bg-gray-900 flex max-lg:flex-col">
      <div className="w-4/5 max-lg:w-full">
        <Calendar changedDate={handleDate}/>
      </div>
      <div className="w-1/5 lg:overflow-y-scroll max-lg:w-full">
        <EventBar date={date} currentYear currentMonth events={events}/>
      </div>
    </div>
  );
}

export default App;
