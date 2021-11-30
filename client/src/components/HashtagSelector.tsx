import React from "react";
import { useAppDispatch } from "../app/hooks";
import styled from "styled-components";
import Button from "@mui/material/Button";
import { setCoinSelected } from "../store/data/dataSlice";

interface WrapperStyle {
  selected: boolean;
}

const Wrapper = styled.div`
  padding: 0 9.9%;
  margin-bottom: 6%;
`;

const Item = styled.div<WrapperStyle>`
  aspect-ratio: 1.562;
  border-radius: 10px;
  display: flex;
  cursor: pointer;
  justify-content: center;
  align-items: center;
  border: 2px solid white;
  border-radius: 15px;
  overflow: hidden;
  background-color: ${(props) =>
    props.selected ? "rgba(54, 162, 235, .5)" : "transparent"};
`;

const ItemButton = styled(Button)`
  width: 100%;
  height: 100%;
`;

const SearchTerm = styled.div`
  font-family: DMSans-Medium;
  font-size: 18.67px;
  line-height: 89.2%;
  letter-spacing: -0.66667px;
  color: #ffffff;

  @media (max-width: 1500px) {
    font-size: 16px;
  }

  @media (max-width: 1350px) {
    font-size: 14px;
  }
`;

const HashtagSelector: React.FC<{
  coinName: string;
  index: number;
  selected: boolean;
}> = (props) => {
  const { coinName, index, selected } = props;

  const dispatch = useAppDispatch();

  const clickHandler = () => {
    dispatch(setCoinSelected({ coinSelected: index }));
  };

  return (
    <Wrapper>
      <Item selected={selected}>
        <ItemButton onClick={clickHandler}>
          <SearchTerm>{"# " + coinName}</SearchTerm>
        </ItemButton>
      </Item>
    </Wrapper>
  );
};

export default HashtagSelector;
