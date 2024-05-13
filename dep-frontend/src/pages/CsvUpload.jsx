import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const CsvUpload = () => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = () => {

    if (!file) {
      setMessage('Please select a file.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    axios.post("/api/addusercsv", formData)
      .then(response => {
        toast.success(response.data);
      })
      .catch(error => {
        toast.error('Error uploading file.');
        console.error('Upload error:', error);
      });
  };

  return (
    
    <div className="mt-8 max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
  <h2 className="text-xl font-semibold mb-4">Upload CSV File to add users <span className="text-red-500">*</span></h2>
  <div className="mb-4">
    <p className="text-sm text-gray-500 max-w-sm">Format for the information should be: firstName, lastName, emailId, hometown, designation, payLevel, roleId, dateOfJoining(yyyy-mm-dd), department</p>
  </div>
  <input type="file" accept=".csv,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" onChange={handleFileChange} className="mb-4" />
  <button onClick={handleUpload} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
    Upload
  </button>
  {message && <p className="text-sm text-gray-500 mt-2">{message}</p>}
</div>


  );
};

export default CsvUpload;
