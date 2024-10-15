import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../AuthContext';
const AllPost = () => {
  const [posts, setPosts] = useState([]); // State to hold posts
  const [loading, setLoading] = useState(true); // State to handle loading
  const [error, setError] = useState(null); // State to handle errors
  const location = useLocation();
  // const userEmail = location.state?.email; 
  const { email } = useContext(AuthContext);
  useEffect(() => {
    // Fetch data from the backend when the component mounts
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/Allpost?email=${email}`); // API call
        setPosts(response.data); // Set the data into the state
      } catch (err) {
        setError(err); // Set error if there's an issue with the request
      } finally {
        setLoading(false); // Stop loading after the request completes
      }
    };

    fetchData();
  }, []); // Empty dependency array means this effect runs once when the component mounts

  if (loading) {
    return <div className="text-center text-blue-600 font-bold">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-600 text-center">Error: {error.message}</div>;
  }

  return (
    <div className="p-4 bg-gray-600 min-h-screen">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">All Posts</h1>
      <ul className="space-y-4">
        {posts.map((post) => (
          <li key={post._id} className="bg-gray-200 shadow-md rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900">{post.name}</h2>
            <p className="text-gray-900"><strong>Email: </strong>{post.email}</p>
            <p className="text-gray-900 mt-2">{post.note}</p>
          </li>
        ))}
      </ul>
    </div>

  );
};

export default AllPost;
