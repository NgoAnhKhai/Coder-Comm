import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "./PostSlice";
import PostCard from "./PostCard";

function PostList({ userId }) {
  const [page, setPage] = useState(1);
  const { posts = [] } = useSelector((state) => state.post);
  const dispatch = useDispatch();
  useEffect(() => {
    if (userId) dispatch(getPosts({ userId, page }));
  }, [userId, page, dispatch]);
  return (
    <div>
      {posts.map((post) => (
        <PostCard key={post._id} post={post} />
      ))}
    </div>
  );
}

export default PostList;
