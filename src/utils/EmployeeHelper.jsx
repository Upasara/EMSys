import axios from 'axios';

axios;
export const fetchDepartments = async () => {
  let departments;
  try {
    const response = await axios.get('http://localhost:5000/api/department', {
      /* get request includes n authorization header with a token retirieved from localstorage,
    to ensure that only authenticated user can access the data.  */
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    if (response.data.success) {
      departments = response.data.departments;
    }
  } catch (error) {
    if (error.response && !error.response.data.success) {
      alert(error.response.data.error);
    }
  }
  return departments;
};
