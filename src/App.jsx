import dayjs from "dayjs";
import Calendar from "./components/Calendar";
import EventBar from "./components/EventBar";
import { useEffect, useState } from "react";


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
