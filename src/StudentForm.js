import React, { useState, useEffect } from "react";

function StudentForm({ addStudent, editingStudent, updateStudent, setEditingStudent }) {

  const [student, setStudent] = useState({
    name: "",
    email: "",
    age: ""
  });

  useEffect(() => {
    if (editingStudent) {
      setStudent(editingStudent);
    }
  }, [editingStudent]);

  const handleChange = (e) => {
    setStudent({
      ...student,
      [e.target.name]: e.target.value
    });
  };

  const validate = () => {

    if (!student.name || !student.email || !student.age) {
      alert("All fields are required");
      return false;
    }

    const emailPattern = /\S+@\S+\.\S+/;

    if (!emailPattern.test(student.email)) {
      alert("Invalid Email");
      return false;
    }

    if (student.age < 1 || student.age > 120) {
      alert("Age must be between 1 and 120");
      return false;
    }

    return true;
  };

  const handleSubmit = (e) => {

    e.preventDefault();

    if (!validate()) return;

    if (editingStudent) {
      updateStudent(student);
    } else {
      addStudent(student);
    }

    setStudent({
      name: "",
      email: "",
      age: ""
    });

  };

  return (

    <form className="form" onSubmit={handleSubmit}>

      <input
        name="name"
        placeholder="Student Name"
        value={student.name}
        onChange={handleChange}
      />

      <input
        name="email"
        placeholder="Student Email"
        value={student.email}
        onChange={handleChange}
      />

      <input
        name="age"
        placeholder="Age"
        value={student.age}
        onChange={handleChange}
      />

      <button className="addBtn" type="submit">
        {editingStudent ? "Update" : "Add Student"}
      </button>

      {editingStudent && (
        <button
          className="cancelBtn"
          type="button"
          onClick={() => {
            setEditingStudent(null);
            setStudent({ name: "", email: "", age: "" });
          }}
        >
          Cancel
        </button>
      )}

    </form>

  );
}

export default StudentForm;