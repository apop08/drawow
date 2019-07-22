import React, { Component } from "react";
import Slider from "./components/Slider";
import $ from "jquery"
import { ChromePicker } from 'react-color';
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
    this.state = { color: "000000" };
    this.canvas = false;
    this.ctx = false;
    this.x = this.state.color;
    //this.y = 2;
    this.color = this.color.bind(this);
    //let obj = this;
    //this.handleChange = this.handleChange.bind(this);

  }

  componentDidMount() {
    this.init();
  };

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
    if (this.props.drawer) {
      let obj = this;




      $('#undo').click(function () {
        obj.history.undo(obj.canvas, obj.ctx, obj.props.gameobj);
      });

      $('#redo').click(function () {
        obj.history.redo(obj.canvas, obj.ctx, obj.props.gameobj);
        
      });

      $("#canvas").mousedown(function (mouseEvent) {
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
      });
    }
  }

  recPic(img) {
    console.log(img);
    let pic = new Image();
    pic.src = img;
    console.log(pic);
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
  render() {
    let drawingStuff = <div><canvas id="canvas" ref="canvas" width="400" height="400" style={{ position: "absolute", top: "10%", left: "10%", border: "2px solid" }}></canvas></div>;
    if (this.props.drawer) {
      drawingStuff = <div><div style={{ position: "absolute", top: "12%", left: "60%" }}>
        Color: <ChromePicker color={this.state.color} onChangeComplete={this.handleChange} />
      </div>
        <canvas id="canvas" ref="canvas" width="400" height="400" style={{ position: "absolute", top: "10%", left: "10%", border: "2px solid" }}></canvas>
        <div style={{ position: "absolute", top: "12%", left: "43%" }}>Choose Color</div>
        <button style={{ position: "absolute", top: "22%", left: "43%", width: "15px", height: "15px", background: "white" }} id="white" onClick={this.color.bind(this, "white")}></button>
        <button style={{ position: "absolute", top: "28%", left: "43%", width: "15px", height: "15px", background: "white" }} id="undo">Undo</button>
        <button style={{ position: "absolute", top: "28%", left: "45%", width: "15px", height: "15px", background: "white" }} id="redo">Redo</button>
        <Slider style={{ position: "absolute", top: "25%", left: "43%", width: "100px", height: "15px", background: "black" }} min="1" max="15" value="1" step="1" fn={this.brush.bind(this)} />
        </div>
    }

    //let obj = this;
    console.log(this.state)
    return drawingStuff;
  }
}


export default Canvas;
