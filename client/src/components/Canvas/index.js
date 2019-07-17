import React, { Component } from "react";


function findxy(res, e, obj) {
  if (res === 'down') {
    obj.prevX = obj.currX;
    obj.prevY = obj.currY;
    obj.currX = e.clientX - obj.canvas.offsetLeft;
    obj.currY = e.clientY - obj.canvas.offsetTop;

    obj.flag = true;
    obj.dot_flag = true;
    if (obj.dot_flag) {
      obj.ctx.beginPath();
      obj.ctx.fillStyle = obj.x;
      obj.ctx.fillRect(obj.currX, obj.currY, 2, 2);
      obj.ctx.closePath();
      obj.dot_flag = false;
    }
  }
  if (res === 'up' || res === "out") {
    obj.flag = false;
  }
  if (res === 'move') {
    if (obj.flag) {
      obj.prevX = obj.currX;
      obj.prevY = obj.currY;
      obj.currX = e.clientX - obj.canvas.offsetLeft;
      obj.currY = e.clientY - obj.canvas.offsetTop;
      obj.draw();
    }
  }
}


class Canvas extends Component {
  constructor(props) {
    super(props)
    this.state = {};
    this.canvas = false;
    this.ctx = false;
    this.flag = false;
    this.prevX = 0;
    this.currX = 0;
    this.prevY = 0;
    this.currY = 0;
    this.dot_flag = false;
    this.x = "black";
    this.y = 2;
    this.color = this.color.bind(this);
  }

  componentDidMount() {
    this.init();
  };

  init() {
    this.canvas = this.refs.canvas;
    this.ctx = this.canvas.getContext("2d");
    this.w = this.canvas.width;
    this.h = this.canvas.height;
    let obj = this;
    this.canvas.addEventListener("mousemove", function (e) {

      findxy('move', e, obj)
    }, false);
    this.canvas.addEventListener("mousedown", function (e) {

      findxy('down', e, obj)
    }, false);
    this.canvas.addEventListener("mouseup", function (e) {

      findxy('up', e, obj)
    }, false);
    this.canvas.addEventListener("mouseout", function (e) {

      findxy('out', e, obj)
    }, false);
  };


  draw() {
    this.ctx.beginPath();
    this.ctx.moveTo(this.prevX, this.prevY);
    this.ctx.lineTo(this.currX, this.currY);
    this.ctx.strokeStyle = this.x;
    this.ctx.lineWidth = this.y;
    this.ctx.stroke();
    this.ctx.closePath();
  };

  color(color){
    console.log("change color");
    this.x = color;
  }
  render() {
    let obj = this;
    return (<div><canvas ref="canvas" width="400" height="400" style={{ position: "absolute", top: "10%", left: "10%", border: "2px solid" }}></canvas>
      <div style={{position:"absolute", top:"12%", left:"43%"}}>Choose Color</div>
      <button style={{position:"absolute", top:"15%", left:"45%", width:"10px", height:"10px", background:"green"}} id="green" onClick={this.color.bind(this, "green")}></button>
      <button style={{position:"absolute", top:"15%", left:"46%", width:"10px", height:"10px", background:"red"}} id="red" onClick={this.color.bind(this, "red")}></button>
      <button style={{position:"absolute", top:"15%", left:"47%", width:"10px", height:"10px", background:"blue"}} id="blue" onClick={this.color.bind(this, "blue")}></button>
      <button style={{position:"absolute", top:"17%", left:"45%", width:"10px", height:"10px", background:"orange"}} id="orange" onClick={this.color.bind(this, "orange")}></button>
      <button style={{position:"absolute", top:"17%", left:"46%", width:"10px", height:"10px", background:"yellow"}} id="yellow" onClick={this.color.bind(this, "yellow")}></button>
      <button style={{position:"absolute", top:"17%", left:"47%", width:"10px", height:"10px", background:"black"}} id="black" onClick={this.color.bind(this, "black")}></button>
      <button style={{position:"absolute", top:"22%", left:"43%", width:"15px", height:"15px", background:"white"}} id="white" onClick={this.color.bind(this, "white")}></button>
      
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
