/**
 * @ Author: zy.yang
 * @ Create Time: 2020-08-07 08:24:42
 * @ Modified by: zi.yang
 * @ Modified time: 2020-08-17 07:45:43
 * @ Description:
 */
require('./css/index.css');
const { ToyReact, Component } = require("@/ToyReact");

class Square extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: null,
    };
  }

  render() {
    return (
      <button className='square' onClick={() => this.setState({ value: 'X' })}>
        {this.state.value || ''}
      </button>
    );
  }
}

class Board extends Component {
  renderSquare(i) {
    return <Square value={i} />;
  }

  render() {
    return (
      <div>
        <div className='board-row'>
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className='board-row'>
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className='board-row'>
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

ToyReact.render(<Board/>, document.body);
