import React from "react";
import { Avatar, Box, Card, Typography, Link, Button } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";

import useAuth from "../../hooks/useAuth";
import ActionButton from "./ActionButton";
import { cancelOutgoingRequest } from "./FriendSlice";
import { useDispatch } from "react-redux";

function UserCard({ profile }) {
  const dispatch = useDispatch();
  const { user } = useAuth();
  const currentUserId = user._id;
  const { _id: targetUserId, name, avatarUrl, email, friendship } = profile;
  const handleCancelRequest = () => {
    dispatch(cancelOutgoingRequest(targetUserId));
  };
  const actionButton = (
    <ActionButton
      currentUserId={currentUserId}
      targetUserId={targetUserId}
      friendship={friendship}
    />
  );

  return (
    <Card sx={{ display: "flex", alignItems: "center", p: 3 }}>
      <Avatar alt={name} src={avatarUrl} sx={{ width: 48, height: 48 }} />
      <Box sx={{ flexGrow: 1, minWidth: 0, pl: 2, pr: 1 }}>
        <Link
          variant="subtitle2"
          sx={{ fontWeight: 600 }}
          component={RouterLink}
          to={`/user/${targetUserId}`}
        >
          {name}
        </Link>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <EmailRoundedIcon
            sx={{ width: 16, height: 16, mr: 0.5, flexShrink: 0 }}
          />
          <Typography variant="body2" sx={{ color: "text.secondary" }} noWrap>
            {email}
          </Typography>
        </Box>
      </Box>
      {actionButton}
      {friendship === "outgoing" && (
        <Button onClick={handleCancelRequest} color="error">
          Cancel Request
        </Button>
      )}
    </Card>
  );
}

export default UserCard;
