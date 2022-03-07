import React, { useState } from "react";
import { Box, TextField } from "@mui/material";
import "./PostForm.css";

/** Post Form Component
 *
 * Allows input of subject and body of post
 *
 * Child of NewPost Component
 */

const PostForm = ({ save, post, cancel }) => {
  const [formData, setFormData] = useState({
    username: post.username,
    subject: post.subject,
    body: post.body,
    date: post.date,
  });

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setFormData((formData) => ({
      ...formData,
      [name]: value,
    }));
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();

    save(formData);
  };

  return (
    <div className="PostForm mb-4">
      <div className="col-md-8 offset-md-2">
        <div className="post-form">
          <Box
            component="form"
            sx={{
              "& > :not(style)": { m: 1 },
            }}
            autoComplete="off"
            onSubmit={handleSubmit}
          >
            <TextField
              required
              id="outlined-basic"
              variant="outlined"
              className="form-control"
              name="subject"
              label="Subject"
              placeholder="What is the subject of your post?"
              value={formData.subject}
              onChange={handleChange}
            />

            <TextField
              id="body"
              name="body"
              label="Body"
              placeholder="What do you want to talk about?"
              className="form-control"
              value={formData.body}
              onChange={handleChange}
              multiline
              rows={4}
              required
            />

            <button type="submit" className="btn btn-primary container mt-2">
              Submit
            </button>
            <button
              onClick={cancel}
              className="btn btn-secondary container mt-1"
            >
              Cancel
            </button>
          </Box>
        </div>
      </div>
    </div>
  );
};

export default PostForm;
