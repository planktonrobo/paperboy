import React, { useState, useEffect } from "react";


const romanize = (num) => {
  if (!+num) return false;
  let digits = String(+num).split(""),
    key = [
      "",
      "C",
      "CC",
      "CCC",
      "CD",
      "D",
      "DC",
      "DCC",
      "DCCC",
      "CM",
      "",
      "X",
      "XX",
      "XXX",
      "XL",
      "L",
      "LX",
      "LXX",
      "LXXX",
      "XC",
      "",
      "I",
      "II",
      "III",
      "IV",
      "V",
      "VI",
      "VII",
      "VIII",
      "IX",
    ],
    roman = "",
    i = 3;
  while (i--) roman = (key[+digits.pop() + i * 10] || "") + roman;
  return Array(+digits.join("") + 1).join("M") + roman;
};

const DateTime = () => {
  const [dateTime, setDateTime] = useState(new Date());
  const [numerals, setNumerals] = useState(false);

  const fa = () => {
    return (numerals) ? strRomanDate : dateTime.toLocaleDateString([], {
      year: "numeric",
      month: "long",
      day: "numeric",
   
    })
  }

  
  useEffect(() => {
    const id = setInterval(() => setDateTime(new Date()), 10000);
    return () => {
      clearInterval(id);
    };
  }, []);
  const strRomanDate =
    romanize(dateTime.getMonth() + 1) +
    " . " +
    romanize(dateTime.getDate()) +
    " . " +
    romanize(dateTime.getFullYear());
  return (
    <div className="row justify-content-center py-4 mt-5 mt-md-0">
      
        <button onClick={() => setNumerals(!numerals)} style={{ width: '2rem', height:'100%'}} className="btn btn-none p-0"><h4 style={{display: 'inline'}}>🗓 </h4></button>  
        <h6 className="p-1" style={{display: "inline"}}>
          {fa()}
        </h6>
    </div>
  );
};

export default DateTime;


/// Month, DD, YYYY
/* {dateTime.toLocaleTimeString([], {
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        })}
        <br></br> */ 