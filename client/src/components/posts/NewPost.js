import React, { useState, useContext } from "react";
import { useHistory } from "react-router";
import PostForm from "./PostForm";
import FitnessJourney from "../../api";
import UserContext from "../auth/UserContext";

import "./PostForm.css";
import { Link } from "react-router-dom";

/** A simple component that renders the PostForm
 *
 * Consists of functions passed to PostForm
 */

const NewPost = () => {
  const history = useHistory();
  const { currentUser } = useContext(UserContext);
  const username = currentUser.username;
  let date = new Date();

  const [post, setPost] = useState({
    username: username,
    subject: "",
    body: "",
    date: `${date}`,
  });

  /** Add Post */

  const addPost = async (post) => {
    let res = await FitnessJourney.addPost(post);
    setPost(res);

    history.push(`/forum`);
  };

  /** Cancel post and redirect to forum */

  const cancel = () => history.push("/forum");

  return (
    <div className="NewPostForm py-4">
      <div className="container">
        <div className="col-md-10 offset-md-1">
          <section id="breadcrumb">
            <nav aria-label="breadcrumb">
              <div class="d-flex justify-content-end">
                <ol class="breadcrumb">
                  <li class="breadcrumb-item">
                    <Link to="/" style={{ textDecoration: "none" }}>
                      Home
                    </Link>
                  </li>
                  <li class="breadcrumb-item">
                    <Link to="/forum" style={{ textDecoration: "none" }}>
                      Forum
                    </Link>
                  </li>
                  <li class="breadcrumb-item active" aria-current="page">
                    New Post
                  </li>
                </ol>
              </div>
            </nav>
          </section>
        </div>

        <PostForm post={post} save={addPost} cancel={cancel} />
      </div>
    </div>
  );
};

export default NewPost;
