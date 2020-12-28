import React, { Component } from "react";
import ChatLog from "./ChatLog";
import {
  FormControl,
  TextField,
  Input,
  InputLabel,
  FormHelperText,
  Grid,
} from "@material-ui/core";
import ultilities from '../../static/css/ultilities.module.css';

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

function Square(props) {
  const goPiece = (
          <svg height="23" width="23">
          <defs>
            <radialGradient id="blackPiece" cx="10%" cy="10%" r="70%" fx="20%" fy="20%">
            <stop offset="0%" style={{"stop-color":"#C0C0C0"}} />
            <stop offset="100%" style={{"stop-color":"black"}} />
            </radialGradient>
            <radialGradient id="whitePiece" cx="70%" cy="70%" r="95%" fx="20%" fy="20%">
            <stop offset="0%" style={{"stop-color":"#FFFFFF"}} />
            <stop offset="100%" style={{"stop-color":"#A9A9A9"}} />
            </radialGradient>
          </defs>
          <circle cx="50%" cy="50%" r="45%" fill={`url(${props.value == BLACK ? "#blackPiece" : "#whitePiece"})`} />
          </svg>);
  const goSquare = ((props.value == EMPTY) ? null : goPiece);
  
  return <div onClick={() => props.onClick()} className={ultilities["imgOverlayWrap"]}><img src={props.srcImg}/>{goSquare}</div>;
  // return (<div>{goPiece}<img src={props.srcImg} onClick={() => console.log("Clicked")} /></div>);
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
            value={value}
            srcImg={imagesPath + positionImage[String(positionFlag)]}
            onClick={() => this.props.onClick(i * size + idx)}
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
    };
    // this.onPlayerMove = this.onPlayerMove.bind(this);
  }

  componentDidMount() {
    /* fetch id of player here */
    // update isTurn, whitePlayer, blackPlayer, size
  }

  onPlayerMove(idx) {
    console.log("At " + idx);
    
    const isWhite = this.state.isWhite;
    let boardArray = this.state.boardArray.slice();
    if (boardArray[idx] == EMPTY) {
      
      boardArray[idx] = (isWhite === true ? WHITE : BLACK);
      console.log(boardArray[idx]);
      // fetch api here to update board state
      this.setState({
        isWhite: (isWhite == true ? false : true),
        boardArray: boardArray,
      });
    }
  }

  leaveGameButtonPressed(){
    this.props.leaveGameCallback();
    this.props.history.push('/');
  }

  render() {
    let crntPlayer =
      "Current player" +
      (this.state.isWhite
        ? `(White): ${this.state.whitePlayer}`
        : `(Black): ${this.state.blackPlayer}`);
    return (
      <div>
        <button onClick={() => this.leaveGameButtonPressed()}>Leave game</button>
        <div>{crntPlayer}</div>
        <Grid container spacing={4}>
          <Grid item xs={8}>
            <Board
              boardArray={this.state.boardArray}
              onClick={(idx) => this.onPlayerMove(idx)}
            />
          </Grid>
          <Grid item xs={4}>
            <ChatLog />
            <FormControl>
              <TextField label="Message"></TextField>
              <FormHelperText id="my-helper-text">
                Type your message here.
              </FormHelperText>
            </FormControl>
          </Grid>
        </Grid>
      </div>
    );
  }
}
