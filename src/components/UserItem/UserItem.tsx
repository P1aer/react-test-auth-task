import React from "react";
import { Paper } from "@mui/material";
import { ReadOnlyUserSerializer } from "../../react-app-env";
import "./index.scss";

interface UserItemProps {
  obj: ReadOnlyUserSerializer;
}

const UserItem: React.FC<UserItemProps> = ({ obj }) => {
  const getDate = (data: Date) => {
    const now = new Date();
    const diff = now.getTime() - data.getTime();
    const mins = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(mins / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30);
    const years = Math.floor(months / 12);
    if (mins < 1) {
      return "was seconds ago";
    }
    if (hours < 1) {
      return `${mins} minutes ago`;
    }
    if (days < 1) {
      return `${hours} hours ago`;
    }
    if (months < 1) {
      return `${days} days ago`;
    }
    if (years < 1) {
      return `${months} months ago`;
    }
    return `${years} years ago`;
  };
  return (
    <Paper sx={{ marginTop: "0.5rem", padding: "1rem" }} elevation={2}>
      <div className="item-card">
        <span>
          <b>
            {obj.username}#{obj.id}
          </b>
        </span>
        <span>
          {obj.first_name + obj.last_name ? (
            obj.first_name + " " + obj.last_name
          ) : (
            <em>No name provided</em>
          )}
        </span>
        <span>
          {obj.is_active ? "This user is active" : "This user is not active"}
        </span>
        <span>
          was online: <br />{" "}
          {!obj.last_login ? (
            <em>unknown</em>
          ) : (
            getDate(new Date(String(obj.last_login)))
          )}
        </span>
        <span>
          {obj.is_superuser ? (
            <span>
              <b>super</b> user
            </span>
          ) : (
            <span>
              <b>simple</b> user
            </span>
          )}
        </span>
      </div>
    </Paper>
  );
};

export default UserItem;
