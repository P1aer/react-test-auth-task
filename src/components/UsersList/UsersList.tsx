import React from "react";
import { ReadOnlyUserSerializer } from "../../react-app-env";
import { TransitionGroup } from "react-transition-group";
import UserItem from "../UserItem/UserItem";
import "./index.scss";
import { Slide } from "@mui/material";

interface UsersListProps {
  list: ReadOnlyUserSerializer[];
}

const UsersLis: React.FC<UsersListProps> = ({ list }) => {
  return (
    <div className="userList">
      <h3 className="usersList-h3">List of users</h3>
      <TransitionGroup>
        {list.map((user) => (
          <Slide
            timeout={500}
            direction="left"
            in={false}
            unmountOnExit
            key={user.id}
          >
            <div>
              <UserItem obj={user} />
            </div>
          </Slide>
        ))}
      </TransitionGroup>
    </div>
  );
};

export default UsersLis;
