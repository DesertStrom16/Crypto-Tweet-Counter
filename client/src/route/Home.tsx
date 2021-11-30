import React from "react";
import styled from "styled-components";
import { useAppSelector } from "../app/hooks";
import { HashtagSelector, OpenCoinModalBtn } from "../components";
import { Bar } from "react-chartjs-2";
import NewCoinModal from "../components/NewCoinModal";

interface InfoStyle {
  selected: boolean;
}

const formatDate = new Intl.DateTimeFormat(undefined, {
  month: "short",
  day: "numeric",
  hour: "numeric",
});

const Wrapper = styled.div`
  flex-grow: 1;
  padding-top: 110px;
  height: calc(100% - 110px);
  background: linear-gradient(225.46deg, #0d074b 3.08%, #c84f27 96.65%), #601a1a;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const SelectionWrapper = styled.div`
  height: 1050px;
  max-height: 78%;
  display: flex;
  width: 100%;
  flex-direction: row;
  justify-content: center;
  position: relative;
  top: -15px;
  overflow: hidden;

  @media (max-width: 1920px) {
    max-height: 80%;
  }
`;

const ScrollListWrapper = styled.div`
  width: 15.5%;
  max-width: 220px;
  height: 100%;
  padding-top: 1%;
  background: rgba(14, 6, 23, 0.7);
  border-radius: 23.3557px 0px 0px 0px;
  overflow-y: auto;
  box-sizing: border-box;
  position: relative;

  &::-webkit-scrollbar {
    width: 13px;
    background: #000000;
  }

  &::-webkit-scrollbar-thumb {
    width: 13px;
    height: 137px;
    background: #694393;
    border: 1px solid #13003a;
    box-sizing: border-box;
    box-shadow: 0px 4px 7px 7px #390c6a;
    border-radius: 40px;
  }
`;

const InfoWrapper = styled.div<InfoStyle>`
  height: 100%;
  width: 75%;
  max-width: 1250px;
  background: #1c1525;
  border-radius: 0px 23px 23.3557px 0px;
  display: flex;
  justify-content: center;
  align-items: ${(props) => (props.selected ? "flex-start" : "center")};
  padding-top: ${(props) => (props.selected ? "15px" : "0px")};
`;

const ChartWrapper = styled.div`
  width: 95%;
  height: 90%;
`;

const NothingSelectedMsg = styled.div`
  font-family: DM Sans;
  font-style: normal;
  font-weight: 500;
  font-size: 24px;
  line-height: 131.2%;
  color: #ffffff;
`;

const Home: React.FC<{}> = () => {
  const { auth } = useAppSelector((state) => state.users);
  const { coins, coinSelected } = useAppSelector((state) => state.data);

  const dateArray: string[] = [];
  const countArray: number[] = [];
  const priceArray: number[] = [];
  let maxCount = 0;
  let maxPrice = 0;

  if (coins.length > 0 && coinSelected !== null) {
    // Get tweet count and market price
    coins[coinSelected].result.forEach((coin) => {
      dateArray.push(formatDate.format(new Date(coin.start)));
      countArray.push(coin.count);
      priceArray.push(coin.price);
    });

    // Max price and tweet count for axis
    maxCount = Math.max(...countArray);
    maxPrice = Math.max(...priceArray);
  }

  const data: any = {
    labels: dateArray,
    datasets: [
      {
        type: "bar",
        label: "# of Tweets",
        data: countArray,
        backgroundColor: ["rgba(54, 162, 235, 0.2)"],
        borderColor: ["rgba(54, 162, 235, 1)"],
        borderWidth: 1,
        yAxisID: "y",
      },
      {
        type: "line",
        label: "Market Price",
        data: priceArray,
        backgroundColor: ["rgba(153, 102, 255, 0.2)"],
        borderColor: ["rgba(153, 102, 255, 1)"],
        borderWidth: 1,
        yAxisID: "y1",
      },
    ],
  };

  let priceRounded = Math.round(maxPrice);
  let topPriceLimit =
    priceRounded > maxPrice
      ? priceRounded > 10
        ? priceRounded + 1
        : priceRounded
      : priceRounded + 1;

  const options: any = {
    maintainAspectRatio: false,
    stacked: false,
    scales: {
      y: {
        suggestedMax: maxCount + 1,
        position: "left",
      },
      y1: {
        suggestedMax:
          maxPrice < 0.1
            ? maxPrice + maxPrice * 0.1
            : maxPrice < 0.2
            ? maxPrice + maxPrice * 0.2
            : topPriceLimit,
        type: "linear",
        display: true,
        position: "right",
        grid: {
          drawOnChartArea: false,
        },
      },
    },
  };

  return (
    <Wrapper>
      {/* Add New Coin Modal */}
      <NewCoinModal />

      {/* Content Wrapper */}
      <SelectionWrapper>
        <ScrollListWrapper>
          {/* Add New Coin Button */}
          <OpenCoinModalBtn auth={auth} />

          {auth &&
            coins.length > 0 &&
            coins.map((coin, index) => {
              return (
                <HashtagSelector
                  key={coin.name}
                  index={index}
                  coinName={coin.name}
                  selected={index === coinSelected}
                />
              );
            })}
        </ScrollListWrapper>
        <InfoWrapper selected={coinSelected === null ? false : true}>
          {coinSelected === null || !auth ? (
            <NothingSelectedMsg>
              Select a search term to begin analysis
            </NothingSelectedMsg>
          ) : (
            <ChartWrapper>
              <Bar data={data} options={options} />
            </ChartWrapper>
          )}
        </InfoWrapper>
      </SelectionWrapper>
    </Wrapper>
  );
};

export default Home;
