import React from "react";
import styled from "styled-components";
import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/material/Button";
import { useDispatch } from "react-redux";
import { toggleModal } from "../features/data/dataSlice";

const Wrapper = styled.div`
  padding: 0 9.9%;
  margin-bottom: 6%;
`;

const Item = styled.div`
  aspect-ratio: 1.562;
  border-radius: 10px;
  display: flex;
  cursor: pointer;
  justify-content: center;
  align-items: center;
  border: 2px solid white;
  border-radius: 15px;
  overflow: hidden;
`;

const ItemButton = styled(Button)`
  width: 100%;
  height: 100%;
`;

const OpenCoinModalBtn: React.FC<{
  auth: boolean;
}> = (props) => {
  const { auth } = props;

  const dispatch = useDispatch();

  const clickHandler = () => {
    if (auth) {
      dispatch(toggleModal({ modalOpen: true }));
    }
  };

  return (
    <Wrapper>
      <Item>
        <ItemButton onClick={clickHandler}>
          <AddIcon fontSize="large" sx={{ color: "white" }} />
        </ItemButton>
      </Item>
    </Wrapper>
  );
};

export default OpenCoinModalBtn;
