import React, { useContext, useState } from 'react';
import { handleSuccess, handleerror } from '../utills';
import { useLocation } from 'react-router-dom';
import { AuthContext } from '../AuthContext';

function AddPost() {

    const location = useLocation();
//   const email = location.state?.email; 
const {email} = useContext(AuthContext);
  console.log(email)

    const [formValues, setFormValues] = useState({
        name: '',
        note: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues(prevValues => ({ ...prevValues, [name]: value }));
        console.log(formValues)
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { name, note } = formValues;
    
        if (!name || !note) {
            return handleerror('All fields are required, including the image.');
        }
        try {
            const response = await fetch('http://localhost:8080/addPost', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ ...formValues, email }),  // Combine formValues and email
            });
    
            const data = await response.json();
    
            if (response.ok) {
                console.log('Success:', data.message);
                handleSuccess("Data Added successfully");
            } else {
                console.log('Error:', data.error);
                handleerror(data.error);
            }
        } catch (error) {
            console.error('Error:', error);
            handleerror('An unexpected error occurred.');
        }
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
                        value={formValues.name}
                        onChange={handleChange}
                        placeholder='Enter your name'
                        required
                    />
                </div>
                <div className='py-4 rounded-md'>
                    <textarea
                        className="bg-white text-black rounded-md"
                        name="note"
                        value={formValues.note}
                        onChange={handleChange}
                        placeholder='Enter your note'
                        required
                    />
                </div>
                <div>
                    <button className='bg-blue-500 rounded-md text-white shadow-md p-3' type="submit">Submit Details</button>
                </div>
            </form>

        </div>
    )
}

export default AddPost;
