import React from 'react'
import { useState } from 'react';

function AddPost() {

    const [formValues, setFormValues] = useState({
        name: '',
        file: null,
        note: ''
      });
    
      // Handle input changes
      const handleChange = (e) => {
        const { name, value, type, files } = e.target;
        if (type === "file") {
          setFormValues({
            ...formValues,
            [name]: files[0], // Store the file
          });
        } else {
          setFormValues({
            ...formValues,
            [name]: value, // Store the text input or textarea value
          });
        }
      };
    
      // Handle form submission
      const handleSubmit = (e) => {
        e.preventDefault(); // Prevent the default form submission
        console.log(formValues); // Log the form values object
      };
  return (
    <div className='container bg-gray-300 min-w-full h-screen flex items-center justify-center'>
      <form onSubmit={handleSubmit} className="bg-gray-600 p-8 shadow-md w-full max-w-sm rounded-md">
      <div>
        <label className="block text-sm font-medium text-white mb-1" htmlFor="name">Your Name </label>
        <input
        className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-400'
          type="text"
          id="name"
          name="name"
          onChange={handleChange}
          placeholder='Enter your name'
          required
        />
      </div>
      <div className="App">
        <h2 className="block text-sm font-medium text-white mb-1">Add Image :</h2>
        <input
        className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 bg-white'
          type="file"
          name="file"
          onChange={handleChange}
          required
        />
      </div>
      <div className='py-4 rounded-md'>
        <textarea
        className="bg-white text-black rounded-md"
          name="note"
          value={formValues.note}
          onChange={handleChange}
          placeholder="Enter your note"
        />
      </div>
      <div>
        <button className='bg-blue-500 rounded-md text-white shadow-md p-3' type="submit">Submit Details</button>
      </div>
    </form>
    </div>
  )
}

export default AddPost
