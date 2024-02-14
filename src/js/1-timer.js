import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

let userSelectedDate;
const startBtn = document.querySelector('[data-start]');
const datetimePicker = document.querySelector('#datetime-picker');
const timerValue = {
    days: document.querySelector('[data-days]'),
    hours: document.querySelector('[data-hours]'),
    minutes: document.querySelector('[data-minutes]'),
    seconds: document.querySelector('[data-seconds]'),
};

startBtn.setAttribute('disabled', true);

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
    userSelectedDate = Date.parse(selectedDates[0]);

    if (userSelectedDate > Date.now()) {
        startBtn.removeAttribute('disabled');

        
        } else {
        startBtn.setAttribute('disabled', true);

        iziToast.error({
        message: 'Please choose a date in the future',
        position: 'topRight',
        backgroundColor: 'orangered',
        messageColor: 'white',
        close: false,
        progressBar: false,
        });
    }

    
    },
};
startBtn.addEventListener('click', onStartBtnClick);
function addZero(value) {
    return value.toString().padStart(2, '0');
}
function onStartBtnClick() {
    startBtn.setAttribute('disabled', true);
    datetimePicker.setAttribute('disabled', true);

    const interval = setInterval(() => {
    const currentTime = Date.now();
    const remainingTime = userSelectedDate - currentTime;
    const convertedRemainingTime = convertMs(remainingTime);

    Object.entries(convertedRemainingTime).forEach(([key, value]) => {
        timerValue[key].textContent = addZero(value);
    });
    if (remainingTime < 1000) {
        clearInterval(interval);
    }
    }, 1000);
}
function convertMs(ms) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
    const days = Math.floor(ms / day);
    const hours = Math.floor((ms % day) / hour);
    const minutes = Math.floor(((ms % day) % hour) / minute);
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);
    return { days, hours, minutes, seconds };
}

flatpickr(datetimePicker, options);