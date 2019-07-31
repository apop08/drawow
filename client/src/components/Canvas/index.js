import React, { Component } from "react";
import Slider from "./components/Slider";
import $ from "jquery"
import { ChromePicker } from 'react-color';
import './style.css'
// import RandomWord from "../Game/components/GameInfo/RandomWord"
import GuessBox from '../GuessBox';
import { Z_ASCII } from "zlib";

function getPosition(mouseEvent, sigCanvas) {
  var rect = sigCanvas.getBoundingClientRect();
  return {
    X: mouseEvent.clientX - rect.left,
    Y: mouseEvent.clientY - rect.top
  };
}

function drawLine(mouseEvent, sigCanvas, context) {

  var position = getPosition(mouseEvent, sigCanvas);

  context.lineTo(position.X, position.Y);
  context.stroke();
}

function finishDrawing(mouseEvent, sigCanvas, context) {
  // draw the line to the finishing coordinates
  drawLine(mouseEvent, sigCanvas, context);

  context.closePath();

  // unbind any events which could draw
  $(sigCanvas).unbind("mousemove")
    .unbind("mouseup")
    .unbind("mouseout");


}


class Canvas extends Component {
  constructor(props) {
    super(props)
    this.state = { color: "000000", colorOption: null };
    this.canvas = false;
    this.ctx = false;
    this.x = this.state.color;
    //this.y = 2;
    this.color = this.color.bind(this);
    this.openColor = this.openColor.bind(this);
    //let obj = this;
    //this.handleChange = this.handleChange.bind(this);

  }

  componentDidMount() {
    this.init();

  };
  clearCanvas() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
  init() {
    this.canvas = this.refs.canvas;
    //console.log(this.canvas);
    this.colorbar = this.refs.colorbar;
    //console.log(this.colorbar);
    this.ctx = this.canvas.getContext("2d");
    this.ctx.lineJoin = "round";


    this.history = {
      redo_list: [],
      undo_list: [],


      saveState: function (canvas, list, keep_redo) {
        keep_redo = keep_redo || false;
        if (!keep_redo) {
          this.redo_list = [];
        }
        console.log(canvas);
        (list || this.undo_list).push(canvas.toDataURL());
      },


      undo: function (canvas, ctx, obj) {
        console.log("undo");

        this.restoreState(canvas, ctx, this.undo_list, this.redo_list, obj);

      },

      redo: function (canvas, ctx, obj) {
        console.log("redo");

        this.restoreState(canvas, ctx, this.redo_list, this.undo_list, obj);
      },

      restoreState: function (canvas, ctx, pop, push, obj) {
        if (pop.length) {
          this.saveState(canvas, push, true);
          let restore_state = pop.pop();
          let img = new Image();
          img.src = restore_state;
          console.log(img);
          //ctx.clearRect(0, 0, canvas.width, canvas.height);
          //ctx.drawImage(img, 0, 0, canvas.width, canvas.height, 0, 0, canvas.width, canvas.height);
          img.onload = function () {
            //draw background image
            ctx.clearRect(0, 0, canvas.width, canvas.height)
            ctx.drawImage(img, 0, 0);
            //draw a box over the top
            //ctx.fillStyle = "rgba(200, 0, 0, 0.5)";
            //ctx.fillRect(0, 0, 500, 500);
            obj.sendImage(canvas);
          };
        }
      }
    }
    let obj = this;




    $('#undo').click(function () {
      obj.history.undo(obj.canvas, obj.ctx, obj.props.gameobj);
    });

    $('#redo').click(function () {
      obj.history.redo(obj.canvas, obj.ctx, obj.props.gameobj);

    });

    $("#canvas").mousedown(function (mouseEvent) {
      if (obj.props.state == 'playing' && obj.props.drawer) {
        var position = getPosition(mouseEvent, obj.canvas);
        obj.ctx.moveTo(position.X, position.Y);
        obj.ctx.beginPath();
        obj.history.saveState(obj.canvas);

        // attach event handlers
        $(this).mousemove(function (mouseEvent) {
          drawLine(mouseEvent, obj.canvas, obj.ctx);
        }).mouseup(function (mouseEvent) {
          console.log("mouseup");

          obj.props.gameobj.sendImage(obj.canvas);
          finishDrawing(mouseEvent, obj.canvas, obj.ctx, obj.history);
        }).mouseout(function (mouseEvent) {
          console.log("mouseout");

          obj.props.gameobj.sendImage(obj.canvas);
          finishDrawing(mouseEvent, obj.canvas, obj.ctx, obj.history);
        });
      }
    });

  }
  setMouseEvents() {
    const obj = this;
    $("#canvas").mousedown(function (mouseEvent) {
      if (obj.props.state == 'playing') {
        var position = getPosition(mouseEvent, obj.canvas);
        obj.ctx.moveTo(position.X, position.Y);
        obj.ctx.beginPath();
        obj.history.saveState(obj.canvas);

        // attach event handlers
        $(this).mousemove(function (mouseEvent) {
          drawLine(mouseEvent, obj.canvas, obj.ctx);
        }).mouseup(function (mouseEvent) {
          console.log("mouseup");

          obj.props.gameobj.sendImage(obj.canvas);
          finishDrawing(mouseEvent, obj.canvas, obj.ctx, obj.history);
        }).mouseout(function (mouseEvent) {
          console.log("mouseout");

          obj.props.gameobj.sendImage(obj.canvas);
          finishDrawing(mouseEvent, obj.canvas, obj.ctx, obj.history);
        });
      }
    });
  }
  recPic(img) {
    //console.log(img);
    let pic = new Image();
    pic.src = img;
    //console.log(pic);
    let obj = this;
    pic.onload = function () {
      //draw background image
      obj.ctx.clearRect(0, 0, obj.canvas.width, obj.canvas.height)
      obj.ctx.drawImage(pic, 0, 0);

    };
  }
  color(color) {
    this.setState({ color: color });
    this.ctx.strokeStyle = this.state.color;
  }
  brush(size) {
    this.ctx.lineWidth = size;
  }
  handleChange = (color) => {
    console.log(color.hex)
    this.setState({ color: color.hex });
    this.ctx.strokeStyle = this.state.color;

  }
  openColor(e) {
    e.preventDefault();
    if (this.state.colorOption === true) {
      this.setState({ colorOption: false });
    } else {
      this.setState({ colorOption: true });
    }


  }
  render() {
    let drawingStuff = null;
    let word = null;
    const canvas = <canvas id="canvas" ref="canvas" width="300" height="300" style={{ position: "absolute", top: "10%", left: "10%", border: "2px solid" }}></canvas>;
    let palette;
    let extra;
    if (this.state.colorOption) {
      palette = <div style={{ position: "absolute", top: "12%", left: "60%" }}>
        <ChromePicker color={this.state.color} onChangeComplete={this.handleChange} />
      </div>
    }
    if (this.props.drawer) {
      word = this.props.word;
      extra = (<div>{palette}
        <div id="palette">
          <button className="btn btn-secondary" id="white" onClick={this.color.bind(this, "white")}><i className="fas fa-eraser"></i></button>
          <button className="btn btn-secondary" id="undo"><i className="fas fa-undo"></i></button>
          <button className="btn btn-secondary" id="redo"><i className="fas fa-redo"></i></button>
          <button className="btn btn-secondary" id="color" onClick={this.openColor}><i className="fas fa-palette"></i></button>
          <Slider min="1" max="15" value="1" step="1" fn={this.brush.bind(this)} />
        </div></div>)
    } else {
      extra =
        <div id="guessBox">{this.props.guesser} : <GuessBox answer={this.props.word} /></div>
    }
    drawingStuff = <div className="container">
      drawer : {this.props.drawerName}
      <br></br>
      {word}
      {canvas}
      {extra}
    </div>
    //let obj = this;
    console.log(this.state)
    return drawingStuff
  }
}


export default Canvas;
