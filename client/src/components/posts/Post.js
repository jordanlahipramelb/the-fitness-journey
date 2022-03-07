import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";

import LoadingPage from "../common/LoadingPage";
import PostView from "./PostView";
import PostForm from "./PostForm";
import CommentList from "../comments/CommentList";
import CommentForm from "../comments/CommentForm";
import FitnessJourney from "../../api";

/** Main Post Component
 *
 * Received post data from state.
 *
 * Decides, from its own state, whether to show the edit form or the simple PostView component.
 * This also handles editing, deleting, comment-adding, and comment-deleting.
 *
 * post: post data retrieved through API
 *
 *
 * Parent for
 * - PostForm
 * - PostView
 * - CommentList -> Comment
 * - CommentForm
 */

const Post = () => {
  const history = useHistory();
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  /** Request post from API via postId */

  useEffect(
    function getPostAndCommentsOnMount() {
      async function getPost() {
        let post = await FitnessJourney.getPost(postId);
        // set post state to the handle
        setPost(post);
      }

      getPost();
    },
    // rerun when post id changes
    [postId]
  );

  if (!post) return <LoadingPage />;

  /** Toggles editing post on/off */

  const toggleEdit = () => {
    setIsEditing((editing) => !editing);
  };

  /** Handles editing a post */

  const editPost = async (post) => {
    await FitnessJourney.updatePost(postId, post);

    window.location.reload(true);
  };

  /** Handles deleting a post */

  const deletePost = async () => {
    await FitnessJourney.deletePost(postId);

    history.push("/forum");
  };

  /** Handles adding a comment */

  const addComment = async (comment) => {
    await FitnessJourney.addComment(postId, comment);
  };

  /** Handles deleting a comment via comment id */

  const deleteComment = async (commentId) => {
    await FitnessJourney.removeComment(postId, commentId);

    window.location.reload(true);
  };

  return (
    <div className="Routine pt-4 mb-5">
      <div className="container">
        {/* Decide whether to show the edit form if toggleEdit is true, or the simple PostView component */}
        {isEditing ? (
          <PostForm post={post} cancel={toggleEdit} save={editPost} />
        ) : (
          <PostView
            post={post}
            deletePost={deletePost}
            toggleEdit={toggleEdit}
          />
        )}

        <div className="Post-comments">
          <CommentList deleteComment={deleteComment} comments={post.comments} />
          <CommentForm addComment={addComment} postId={postId} />
        </div>
      </div>
    </div>
  );
};

export default Post;
