'use strict'

window.addEventListener('DOMContentLoaded', () => {

    const form = document.querySelector('.form'),
          dedlineTimer = document.querySelector('.dedline__timer');

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const formDate = new FormData(form),
              dedline = formDate.get('dedline');
        
        event.target.reset();
        setClock('.timer', dedline);
        
    });
    function getTimeRemaining(dedline) {
        const t = Date.parse(dedline) - Date.parse(new Date()),
              days = Math.floor(t / (1000*60*60*24)),
              hours = Math.floor((t / (1000*60*60)) % 24),
              minutes = Math.floor((t / (1000*60)) % 60),
              seconds = Math.floor((t / 1000) % 60)
        
        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    }

    function setClock(selector, dedline) {
        const timer = document.querySelector(selector),
              days = timer.querySelector('#days'),
              hours = timer.querySelector('#hours'),
              minutes = timer.querySelector('#minutes'),
              seconds = timer.querySelector('#seconds'),
              timerInterval = setInterval(updateClock, 1000);
        
        dedlineTimer.classList.add('dedline__timer_active');
        updateClock();

        function updateClock() {
            const t = getTimeRemaining(dedline);

            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);

            if(t.total <= 0) {
                clearInterval(timerInterval);
            }
        }
    }
    
    function getZero(num) {
        if(num >= 0 && num < 10) {
            return `0${num}`;
        } else {
            return num;
        }
    }

});

