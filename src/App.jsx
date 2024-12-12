import Calendar from "./components/Calendar";
import EventBar from "./components/EventBar";
import { useEffect, useState } from "react";


const customEvents=[
  {
    fulldate: "2024-11-11",
    title: "New Year",
    description: "Happy New Year 2022",
  },
  {
    fulldate: "2022-02-14",
    title: "Valentine's Day",
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
    if(localStorage.getItem("events")){
      events = JSON.parse(localStorage.getItem("events"));
      if(events.find(event => event.fulldate === `${currentYear}-${currentMonth}-${date}`)){
        console.log(events.find(event => event.fulldate === `${currentYear}-${currentMonth}-${date}`));
        setDate(events.find(event => event.fulldate === `${currentYear}-${currentMonth}-${date}`));
      }
    }
  }
  return (
    <div className="w-full h-screen bg-gray-900 flex">
      <div className="w-4/5 ">
        <Calendar changedDate={handleDate}/>
      </div>
      <div className="w-1/5 ">
        <EventBar date={date}/>
      </div>
    </div>
  );
}

export default App;
