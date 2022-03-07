import React, { useState, useContext } from "react";
import UserContext from "../auth/UserContext";
import { Box, TextField, IconButton, InputAdornment } from "@mui/material";

import "./CommentForm.css";

/** Renders Comment Form
 *
 * Used for adding/editing a comment.
 */

const CommentForm = ({ postId, addComment }) => {
  const { currentUser } = useContext(UserContext);
  const username = currentUser.username;
  let date = new Date();
  let initialState = {
    username: username,
    body: "",
    date: `${date}`,
    post_id: parseInt(postId),
  };
  const [comment, setComment] = useState(initialState);

  /** Allows form to be used */

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setComment((formData) => ({
      ...formData,
      [name]: value,
    }));
  };

  const handleSubmit = (evt) => {
    addComment(comment);

    setComment(initialState);
  };

  return (
    <div className="CommentForm">
      <Box component="form" autoComplete="off" onSubmit={handleSubmit}>
        <TextField
          placeholder="Enter comment"
          id="outlined-basic"
          label="New Comment"
          variant="outlined"
          name="body"
          className="form-control"
          value={comment.body}
          onChange={handleChange}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  baseClassName="fas"
                  className="fas fa-plus-circle"
                  edge="end"
                  color="primary"
                  title="Add Comment"
                  type="submit"
                />
              </InputAdornment>
            ),
          }}
        />
      </Box>
    </div>
  );
};

export default CommentForm;
