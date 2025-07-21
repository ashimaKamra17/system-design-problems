import React from "react";
import Header from "./components/Header/Header";
import CreatePost from "./components/CreatePost/CreatePost";
import NewsFeedPosts from "./components/Posts/NewsFeedPosts";

function NewsFeed() {
  return (
    <div>
      <Header />
      <CreatePost />
      <NewsFeedPosts />
    </div>
  );
}

export default NewsFeed;
