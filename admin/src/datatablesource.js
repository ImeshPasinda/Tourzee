export const userColumns = [
  { field: "_id", headerName: "ID", width: 70 },
  {
    field: "user",
    headerName: "User",
    width: 230,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <img className="cellImg" src={params.row.img || "https://i.ibb.co/MBtjqXQ/no-avatar.gif"} alt="avatar" />
          {params.row.username}
        </div>
      );
    },
  },
  {
    field: "email",
    headerName: "Email",
    width: 230,
  },

  {
    field: "country",
    headerName: "Country",
    width: 100,
  },
  {
    field: "city",
    headerName: "City",
    width: 100,
  },
  {
    field: "phone",
    headerName: "Phone",
    width: 100,
  },
];

export const placeColumns = [
  { field: "_id", headerName: "ID", width: 250 },
  {
    field: "name",
    headerName: "Name",
    width: 150,
  },
  {
    field: "type",
    headerName: "Type",
    width: 100,
  },
  {
    field: "title",
    headerName: "Title",
    width: 230,
  },
  {
    field: "city",
    headerName: "City",
    width: 100,
  },
];

export const roomColumns = [
  { field: "_id", headerName: "ID", width: 70 },
  {
    field: "title",
    headerName: "Title",
    width: 230,
  },
  {
    field: "desc",
    headerName: "Description",
    width: 200,
  },
  {
    field: "price",
    headerName: "Price",
    width: 100,
  },
  {
    field: "maxPeople",
    headerName: "Max People",
    width: 100,
  },
];

export const emergencyColumns = [
  { field: "_id", headerName: "ID", width: 70 },
  {
    field: "name",
    headerName: "Facility Name",
    width: 230,
  },
  {
    field: "type",
    headerName: "Facility Type",
    width: 230,
  },
  {
    field: "city",
    headerName: "City",
    width: 100,
  },
  {
    field: "address",
    headerName: "Address",
    width: 200,
  },
  {
    field: "coordinates",
    headerName: "Coordinates",
    width: 200,
  },
  {
    field: "contactNumber",
    headerName: "Contact Number",
    width: 150,
  },
];


export const virtualTourColumns = [
  { field: "_id", headerName: "ID", width: 70 },
  {
    field: "title",
    headerName: "Title",
    width: 230,
  },
  {
    field: "description",
    headerName: "Description",
    width: 230,
  },
  {
    field: "location",
    headerName: "Location",
    width: 230,
  },
  {
    field: "latitude",
    headerName: "Latitude",
    width: 230,
  },
  {
    field: "longitude",
    headerName: "Longitude",
    width: 230,
  },
  {
    field: "photo", // Display the image in a custom way
    headerName: "Photo",
    width: 150,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <img
            className="cellImg"
            src={params.row.photo || "https://i.ibb.co/MBtjqXQ/no-image.png"} // Display a default image if no photo is available
            alt="tour"
          />
        </div>
      );
    },
  },
  {
    field: "createdAt",
    headerName: "Created At",
    width: 200,
    valueGetter: (params) => {
      // Format createdAt timestamp as needed (e.g., using date-fns or another library).
      const createdAtDate = new Date(params.row.createdAt);
      return createdAtDate.toLocaleDateString(); // Format the date as required.
    },
  },
];