// S2 QAP3 - Brenda Armstrong, SD10
// Tuesday, March 26, 2024

/***Question 1***/

// Constructor function for User
function User(n, a) {
    this.name = n;
    this.age = a;
}

// Array to hold user objects
var users = [];

// Function to create a User object and add it to the users array
function makeObj() {
    var name = document.getElementById('name').value;
    var age = document.getElementById('age').value;
    var user = new User(name, age);
    users.push(user);
    console.log('User added:', user); 
}

// Function to display all User objects
function displayObj() {
    var displayArea = document.getElementById('displayArea'); 
    displayArea.innerHTML = ''; // Clearing the display area
    users.forEach(function(user) {
        displayArea.innerHTML += 'Name: ' + user.name + '<br>' + 'Age: ' + user.age + '<br>'; 
    });
}

/***Question 2***/

function showJSON() {
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == 200) {
      var user = JSON.parse(xhr.responseText);
      document.getElementById("q2").innerHTML =
        "Name: " + user.name + " " + "<br>" + "Company: " + user.company;
    }
  };
  xhr.open("GET", "data/user.json", true);
  xhr.send();
}

/*** Question 3***/

function showTodos(sortBy = '') {
    fetch('https://jsonplaceholder.typicode.com/todos')
    .then(response => response.json())
    .then(todos => {
        const userIdToName = {
            1: "1 - Brenda A.",
            2: "2 - Noman A.",
            3: "3 - Ain M.",
            4: "4 - Ethan M.",
            5: "5 - Louis A.",
            6: "6 - Stephan B.",
            7: "7 - Anita A.",
            8: "8 - Magnus B.",
            9: "9 - Ragnar A.",
            10: "10 - Don H."
        };

        if (sortBy) {
            todos.sort((a, b) => {
                if (sortBy === 'owner') {
                    // Sorting by userId needs to parse integers for correct numeric sorting
                    return a.userId - b.userId;
                } else if (sortBy === 'status') {
                    // status sort is based on the completed property
                    return (`${a.completed}`).localeCompare(`${b.completed}`);
                } else if (sortBy === 'completion') {
                    return (`${a.completed}`).localeCompare(`${b.completed}`);
                }
            });
        }

        const displayArea = document.getElementById('q3');
        let tableHTML = `<table style="width:100%">
            <tr>
                <th>ID</th>
                <th>To-Do Task</th>
                <th>Status</th>
                <th>Completion</th>
                <th>Owner</th>
            </tr>`;

        todos.forEach(todo => {
            const completionIndicator = todo.completed ? '🟢' : '🔴';
            const statusText = todo.completed ? 'Completed' : 'Not Completed';
            const ownerName = userIdToName[todo.userId] || `Unknown Owner (${todo.userId})`;
            tableHTML += `<tr>
                <td>${todo.id}</td>
                <td>${todo.title}</td>
                <td>${statusText}</td>
                <td>${completionIndicator}</td>
                <td>${ownerName}</td>
            </tr>`;
        });

        tableHTML += '</table>';
        displayArea.innerHTML = tableHTML;
    })
    .catch(error => console.error('Error fetching todos:', error));
}



