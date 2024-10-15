import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { handleerror, handleSuccess } from '../utills';
import { useLocation } from 'react-router-dom';
import { AuthContext } from '../AuthContext';
import  { useContext } from 'react';

function Home() {
  const { email } = useContext(AuthContext);

  const navigate = useNavigate();
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [products, setProducts] = useState([]);
  const location = useLocation();
  // const email = location.state?.email; 
  const handleAddPostClick = () => {
    // Navigate to the "Add Post" page
    navigate('/addpost');
  };
  const handleAllPost = () => {
    // Navigate to the "Add Post" page
    navigate('/allpost', { state: { email: email } });
  };
  useEffect(() => {
    setLoggedInUser(localStorage.getItem('loggedInUser'));

    fetchProducts();
  }, []);


  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('loggedInUser');
    handleSuccess('User Logged out');
    setTimeout(() => {
      navigate('/login ');
    }, 1000);
  };

  const fetchProducts = async () => {
    try {
      const url = 'http://localhost:8080/products';
      const headers = {
        headers: {
          'Authorization': localStorage.getItem('token'),
        },
      };
      const response = await fetch(url, headers);
      const result = await response.json();
      console.log(result);
      setProducts(result);
    } catch (error) {
      handleerror(error);
    }
  };

  console.log(email)

  return (
    <div className='bg-gray-300 min-w-full h-screen flex items-center flex-col justify-center p-3' >
      <div className='bg-blue-500 max-w-full rounded-md shadow-md'>
      <h1 className='p-4'>{loggedInUser}</h1>
      <button className='bg-red-500 px-3 rounded-lg w-lg py-1 text-white' onClick={handleLogout}>Logout</button>
      <div className='py-4 px-2 rounded-lg bg-gray-600 text-white m-4'>
        {products.length > 0 ? (
          products.map((item, index) => (
            <ul key={index}>
              <span>{item.name}: {item.price}</span>
            </ul>
          ))
        ) : (
          <p>No products available.</p>
        )}
      </div>
      
      </div>
      <div>
      {/* <button onClick={handleAddPostClick}>Add Post</button> */}
      </div>
      <h1>{email} dee</h1>
    
    <div>
      <button onClick={handleAllPost}>All Posts</button>
    </div>
    </div>
  );
}

export default Home;
