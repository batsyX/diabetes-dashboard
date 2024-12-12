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
    fulldate: "2022-02-14",
    title: "Valentine's Day",
    startTime: "00:00",
    endTime: "23:59",
    description: "Happy Valentine's Day 2022",
  }
]

function App() {

  let events=[];
  useEffect(() => {
    localStorage.setItem("events", JSON.stringify(customEvents));
  }, []);
  const [date,setDate] = useState();

  const handleDate = (date,currentMonth,currentYear) => {
    console.log(date,currentMonth,currentYear);
    setDate(`${currentYear}-${currentMonth}-${date}`);
    // if(localStorage.getItem("events")){
    //   events = JSON.parse(localStorage.getItem("events"));
    //   if(events.find(event => event.fulldate === `${currentYear}-${currentMonth}-${date}`)){
    //     setDate(events.find(event => event.fulldate === `${currentYear}-${currentMonth}-${date}`));
    //   }
    // }
  }
  return (
    <div className="w-full h-screen bg-gray-900 flex">
      <div className="w-4/5 ">
        <Calendar changedDate={handleDate}/>
      </div>
      <div className="w-1/5 ">
        <EventBar date={date} currentYear currentMonth/>
      </div>
    </div>
  );
}

export default App;
