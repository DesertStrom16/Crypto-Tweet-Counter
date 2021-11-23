class ListOption {
  id: string;
  name: string;
  name_lower: string;
  ticker: string;

  constructor(id: string, name: string, name_lower: string, ticker: string) {
    this.id = id;
    this.name = name;
    this.name_lower = name_lower;
    this.ticker = ticker;
  }
}

export default ListOption;
