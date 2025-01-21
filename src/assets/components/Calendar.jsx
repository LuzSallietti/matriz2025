import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { getWeek, format, startOfYear, endOfYear, getDayOfYear } from 'date-fns';
import es from 'date-fns/locale/es'; // Importa la localización en español


const Calendar = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [workableDay, setWorkableDay] = useState(null);
  const [turn, setTurn] = useState(null);

   // Verificar si el día es "Noche" o "Día" basado en el día del año
   const getTurn = (dayOfYear) => {
    const intervalIndex = Math.floor((dayOfYear - 1) / 28);
    return intervalIndex % 2 === 0 ? "Noche" : "Día";
  };
  
  const minDate = startOfYear(new Date(2025, 0, 1)); // 1 de enero de 2024
  const maxDate = endOfYear(new Date(2025, 11, 31)); // 31 de diciembre de 2024


  const handleChange = (date) => {
    setStartDate(date);
    const weekNumber = getWeek(date);
    const dayName = format(date, 'EEEE'); // Obtener el nombre del día
    const dayOfYear = getDayOfYear(date); // Obtener el número del día
    console.log("Número de semana:", weekNumber); //la semana cambia el domingo
    console.log("Día de la semana:", dayName);
    console.log("Número del día: ", dayOfYear)

   
    const newTurn = getTurn(dayOfYear);
    setTurn(newTurn);

    if ((weekNumber % 2 !== 0) && ((dayName === 'Wednesday') || (dayName === 'Thursday') || (dayName === 'Sunday')) ){
        setWorkableDay(true);        
        console.log("Trabajas:" + workableDay)
    } else if ((weekNumber % 2 === 0) && ((dayName === 'Monday') || (dayName === 'Tuesday') || (dayName === 'Friday') || (dayName === 'Saturday'))){
        setWorkableDay(true)
        console.log("Trabajas" + workableDay)
    } else {
        setWorkableDay(false)
        console.log("Trabajas"+ workableDay)
    }
  };

  return (
    <>
    <div>
      <h1> Matriz 2025</h1>
      <h2>Seleccioná el día:</h2>
      <DatePicker
        selected={startDate}
        onChange={handleChange}
        locale={es}
        showWeekNumbers
        minDate={minDate}
        maxDate={maxDate}
      />    
    </div>
    <div>
    {workableDay !== null && <p style={{ fontWeight: 'bold' }}>{workableDay ? 'Trabajas' : 'No trabajas 🛌'}</p>}
    {(turn !== null && workableDay !== false) && <p style={{ fontWeight: 'bold' }}>Turno: {turn} {turn === 'Día' ? '🌞' : '🌜'}</p>}
    </div>
    </>
  );
};

export default Calendar;
