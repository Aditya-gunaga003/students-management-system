import React from "react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

function StudentTable({ students, deleteStudent, editStudent }) {

  const downloadExcel = () => {

    const worksheet = XLSX.utils.json_to_sheet(students);

    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(workbook, worksheet, "Students");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array"
    });

    const data = new Blob([excelBuffer], {
      type: "application/octet-stream"
    });

    saveAs(data, "students.xlsx");

  };

  return (

    <div>

      <button className="excelBtn" onClick={downloadExcel}>
        Download Excel
      </button>

      <table className="table">

        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Age</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>

          {students.map((student) => (

            <tr key={student.id}>

              <td>{student.name}</td>
              <td>{student.email}</td>
              <td>{student.age}</td>

              <td>

                <button
                  className="editBtn"
                  onClick={() => editStudent(student)}
                >
                  Edit
                </button>

                <button
                  className="deleteBtn"
                  onClick={() => deleteStudent(student.id)}
                >
                  Delete
                </button>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>

  );

}

export default StudentTable;