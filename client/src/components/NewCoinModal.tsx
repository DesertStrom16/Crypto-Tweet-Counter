import React, { useState } from "react";
import { useAppSelector, useAppDispatch } from "../app/hooks";
import styled from "styled-components";
import ListOption from "../models/list";
import { addNewCoin, tickerSearch, refreshCoinList } from "../helper/API";
import { setCoins, toggleModal } from "../store/data/dataSlice";
import useInputBasic from "../hooks/use-input-basic";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import CheckIcon from "@mui/icons-material/Check";
import Autocomplete from "@mui/material/Autocomplete";
import LinkIcon from "@mui/icons-material/Link";
import LinkOffIcon from "@mui/icons-material/LinkOff";
import ClearIcon from "@mui/icons-material/Clear";
import RefreshIcon from "@mui/icons-material/Refresh";
import "../css/videos.css";

const TextFieldHashtag = styled(TextField)`
  width: 350px;
`;

const AutoCompleteTicker = styled(Autocomplete)`
  width: 165px;
`;

const NewCoinButtonWrapper = styled.div`
  position: absolute;
  bottom: 31px;
  right: 62.5px;
`;

const NewCoinButton = styled(Button)`
  height: 36px;
  width: 100%;
`;

const TokenLinkWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

const LinkIconWrapper = styled.div`
  height: 56px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 8px;
`;

const CoupledButton = styled(IconButton)`
  transform: rotate(90deg);
`;

const ModalContent = styled.div`
  box-sizing: border-box;
  padding: 55px 62.5px 0px 62.5px;
  height: 325px;
  background-color: rgb(245, 245, 245);
  border: 0px;
  border-radius: 12px;
  outline: none;
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  position: relative;
`;

const NewCoinModal: React.FC<{}> = () => {
  const [tickerOpen, setTickerOpen] = useState(false);
  const [refreshLoading, setRefreshLoading] = useState(false);
  const [newTickerLoading, setNewTickerLoading] = useState(false);
  const [tickerOptions, setTickerOptions] = useState<ListOption[] | any>([]);
  const [newCoinLoading, setNewCoinLoading] = useState(false);
  const [inputsCoupled, setInputsCoupled] = useState(true);
  const [selectedTicker, setSelectedTicker] = useState<ListOption>({
    id: "",
    name: "",
    name_lower: "",
    ticker: "",
  });
  const [tickerErrValue, setTickerErrValue] = useState("");
  const [coinErrValue, setCoinErrValue] = useState("");

  const dispatch = useAppDispatch();

  const { token } = useAppSelector((state) => state.users);
  const { coins, modalOpen } = useAppSelector((state) => state.data);

  const {
    value: newTicker,
    setValue: setNewTicker,
    isValid: tickerValid,
    valueChangeHandler: tickerChangeHandler,
    reset: tickerReset,
  } = useInputBasic(
    (value) =>
      (!tickerOpen && tickerOptions.length === 0) ||
      (tickerOpen && value.toLowerCase() !== tickerErrValue) ||
      tickerErrValue === ""
  );

  const {
    value: newCoin,
    setValue: setNewCoin,
    isValid: coinValid,
    valueChangeHandler: coinChangeHandler,
    reset: coinReset,
  } = useInputBasic(
    (value) => value.toLowerCase() !== coinErrValue || coinErrValue === ""
  );

  const handleTickerSearch = async () => {
    setNewTickerLoading(true);

    let { lists } = await tickerSearch(newTicker, token);

    if (lists.length === 0) {
      setTickerErrValue(newTicker);
    }

    setTickerOptions(lists);
    setTickerOpen(true);
    setNewTickerLoading(false);
  };

  // Refresh list of cryptocurrencies
  const refreshHandler = async () => {
    setRefreshLoading(true);

    await refreshCoinList(token).then((res) => {
      if (res.success) {
        setRefreshLoading(false);
      } else {
        // Error
      }
    });
  };

  const submitHandler = async (e: any) => {
    e.preventDefault();

    // Avoid multiple submissions
    if (!newCoinLoading) {
      setNewCoinLoading(true);
      let isError;

      // Check for coin already loaded
      if (coins.length > 0) {
        coins.forEach((coin) => {
          if (coin.name.toLowerCase() === newCoin.toLowerCase()) {
            setNewCoinLoading(false);

            setCoinErrValue(coin.name.toLowerCase());
            setInputsCoupled(false);
            isError = true;
          }
        });
      }

      if (!isError) {
        // No error, make request for new coin
        await addNewCoin(
          {
            searchTerm: newCoin.toLowerCase(),
            token_id: selectedTicker.id,
          },
          token
        )
          .then((res) => {
            if (res.newCoin) {
              dispatch(
                setCoins({ coins: [res.newCoin, ...coins], selectFirst: true })
              );
              setInputsCoupled(true);
              setTickerErrValue("");
              setCoinErrValue("");
              setTickerOptions([]);
              tickerReset();
              coinReset();
            } else {
              // Error
            }
            setNewCoinLoading(false);
            dispatch(toggleModal({ modalOpen: false }));
          })
          .catch((err) => {
            console.log(err);
            setNewCoinLoading(false);
          });
      }
    }
  };

  const handleChangeAutoComplete = (e: any, value: ListOption | any) => {
    if (inputsCoupled) {
      setNewCoin(value.name);
    }
    setNewTicker(value.name);
    setSelectedTicker(value);
  };

  const inputsCoupledHandler = () => {
    setNewCoin(newTicker);

    setInputsCoupled(!inputsCoupled);
  };

  const handleModalClose = () => dispatch(toggleModal({ modalOpen: false }));

  return (
    <Modal
      sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      open={modalOpen}
      onClose={handleModalClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <ModalContent>
        <form onSubmit={submitHandler}>
          <TokenLinkWrapper>
            <AutoCompleteTicker
              disablePortal
              freeSolo
              clearOnEscape
              sx={{ marginBottom: "25px" }}
              id="ticker-auto-complete"
              options={tickerOptions ? tickerOptions : null}
              open={tickerOpen}
              getOptionLabel={(option: ListOption | any) =>
                option.name ?? option
              }
              onChange={handleChangeAutoComplete}
              onClose={() => setTickerOpen(false)}
              popupIcon={null}
              renderInput={(params) => (
                <TextField
                  {...params}
                  value={newTicker}
                  onChange={tickerChangeHandler}
                  autoComplete="off"
                  id="outlined-ticker"
                  helperText="Token"
                  variant="outlined"
                  InputProps={{
                    ...params.InputProps,
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="search for token"
                          onClick={handleTickerSearch}
                          disabled={!tickerValid}
                          edge="end"
                        >
                          {newTickerLoading ? (
                            <CircularProgress size={20} color="inherit" />
                          ) : selectedTicker.name.trim() !== "" &&
                            selectedTicker.name === newTicker ? (
                            <CheckIcon />
                          ) : !tickerValid ? (
                            <ClearIcon />
                          ) : (
                            <SearchIcon />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              )}
            />
            <LinkIconWrapper>
              <CoupledButton
                aria-label="toggle input fields coupled"
                onClick={inputsCoupledHandler}
              >
                {inputsCoupled ? (
                  <LinkIcon fontSize="large" />
                ) : (
                  <LinkOffIcon fontSize="large" />
                )}
              </CoupledButton>
            </LinkIconWrapper>
            <LinkIconWrapper>
              <IconButton disabled={refreshLoading} onClick={refreshHandler}>
                {refreshLoading ? (
                  <CircularProgress
                    size={26}
                    sx={{ color: "rgb(0,0,0,0.54)" }}
                  />
                ) : (
                  <RefreshIcon fontSize="large" />
                )}
              </IconButton>
            </LinkIconWrapper>
          </TokenLinkWrapper>

          <TextFieldHashtag
            value={inputsCoupled ? newTicker : newCoin}
            onChange={coinChangeHandler}
            error={!coinValid}
            id="outlined-coin"
            label={!coinValid ? "Error" : null}
            helperText={
              !coinValid
                ? "Hashtag search already exists"
                : "Enter a hashtag to search for"
            }
            variant="outlined"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">#</InputAdornment>
              ),
            }}
          />

          <NewCoinButtonWrapper>
            <NewCoinButton
              variant="contained"
              type="submit"
              disabled={
                newCoin === "" ||
                newTicker === "" ||
                !selectedTicker ||
                (selectedTicker && selectedTicker.name !== newTicker
                  ? true
                  : false)
              }
            >
              {newCoinLoading ? (
                <CircularProgress size={20} color="inherit" />
              ) : (
                "Add Coin"
              )}
            </NewCoinButton>
          </NewCoinButtonWrapper>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default NewCoinModal;
