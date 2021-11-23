import styled from "styled-components";
import { AvatarIcon } from "../helper/Svg";

const Wrapper = styled.div`
  width: 100%;
  height: 110px;
  z-index: 99;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  left: 0;
`;

const InnerWrapper = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
  width: 100%;
  height: fit-content;
`;

const Banner = styled.div`
  background-color: rgba(255, 255, 255, 0.15);
  border-radius: 10.6667px;
  height: 69.33px;
  min-width: 350px;
  width: 700px;
  max-width: 50%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  font-family: DMSans-Medium;
  font-size: 18.67px;
  line-height: 89.2%;
  letter-spacing: -0.66667px;
  color: #ffffff;

  @media (max-width: 1050px) {
    font-size: 16px
  }
`;

const AvatarPosition = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const AvatarWrapper = styled.div`
  width: 53.33px;
  height: 53.33px;
  border-radius: 50%;
  overflow: hidden;
  background: rgba(211, 211, 211, 0.65);
  border: 3px solid white;
  box-sizing: border-box;
  margin-right: 3.35%;
  cursor: pointer;
`;

const Avatar = styled(AvatarIcon)`
  width: 100%;
  height: 100%;
`;

export default function TopBar() {
  return (
    <Wrapper>
      <InnerWrapper>
        <Banner>All market data gathered from CoinGecko.com</Banner>
        <AvatarPosition>
          <AvatarWrapper>
            <Avatar />
          </AvatarWrapper>
        </AvatarPosition>
      </InnerWrapper>
    </Wrapper>
  );
}
