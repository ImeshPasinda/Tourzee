import { Box, Button, TextField, Typography } from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Dropzone from 'react-dropzone';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'react-quill/dist/quill.snow.css';
import { sanitize } from 'dompurify'; // Import dompurify for HTML sanitization
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";

const validationSchema = yup.object({
    title: yup
        .string('Add a post title')
        .min(4, 'Post title should have a minimum of 4 characters')
        .required('Post title is required'),
    content: yup
        .string('Add text content')
        .min(10, 'Text content should have a minimum of 10 characters')
        .required('Text content is required'),
});

const CreatePost = () => {



    const { user } = useContext(AuthContext);


    



    const {
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
        setFieldValue
    } = useFormik({
        initialValues: {
            title: '',
            content: '',
            photos: [], // Initialize the 'photos' array
        },
        validationSchema: validationSchema,
        onSubmit: async (values, actions) => {
            try {
                // Sanitize the rich text content to remove HTML tags
                const sanitizedContent = sanitize(values.content);

                // console.log('Submit values:', values);
        
                // Update the 'content' field with sanitized content
                values.content = sanitizedContent;
        
                // Upload images to Cloudinary and get their URLs
                const photoUrls = await uploadToCloudinary(values.photos);
        
                // Update the 'photos' field with the image URLs
                values.photos = photoUrls;
        
                // Include user information in the post data
                values.username = user.username;
                values.email = user.email;
        
                // Save the post data (including image URLs and user information) to the server
                await savePostData(values);
        
                toast.success('Post created');
                actions.resetForm();
            } catch (error) {
                console.error(error);
                toast.error(error);
            }
        },
        
    });

    const uploadToCloudinary = async (photos) => {
        try {
            const photoUrls = await Promise.all(
                photos.map(async (file) => {
                    const data = new FormData();
                    data.append('file', file);
                    data.append('upload_preset', 'upload');
                    const uploadRes = await axios.post(
                        'https://api.cloudinary.com/v1_1/dzag4jrlo/image/upload',
                        data
                    );
                    const { url } = uploadRes.data;
                    return url;
                })
            );
            return photoUrls;
        } catch (error) {
            console.error(error);
            toast.error(error);
            throw error;
        }
    };

    const savePostData = async (postData) => {
        try {
            console.log(postData)
            postData.username = user.username;
            postData.email = user.email;
            // Send a POST request to save the post data to the server
            const response = await axios.post('/posts', postData);
            // Handle the response as needed
            console.log('Server response:', response.data);
        } catch (error) {
            console.error(error);
            throw error;
        }
    };

    return (
        <>
            <Box sx={{ bgcolor: "white", padding: "20px 200px" }}>
                <Typography variant='h5' sx={{ pb: 4 }}> Create post </Typography>
                <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                    <TextField
                        fullWidth
                        id="title"
                        label="Post title"
                        name="title"
                        InputLabelProps={{
                            shrink: true,
                            // style: { fontSize: '16px' },
                        }}
                        placeholder="Post title"
                        value={values.title}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.title && Boolean(errors.title)}
                        helperText={touched.title && errors.title}
                    />
                    <br />
                    <br />
                    <br />

                    <TextField
                        fullWidth
                        id="content"
                        label="Text content"
                        name="content"
                        multiline
                        rows={4}
                        InputLabelProps={{
                            shrink: true,
                            style: { fontSize: '16px' },
                        }}
                        placeholder="Write the post content..."
                        value={values.content}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.content && Boolean(errors.content)}
                        helperText={touched.content && errors.content}
                    />
                    <br />
                    <br />
                    <Box border="2px dashed blue" sx={{ p: 1 }}>
                        <Dropzone
                            acceptedFiles=".jpg,.jpeg,.png"
                            multiple={true} // Allow multiple image uploads
                            onDrop={(acceptedFiles) => {
                                // Set the 'photos' field with the selected images
                                setFieldValue('photos', acceptedFiles);
                            }}
                        >
                            {({ getRootProps, getInputProps, isDragActive }) => (
                                <Box
                                    {...getRootProps()}
                                    p="1rem"
                                    sx={{
                                        "&:hover": { cursor: "pointer" },
                                        bgcolor: isDragActive ? "#cceffc" : "#fafafa",
                                    }}
                                >
                                    <input name="photos" {...getInputProps()} />
                                    {isDragActive ? (
                                        <>
                                            <p style={{ textAlign: "center" }}>
                                                <CloudUploadIcon sx={{ color: "primary.main", mr: 2 }} />
                                            </p>
                                            <p style={{ textAlign: "center", fontSize: "12px" }}>
                                                Drop images here!
                                            </p>
                                        </>
                                    ) : values.photos.length === 0 ? (
                                        <>
                                            <p style={{ textAlign: "center" }}>
                                                <CloudUploadIcon sx={{ color: "primary.main", mr: 2 }} />
                                            </p>
                                            <p style={{ textAlign: "center", fontSize: "12px" }}>
                                                Drag and Drop images here or click to choose
                                            </p>
                                        </>
                                    ) : (
                                        <>
                                            <Box
                                                sx={{
                                                    display: "flex",
                                                    flexWrap: "wrap",
                                                    justifyContent: "center",
                                                }}
                                            >
                                                {values.photos.map((file, index) => (
                                                    <Box key={index} sx={{ mx: 1, my: 1 }}>
                                                        <img
                                                            style={{ maxWidth: "100px", maxHeight: "100px" }}
                                                            src={URL.createObjectURL(file)}
                                                            alt={`Image ${index}`}
                                                        />
                                                    </Box>
                                                ))}
                                            </Box>
                                        </>
                                    )}
                                </Box>
                            )}
                        </Dropzone>
                    </Box>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        elevation={0}
                        sx={{ mt: 3, p: 1, mb: 2, borderRadius: "25px" }}
                    >
                        Create post
                    </Button>
                </Box>
            </Box>
        </>
    );
}

export default CreatePost;
