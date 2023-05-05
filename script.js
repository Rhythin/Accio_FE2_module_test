
// the assignment dosen't mention how to import json so multiple methords can be used

// importing from file in same folder

// import jsonData from './data.json' assert {type: 'json'}
// const students =JSON.parse(JSON.stringify(jsonData))
// // console.log(students)


// 

// example of importing data from given hosted link
let students=[]

async function loadjson(){
  const response =await fetch('https://gist.githubusercontent.com/harsh3195/b441881e0020817b84e34d27ba448418/raw/c4fde6f42310987a54ae1bc3d9b8bfbafac15617/demo-json-data.json')
  students = await response.json()
  
  sortedStudents= [...students];
  // console.log(students)
  renderStudents()
}

loadjson()



// methord to import from hosted site

// fetch('https://gist.githubusercontent.com/harsh3195/b441881e0020817b84e34d27ba448418/raw/c4fde6f42310987a54ae1bc3d9b8bfbafac15617/demo-json-data.json')
//   .then(response => response.json())
//   .then(data => {
//     students = data;
//     console.log(students); // Outputs the fetched JSON data
//   })
//   .catch(error => console.error(error));

  // const students=JSON.parse(JSON.stringify(studentstemp))

const studentTable = document.querySelector('#student-table tbody');
const sortNameAscBtn = document.querySelector('#sortNameAsc');
const sortNameDescBtn = document.querySelector('#sortNameDesc');
const sortMarksBtn = document.querySelector('#sortMarks');
const sortPassingBtn = document.querySelector('#sortPassing');
const sortClassBtn = document.querySelector('#sortClass');
const sortGenderBtn = document.querySelector('#sortGender');

// Create a copy of the original students array to sort
let sortedStudents = [...students];

// Function to render the sorted students array in the table
const renderStudents = () => {
  // Clear the table body
  studentTable.innerHTML = '';

  // Loop through the sorted students array and append each row to the table body
  sortedStudents.forEach(student => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${student.id}</td>
      <td class="avatar-container"><img src="${student.img_src}" alt="avatar" class="avatar"> ${student.first_name} ${student.last_name}</td>
      <td>${student.gender}</td>
      <td>${student.class}</td>
      <td>${student.marks}</td>
      <td>${student.passing ? "Passed" : "Failed"}</td>
      <td>${student.city}</td>
      <td>${student.email}</td>
    `;
    studentTable.appendChild(row);
  });
};

const searchInput = document.querySelector('#student-s input[type="search"]');
const searchButton = document.querySelector('#student-s button');

searchButton.addEventListener('click', () => {
  const searchTerm = searchInput.value.toLowerCase();
  const searchResults = students.filter(student => {
    const fullName = `${student.first_name.toLowerCase()} ${student.last_name.toLowerCase()}`;
    return (
      fullName.includes(searchTerm) ||
      student.email.toLowerCase().includes(searchTerm)
    );
  });
  sortedStudents = searchResults;
  renderStudents();
});


// Event listener for sort by name (ascending) button
sortNameAscBtn.addEventListener('click', () => {
  sortedStudents.sort((a, b) => a.first_name.localeCompare(b.first_name));
  renderStudents();
});

// Event listener for sort by name (descending) button
sortNameDescBtn.addEventListener('click', () => {
  sortedStudents.sort((a, b) => b.first_name.localeCompare(a.first_name));
  renderStudents();
});

// Event listener for sort by marks button
sortMarksBtn.addEventListener('click', () => {
  sortedStudents.sort((a, b) => b.marks - a.marks);
  renderStudents();
});

// Event listener for sort by passing button
sortPassingBtn.addEventListener('click', () => {
  sortedStudents.sort((a, b) => b.passing - a.passing);
  renderStudents();
});

// Event listener for sort by class button
sortClassBtn.addEventListener('click', () => {
  sortedStudents.sort((a, b) => a.class - b.class);
  renderStudents();
});

// Event listener for sort by gender button
sortGenderBtn.addEventListener('click', () => {
  sortedStudents.sort((a, b) => a.gender.localeCompare(b.gender));
  renderStudents();
});

// Initial render of the students array
renderStudents();