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


function AdminUrgentHelp() {




  return (
    <div className="new">
    <Sidebar />
    <div className="newContainer">
      <Navbar />
      
      </div>
    </div>
  )
}

export default AdminUrgentHelp
