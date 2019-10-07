import React, { Component } from 'react';
import Square from '../component/Square';

export default class Board extends Component {
  constructor(props) {
    super(props);

    this.state = {
      squares: Array(9).fill(null),
      xIsNext: true,
    };
  }

  handleClick = i => {
    /* Shallow copy the previous state */
    const squares = [...this.state.squares]; //or  = Array.from(this.state.squares)

    /* Determine who is next */
    squares[i] = this.state.xIsNext ? 'X' : 'O';

    /* Modify state */
    this.setState(state => ({ squares, xIsNext: !state.xIsNext }));
  };

  renderSquare(i) {
    return <Square value={this.state.squares[i]} onClick={() => this.handleClick(i)} />;
  }



  render() {
    const status = `Next player: ${this.state.xIsNext ? 'X' : 'O'}`;

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}
