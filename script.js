
const studentForm = document.getElementById("studentForm");
const studentTable = document.getElementById("studentTable");
const searchInput = document.getElementById("searchInput");

const totalStudents = document.getElementById("totalStudents");
const totalCourses = document.getElementById("totalCourses");
const showingStudents = document.getElementById("showingStudents");

const editId = document.getElementById("editId");
const submitBtn = document.getElementById("submitBtn");
const cancelBtn = document.getElementById("cancelBtn");
const formTitle = document.getElementById("formTitle");
const message = document.getElementById("message");
const emptyMessage = document.getElementById("emptyMessage");

let students = [];

try {
    const savedStudents = JSON.parse(
        localStorage.getItem("students")
    );

    if (Array.isArray(savedStudents)) {
        students = savedStudents;
    }
} catch (error) {
    console.error("Could not load student records:", error);
}

function saveStudents() {
    localStorage.setItem("students", JSON.stringify(students));
}

function showMessage(text) {
    message.textContent = text;

    setTimeout(() => {
        message.textContent = "";
    }, 3000);
}

function updateDashboard() {
    totalStudents.textContent = students.length;

    const courses = new Set(
        students.map(student => student.course)
    );

    totalCourses.textContent = courses.size;
}

function renderStudents(list = students) {
    studentTable.replaceChildren();

    showingStudents.textContent = list.length;

    emptyMessage.hidden = list.length !== 0;

    list.forEach((student, index) => {
        const row = document.createElement("tr");

        const values = [
            index + 1,
            student.name,
            student.email,
            student.phone,
            student.course
        ];

        values.forEach(value => {
            const cell = document.createElement("td");
            cell.textContent = value;
            row.appendChild(cell);
        });

        const actions = document.createElement("td");

        const editButton = document.createElement("button");
        editButton.textContent = "Edit";
        editButton.className = "edit-btn";
        editButton.addEventListener("click", () => {
            editStudent(student.id);
        });

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.className = "delete-btn";
        deleteButton.addEventListener("click", () => {
            deleteStudent(student.id);
        });

        actions.append(editButton, deleteButton);
        row.appendChild(actions);

        studentTable.appendChild(row);
    });
}

studentForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const student = {
        id: editId.value || crypto.randomUUID(),
        name: document.getElementById("name").value.trim(),
        email: document.getElementById("email").value.trim(),
        phone: document.getElementById("phone").value.trim(),
        course: document.getElementById("course").value
    };

    if (!student.name || !student.email ||
        !student.phone || !student.course) {
        showMessage("Please fill in all fields.");
        return;
    }

    const duplicateEmail = students.some(existing =>
        existing.email.toLowerCase() === student.email.toLowerCase()
        && existing.id !== student.id
    );

    if (duplicateEmail) {
        showMessage("This email is already registered.");
        return;
    }

    if (editId.value) {
        students = students.map(existing =>
            existing.id === student.id ? student : existing
        );

        showMessage("Student updated successfully!");
    } else {
        students.push(student);
        showMessage("Student added successfully!");
    }

    saveStudents();
    studentForm.reset();
    resetEditMode();
    updateDashboard();
    renderStudents();
});

function editStudent(id) {
    const student = students.find(item => item.id === id);

    if (!student) return;

    editId.value = student.id;
    document.getElementById("name").value = student.name;
    document.getElementById("email").value = student.email;
    document.getElementById("phone").value = student.phone;
    document.getElementById("course").value = student.course;

    formTitle.textContent = "Edit Student";
    submitBtn.textContent = "Update Student";
    cancelBtn.hidden = false;

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}

function resetEditMode() {
    editId.value = "";
    formTitle.textContent = "Add New Student";
    submitBtn.textContent = "Add Student";
    cancelBtn.hidden = true;
}

cancelBtn.addEventListener("click", function() {
    studentForm.reset();
    resetEditMode();
});

function deleteStudent(id) {
    const confirmed = confirm(
        "Are you sure you want to delete this student?"
    );

    if (!confirmed) return;

    students = students.filter(student => student.id !== id);

    saveStudents();
    updateDashboard();
    renderStudents();

    showMessage("Student deleted successfully!");
}

searchInput.addEventListener("input", function() {
    const query = searchInput.value.toLowerCase().trim();

    const filteredStudents = students.filter(student =>
        student.name.toLowerCase().includes(query) ||
        student.email.toLowerCase().includes(query) ||
        student.course.toLowerCase().includes(query) ||
        student.phone.toLowerCase().includes(query)
    );

    renderStudents(filteredStudents);
});

// Load application data when website starts
updateDashboard();
renderStudents();

