import React, { Component } from "react";
import Slider from "./components/Slider";
import $ from "jquery"

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
    this.state = {};
    this.canvas = false;
    this.ctx = false;
    this.x = "black";
    //this.y = 2;
    this.color = this.color.bind(this);
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
    let obj = this;
    $("#canvas").mousedown(function (mouseEvent) {
      var position = getPosition(mouseEvent, obj.canvas);
      obj.ctx.moveTo(position.X, position.Y);
      obj.ctx.beginPath();

      // attach event handlers
      $(this).mousemove(function (mouseEvent) {
        drawLine(mouseEvent, obj.canvas, obj.ctx);
      }).mouseup(function (mouseEvent) {
        finishDrawing(mouseEvent, obj.canvas, obj.ctx);
      }).mouseout(function (mouseEvent) {
        finishDrawing(mouseEvent, obj.canvas, obj.ctx);
      });
    });
  }

  color(color) {
    console.log("change color");
    this.ctx.strokeStyle = color;

    
  }

  brush(size) {
    console.log("change brush");
    this.ctx.lineWidth = size;
  }
  render() {
    let obj = this;
    return (<div>
      
      Color: <input class="jscolor" ref="colorbar" value={this.ctx.strokeStyle} onChange={obj.color.bind(obj, this.colorbar.value)}></input>
      <canvas id="canvas" ref="canvas" width="400" height="400" style={{ position: "absolute", top: "10%", left: "10%", border: "2px solid" }}></canvas>
      <div style={{ position: "absolute", top: "12%", left: "43%" }}>Choose Color</div>
      <button style={{ position: "absolute", top: "15%", left: "45%", width: "10px", height: "10px", background: "green" }} id="green" onClick={this.color.bind(this, "green")}></button>
      <button style={{ position: "absolute", top: "15%", left: "46%", width: "10px", height: "10px", background: "red" }} id="red" onClick={this.color.bind(this, "red")}></button>
      <button style={{ position: "absolute", top: "15%", left: "47%", width: "10px", height: "10px", background: "blue" }} id="blue" onClick={this.color.bind(this, "blue")}></button>
      <button style={{ position: "absolute", top: "17%", left: "45%", width: "10px", height: "10px", background: "orange" }} id="orange" onClick={this.color.bind(this, "orange")}></button>
      <button style={{ position: "absolute", top: "17%", left: "46%", width: "10px", height: "10px", background: "yellow" }} id="yellow" onClick={this.color.bind(this, "yellow")}></button>
      <button style={{ position: "absolute", top: "17%", left: "47%", width: "10px", height: "10px", background: "black" }} id="black" onClick={this.color.bind(this, "black")}></button>
      <button style={{ position: "absolute", top: "22%", left: "43%", width: "15px", height: "15px", background: "white" }} id="white" onClick={this.color.bind(this, "white")}></button>
      <Slider style={{ position: "absolute", top: "25%", left: "43%", width: "100px", height: "15px", background: "white" }} min="1" max="15" value="10" step="1" fn={this.brush.bind(this)} />
      {/*<div style={{position:"absolute", top:"15%", left:"46%", width:"10px", height:"10px", background:"blue"}} id="blue" onClick={color(this)}></div>
      <div style={{position:"absolute", top:"15%", left:"47%", width:"10px", height:"10px", background:"red"}} id="red" onClick="color(this)"></div>
      <div style={{position:"absolute", top:"17%", left:"45%", width:"10px", height:"10px", background:"yellow"}} id="yellow" onClick="color(this)"></div>
      <div style={{position:"absolute", top:"17%", left:"46%", width:"10px", height:"10px", background:"orange"}} id="orange" onClick="color(this)"></div>
      <div style={{position:"absolute", top:"17%", left:"47%", width:"10px", height:"10px", background:"black"}} id="black" onClick="color(this)"></div>
      <div style={{position:"absolute", top:"20%", left:"43%"}}>Eraser</div>
      <div style={{position:"absolute", top:"22%", left:"45%", width:"15px", height:"15px", background:"white", border:"2px solid"}} id="white" onclick="Color(this)"></div>
      <img id="canvasimg" alt="canvas" style={{position:"absolute", top:"10%", left:"52%", display: "none"}} />
      <input type="button" value="save" id="btn" size="30" onclick="save()" style={{position:"absolute", top:"55%", left:"10%"}} /> 
      <input type="button" value="clear" id="clr" size="23" onclick="erase()" style={{position:"absolute", top:"55%", left:"15%"}} />*/}
    </div>)
  }
}


export default Canvas;
