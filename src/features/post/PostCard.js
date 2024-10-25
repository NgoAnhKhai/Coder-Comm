import React, { useState } from "react";
import {
  Box,
  Link,
  Card,
  Stack,
  Avatar,
  Typography,
  CardHeader,
  IconButton,
  Menu,
  MenuItem,
  Button,
  TextField,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { fDate } from "../../utils/formatTime";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import PostReaction from "./PostReaction";
import CommentForm from "../comment/CommentForm";
import CommentList from "../comment/CommentList";
import { useDispatch } from "react-redux";
import { deletePost, updatePost } from "./PostSlice";
import { useNavigate } from "react-router-dom";

function PostCard({ post }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isEditing, setIsEditing] = useState(false);
  const [newContent, setNewContent] = useState(post.content);
  const [newImage, setNewImage] = useState(post.image);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleDeletePost = () => {
    dispatch(deletePost(post._id));
    handleMenuClose();
    navigate("/");
  };

  const handleEditPost = () => {
    setIsEditing(true);
    handleMenuClose();
  };

  const handleSaveEdit = async () => {
    const updatedPostData = {
      postId: post._id,
      content: newContent !== post.content ? newContent : undefined,
      image: newImage instanceof File ? newImage : undefined,
    };
    await dispatch(updatePost(updatedPostData));
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setNewContent(post.content);
    setNewImage(post.image);
  };

  return (
    <Card>
      <CardHeader
        disableTypography
        avatar={
          <Avatar src={post?.author?.avatarUrl} alt={post?.author?.name} />
        }
        title={
          <Link
            variant="subtitle2"
            color="text.primary"
            component={RouterLink}
            sx={{ fontWeight: 600 }}
            to={`/user/${post.author._id}`}
          >
            {post?.author?.name}
          </Link>
        }
        subheader={
          <Typography
            variant="caption"
            sx={{ display: "block", color: "text.secondary" }}
          >
            {fDate(post.createdAt)}
          </Typography>
        }
        action={
          <>
            <IconButton onClick={handleMenuClick}>
              <MoreVertIcon sx={{ fontSize: 30 }} />
            </IconButton>

            <Menu
              anchorEl={anchorEl}
              open={open}
              onClose={handleMenuClose}
              PaperProps={{
                style: { width: "150px" },
              }}
            >
              <MenuItem onClick={handleEditPost}>Chỉnh sửa</MenuItem>
              <MenuItem onClick={handleDeletePost} sx={{ color: "red" }}>
                Xóa
              </MenuItem>
            </Menu>
          </>
        }
      />

      <Stack spacing={2} sx={{ p: 3 }}>
        {isEditing ? (
          <>
            <TextField
              fullWidth
              multiline
              rows={3}
              value={newContent}
              onChange={(e) => setNewContent(e.target.value)}
            />
            <input
              type="file"
              onChange={(e) => setNewImage(e.target.files[0])}
            />
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Button variant="contained" onClick={handleSaveEdit}>
                Lưu
              </Button>
              <Button variant="outlined" onClick={handleCancelEdit}>
                Hủy
              </Button>
            </Box>
          </>
        ) : (
          <>
            <Typography>{post.content}</Typography>
            {post.image && (
              <Box
                sx={{
                  borderRadius: 2,
                  overflow: "hidden",
                  height: 300,
                  "& img": { objectFit: "cover", width: 1, height: 1 },
                }}
              >
                <img src={post.image} alt="post" />
              </Box>
            )}
          </>
        )}

        <PostReaction post={post} />
        <CommentList postId={post._id} />
        <CommentForm postId={post._id} />
      </Stack>
    </Card>
  );
}

export default PostCard;
