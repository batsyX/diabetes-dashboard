import React, { useEffect, useState } from "react";
import dayjs from "dayjs";

const weekTitles = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const monthName= ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const monthGenerate = (year, month) => {
  const firstDay = dayjs(`${year}-${month+1}-01`).day();
  const lastDate = dayjs(`${year}-${month+1}-01`).daysInMonth();
  const monthArray = [];
  let weekArray = [];
  for (let i = 0; i < firstDay; i++) {
    weekArray.push(null);
  }
  for (let i = 1; i <= lastDate; i++) {
    weekArray.push(i);
    if (weekArray.length === 7) {
      monthArray.push(weekArray);
      weekArray = [];
    }
  }
  if (weekArray.length) {
    monthArray.push(weekArray);
  }
  return monthArray;
};


const Calendar = ({changedDate}) => {
  const [currentMonth, setCurrentMonth] = useState(dayjs().month());
  const [currentYear, setCurrentYear] = useState(dayjs().year());
  const [monthArray, setMonthArray] = useState(
    monthGenerate(currentYear, currentMonth)
  );
  const [currentDate, setCurrentDate] = useState(dayjs().date());
  
  useEffect(() => {
    setMonthArray(monthGenerate(currentYear, currentMonth));
  }, [currentYear]);
  useEffect(() => {
    setMonthArray(monthGenerate(currentYear, currentMonth));
  }, [currentMonth]);
  useEffect(() => {
    console.log("Current Date Updated:", currentDate);
  }, [currentDate]);
  

  return (
      <div className="w-full h-full flex justify-center items-start pt-10 select-none">
        <div className="text-white flex flex-col gap-7 w-11/12">
          <div className="flex max-lg:flex-col max-lg:gap-3 justify-between">
            <button
            className="px-10 py-2 bg-purple-500 rounded-xl font-bold font-mono"
              onClick={() => {
                if (currentMonth === 0) {
                  setCurrentMonth(11);
                  setCurrentYear(currentYear - 1);
                  setMonthArray(monthGenerate(currentYear - 1, 11));
                } else {
                  setCurrentMonth(currentMonth - 1);
                  setMonthArray(monthGenerate(currentYear, currentMonth - 1));
                }
              }}
            >
              Prev
            </button>
            <div className="font-xl font-bold uppercase">
              <div className="flex items-center gap-10 justify-center">
                <select  value={currentYear} name="year" id="" className="bg-gray-800 px-10 py-2 rounded-xl outline-none cursor-pointer"
                onChange={(e) => {
                  setCurrentYear(Number(e.target.value));
                  
                }}
                >
                  {Array.from({length: 100}, (_, i) => i + 1950).map((year) => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
                <select  value={currentMonth} name="month" id="" className="bg-gray-800 px-10 py-2 rounded-xl outline-none cursor-pointer"
                onChange={(e) => {
                  setCurrentMonth(Number(e.target.value));
                }}
                >
                  {monthName.map((month, index) => (
                    <option key={month} value={index}>{month}</option>
                  ))}
                </select>
              </div>
            </div>
            <button
                className="px-10 py-2 bg-purple-500 rounded-xl font-bold font-mono"
              onClick={() => {
                const month = Number(currentMonth);
                const year = Number(currentYear);
                if (currentMonth === 11) {
                  setCurrentMonth(0);
                  setCurrentYear(currentYear + 1);
                  setMonthArray(monthGenerate(currentYear + 1, 0));
                } else {
                  setCurrentMonth(currentMonth + 1);
                  setMonthArray(monthGenerate(currentYear, currentMonth + 1));
                }
              }}
            >
              Next
            </button>
          </div>
          <div className="grid  grid-cols-7 gap-y-7 lg:gap-x-10 max-lg:gap-x-2">
            {weekTitles.map((weekTitle) => (
              <div key={weekTitle} className={`text-center font-extrabold text-xl uppercase ${weekTitle==='Sun' ?'text-red-400 ' :null}`}>
                {weekTitle}
              </div>
            ))}
            {monthArray.map((week, index) => (
              <React.Fragment key={index}>
                {/* this was a new thing I learned...even though the concept is simple it is not used too much .
                A common pattern in React is for a component to return multiple elements. Fragments basically lets you group a list of children without adding extra nodes to the DOM. */}
                {week.map((date, index) => (
                  <div key={index} 
                  onClick={() => {
                    if (date) changedDate(date, currentMonth, currentYear);
                    setCurrentDate(Number(date));
                  }}
                  className={date &&`relative text-center sm:px-5 rounded-lg sm:py-5  cursor-pointer hover:scale-105 transition-all duration-100  ${
                    date ? date === currentDate?
                                                "bg-blue-500"
                                                : index === 0? "bg-red-400" 
                                                              : "bg-gray-700"
                          : ""}`}>
                    {
                      localStorage.getItem("events") && JSON.parse(localStorage.getItem("events")).find(event => event.fulldate === `${currentYear}-${currentMonth}-${date}`) && (
                        <div className={` ${!date && 'hidden'} absolute -top-1 right-0 w-3 h-3 rounded-full bg-yellow-500`}></div>
                      )
                    }
                    <h3 className=" text-white text-lg font-bold">{date}</h3>
                  </div>
                ))}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
  );
};

export default Calendar;
