import React, { useState } from "react";
import Header from "../../../components/Header/Header";
import Sidebar from "../../../components/Sidebar/Sidebar";

import "./AdminStaff.css";


const AdminStaff = () => {

  const [employees, setEmployees] = useState([
    { id: 1, name: "Thu Trang" },
    { id: 2, name: "Mai Khanh" },
    { id: 3, name: "Ngọc Ánh" },
  ]);

  const [editIndex, setEditIndex] = useState(null);
  const [newName, setNewName] = useState('');

  const handleEdit = (index) => {
    setEditIndex(index);
    setNewName(employees[index].name);
  };

  const handleSave = (index) => {
    const updatedEmployees = [...employees];
    updatedEmployees[index].name = newName;
    setEmployees(updatedEmployees);
    setEditIndex(null);
    setNewName('');
  };

  const handleDelete = (index) => {
    const updatedEmployees = employees.filter((_, i) => i !== index);
    setEmployees(updatedEmployees);
  };

  const handleAddEmployee = () => {
    const newEmployee = { id: employees.length + 1, name: `Nhân viên ${employees.length + 1}` };
    setEmployees([...employees, newEmployee]);
  };


  return (

    <div className="admin-staff">
      <Header />
      <Sidebar />
      <main>
        <h2>Danh sách nhân viên</h2>

        <button className="add-employee-btn" onClick={handleAddEmployee}>Thêm tài khoản nhân viên</button>
        <div className="employee-container">
          {employees.map((employee, index) => (
            <div className="employee-item" key={employee.id}>
              {editIndex === index ? (
                <>
                  <input
                    type="text"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    className="input-edit"
                  />
                  <button className="save-btn" onClick={() => handleSave(index)}><svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 35 35" fill="none">
                    <path d="M10.1172 28.9844V21.6016C10.1172 20.6955 10.8517 19.9609 11.7578 19.9609H23.2422C24.1483 19.9609 24.8828 20.6955 24.8828 21.6016V29.8047M24.8828 6.01563V9.29688C24.8828 10.203 24.1483 10.9375 23.2422 10.9375L11.7578 10.9375C10.8517 10.9375 10.1172 10.203 10.1172 9.29687L10.1172 4.375M29.8012 10.1137L24.8863 5.19877C24.3588 4.67132 23.6435 4.375 22.8975 4.375H7.1875C5.63418 4.375 4.375 5.63418 4.375 7.1875V27.8125C4.375 29.3658 5.63418 30.625 7.1875 30.625H27.8125C29.3658 30.625 30.625 29.3658 30.625 27.8125V12.1025C30.625 11.3565 30.3287 10.6412 29.8012 10.1137Z" stroke="black" strokeWidth="2" strokeLinecap="round" />
                  </svg></button>
                </>
              ) : (
                <>
                  <span className="employee-name">{employee.name}</span>
                  <div className="btn-container">
                    <button className="edit-btn" onClick={() => handleEdit(index)}><svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" fill="none">
                      <path d="M14 25.9001H25.2M17.5 5.60005L22.4 9.80005M4.90005 18.2001L18.7033 3.91471C20.1895 2.4285 22.5992 2.42849 24.0854 3.91471C25.5716 5.40093 25.5716 7.81056 24.0854 9.29678L9.80005 23.1001L2.80005 25.2001L4.90005 18.2001Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg></button>
                    <button className="delete-btn" onClick={() => handleDelete(index)}>✖</button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default AdminStaff;