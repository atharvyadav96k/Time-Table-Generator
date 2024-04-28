// Initialize an empty timetable
let timetableData = [];

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
    // Create a new timetable slot
    const slot = {
      subject,
      teacher
    };

    // Add the slot to the timetable data
    timetableData.push(slot);

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
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

  // Define timeslots
  const timeslots = ['8:00-9:00', '9:00-10:00', '10:00-11:00', '11:00-12:00', '12:00-1:00'];

  // Loop through timeslots
  timeslots.forEach(timeslot => {
    const tr = document.createElement('tr');
    
    // Add timeslot to first column
    const tdTime = document.createElement('td');
    tdTime.textContent = timeslot;
    tr.appendChild(tdTime);

    // Add subjects for each day
    days.forEach(day => {
      const tdSubject = document.createElement('td');
      const slot = timetableData.find(slot => slot.time === timeslot && slot.day === day);
      tdSubject.textContent = slot ? `${slot.subject} (${slot.teacher})` : '-';
      tr.appendChild(tdSubject);
    });

    // Append the row to the timetable body
    timetableBody.appendChild(tr);
  });
}