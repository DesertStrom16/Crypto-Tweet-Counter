import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Coin from "../../models/coin";

type DataState = {
  coins: Coin[];
  loading: boolean;
  modalOpen: boolean;
  coinSelected: number | null;
};

type SetCoins = {
  coins: Coin[];
  selectFirst?: boolean;
};

type CoinSelected = {
  coinSelected: number | null;
};

type ToggleModal = {
  modalOpen: boolean;
};

const initialState: DataState = {
  coins: [],
  coinSelected: null,
  loading: true,
  modalOpen: false,
};

export const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    setCoins: (state, action: PayloadAction<SetCoins>) => {
      state.coins = action.payload.coins;
      state.coinSelected = action.payload.selectFirst ? 0 : null;
      state.loading = false;
    },
    setCoinSelected: (state, action: PayloadAction<CoinSelected>) => {
      state.coinSelected = action.payload.coinSelected;
    },
    toggleModal: (state, action: PayloadAction<ToggleModal>) => {
      state.modalOpen = action.payload.modalOpen;
    },
  },
});

export const { setCoins, setCoinSelected, toggleModal } = dataSlice.actions;

export default dataSlice.reducer;
