
// import React, { useEffect, useState } from 'react';
// import Sidebar from '../../components/sidebar/Sidebar';
// import Navbar from '../../components/navbar/Navbar';
// import axios from 'axios';
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   Typography,
//   TextField,
//   Button,
// } from '@mui/material';

// function AdminPostManagemnet() {
//   const [createdposts, setCreatedPosts] = useState([]);
//   const [searchQuery, setSearchQuery] = useState('');

//   useEffect(() => {
//     async function fetchData() {
//       try {
//         const response = await axios.get('http://localhost:8800/api/posts/'); // Replace with your actual API URL
//         if (response.status !== 200) {
//           throw new Error('API request failed');
//         }
//         setCreatedPosts(response.data.title);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     }
//     fetchData();
//   }, []);

//   const columns = [
//     { field: 'title', headerName: 'Title', flex: 1 },
//     { field: 'content', headerName: 'Content', flex: 1 },
//     // { field: 'postedBy', headerName: 'Creator', flex: 1 },
//     //{ field: 'timeperiod', headerName: 'Time Period', flex: 1 },
//     { field: 'delete', headerName: 'Delete', flex: 1 },
//   ];

//   const handleSearchChange = (event) => {
//     setSearchQuery(event.target.value);
//   };

// //   const handleEditClick = (tipId) => {
// //     // Implement your edit logic here
// //     console.log(`Edit button clicked for tip with ID: ${tipId}`);
// //   };

//   const handleDeleteClick = (postId) => {
//     // Implement your delete logic here
//     console.log(`Delete button clicked for tip with ID: ${postId}`);
//   };

//   const filteredPosts = createdposts.filter((post) =>
//     post.title.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   return (
//     <div className="new">
//       <Sidebar />
//       <div className="newContainer">
//         <Navbar />
//         <div className="safety-tips" style={{ marginLeft: '20px', marginRight: '20px' }}>
//           <Typography variant="h5" gutterBottom>  <br></br>
//           Post Management
//           </Typography>
//           <br></br>
//           <TextField
//             label="Search title"
//             variant="outlined"
//             onChange={handleSearchChange}
//             value={searchQuery}
//           />
//           <br></br><br></br>
//           <TableContainer component={Paper} style={{ maxWidth: '1200px' }}>
//             <Table>
//               <TableHead>
//                 <TableRow>
//                   {columns.map((column) => (
//                     <TableCell key={column.field}>{column.headerName}</TableCell>
//                   ))}
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {filteredPosts.map((post) => (
//                   <TableRow key={post._id}>
//                     {columns.map((column) => (
//                       <TableCell key={column.field}>
//                         {column.field === 'delete' ? (
//                           <Button
//                             variant="outlined"
//                             color="secondary"
//                             onClick={() => handleDeleteClick(post._id)}
//                           >
//                             Delete
//                           </Button>
//                         ) : (
//                           post[column.field]
//                         )}
//                       </TableCell>
//                     ))}
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </TableContainer>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default AdminPostManagemnet;

// import React, { useEffect, useState } from 'react';
// import Sidebar from '../../components/sidebar/Sidebar';
// import Navbar from '../../components/navbar/Navbar';
// import axios from 'axios';
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   Typography,
//   TextField,
//   Button,
// } from '@mui/material';

// function AdminPostManagement() {
//   const [createdPosts, setCreatedPosts] = useState([]);
//   const [searchQuery, setSearchQuery] = useState('');

//   useEffect(() => {
//     async function fetchData() {
//       try {
//         const response = await axios.get('http://localhost:8800/api/posts/'); // Replace with your actual API URL
//         if (response.status !== 200) {
//           throw new Error('API request failed');
//         }
//         setCreatedPosts(response.data.posts);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     }
//     fetchData();
//   }, []);

//   const columns = [
//     { field: 'title', headerName: 'Title', flex: 1 },
//     { field: 'content', headerName: 'Content', flex: 1 },
//     // { field: 'postedBy', headerName: 'Creator', flex: 1 },
//     //{ field: 'timeperiod', headerName: 'Time Period', flex: 1 },
//     { field: 'delete', headerName: 'Delete', flex: 1 },
//   ];

//   const handleSearchChange = (event) => {
//     setSearchQuery(event.target.value);
//   };

//   const handleDeleteClick = (postId) => {
//     // Implement your delete logic here
//     console.log(`Delete button clicked for post with ID: ${postId}`);
//   };

//   const filteredPosts = createdPosts.filter((post) =>
//     post.title.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   return (
//     <div className="new">
//       <Sidebar />
//       <div className="newContainer">
//         <Navbar />
//         <div className="safety-tips" style={{ marginLeft: '20px', marginRight: '20px' }}>
//           <Typography variant="h5" gutterBottom>  <br></br>
//           Post Management
//           </Typography>
//           <br></br>
//           <TextField
//             label="Search title"
//             variant="outlined"
//             onChange={handleSearchChange}
//             value={searchQuery}
//           />
//           <br></br><br></br>
//           <TableContainer component={Paper} style={{ maxWidth: '1200px' }}>
//             <Table>
//               <TableHead>
//                 <TableRow>
//                   {columns.map((column) => (
//                     <TableCell key={column.field}>{column.headerName}</TableCell>
//                   ))}
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {filteredPosts.map((post) => (
//                   <TableRow key={post._id}>
//                     {columns.map((column) => (
//                       <TableCell key={column.field}>
//                         {column.field === 'delete' ? (
//                           <Button
//                             variant="outlined"
//                             color="secondary"
//                             onClick={() => handleDeleteClick(post._id)}
//                           >
//                             Delete
//                           </Button>
//                         ) : (
//                           post[column.field]
//                         )}
//                       </TableCell>
//                     ))}
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </TableContainer>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default AdminPostManagement;
import React, { useEffect, useState } from 'react';
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';
import axios from 'axios';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  TextField,
  Button,
} from '@mui/material';

function AdminPostManagement() {
  const [createdPosts, setCreatedPosts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get('http://localhost:8800/api/posts/'); // Replace with your actual API URL
        if (response.status !== 200) {
          throw new Error('API request failed');
        }
        setCreatedPosts(response.data.posts);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    fetchData();
  }, []);

  const columns = [
    { field: 'title', headerName: 'Title', flex: 1 },
    { field: 'content', headerName: 'Content', flex: 1 },
    { field: 'delete', headerName: 'Delete', flex: 1 },
  ];

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleDeleteClick = async (postId) => {
    try {
      // Send a request to delete the post by its ID
      const response = await axios.delete(`http://localhost:8800/api/posts/${postId}`);

      if (response.status === 200) {
        // Post deleted successfully, remove it from the state
        setCreatedPosts((prevPosts) => prevPosts.filter((post) => post._id !== postId));
      } else {
        console.error('Error deleting post:', response.data);
      }
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  const filteredPosts = createdPosts.filter((post) =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="safety-tips" style={{ marginLeft: '20px', marginRight: '20px' }}>
          <Typography variant="h5" gutterBottom>
            <br></br>
            Posts Management
          </Typography>
          <br></br>
          <TextField
            label="Search title"
            variant="outlined"
            onChange={handleSearchChange}
            value={searchQuery}
          />
          <br></br>
          <br></br>
          <TableContainer component={Paper} style={{ maxWidth: '1200px' }}>
            <Table>
              <TableHead style={{
              backgroundColor: '#f0f0f0', // Set your desired background color
              fontWeight: 'bold', // Add other styles as needed
            }}>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell key={column.field}>{column.headerName}</TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredPosts.map((post) => (
                  <TableRow key={post._id}>
                    {columns.map((column) => (
                      <TableCell key={column.field}>
                        {column.field === 'delete' ? (
                          <Button
                            variant="outlined"
                            color="secondary"
                            onClick={() => handleDeleteClick(post._id)}
                          >
                            Delete
                          </Button>
                        ) : (
                          post[column.field]
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </div>
  );
}

export default AdminPostManagement;
