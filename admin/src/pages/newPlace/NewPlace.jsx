import React, { useState } from 'react';
import { Form, Input, Upload, Button, Row, Col, Statistic, message, Space } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';
import axios from 'axios';
import './newPlace.scss';

const NewPlace = () => {
  const [form] = Form.useForm();
  const [files, setFiles] = useState([]);

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

      const newplace = {
        ...values,
        photos: list,
      };

      console.log(newplace);


      await axios.post('/places', newplace);
      message.open({
        type: 'success',
        content: 'Place added sucessfully!',
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
    city: {
      label: "city",
      name: "city",
      rules: [{ required: true, message: "Please enter city" }],
      placeholder: "Enter city",
    },
    address: {
      label: "address",
      name: "address",
      rules: [{ required: true, message: "Please enter address" }],
      placeholder: "Enter address",
    },
    desc: {
      label: "Desc",
      name: "desc",
      rules: [{ required: true, message: "Please enter Desc" }],
      placeholder: "Enter Desc",
    },
    distance: {
      label: "distance",
      name: "distance",
      rules: [{ required: true, message: "Please enter distance" }],
      placeholder: "Enter distance",
    },
    name: {
      label: "name",
      name: "name",
      rules: [{ required: true, message: "Please enter name" }],
      placeholder: "Enter name",
    },
    title: {
      label: "title",
      name: "title",
      rules: [{ required: true, message: "Please enter title" }],
      placeholder: "Enter title",
    },
    type: {
      label: "type",
      name: "type",
      rules: [{ required: true, message: "Please enter type" }],
      placeholder: "Enter type",
    },
    type: {
      label: "type",
      name: "type",
      rules: [{ required: true, message: "Please enter type" }],
      placeholder: "Enter type",
    },
    rating: {
      label: "rating",
      name: "rating",
      rules: [{ required: true, message: "Please enter rating" }],
      placeholder: "Enter rating",
    },
    desclong: {
      label: "desclong",
      name: "desclong",
      rules: [{ required: true, message: "Please enter desclong" }],
      placeholder: "Enter desclong",
    },
    descsinhala: {
      label: "descsinhala",
      name: "descsinhala",
      rules: [{ required: true, message: "Please enter descsinhala" }],
      placeholder: "Enter descsinhala",
    },
    longitude: {
      label: "longitude",
      name: "longitude",
      rules: [{ required: true, message: "Please enter longitude" }],
      placeholder: "Enter longitude",
    },
    latitude: {
      label: "latitude",
      name: "latitude",
      rules: [{ required: true, message: "Please enter latitude" }],
      placeholder: "Enter latitude",
    },
    featured: {
      label: "Featured",
      name: "featured",
      valuePropName: "checked",
    },
  };

  return (
    <div className="new">
      <Sidebar />
      <div className="newPlaceContainer">
        <Navbar />
        <div className="bottomPlace">
          <Row>
            <Col span={8}>
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
                    src="https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                    alt=""
                  />
                )}
              </div>
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
                      <Form.Item name={field.name} rules={field.rules}>
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
            {/* ... (existing code) */}
          </Row>
        </div>
      </div>
    </div>
  );
};

export default NewPlace;

