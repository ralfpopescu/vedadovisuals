import React from "react";
import styled from "styled-components";
import Art from "../Art";
import { textures } from "../../textures";
import randomColor from "randomcolor";

const Container = styled.div`
  position: absolute;
  display: flex;
  flex-grow: 1;
  flex-direction: row;
  height: 1200px;
  background-color: #1b1b1b;
  color: white;
  width: 100%;
`;

const generateColors = (number, hue) => {
  return randomColor({
    count: number,
    luminosity: "random",
    hue: hue
  });
};

const generateStripes = (number, hue) => {
  const colors = randomColor({
    count: number,
    luminosity: "random",
    hue: hue
  });

  return colors.map(color => ({
    color,
    width: Math.round(Math.random() * 100)
  }));
};

class VisualController extends React.Component {
  constructor(props) {
    super(props);
    this.artRef = React.createRef();
    this.state = {
      top: 0,
      left: 0,
      hue: "random",
      numberOfStripes: 15,
      numberOfDots: 0,
      dotColors: generateColors(0, "random"),
      stripes: generateStripes(15, "random"),
      texture: "none"
    };
  }

  handleStripeNumberChange(event) {
    this.setState({ numberOfStripes: event.target.value });
    this.setState({
      stripeColors: generateColors(event.target.value, this.state.hue)
    });
    this.setState({
      stripes: generateStripes(event.target.value, this.state.hue)
    });
  }

  handleDotNumberChange(event) {
    this.setState({ numberOfDots: event.target.value });
    this.setState({
      dotColors: generateColors(event.target.value, this.state.hue)
    });
  }

  handleTextureChange(value) {
    this.setState({ texture: value });
  }

  randomizeColors() {
    this.setState({
      stripeColors: generateColors(this.state.numberOfStripes, this.state.hue)
    });
    this.setState({
      dotColors: generateColors(this.state.numberOfDots, this.state.hue)
    });
    this.setState(prevState => ({
      stripes: prevState.stripes.map(stripe => ({
        color: randomColor({
          luminosity: "random",
          hue: this.state.hue
        }),
        width: stripe.width
      }))
    }));
  }

  randomizeWidths() {
    this.setState(prevState => ({
      stripes: prevState.stripes.map(stripe => ({
        color: stripe.color,
        width: Math.round(Math.random() * 100)
      }))
    }));
  }

  changeColor(index, color) {
    this.setState(prevState => ({
      stripes: prevState.stripes.map((stripe, i) => {
        if (i === index) {
          return { color, width: stripe.width };
        }
        return stripe;
      })
    }));
  }

  changeWidth(index, width) {
    this.setState(prevState => ({
      stripes: prevState.stripes.map((stripe, i) => {
        if (i === index) {
          return { color: stripe.color, width };
        }
        return stripe;
      })
    }));
  }

  handleColorChange = (index, color) => this.changeColor(index, color);

  randomizeTexture() {
    const randomInteger = (min, max) => {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    this.handleTextureChange(textures[randomInteger(1, textures.length - 1)]);
  }

  render() {
    const {
      top,
      left,
      artWidth,
      artHeight,
      stripes,
      dotColors,
      texture
    } = this.state;
    return (
      <Container>
        <Art
          top={top}
          left={left}
          artWidth={artWidth}
          artHeight={artHeight}
          dotColors={dotColors}
          texture={texture}
          stripes={stripes}
          ref={this.artRef}
        />
      </Container>
    );
  }
}

export default VisualController;
