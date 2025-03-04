// import React, { useContext, useState } from 'react';
// import { handleSuccess, handleerror } from '../utills';
// import { useLocation } from 'react-router-dom';
// import { AuthContext } from '../AuthContext';

// function AddPost() {

//     const location = useLocation();
// //   const email = location.state?.email; 
// const {email} = useContext(AuthContext);
//   console.log(email)

//     const [formValues, setFormValues] = useState({
//         name: '',
//         note: '',
//     });

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormValues(prevValues => ({ ...prevValues, [name]: value }));
//         console.log(formValues)
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         const { name, note } = formValues;
    
//         if (!name || !note) {
//             return handleerror('All fields are required, including the image.');
//         }
//         try {
//             const response = await fetch('http://localhost:8080/addPost', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({ ...formValues, email }),  // Combine formValues and email
//             });
    
//             const data = await response.json();
    
//             if (response.ok) {
//                 console.log('Success:', data.message);
//                 handleSuccess("Data Added successfully");
//             } else {
//                 console.log('Error:', data.error);
//                 handleerror(data.error);
//             }
//         } catch (error) {
//             console.error('Error:', error);
//             handleerror('An unexpected error occurred.');
//         }
//     };
    

//     return (
//         <div className='container bg-gray-300 min-w-full h-screen flex items-center justify-center'>
//             <form onSubmit={handleSubmit} className="bg-gray-600 p-8 shadow-md w-full max-w-sm rounded-md">
//                 <div>
//                     <label className="block text-sm font-medium text-white mb-1" htmlFor="name">Your Name </label>
//                     <input
//                         className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-400'
//                         type="text"
//                         id="name"
//                         name="name"
//                         value={formValues.name}
//                         onChange={handleChange}
//                         placeholder='Enter your name'
//                         required
//                     />
//                 </div>
//                 <div className='py-4 rounded-md'>
//                     <textarea
//                         className="bg-white text-black rounded-md"
//                         name="note"
//                         value={formValues.note}
//                         onChange={handleChange}
//                         placeholder='Enter your note'
//                         required
//                     />
//                 </div>
//                 <div>
//                     <button className='bg-blue-500 rounded-md text-white shadow-md p-3' type="submit">Submit Details</button>
//                 </div>
//             </form>

//         </div>
//     )
// }

// export default AddPost;







// ** for cheack cloudinary 1st?




// import React, { useContext, useState } from 'react';
// import { handleSuccess, handleerror } from '../utills';
// import { useLocation } from 'react-router-dom';
// import { AuthContext } from '../AuthContext';
// import axios from 'axios';

// function AddPost() {

//     const location = useLocation();
//     const { email } = useContext(AuthContext);
//     const [formValues, setFormValues] = useState({
//         name: '',
//         note: '',
//         image: null, // To hold the selected image file
//     });
//     const [imageUrl, setImageUrl] = useState(null); // To store the uploaded image URL

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormValues(prevValues => ({ ...prevValues, [name]: value }));
//     };

//     const handleImageChange = (e) => {
//         setFormValues(prevValues => ({
//             ...prevValues,
//             image: e.target.files[0], // Update image in state
//         }));
//     };

//     const uploadImageToCloudinary = async (file) => {
//         const formData = new FormData();
//         formData.append('file', file);
//         formData.append('upload_preset', 'mytodo'); // Replace with your Cloudinary upload preset
//         formData.append('folder', `user_${email}`); // Upload to a folder specific to the user

//         try {
//             const response = await axios.post('https://api.cloudinary.com/v1_1/dzipucmjc/image/upload', formData);
//             return response.data.secure_url; // Return the image URL
//         } catch (error) {
//             console.error('Error uploading image:', error);
//             throw new Error('Failed to upload image.');
//         }
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         const { name, note, image } = formValues;
    
//         if (!name || !note || !image) {
//             return handleerror('All fields are required, including the image.');
//         }

//         try {
//             // Upload the image to Cloudinary and get the image URL
//             const uploadedImageUrl = await uploadImageToCloudinary(image);

//             // After successfully uploading the image, include the URL in your request body
//             const response = await fetch('http://localhost:8080/addPost', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({
//                     name,
//                     note,
//                     email,
//                     imageUrl: uploadedImageUrl, // Send image URL to the server
//                 }),
//             });
    
//             const data = await response.json();
    
//             if (response.ok) {
//                 console.log('Success:', data.message);
//                 handleSuccess("Data added successfully.");
//             } else {
//                 console.log('Error:', data.error);
//                 handleerror(data.error);
//             }
//         } catch (error) {
//             console.error('Error:', error);
//             handleerror('An unexpected error occurred.');
//         }
//     };

//     return (
//         <div className='container bg-gray-300 min-w-full h-screen flex items-center justify-center'>
//             <form onSubmit={handleSubmit} className="bg-gray-600 p-8 shadow-md w-full max-w-sm rounded-md">
//                 <div>
//                     <label className="block text-sm font-medium text-white mb-1" htmlFor="name">Your Name </label>
//                     <input
//                         className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-400'
//                         type="text"
//                         id="name"
//                         name="name"
//                         value={formValues.name}
//                         onChange={handleChange}
//                         placeholder='Enter your name'
//                         required
//                     />
//                 </div>
//                 <div className='py-4'>
//                     <textarea
//                         className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none"
//                         name="note"
//                         value={formValues.note}
//                         onChange={handleChange}
//                         placeholder='Enter your note'
//                         required
//                     />
//                 </div>
//                 <div className='py-4'>
//                     <label className="block text-sm font-medium text-white mb-1" htmlFor="image">Upload Image</label>
//                     <input
//                         className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-400'
//                         type="file"
//                         id="image"
//                         name="image"
//                         onChange={handleImageChange}
//                         required
//                     />
//                 </div>
//                 <div>
//                     <button className='bg-blue-500 rounded-md text-white shadow-md p-3' type="submit">Submit Details</button>
//                 </div>
//             </form>
//         </div>
//     );
// }

// export default AddPost;





// ** 2nd try to cheak the code?

import React, { useContext, useState } from 'react';
import { handleSuccess, handleerror } from '../utills'; // Corrected import path
import { useLocation } from 'react-router-dom';
import { AuthContext } from '../AuthContext';
import { FadeLoader } from 'react-spinners';
import axios from 'axios';

function AddPost() {
    const location = useLocation();
    const { email } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const [formValues, setFormValues] = useState({
        name: '',
        note: '',
        image: null, // To hold the selected image file
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues(prevValues => ({ ...prevValues, [name]: value }));
    };

    const handleImageChange = (e) => {
        setFormValues(prevValues => ({
            ...prevValues,
            image: e.target.files[0], // Update image in state
        }));
    };

    const uploadImageToCloudinary = async (file) => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', 'mytodo'); // Replace with your Cloudinary upload preset
        formData.append('folder', `user_${email}`); // Upload to a folder specific to the user

        try {
            const response = await axios.post('https://api.cloudinary.com/v1_1/dzipucmjc/image/upload', formData);
            return response.data.secure_url; // Return the image URL
        } catch (error) {
            console.error('Error uploading image:', error);
            throw new Error('Failed to upload image.');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { name, note, image } = formValues;

        if (!name || !note || !image) {
            return handleerror('All fields are required, including the image.');
        }

        setLoading(true);  // Set loading true before starting the process

        try {
            // Upload the image to Cloudinary and get the image URL
            const uploadedImageUrl = await uploadImageToCloudinary(image);

            // After successfully uploading the image, include the URL in your request body
            const response = await fetch('http://localhost:8080/addPost', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name,
                    note,
                    email,
                    imageUrl: uploadedImageUrl, // Send image URL to the server
                }),
            });

            const data = await response.json();

            if (response.ok) {
                console.log('Success:', data.message);
                handleSuccess("Data added successfully.");
                // Optionally, reset form after successful submission
                setFormValues({
                    name: '',
                    note: '',
                    image: null,
                });
                // Optionally, reset the file input value
                document.getElementById('image').value = null;
            } else {
                console.log('Error:', data.error);
                handleerror(data.error);
            }
        } catch (error) {
            console.error('Error:', error);
            handleerror('An unexpected error occurred.');
        } finally {
            setLoading(false);  // Stop loading once the process is done
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
                <div className='py-4'>
                    <label className="block text-sm font-medium text-white mb-1" htmlFor="note">Your Note</label>
                    <textarea
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none"
                        name="note"
                        id="note"
                        value={formValues.note}
                        onChange={handleChange}
                        placeholder='Enter your note'
                        required
                        rows="4"
                    />
                </div>
                <div className='py-4'>
                    <label className="block text-sm font-medium text-white mb-1" htmlFor="image">Upload Image</label>
                    <input
                        className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-400'
                        type="file"
                        id="image"
                        name="image"
                        accept="image/*" // Optional: Restrict to image files
                        onChange={handleImageChange}
                        required
                    />
                </div>
                <div>
                    <button
                        className=' hover:bg-blue-600 rounded-md text-white shadow-md p-3 transition duration-200'
                        type="submit"
                    >
                        {loading ? <FadeLoader size={20} color="#fff" /> : 'Submit'}
                    </button>
                </div>
            </form>
        </div>
    );
}

export default AddPost;
