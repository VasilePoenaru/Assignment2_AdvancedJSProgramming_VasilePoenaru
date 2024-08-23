class Student {
    constructor(name, address, phone, course) {
        this.name = name;
        this.address = address;
        this.phone = phone;
        this.course = course;
    }

    display() {
        return `
            <div class="student">
                <h2>${this.name}</h2>
                <p><strong>Address:</strong> ${this.address}</p>
                <p><strong>Phone:</strong> ${this.phone}</p>
                <p><strong>Course:</strong> ${this.course}</p>
            </div>
        `;
    }
}

function formatInfo() {
    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0];

    if (file) {
        const reader = new FileReader();
        reader.onload = function(event) {
            const data = event.target.result;
            const dataArray = data.split('\n').map(line => line.trim()).filter(line => line !== '');
            const students = createStudents(dataArray);
            displayStudents(students);
        };
        reader.readAsText(file);
    } else {
        alert("Please select a file first.");
    }
}

function createStudents(dataArray) {
    const students = [];
    for (let i = 0; i < dataArray.length; i += 4) {
        if (dataArray[i] && dataArray[i + 1] && dataArray[i + 2] && dataArray[i + 3]) {
            const student = new Student(
                dataArray[i],
                dataArray[i + 1],
                dataArray[i + 2],
                dataArray[i + 3]
            );
            students.push(student);
        }
    }
    return students;
}

function displayStudents(students) {
    const container = document.getElementById('students-container');
    container.innerHTML = '';  // eliminare continut anterior daca exista
    students.forEach(student => {
        container.innerHTML += student.display();
    });
}
