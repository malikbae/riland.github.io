const calendar = document.querySelector(".calendar"),
  date = document.querySelector(".date"),
  daysContainer = document.querySelector(".days"),
  prev = document.querySelector(".prev"),
  next = document.querySelector(".next");

let today = new Date();
let activeDay;
let month = today.getMonth();
let year = today.getFullYear();

const months = [
  "Januari",
  "Februari",
  "Maret",
  "April",
  "Mei",
  "Juni",
  "Juli",
  "Agustus",
  "September",
  "Oktober",
  "November",
  "Desember",
];

const eventsData = {
  "2023-10-06": {
    title: "Festival Okura",
    location: "Pekan Baru",
    image: "img/desa-wisata-okura.jpg",
  },
  "2023-10-09": {
    title: "Pawai Budaya",
    location: "Dumai",
    image: "img/pawai-budaya-dumai.jpg",
  },
  "2023-10-20": {
    title: "Pacu Jalur",
    location: "Kuantan Singingi",
    image: "img/gambar pacu jalur.jpg",
  },
  "2023-10-22": {
    title: "Pekan Budaya",
    location: "Kampar",
    image: "img/pekan-budaya-kampar.jpg",
  },
  "2023-10-30": {
    title: "Festival Batik",
    location: "Kuantan Singingi",
    image: "img/festival-batik-kuansing.jpg",
  },
};

function createEventElement(date, event, index) {
  const eventElement = document.createElement("a");
  eventElement.href = "eventpage.html";
  eventElement.className = "dayevent";

  const eventContent = `
    <div class="dayeventt">${date}</div>
    <div class="event${index + 1}">
      <img src="${event.image}" alt="" />
      <p class="event${index + 1}ket">${event.title}</p>
      <p class="eventkota${index + 1}"">${event.location}</p>
    </div>
  `;

  eventElement.innerHTML = eventContent;
  return eventElement;
}

function initCalendar() {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const prevLastDay = new Date(year, month, 0);
  const prevDays = prevLastDay.getDate();
  const lastDate = lastDay.getDate();
  const day = firstDay.getDay();
  const nextDays = 7 - lastDay.getDay() - 1;

  date.innerHTML = months[month] + " " + year;

  let days = "";

  for (let x = day; x > 0; x--) {
    days += `<div class="day prev-date">${prevDays - x + 1}</div>`;
  }

  for (let i = 1; i <= lastDate; i++) {
    const dateString = `${year}-${month + 1}-${i < 10 ? "0" : ""}${i}`;
    const event = eventsData[dateString];
    const hasEventsClass = event ? " has-events" : "";
    if (
      i === today.getDate() &&
      year === today.getFullYear() &&
      month === today.getMonth()
    ) {
      days += `<div class="day today${hasEventsClass}" data-date="${dateString}">${i}</div>`;
    } else {
      if (event) {
        const eventIndex = Object.keys(eventsData).indexOf(dateString);
        const eventElement = createEventElement(i, event, eventIndex);
        days += eventElement.outerHTML;
      } else {
        days += `<div class="day${hasEventsClass}" data-date="${dateString}">${i}</div>`;
      }
    }
  }

  for (let j = 1; j <= nextDays; j++) {
    days += `<div class="day next-date">${j}</div>`;
  }

  daysContainer.innerHTML = days;

  const datesWithEvents = document.querySelectorAll(".day.has-events");
  datesWithEvents.forEach((dateElement) => {
    dateElement.addEventListener("click", () => {
      const clickedDate = dateElement.getAttribute("data-date");
      handleEventClick(clickedDate);
    });
  });
}

function handleEventClick(date) {
  window.location.href = `eventpage.html?date=${date}`;
}

function prevMonth() {
  month--;
  if (month < 0) {
    month = 11;
    year--;
  }
  initCalendar();
}

function nextMonth() {
  month++;
  if (month > 11) {
    month = 0;
    year++;
  }
  initCalendar();
}

prev.addEventListener("click", prevMonth);
next.addEventListener("click", nextMonth);

initCalendar();
