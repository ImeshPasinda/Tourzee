import React, { useState } from 'react';
import { Form, Input, Upload, Button, Row, Col, InputNumber, message, Select } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';
import axios from 'axios';
import './newTrip.scss';

const NewTrip = () => {
  const [form] = Form.useForm();
  const [files, setFiles] = useState([]);

  const validateDescshort = (rule, value, callback) => {
    const wordCount = value.trim().split(/\s+/).length; // Split by whitespace to count words
    if (wordCount > 100) {
      callback("Please enter no more than 100 words for Desc");
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

      const newtrip = {
        ...values,
        photos: list,
      };

      console.log(newtrip);


      await axios.post('/trips', newtrip);
      message.open({
        type: 'success',
        content: 'Trip plan added sucessfully!',
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
    place: {
      label: "Place",
      name: "place",
      rules: [{ required: true, message: "Please enter place" }],
      placeholder: "Enter place",
    },
    budget: {
      label: "Budget",
      name: "budget",
      rules: [{ required: true, message: "Please enter budget" }],
      placeholder: "Enter budget",
    },
    descshort: {
      label: "Descripton for Search Item",
      name: "descshort",
      rules: [{ required: true, message: "Please enter short descripton" }, { validator: validateDescshort }],
      placeholder: "Enter Descripton",
    },
    distance: {
      label: "Distance",
      name: "distance",
      rules: [{ required: true, message: "Please enter distance" }],
      placeholder: "Enter distance",
    },
    tripName: {
      label: "Place Name",
      name: "tripName",
      rules: [{ required: true, message: "Please enter trip name" }],
      placeholder: "Enter trip name",
    },
    days: {
      label: "Days",
      name: "days",
      rules: [{ required: true, message: "Please enter days" }],
      placeholder: "Enter days",
    },
    rating: {
      label: "Place Ratings",
      name: "rating",
      rules: [{ required: true, message: "Please enter rating" }],
      placeholder: "Enter rating",
    },
    desclong: {
      label: "Timeline Description (English)",
      name: "desclong",
      rules: [{ required: true, message: "Please enter desclong" }],
      placeholder: "Enter desclong",
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
    routeOneTitle: {
      label: "Add first route place name",
      name: "routeOneTitle",
      rules: [{ required: true, message: "Please enter first route place name" }],
      placeholder: "Enter first route place name",
    },
    routeOne: {
      label: "Add first route place description",
      name: "routeOne",
      rules: [{ required: true, message: "Please enter first route place description" }],
      placeholder: "Enter first route place description",
    },
    routeTwoTitle: {
      label: "Add second route place name",
      name: "routeTwoTitle",
      rules: [{ required: true, message: "Please enter second route place name" }],
      placeholder: "Enter second route place name",
    },
    routeTwo: {
      label: "Add second route place description",
      name: "routeTwo",
      rules: [{ required: true, message: "Please enter second route place description" }],
      placeholder: "Enter second route place description",
    },
    routeThreeTitle: {
      label: "Add third route place name",
      name: "routeThreeTitle",
      rules: [{ required: true, message: "Please enter third route place name" }],
      placeholder: "Enter third route place name",
    },
    routeThree: {
      label: "Add third route place description",
      name: "routeThree",
      rules: [{ required: true, message: "Please enter third route place description" }],
      placeholder: "Enter third route place description",
    },
    routeFourTitle: {
      label: "Add fourth route place name",
      name: "routeFourTitle",
      rules: [{ required: true, message: "Please enter fourth route place name" }],
      placeholder: "Enter fourth route place name",
    },
    routeFour: {
      label: "Add fourth route place description",
      name: "routeFour",
      rules: [{ required: true, message: "Please enter fourth route place description" }],
      placeholder: "Enter fourth route place description",
    },
    featured: {
      label: "Featured",
      name: "featured",
      initialValue: false, // Set the initial value to false

    },
    

  };

  return (
    <div className="new">
      <Sidebar />
      <div className="newPlaceContainer">
        <Navbar />
        <div className="top">
          <h1>Add New Trip Plan</h1>
        </div>
        <div className="bottomPlace">
          <Row>
            <Col span={8}>

              <Form
                form={form}
                onFinish={onFinish}
                initialValues={{
                  featured: false,
                }}
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
                        ) : field.name === 'featured' ? (
                          <Select defaultValue={false}>
                            <Select.Option value={true}>True</Select.Option>
                            <Select.Option value={false}>False</Select.Option>
                          </Select>
                        ) : field.name === 'latitude' ? (
                          <InputNumber min={0} />
                        ) : field.name === 'longitude' ? (
                          <InputNumber min={0} />
                        ) : field.name === 'rating' ? (
                          <InputNumber min={0} max={5} />
                        ) : field.name === 'descshort' ? (
                          <Input.TextArea rows={3} />
                        ) : field.name === 'desclong' ? (
                          <Input.TextArea rows={3} />
                        ) : field.name === 'routeOne' ? (
                          <Input.TextArea rows={3} />
                        ) : field.name === 'routeTwo' ? (
                          <Input.TextArea rows={3} />
                        ) : field.name === 'routeThree' ? (
                          <Input.TextArea rows={3} />
                        ) : field.name === 'routeFour' ? (
                          <Input.TextArea rows={3} />
                        ) : field.name === 'days' ? (
                          <InputNumber min={0} />
                        ) : (
                          <Input type={field.type} placeholder={field.placeholder} />

                        )}
                      </Form.Item>
                    </div>
                  );
                })}
                <Form.Item>
                  <Button type="primary" htmlType="submit">
                    Send
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

export default NewTrip;

