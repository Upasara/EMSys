import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddDepartment = () => {
  const [department, setDepartment] = useState({
    dep_name: '',
    dep_des: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDepartment({ ...department, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        'http://localhost:5000/api/department/add',
        department,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );

      if (response.data.success) {
        navigate('/admin-dashboard/departments');
      } else {
        console.log(response);
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        alert(error.response.data.error);
      }
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white mt-10 p-8 rounded-md ">
      <h3 className="text-2xl text-center">Add Department</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="dep_name" className="text-primaryText">
            Department Name
          </label>
          <input
            type="text"
            name="dep_name"
            onChange={handleChange}
            className="mt-1 w-full p-2 border border-primaryLight rounded-md"
            required
          />
        </div>
        <div className="mt-3">
          <label htmlFor="dep_des" className="block text-primaryText">
            Description
          </label>
          <input
            type="text"
            name="dep_des"
            onChange={handleChange}
            className="mt-1 block p-2 w-full border border-primaryLight rounded-md"
          />
        </div>
        <button
          type="submit"
          className="w-full mt-6 bg-primaryDark py-2 px-4 rounded-md"
        >
          Add Department
        </button>
      </form>
    </div>
  );
};

export default AddDepartment;
