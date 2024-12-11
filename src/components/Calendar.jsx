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
  useEffect(() => {
    setMonthArray(monthGenerate(currentYear, currentMonth));
  }, [currentYear, currentMonth]);
  

  return (
      <div className="w-full h-full flex justify-center items-center">
        <div className="text-white flex flex-col gap-10 w-11/12">
          <div className="flex justify-between">
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
                  setCurrentYear(e.target.value);
                  setMonthArray(monthGenerate(e.target.value, currentMonth));
                }}
                >
                  {Array.from({length: 100}, (_, i) => i + 1950).map((year) => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
                <select  value={currentMonth} name="month" id="" className="bg-gray-800 px-10 py-2 rounded-xl outline-none cursor-pointer"
                onChange={(e) => {
                  setCurrentMonth(e.target.value);
                  console.log(e.target.value);
                  setMonthArray(monthGenerate(currentYear,e.target.value));
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
                const month = Number(currentMonth); // Ensure it's a number
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
          <div className="grid grid-cols-7 gap-y-7 gap-x-10">
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
                  }}
                  className={date &&`relative text-center sm:px-5 sm:rounded-lg sm:py-5  cursor-pointer hover:scale-105 bg-opacity-0 transition-all duration-100 ${index==0?'sm:bg-red-400':'sm:bg-gray-700'}`}>
                    {
                      localStorage.getItem("events") && JSON.parse(localStorage.getItem("events")).find(event => event.fulldate === `${currentYear}-${currentMonth}-${date}`) && (
                        <div className={` ${!date && 'hidden'} absolute -top-1 right-0 w-3 h-3 rounded-full bg-blue-500`}></div>
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
