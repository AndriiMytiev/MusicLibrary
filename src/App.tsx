import React from "react";
import { Routes, Route } from "react-router-dom";
import { AuthPage } from "./pages/AuthPage";
import RootStore, { RootStoreContext } from "./stores";
import { MainPage } from "./pages/MainPage";
import { Header } from "./components/Common/Header/Header";
import { CurrentUserInfoPage } from "./pages/CurrentUserPage";
import { EditUserPage } from "./pages/EditUserPage";
import { UsersListPage } from "./pages/UsersListPage";
import { UserLibrary } from "./pages/UserLibrary";
import { UserFavouritesLibrary } from "./pages/UserFavouritesLibrary";
import { UserPage } from "./pages/UserPage";

function App() {
  const rootStore = new RootStore();

  return (
    <RootStoreContext.Provider value={rootStore}>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/user-library" element={<UserLibrary />} />
          <Route path="/favourites" element={<UserFavouritesLibrary />} />
          <Route path="/profile" element={<CurrentUserInfoPage />} />
          <Route path="/users" element={<UsersListPage />} />
          <Route path="/users/edit/:id" element={<EditUserPage />} />
          <Route path="/users/:id" element={<UserPage />} />
          <Route path="*" element={<MainPage />} />
        </Routes>
      </div>
    </RootStoreContext.Provider>
  );
}

export default App;
