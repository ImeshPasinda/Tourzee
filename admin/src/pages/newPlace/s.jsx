import React, { useState } from 'react';
import { Form, Input, Upload, Button, Row, Col, Statistic, message, Space } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
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
                          <input
                            type="file"
                            onChange={(e) => {
                              const selectedFiles = e.target.files;
                              setFiles([...selectedFiles]);
                            }}
                            multiple
                          />
                        ) : field.uploadProps ? (
                          <Upload {...field.uploadProps}>
                            <div>
                              <PlusOutlined />
                              <div style={{ marginTop: 8 }}>Upload</div>
                            </div>
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
            <Col span={8} offset={8}>
              <Row gutter={16}>
                <Col span={12}>
                  <Statistic title="Active Users" value={112893} />
                </Col>
                <Col span={12}>
                  <Statistic title="Account Balance (CNY)" value={112893} precision={2} />
                  <Button style={{ marginTop: 16 }} type="primary">
                    Recharge
                  </Button>
                </Col>
                <Col span={12}>
                  <Statistic title="Active Users" value={112893} loading />
                </Col>
              </Row>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
};

export default NewPlace;


import "./newPlace.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";
import { placeInputs } from "../../formSource";
import useFetch from "../../hooks/useFetch";
import axios from "axios";

const NewPlace = () => {
  const [files, setFiles] = useState("");
  const [info, setInfo] = useState({});
  const [rooms, setRooms] = useState([]);

  const { data, loading, error } = useFetch("/rooms");

  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSelect = (e) => {
    const value = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setRooms(value);
  };
  
  console.log(files)

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const list = await Promise.all(
        Object.values(files).map(async (file) => {
          const data = new FormData();
          data.append("file", file);
          data.append("upload_preset", "upload");
          const uploadRes = await axios.post(
            "https://api.cloudinary.com/v1_1/dzag4jrlo/image/upload",
            data
          );

          const { url } = uploadRes.data;
          return url;
        })
      );

      const newplace = {
        ...info,
        rooms,
        photos: list,
      };

      await axios.post("/places", newplace);
    } catch (err) {console.log(err)}
  };
  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>Add New Product</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <img
              src={
                files
                  ? URL.createObjectURL(files[0])
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt=""
            />
          </div>
          <div className="right">
            <form>
              <div className="formInput">
                <label htmlFor="file">
                  Image: <DriveFolderUploadOutlinedIcon className="icon" />
                </label>
                <input
                  type="file"
                  id="file"
                  multiple
                  onChange={(e) => setFiles(e.target.files)}
                  style={{ display: "none" }}
                />
              </div>

              {placeInputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input
                    id={input.id}
                    onChange={handleChange}
                    type={input.type}
                    placeholder={input.placeholder}
                  />
                </div>
              ))}
              <div className="formInput">
                <label>Featured</label>
                <select id="featured" onChange={handleChange}>
                  <option value={false}>No</option>
                  <option value={true}>Yes</option>
                </select>
              </div>
              <div className="selectRooms">
                <label>Rooms</label>
                <select id="rooms" multiple onChange={handleSelect}>
                  {loading
                    ? "loading"
                    : data &&
                      data.map((room) => (
                        <option key={room._id} value={room._id}>
                          {room.title}
                        </option>
                      ))}
                </select>
              </div>
              <button onClick={handleClick}>Send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewPlace;