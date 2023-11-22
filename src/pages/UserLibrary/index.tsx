import "./styles.scss";
import { observer } from "mobx-react-lite";
import { useStore } from "../../hooks/useStore";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import loupe from "../../assets/loupe.png";

export const UserLibrary = observer(() => {
  const {
    globalStore: { currentUser, setIsEditPageAvailable },
  } = useStore();

  const [searchValue, setSearchValue] = useState<string>("");

  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser === null) {
      navigate("/auth");
    }
  }, [currentUser, navigate]);

  useEffect(() => {
    setIsEditPageAvailable(false);
  }, []);

  const handleSearchValueOnChange = (value: string) => {
    setSearchValue(value);
    console.log(value);
  };
  return (
    <div className="UserLibrary page">
      <div className="container">
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
