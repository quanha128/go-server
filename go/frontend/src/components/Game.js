import React, { Component } from "react";
import Chat from "./Chat";
import {
  FormControl,
  TextField,
  Input,
  InputLabel,
  FormHelperText,
  Grid,
} from "@material-ui/core";
import ultilities from "../../static/css/ultilities.module.css";

const imagesPath = "../../static/images/";
const positionConst = {
  UP: 1,
  LEFT: 1 << 1,
  BOTTOM: 1 << 2,
  RIGHT: 1 << 3,
  DOT: 1 << 4,
};
const positionImage = {
  // 1111: have up, left, bottom, right
  [positionConst.LEFT | positionConst.BOTTOM]: "Eul.png",
  [positionConst.LEFT | positionConst.BOTTOM | positionConst.RIGHT]: "Eum.png",
  [positionConst.BOTTOM | positionConst.RIGHT]: "Eur.png",
  [positionConst.UP | positionConst.LEFT | positionConst.BOTTOM]: "Eml.png",
  [positionConst.UP |
  positionConst.LEFT |
  positionConst.BOTTOM |
  positionConst.RIGHT]: "Emm.png",
  [positionConst.UP | positionConst.BOTTOM | positionConst.RIGHT]: "Emr.png",
  [positionConst.UP | positionConst.LEFT | positionConst.RIGHT]: "Ebm.png",
  [positionConst.UP | positionConst.LEFT]: "Ebl.png",
  [positionConst.UP | positionConst.RIGHT]: "Ebr.png",
  [positionConst.DOT]: ",.png",
};
console.log(positionImage);

const EMPTY = ".";
const WHITE = "w";
const BLACK = "b";
const WHITE_GHOST = "wg"; // for hover effect
const BLACK_GHOST = "bg"; // for hover effect

function Square(props) {
  const ghostClass = ((props.value == BLACK_GHOST || props.value == WHITE_GHOST) ? ultilities["ghost"] : "");
  const goPiece = (
    <svg height="23" width="23" className={ghostClass}>
      <defs>
        <radialGradient
          id="blackPiece"
          cx="10%"
          cy="10%"
          r="70%"
          fx="20%"
          fy="20%"
        >
          <stop offset="0%" style={{ "stop-color": "#C0C0C0" }} />
          <stop offset="100%" style={{ "stop-color": "black" }} />
        </radialGradient>
        <radialGradient
          id="whitePiece"
          cx="70%"
          cy="70%"
          r="95%"
          fx="20%"
          fy="20%"
        >
          <stop offset="0%" style={{ "stop-color": "#FFFFFF" }} />
          <stop offset="100%" style={{ "stop-color": "#A9A9A9" }} />
        </radialGradient>
      </defs>
      <circle
        cx="50%"
        cy="50%"
        r="45%"
        fill={`url(${props.value.includes(BLACK) ? "#blackPiece" : "#whitePiece"})`}
      />
    </svg>
  );
  let goSquare = (props.value == EMPTY ? null : goPiece);
  return (
    <div
      onMouseEnter={() => props.onMouseEnter()}
      // onMouseLeave={() => props.onMouseLeave()}
      onClick={() => props.onClick()}
      className={ultilities["imgOverlayWrap"]}
    >
      <img src={props.srcImg} />
      {goSquare}
    </div>
  );
  // if (props.value == EMPTY) {
  //   return (
  //     <div
  //       onMouseEnter={() => props.onMouseEnter()}
  //       // onMouseLeave={() => props.onMouseLeave()}
  //       onClick={() => props.onClick()}
  //       className={ultilities["imgOverlayWrap"]}
  //     >
  //       <img src={props.srcImg} />
  //     </div>
  //   );
  // } else if (props.value == BLACK_GHOST || props.value == WHITE_GHOST) {
  //   return (
  //     <div
  //       onMouseEnter={() => props.onMouseEnter()}
  //       // onMouseLeave={() => props.onMouseLeave()}
  //       onClick={() => props.onClick()}
  //       className={ultilities["imgOverlayWrap"] + " " + ultilities["ghost"]}
  //     >
  //       <img src={props.srcImg} className={ultilities["unghost"]}/>
  //       {goSquare}
  //     </div>
  //   );
  // } else {
  //   return (
  //     <div
  //       onMouseEnter={() => props.onMouseEnter()}
  //       // onMouseLeave={() => props.onMouseLeave()}
  //       onClick={() => props.onClick()}
  //       className={ultilities["imgOverlayWrap"]}
  //     >
  //       <img src={props.srcImg} />
  //       {goSquare}
  //     </div>
  //   );
  // }
}

class Board extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let lineSquares = [];
    const size = Math.sqrt(this.props.boardArray.length);
    for (let i = 0; i < size; i++) {
      let line = this.props.boardArray.slice(i * size, (i + 1) * size);

      line = line.map((value, idx) => {
        let positionFlag = 0;
        let ii = i,
          jj = idx;
        positionFlag |= ii != 0 ? positionConst.UP : 0;
        positionFlag |= ii != size - 1 ? positionConst.BOTTOM : 0;
        positionFlag |= jj != 0 ? positionConst.RIGHT : 0;
        positionFlag |= jj != size - 1 ? positionConst.LEFT : 0;
        return (
          <Square
            key={i * size + idx}
            value={value}
            srcImg={imagesPath + positionImage[String(positionFlag)]}
            onClick={() => this.props.onClick(i * size + idx)}
            onMouseEnter={() => this.props.onMouseEnter(i * size + idx)}
          />
        );
      });

      lineSquares = lineSquares.concat(
        <Grid
          item
          xs={12}
          alignItems={"center"}
          style={{ display: "inline-flex" }}
        >
          {line}
        </Grid>
      );
    }
    return (
      <Grid container justify="center" spacing={0}>
        {lineSquares}
      </Grid>
    );
  }
}

export default class Game extends Component {
  constructor(props) {
    super(props);
    this.gameId = this.props.match.params.id;
    this.state = {
      boardSize: 19,
      boardArray: Array(19 * 19).fill(EMPTY),
      isWhite: true,
      isTurn: true,
      whitePlayer: "game_id1",
      blackPlayer: "game_id2",
      chatLog: [],
    };
  }

  componentDidMount() {
    /* fetch id of player here */
    // update isTurn, whitePlayer, blackPlayer, size
  }

  onPlayerMove(idx) {
    
    const isWhite = this.state.isWhite;
    let boardArray = this.state.boardArray.slice();
    if (boardArray[idx] == EMPTY || boardArray[idx] == WHITE_GHOST || boardArray[idx] == BLACK_GHOST) {
      console.log("At " + idx);
      boardArray[idx] = isWhite === true ? WHITE : BLACK;
      console.log(boardArray[idx]);
      // fetch api here to update board state
      this.setState({
        lastHover: null,
        isWhite: isWhite == true ? false : true,
        boardArray: boardArray,
      });
    }
  }

  onPlayerHover(idx) {
    console.log("Hover at " + idx);
    const isWhite = this.state.isWhite;
    let boardArray = this.state.boardArray.slice();
    if(this.state.lastHover != null)
      boardArray[this.state.lastHover] = EMPTY;
    if(boardArray[idx] == WHITE || boardArray[idx] == BLACK)
      return;
    if (boardArray[idx] == EMPTY) {
      
      boardArray[idx] = isWhite === true ? WHITE_GHOST : BLACK_GHOST;
      console.log(boardArray[idx]);
      // fetch api here to update board state
    }
    this.setState({
      lastHover: idx,
      isWhite: isWhite,
      boardArray: boardArray,
    });
  }

  leaveGameButtonPressed() {
    this.props.leaveGameCallback();
    this.props.history.push("/");
  }

  render() {
    let crntPlayer =
      "Current player" +
      (this.state.isWhite
        ? `(White): ${this.state.whitePlayer}`
        : `(Black): ${this.state.blackPlayer}`);
    return (
      <div>
        <button onClick={() => this.leaveGameButtonPressed()}>
          Leave game
        </button>
        <div>{crntPlayer}</div>
        <Grid container spacing={4}>
          <Grid item xs={8}>
            <Board
              boardArray={this.state.boardArray}
              onClick={(idx) => this.onPlayerMove(idx)}
              onMouseEnter={(idx) => this.onPlayerHover(idx)}
            />
          </Grid>
          <Grid item xs={4}>
            <Chat chatLog={this.state.chatLog} />
          </Grid>
        </Grid>
      </div>
    );
  }
}
