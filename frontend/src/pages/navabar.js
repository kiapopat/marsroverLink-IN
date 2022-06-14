import React, { Component } from "react";
import Gui, { GuiButton } from "react-gui-controller";

class navabar extends Component {
  state = {
    data: {
    }}
 
  handleLeft = () => {
    let ctx = document.getElementById("sketch").getContext("2d");
    ctx.clearRect(
      -window.innerWidth,
      -(window.innerHeight - 50),
      window.innerWidth * 2,
      2 * (window.innerHeight - 50)
    );
    ctx.fillStyle = this.state.background;
    ctx.fillRect(
      -window.innerWidth,
      -(window.innerHeight - 50),
      window.innerWidth * 2,
      2 * (window.innerHeight - 50)
    );
  };

  /*   handleErase = () => {
    let ctx = document.getElementById("sketch").getContext("2d");
    ctx.clearRect(
      -window.innerWidth,
      -(window.innerHeight - 50),
      window.innerWidth * 2,
      2 * (window.innerHeight - 50)
    );
    ctx.fillStyle = this.state.background;
    ctx.fillRect(
      -window.innerWidth,
      -(window.innerHeight - 50),
      window.innerWidth * 2,
      2 * (window.innerHeight - 50)
    );
  }; */

  /*   handleDownload = () => {
    let canvas = document.getElementById("sketch");
    document.getElementById("download").href = canvas.toDataURL();
    document.getElementById("download").download = "art.png";
  }; */


  render() {
    return (
      <React.Fragment>
        <Gui data={this.state.data} theme="dark" onUpdate={this.update}>
          {/* <GuiNumber path="div" label="Divisions" min={2} max={40} step={1} />
          <GuiBool path="mirror" label="Mirror" />
          <GuiBool path="rainbow" label="RainbowMode" />
          <GuiColor path="color" label="StrokeColor" type="rgb" /> */}
          <GuiButton label="About" onClick={this.handleForward} />
          <GuiButton label="Battery" onClick={this.handleLeft} />
          <GuiButton label="Control" onClick={this.handleRight} />
          <GuiButton label="Map" onClick={this.handleStop} />
          {/* <GuiColor path="background" label="BackgroundColor" type="hex" />*/}
          <GuiButton label="Backwards" onClick={this.handleBackward} />
        </Gui>
        {this.props.render(this.state)}
      </React.Fragment>
    );
  }
}

export default navabar;