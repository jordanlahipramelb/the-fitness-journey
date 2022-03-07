import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import FitnessJourney from "../../api";
import SearchForm from "../common/SearchForm";
import LoadingPage from "../common/LoadingPage";
import PostCard from "./PostCard";

/** Post List Component
 *
 * Renders list of posts via cards in database
 *
 * posts: posts in database
 *
 * PostList -> SearchForm
 *          -> PostCard
 *
 */

const PostList = () => {
  const [posts, setPosts] = useState(null);

  /** Allows use of async search function */

  useEffect(function getPostsOnMount() {
    search();
  }, []);

  const search = async (subject) => {
    let posts = await FitnessJourney.getPosts(subject);

    setPosts(posts);
  };

  /** If no posts, return Loading component */

  if (!posts) return <LoadingPage />;

  /** If no posts and there are 0 posts in state */

  if (!posts && posts.length === 0) {
    return <h3 className="text-center">No posts present.</h3>;
  }

  return (
    <div className="PostList py-4">
      <div className="container">
        <div className="col-md-10 offset-md-1">
          <section id="breadcrumb" className="pb-2">
            <nav aria-label="breadcrumb">
              <div class="d-flex justify-content-between align-items-center">
                <h2>Forum</h2>
                <ol class="breadcrumb">
                  <li class="breadcrumb-item past">
                    <Link to="/" style={{ textDecoration: "none" }}>
                      Home
                    </Link>
                  </li>
                  <li class="breadcrumb-item active" aria-current="page">
                    Forum
                  </li>
                </ol>
              </div>
            </nav>
          </section>
        </div>

        <div className="col-md-8 offset-md-2">
          <SearchForm searchFor={search} />

          <Link to="/forum/new">
            <button className="btn btn-primary container">New Post</button>
          </Link>
          <section className="forum mt-3">
            {posts.length ? (
              <div className="PostList-list">
                {posts.map((post) => (
                  <PostCard
                    key={post.id}
                    id={post.id}
                    username={post.username}
                    subject={post.subject}
                    date={post.date}
                  />
                ))}
              </div>
            ) : (
              <h3 className="lead">No posts found.</h3>
            )}
          </section>
        </div>
      </div>
    </div>
  );
};

export default PostList;
