import React, { useState, useEffect } from "react";
import StudentForm from "./StudentForm";
import StudentTable from "./StudentTable";
import { initialStudents } from "./data";
import "./App.css";

function App() {

  const [students, setStudents] = useState(initialStudents);
  const [editingStudent, setEditingStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const addStudent = (student) => {
    student.id = Date.now();
    setStudents([...students, student]);
    alert("Student Added Successfully");
  };

  const updateStudent = (updatedStudent) => {
    setStudents(
      students.map((s) =>
        s.id === updatedStudent.id ? updatedStudent : s
      )
    );
    setEditingStudent(null);
    alert("Student Updated Successfully");
  };

  const deleteStudent = (id) => {
    if (window.confirm("Delete this student?")) {
      setStudents(students.filter((s) => s.id !== id));
    }
  };

  const filteredStudents = students.filter((s) =>
    s.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container">

      <h1 className="title">Students Management System</h1>

      <div className="topBar">

        <input
          className="search"
          placeholder="Search student..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="count">
          Total Students: {filteredStudents.length}
        </div>

      </div>

      {loading ? (
        <p className="loading">Loading Students...</p>
      ) : (
        <>
          <StudentForm
            addStudent={addStudent}
            editingStudent={editingStudent}
            updateStudent={updateStudent}
            setEditingStudent={setEditingStudent}
          />

          <StudentTable
            students={filteredStudents}
            deleteStudent={deleteStudent}
            editStudent={setEditingStudent}
          />
        </>
      )}

    </div>
  );
}

export default App;