import React from "react";
import TextField from "@mui/material//TextField";
import Dialog from "@mui/material//Dialog";
import DialogActions from "@mui/material//DialogActions";
import DialogContent from "@mui/material//DialogContent";
import DialogTitle from "@mui/material//DialogTitle";
import Button from "@mui/material//Button";

export default function Edit({formData}) {
  const [title, setTitle] = React.useState("");

  const [postId, setPostId] = React.useState();

  const [userId, setUserId] = React.useState("");

  const [body, setBody] = React.useState("");

  const [formDataOpen , setFormDataOpen] = React.useState("");
  
  const titleChange = (event) => {
    setTitle(event.target.value);
  };

  const bodyChange = (event) => {
    setBody(event.target.value);
  };

 
  const [form, setForm] = React.useState(false);

  const FormClose = () => {
    setForm(false);
  };

  React.useEffect(() => {
    // Function to Open Form for editing Posts
    if (formData !== undefined) {
        console.log(formData)
      setTitle(formData.title);
      setBody(formData.body);
      setForm(true);
      setUserId(formData.userId);
      setPostId(formData.id);
    }
  }, [formData]);

  const editForm = () => {
    FormClose();
    fetch("https://jsonplaceholder.typicode.com/posts/" + postId, {
      method: "PUT",
      body: JSON.stringify({
        id: postId,
        title: title,
        body: body,
        userId: userId,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    }).then((response) => console.log("Post Updated Successfully"));
  };

  return (
     <>
      
    <Dialog open={form} onClose={FormClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Post</DialogTitle>
      <DialogContent>
        <label>User Name : {userId}</label>

        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Title"
          type="title"
          value={title}
          onChange={titleChange}
          fullWidth
        />

        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Body"
          type="body"
          value={body}
          onChange={bodyChange}
          fullWidth
        />

      </DialogContent>
      <DialogActions>
        <Button onClick={FormClose} color="primary">
          Cancel
        </Button>
        <Button onClick={editForm} color="primary">
          Update
        </Button>
      </DialogActions>
    </Dialog>

    </>
  );
}