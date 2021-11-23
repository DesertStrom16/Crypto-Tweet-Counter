import { useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "./app/hooks";
import styled from "styled-components";
import { getInitialData } from "./helper/API";
import { getObject } from "./helper/LocalStorage";
import { isAuth } from "./features/user/userSlice";
import { setCoins } from "./features/data/dataSlice";
import Home from "./route/Home";
import { TopBar, NavPanel, LoginModal, MobilePopup } from "./components";
import CircularProgress from "@mui/material/CircularProgress";
import Backdrop from "@mui/material/Backdrop";

const AppWrapper = styled.div`
  width: 100%;
  flex-grow: 1;
  display: flex;
  flex-direction: row;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  flex-grow: 1;
  height: 100vh;

  @media (max-width: 768px) {
    display: ${(props) => (props.auth ? "flex" : "none")};
  }
`;

export default function App() {
  const { auth, token } = useAppSelector((state) => state.users);
  const { loading } = useAppSelector((state) => state.data);

  const dispatch = useAppDispatch();

  useEffect(() => {
    onInitialMount();
  }, []);

  useEffect(() => {
    if (auth && token) {
      onMount();
    }
  }, [auth, token]);

  const onInitialMount = async () => {
    await getObject("@TOKEN").then(async (tokenStored) => {
      if (tokenStored) {
        // User token saved in LocalStorage but user is not authorized
        dispatch(isAuth({ auth: true, token: tokenStored }));
      }
    });
  };

  const onMount = async () => {
    await getInitialData(token)
      .then((res) => {
        dispatch(setCoins({coins: res.coins}));
      })
      .catch((err) => console.log(err));
  };

  return (
    <AppWrapper>
      <Backdrop
        transitionDuration={{ appear: 0, enter: 0, exit: 50 }}
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        {auth ? (
          <CircularProgress color="inherit" />
        ) : (
          <>
            <MobilePopup />
            <LoginModal />
          </>
        )}
      </Backdrop>
      <NavPanel auth={auth} />

      {/* Main Content */}
      <ContentWrapper auth={auth}>
        <TopBar />

        <Switch>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </ContentWrapper>
    </AppWrapper>
  );
}