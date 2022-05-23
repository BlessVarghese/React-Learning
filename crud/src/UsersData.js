import React from 'react'
import { DataGrid } from '@mui/material/data-grid';

const UsersData = (props) => {  
  let {users} = props;
  const columns = [
  { field: 'id', headerName: 'ID', width: 125 },
  { field: 'name', headerName: 'Name', width: 370 },
  { field: 'username', headerName: 'Username', width: 370 },
  {
    field: 'email',
    headerName: 'Email',
    width: 420,
  },
];

  let rows = []
  users.forEach(user => rows.push({id: user.id, name: user.name, username: user.username, email: user.email}))

  return (
    <div style={{ height: '800px', width: '100%' }}>
     <> <h3 style={{marginLeft: "15px"}}>Users Data</h3></>
      <DataGrid 
        id={Math.random()} 
        rows={rows} 
        columns={columns} 
        pageSize={10} 
        checkboxSelection
        onRowSelected={() => {console.log('row selected')}}
        />
    </div>
  )
}

export default UsersData
