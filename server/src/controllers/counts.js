const axios = require("axios").default;
const Coin = require("../models/coin");
const List = require("../models/list");

exports.initial = async (req, res) => {
  const coins = await Coin.find({});

  let coinsReversed = coins.reverse();

  res.json({ coins: coinsReversed });
};

exports.updateCoinList = async (req, res) => {
  let listResponse;
  let list;

  await axios
    .get(`https://api.coingecko.com/api/v3/coins/list`)
    .then((res) => {
      listResponse = res.data;
    })
    .catch((err) => {
      console.log(err);
    });

  if (listResponse) {
    list = await List.find({});

    let ids = new Set(list.map(({ id }) => id));
    let missing = listResponse.filter(({ id }) => !ids.has(id));

    missing.forEach(async (item, index) => {
      // New Coin, add to List
      const lists = new List({
        id: item.id,
        name: item.name,
        name_lower: item.name.toLowerCase(),
        ticker: item.symbol,
      });

      await lists.save(function (err) {
        if (err) return console.log(err);
        // saved!

        if (index === missing.length - 1) {
          res.json({ success: true });
        }
      });
    });
  } else {
    res.json({ error: true });
  }
};

exports.newCoin = async (req, res) => {
  const { searchTerm, token_id } = req.body;
  if (searchTerm) {
    let tweetData;
    let startDate;
    let endDate;

    await axios
      .get(
        `https://api.twitter.com/2/tweets/counts/recent?query=%23${searchTerm}`,
        {
          headers: { Authorization: `Bearer ${process.env.TWITTER_KEY}` },
        }
      )
      .then((res) => {
        tweetData = res.data.data;
      })
      .catch((err) => {
        console.log(err);
      });

    if (tweetData) {
      startDate = tweetData[0].start;
      endDate = tweetData[tweetData.length - 1].end;

      const counts = [];
      let prices;

      let startDateSeconds = new Date(startDate).getTime();
      let endDateSeconds = new Date(endDate).getTime();

      // Get Market Data
      await axios
        .get(
          `https://api.coingecko.com/api/v3/coins/${token_id}/market_chart/range?vs_currency=usd&from=${
            startDateSeconds / 1000
          }&to=${endDateSeconds / 1000}`
        )
        .then((res) => {
          prices = res.data.prices;
        })
        .catch((err) => console.log(err));

      let prevKnownPrice;

      tweetData.forEach((count, index) => {
        let start = new Date(count.start);
        let end = new Date(count.end);

        let priceDate = prices.filter(
          (price) =>
            new Date(price[0]).setMinutes(0, 0, 0) === start.setMinutes(0, 0, 0)
        );

        if (index === 0) {
          prevKnownPrice = prices[0] ? prices[0][1] : 0;
        } else if (priceDate && priceDate.length > 0) {
          prevKnownPrice = priceDate[0][1];
        }

        counts.push({
          start: start.getTime(),
          end: end.getTime(),
          count: count.tweet_count,
          price: prevKnownPrice,
        });
      });

      const coins = new Coin({
        name: searchTerm,
        result: counts,
        gatherStart: startDateSeconds,
        gatherEnd: endDateSeconds,
      });

      await coins.save(function (err) {
        if (err) return console.log(err);
        // saved!
        res.json({ newCoin: coins });
      });
    }
  }
};

exports.ticker = async (req, res) => {
  const { name } = req.body;
  if (name) {
    const lists = await List.find({
      name_lower: { $regex: name, $options: "i" },
    });

    res.json({ lists: lists });
  }
};
