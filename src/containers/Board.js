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

  // ------------------------- ACTION METHODS -------------------------//

  handleClick = i => {
    /* Shallow copy the previous state */
    const squares = [...this.state.squares]; //or  = Array.from(this.state.squares)

    /* Check if we have winner */
    if (this.calculateWinner(squares) || squares[i]) return;

    /* Determine who is next */
    squares[i] = this.state.xIsNext ? 'X' : 'O';

    /* Modify state */
    this.setState(state => ({ squares, xIsNext: !state.xIsNext }));
  };

  // ------------------------- GENERIC METHODS -------------------------//

  renderSquare(i) {
    return <Square value={this.state.squares[i]} onClick={() => this.handleClick(i)} />;
  }

  calculateWinner = squares => {
    const lines = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  };

  // ------------------------- RENDER -------------------------//

  render() {
    const winner = this.calculateWinner(this.state.squares);
    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

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
