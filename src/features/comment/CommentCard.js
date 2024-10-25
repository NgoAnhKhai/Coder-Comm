import React from "react";
import {
  Avatar,
  Box,
  Paper,
  Stack,
  Typography,
  IconButton,
} from "@mui/material";
import { fDate } from "../../utils/formatTime";
import CommentReaction from "./CommentReaction";
import { useDispatch } from "react-redux";
import DeleteIcon from "@mui/icons-material/Delete"; // Import icon Delete
import { deleteComment } from "./commentSlice"; // Import action xóa bình luận

function CommentCard({ comment }) {
  const dispatch = useDispatch();

  const handleDeleteComment = () => {
    if (window.confirm("Bạn có chắc chắn muốn xóa bình luận này không?")) {
      dispatch(deleteComment(comment._id));
    }
  };

  return (
    <Stack direction="row" spacing={2}>
      <Avatar alt={comment.author?.name} src={comment.author?.avatarUrl} />
      <Paper sx={{ p: 1.5, flexGrow: 1, bgcolor: "background.neutral" }}>
        <Stack
          direction="row"
          alignItems={{ sm: "center" }}
          justifyContent="space-between"
          sx={{ mb: 0.5 }}
        >
          <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
            {comment.author?.name}
          </Typography>
          <Typography variant="caption" sx={{ color: "text.disabled" }}>
            {fDate(comment.createdAt)}
          </Typography>
        </Stack>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {comment.content}
        </Typography>

        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <CommentReaction comment={comment} />
          {/* Nút xóa bình luận */}
          <IconButton onClick={handleDeleteComment}>
            <DeleteIcon />
          </IconButton>
        </Stack>
      </Paper>
    </Stack>
  );
}

export default CommentCard;
