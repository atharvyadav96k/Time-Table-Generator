import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-database.js";
const firebaseConfig = {
  apiKey: "AIzaSyB89IZj7T0raYTNGpbgF3EUPJc9su_i7Oo",
  authDomain: "timetable-ind.firebaseapp.com",
  projectId: "timetable-ind",
  storageBucket: "timetable-ind.appspot.com",
  messagingSenderId: "206393385682",
  appId: "1:206393385682:web:895760434684b644f1030b"
};
// connecting database 
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
// getting username in next file 
const urlParams = new URLSearchParams(window.location.search);
const username = urlParams.get('username');
// const email = urlParams.get('email');
const email = 'atharvyadav96k@gmail.com'
// Now you can use the username and email as needed in your time.js script
console.log("Username:", username);
console.log("Email:", email);

// Initialize an empty timetable
let timetableData = {};

// Get DOM elements
const subjectInput = document.getElementById('subject');
const teacherInput = document.getElementById('teacher');
const addButton = document.getElementById('add-btn');
const timetableBody = document.getElementById('timetable-body');

// Add event listener to the Add button
addButton.addEventListener('click', addSubjectToTimetable);

// Function to add subject and teacher to the timetable
function addSubjectToTimetable() {
  const subject = subjectInput.value.trim();
  const teacher = teacherInput.value.trim();

  if (subject && teacher) {
    // Add subject and teacher to timetableData
    if (!timetableData[subject]) {
      timetableData[subject] = [];
    }
    timetableData[subject].push(teacher);

    // Update the timetable display
    renderTimetable();
  } else {
    alert('Please enter both subject and teacher names.');
  }

  // Clear input fields
  subjectInput.value = '';
  teacherInput.value = '';
}

// Function to render the timetable
function renderTimetable() {
  // Clear the existing timetable
  timetableBody.innerHTML = '';

  // Define days of the week
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  // Define timeslots
  const timeslots = ['9:30-10:30', '10:30-11:30', '12:10-1:10', '1:10-2:10', '2:20-3:20', '3:20-4:20'];

  // Loop through timeslots
  timeslots.forEach(timeslot => {
    const tr = document.createElement('tr');

    // Add timeslot to first column
    const tdTime = document.createElement('td');
    tdTime.classList.add('time')
    tdTime.textContent = timeslot;
    tr.appendChild(tdTime);

    // Add subjects for each day
    days.forEach(day => {
      const tdSubject = document.createElement('td');
      tdSubject.classList.add('subject');
      const subjects = Object.keys(timetableData);
      const subjectIndex = Math.floor(Math.random() * subjects.length);
      const subject = subjects[subjectIndex];
      const teachers = timetableData[subject];
      const teacherIndex = Math.floor(Math.random() * teachers.length);
      const teacher = teachers[teacherIndex];
      tdSubject.textContent = `${subject} (${teacher})`;
      tr.appendChild(tdSubject);
    });
    timetableBody.appendChild(tr);
  });
}

const generatePdfButton = document.getElementById('generate-pdf-btn');
generatePdfButton.addEventListener('click', generatePdf);
function generatePdf() {
  const subject = Array.from(document.getElementsByClassName('subject'));
  subject.forEach((ele, index) => {
    ele.addEventListener('click', () => {
      console.log(ele.innerHTML, index)
    })
  })

  showTimeTable();
  window.print();
}
function resetTimeTable() {
  const timeTable = document.getElementById("timetable");
  timeTable.style.width = 'auto'
  timeTable.style.height = 'auto'
  timeTable.style.position = 'relative'
  timeTable.style.background = 'transparent'
}
function showTimeTable() {
  const timeTable = document.getElementById("timetable");
  timeTable.style.width = '100vw'
  timeTable.style.height = '100vh'
  timeTable.style.position = 'absolute'
  timeTable.style.top = '0'
  timeTable.style.left = '0'
  timeTable.style.background = 'white'
  timeTable.addEventListener('click', () => {
    resetTimeTable();
  })
}
// adding title to time table

function setTitle() {
  const title_value = document.getElementById('title-value');
  title_value.addEventListener('change', () => {
    const title = document.getElementById('title');
    title.innerText = title_value.value;
    console.log(title_value.value);
  });
}

setTitle();