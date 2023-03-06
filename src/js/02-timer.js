import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

// Отримуємо елементи з DOM

const datePicker = document.getElementById("datetime-picker");
const startButton = document.querySelector("[data-start]");
const daysField = document.querySelector("[data-days]");
const hoursField = document.querySelector("[data-hours]");
const minutesField = document.querySelector("[data-minutes]");
const secondsField = document.querySelector("[data-seconds]");

startButton.disabled = true;

// Змінна для зберігання ID таймера
let timerId;



const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
    minuteIncrement: 1,
  
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    const now = new Date();
    if (selectedDate <= now) {
      window.alert("Please choose a date in the future");
      startButton.disabled = true;
    } else {
      startButton.disabled = false;
    }
  },
};



// Ініціалізація flatpickr на елементі datePicker з опціями
const fp = flatpickr(datePicker, options);




const countdown = {
    start() {
        const startTime = fp.selectedDates[0].getTime();

        setInterval(() => {
            const endTime = new Date().getTime();
            const deltaTime = startTime - endTime;

            const timeComponents = convertMs(deltaTime);

            const seconds = timeComponents.seconds;
            const minutes = timeComponents.minutes;
            const hours = timeComponents.hours;
            const days = timeComponents.days


            daysField.textContent = pad(days);
            hoursField.textContent = pad(hours);
            minutesField.textContent = pad(minutes);
            secondsField.textContent = pad(seconds);
            
            if (deltaTime < 1) {
                daysField.textContent = "00";
                hoursField.textContent = "00";
                minutesField.textContent = "00";
                secondsField.textContent = "00";
            }
      
            
        }, 1000);

    },
};



startButton.addEventListener('click', countdown.start);

function pad(time) {
    return time.toString().padStart(2, "0");
}


function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}






