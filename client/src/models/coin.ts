type Result = {
  start: number;
  end: number;
  count: number;
  price: number;
};

class Coin {
  name: string;
  result: Result[];
  gatherStart: string;
  gatherEnd: string;

  constructor(
    name: string,
    result: Result[],
    gatherStart: string,
    gatherEnd: string
  ) {
    this.name = name;
    this.result = result;
    this.gatherStart = gatherStart;
    this.gatherEnd = gatherEnd;
  }
}

export default Coin;
