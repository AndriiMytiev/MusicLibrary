import "./styles.scss";
import { observer } from "mobx-react-lite";
import defaultAvatar from "../../assets/defaultAvatar.jpg";
import loupe from "../../assets/loupe.png";
import { useStore } from "../../hooks/useStore";
import { useState } from "react";
import { User } from "../../types/authPage";

interface UserPageBlockProps {
  user: User;
}

export const UserPageBlock = observer((props: UserPageBlockProps) => {
  const { user } = props;

  const [searchValue, setSearchValue] = useState<string>("");

  const handleSearchValueOnChange = (value: string) => {
    setSearchValue(value);
    console.log(value);
  };
  return (
    <div className="UserPageBlock">
      <div className="userInfo">
        <div className="avatar">
          <img
            src={user.avatar ? user.avatar : defaultAvatar}
            alt="userAvatar"
          />
        </div>
        <div className="name">
          {user?.name !== null && user?.surname !== null ? (
            <p>
              Welcome to{" "}
              <span>
                {user?.name} {user?.surname} ({user.login})
              </span>{" "}
              library!
            </p>
          ) : (
            <p>
              Welcome to <span>{user?.login}</span> library!
            </p>
          )}
        </div>
      </div>
      <div className="library">
        <div className="searchBar">
          <img src={loupe} alt="loupe" />
          <input
            onChange={(event) => handleSearchValueOnChange(event.target.value)}
          />
        </div>
      </div>
    </div>
  );
});
