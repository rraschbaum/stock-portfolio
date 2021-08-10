class Portfolio extends React.Component {
  constructor(props) {
    super (props);
    this.state = {
      portfolio: [
        {
          name: 'Feetbook',
          shares_owned: 20,
          cost_per_share: 50,
          market_price: 130
        },{
          name: 'Yamazon',
          shares_owned: 5,
          cost_per_share: 200,
          market_price: 500
        },{
          name: 'Snoozechat',
          shares_owned: 100,
          cost_per_share: 20,
          market_price: 30
        }
      ],
      form: {
        name: '',
        shares_owned: 0,
        cost_per_share: 0,
        market_price: 0
      }
    };

    this.removeStock = this.removeStock.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleFormChange = this.handleFormChange.bind(this);
    this.addStock = this.addStock.bind(this);
  }

  removeStock(index) {
    const portfolio = this.state.portfolio.slice();
    portfolio.splice(index, 1);

    this.setState({ portfolio });
  }

  handleChange(event, index) {
    const portfolio = this.state.portfolio.slice();
    const { name, value } = event.target;

    portfolio[index][name] = value;
    this.setState({ portfolio })
  }

  handleFormChange(event) {
    const { name, value } = event.target;
    const { form } = this.state;

    form[name] = value;
    this.setState({ form });
  }

  addStock(event) {
    event.preventDefault();
    const portfolio = this.state.portfolio.slice();

    portfolio.push(this.state.form);
    this.setState({
      portfolio,
      form: {
        name: '',
        shares_owned: 0,
        cost_per_share: 0,
        market_price: 0
      }
    });
  }

  render() {
    const { 
      portfolio,
      form 
    } = this.state;

    const portfolio_market_value = portfolio.reduce((sum, stock) => stock.shares_owned * stock.market_price + sum, 0);
    const portfolio_cost = portfolio.reduce((sum, stock) => stock.shares_owned * stock.cost_per_share + sum, 0);
    const portfolio_gain_loss = portfolio_market_value - portfolio_cost;

    return(
      <div className="container">
        <h1 className="text-center my-4">Stock Portfolio</h1>
        <div className="row">
          <div className="col-12">
            <table className="table table-responsive">
              <thead>
                <tr>
                  <th scope="col">Name</th>
                  <th scope="col">Shares Owned</th>
                  <th scope="col">Cost per share ($)</th>
                  <th scope="col">Market price ($)</th>
                  <th scope="col">Market value ($)</th>
                  <th scope="col">Unrealized Gain/Loss</th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody>
                {portfolio.map((stock, index) => {
                  const {
                    name,
                    shares_owned,
                    cost_per_share,
                    market_price
                  } = stock;

                  const market_value = shares_owned * market_price;
                  const unrealized_gain_loss = market_value - shares_owned * cost_per_share;

                  return (
                    <tr key={index}>
                      <td>{name}</td>
                      <td><input onChange={e => this.handleChange(e, index)} type="number" name="shares_owned" value={shares_owned} /></td>
                      <td><input onChange={e => this.handleChange(e, index)} type="number" name="cost_per_share" value={cost_per_share} /></td>
                      <td><input onChange={e => this.handleChange(e, index)} type="number" name="market_price" value={market_price} /></td>
                      <td>{market_value}</td>
                      <td>{unrealized_gain_loss}</td>
                      <td><button className="btn btn-light btn-sm" onClick={() => this.removeStock(index)}>remove</button></td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
            <form onSubmit={this.addStock} className="col-12 mt-2 mb-4">
              <input onChange={this.handleFormChange} type="text" name="name" value={form.name} className="mr-3" placeholder="Name" required />
              <input onChange={this.handleFormChange} type="number" name="shares_owned" value={form.shares_owned} placeholder="Shares" className="mr-3" />
              <input onChange={this.handleFormChange} type="number" name="cost_per_share" value={form.cost_per_share} placeholder="Cost" className="mr-3" />
              <input onChange={this.handleFormChange} type="number" name="market_price" value={form.market_price} placeholder="PRice" className="mr-3" />
              <button type="submit" className="btn btn-primary btn-sm">add</button>
            </form>
          </div>
          <div className="col-12 col-md-6">
            <h4 className="mb-3">Portfolio value: $ {portfolio_market_value}</h4>
          </div>
          <div className="col-12 col-md-6">
            <h4 className="mb-3">Portfolio value: $ {portfolio_gain_loss}</h4>
          </div>
        </div>
      </div>
    );
  }
}

ReactDOM.render(
  <Portfolio />,
  document.getElementById('root')
)