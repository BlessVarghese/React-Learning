import React from 'react'
import { useState } from "react";
import { DataGrid } from '@mui/material/data-grid';
import { Button } from '@mui/material/';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import DeleteIcon from "@mui/icons-material/Delete";
import axios from 'axios';
import Edit from "./Edit";


const PostsData = (props) => {
  let {users} = props;
  const [open, setOpen] = React.useState(false);
  const [title, setTitle] = useState("")
  const [userId, setUserId] = useState("")
  const [body, setBody] = useState("")
  const [formData, setFormData] = useState({});
 
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const titleChange = (event)=> {
    setTitle(event.target.value);
  } 
 
  const userIdChange = (event)=> {
    setUserId(event.target.value);
  } 

  const bodyChange = (event)=> {
    setBody(event.target.value);
  } 

  
  const createPost = (event) => {
    axios
      .post("https://jsonplaceholder.typicode.com/posts", {
        title: title,
        userId: userId,
        body: body
      })

      .then((response) => {
        console.log('Posted',response); 
      })

      .catch((error)=>{
        console.log(error);
      })
  }


  const deletePost = (id, userId) => {
    // event.preventDefault();
    console.log(id,userId, " id" )
    axios
      .delete (`https://jsonplaceholder.typicode.com/posts/${id}`)

      .then((response) => {
        console.log('Deleted', response); 
      })

      .catch((error)=>{
        console.log(error);
      })
  }

  const columns = [
  { field: 'userId', headerName: 'USER NAME', width: 100 },
  { field: 'id', headerName: 'POST ID', width: 100 },
  { field: 'title', headerName: 'TITLE', width: 450 },
  {
    field: 'body',
    headerName: 'BODY',
    width: 450,
  },
  {
    field: "EDIT",
    renderCell: (cellValues) => {
      return (
        <Button
          variant="contained"
          color="primary"
		  onClick={()=>{
			//   setFormData(cellValues["row"])
          }}
        >
          EDIT
        </Button>
      );
    }
  },

  {
    field: "DELETE",
    renderCell: (cellValues) => {
      return (
        <Button
          variant="contained"
          color="secondary"
          onClick={() => {
			  
          deletePost(cellValues["row"]["id"], cellValues["row"]["userId"]);
		  console.log(cellValues);
          }}
        >
         <DeleteIcon />
        </Button>
      );
    }
  },
];

  const [data,setData]= React.useState([])
  React.useEffect(()=> {
    if (typeof users !== "undefined" && users.length>0){
      axios({
        method:"get",
        url:"https://jsonplaceholder.typicode.com/posts",
      }).then(function(response){
        let userMap = [];
        let user;
        for(user of users){
          userMap[user.id]=user.username;
        }
        const map1=response.data.map((x) => {
          x["username"]= userMap[x.userId];
          console.log(x)
          return x;
          
        });
      setData(map1)
      })
    }
  }, [users]);

  let rows = []
  data.forEach(post => rows.push({userId: post.username, id: post.id, title: post.title, body: post.body}))

  return (
    <>
      <div style={{ height: '800px', width: '100%' }}>
      <div>
        <h3 style={{marginLeft: "15px"}}>
              Posts Data   
           <Button variant="outlined" style={{float: 'right'}} onClick={handleClickOpen}>
              ADD (+)
           </Button>
        </h3>
       </div>

            

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Details</DialogTitle>
        <DialogContent>
          
          <TextField
            autoFocus
            margin="dense"
            id="user"
            label="User Name"
            fullWidth
            variant="standard"
            autoComplete='off'
            value={userId}
            onChange={userIdChange}
          />

          <TextField
            autoFocus
            margin="dense"
            id="title"
            label="Title"
            fullWidth
            variant="standard"
            autoComplete='off'
            value={title}
            onChange={titleChange}
          />

          <TextField
            autoFocus
            margin="dense"
            id="body"
            label="Body"
            fullWidth
            variant="standard"
            autoComplete='off'
            value={body}
            onChange={bodyChange}
          />

        </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={createPost} type="submit">Submit</Button>
          </DialogActions>
        </Dialog>
   
		<Edit formData={formData} /> 

      <DataGrid 
        id={Math.random()} 
        rows={rows} 
        columns={columns} 
        pageSize={10} 
        checkboxSelection
        onRowSelected={() => {console.log('row selected')}}/>
      </div>
      </>
  )}


export default PostsData