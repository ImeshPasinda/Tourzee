import React, { useState } from 'react';
import { Form, Input, Upload, Button, Row, Col, InputNumber, message, Select } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';
import axios from 'axios';
import './newVirtualTour.scss';

const NewVirtualTour = () => {
  const [form] = Form.useForm();
  const [files, setFiles] = useState([]);

  const validateDescription = (rule, value, callback) => {
    const wordCount = value.trim().split(/\s+/).length; // Split by whitespace to count words
    if (wordCount > 100) {
      callback("Please enter no more than 100 words for Description");
    } else {
      callback();
    }
  };

  const onFinish = async (values) => {
    try {
      const list = await Promise.all(
        files.map(async (file) => {
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

      const newvirtualtour = {
        ...values,
        photos: list,
      };

      console.log(newvirtualtour);


      await axios.post('/virtualTour', newvirtualtour);
      message.open({
        type: 'success',
        content: 'Virtual Tour added sucessfully!',
      });
    } catch (err) {
      console.error(err);
      message.open({
        type: 'error',
        content: 'Error',
      });
    }
  };

  const formFields = {
    photos: {
      label: 'Image',
      name: 'photos',
      rules: [{ required: true, message: 'Please upload an image' }],

    },
    title: {
      label: "Title",
      name: "title",
      rules: [{ required: true, message: "Please enter title" }],
      placeholder: "Enter title",
    },
    description: {
      label: "Description",
      name: "description",
      rules: [{ required: true, message: "Please enter description" }, { validator: validateDescription }],
      placeholder: "Enter description",
    },
    location: {
      label: "Location",
      name: "location",
      rules: [{ required: true, message: "Please enter location" }],
      placeholder: "Enter location",
    },
    longitude: {
      label: "Longitude",
      name: "longitude",
      rules: [{ required: true, message: "Please enter longitude" }],
      placeholder: "Enter longitude",

    },
    latitude: {
      label: "Latitude",
      name: "latitude",
      rules: [{ required: true, message: "Please enter latitude" }],
      placeholder: "Enter latitude",

    },
    

  };

  return (
    <div className="new">
      <Sidebar />
      <div className="newVirtualTourContainer">
        <Navbar />
        <div className="top">
          <h1>Add New Virtual Tour</h1>
        </div>
        <div className="bottomPlace">
          <Row>
            <Col span={8}>

              <Form
                form={form}
                onFinish={onFinish}
                style={{ paddingLeft: '30px', width: '300px' }}
              >
                {Object.keys(formFields).map((fieldName) => {
                  const field = formFields[fieldName];
                  return (
                    <div className="formInput" key={fieldName}>
                      <label>{field.label}</label>
                      <Form.Item name={field.name} rules={field.rules} >
                        {field.name === 'photos' ? (
                          <div className="custom-file-input">
                            <input
                              type="file"
                              onChange={(e) => {
                                const selectedFiles = e.target.files;
                                setFiles([...selectedFiles]);
                              }}
                              multiple
                            />
                            <label for="file-upload">Choose Files</label>
                          </div>
                        ) : field.uploadProps ? (
                          <Upload {...field.uploadProps}>
                            <Button icon={<UploadOutlined />}>Upload</Button>
                          </Upload>
                        ) : field.name === 'latitude' ? (
                          <InputNumber min={0} />
                        ) : field.name === 'longitude' ? (
                          <InputNumber min={0} />
                        ) : field.name === 'description' ? (
                          <Input.TextArea rows={3} />
                        ) : (
                          <Input type={field.type} placeholder={field.placeholder} />

                        )}
                      </Form.Item>
                    </div>
                  );
                })}
                <Form.Item>
                  <Button type="primary" htmlType="submit">
                    Add
                  </Button>
                </Form.Item>
              </Form>
            </Col>
            <div className="left">
              {files.map((file, index) => (
                <img
                  key={index}
                  src={URL.createObjectURL(file)}
                  alt={`Image ${index + 1}`}
                />
              ))}
              {files.length === 0 && (
                <img
                  src="https://static.vecteezy.com/system/resources/previews/004/141/669/non_2x/no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-coming-soon-sign-simple-nature-silhouette-in-frame-isolated-illustration-vector.jpg"
                  alt=""
                />
              )}
            </div>
          </Row>
        </div>
      </div>
    </div>
  );
};

export default NewVirtualTour;

