import React from "react";
import styled from "styled-components";
import Art from "../Art";
import { textures } from "../../textures";
import randomColor from "randomcolor";
import ReactInterval from "react-interval";

const Container = styled.div`
  position: absolute;
  display: flex;
  flex-grow: 1;
  flex-direction: row;
  height: 1200px;
  background-color: white;
  color: white;
  width: 100%;
`;

const Controller = styled.div`
  position: fixed;
  top: 15;
  left: 15;
  z-index: 1;
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

const randomInteger = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
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
      texture: "none",
      colors: generateColors(1000, "random"),
      activeStripes: [],
      randomizeColors: false,
      randomizeWidths: false,
      randomizeTexture: false,
      activeStreak: false,
      alternatingFlashes: false,
      flash: false
    };

    this.randomizeColors = this.randomizeColors.bind(this);
    this.randomizeWidths = this.randomizeWidths.bind(this);
    this.randomizeTexture = this.randomizeTexture.bind(this);
    this.activeStreak = this.activeStreak.bind(this);
    this.alternatingFlashes = this.alternatingFlashes.bind(this);
    this.flash = this.flash.bind(this);
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

  chooseRandomColor() {
    return;
  }

  randomizeColors() {
    this.setState(prevState => ({
      stripes: prevState.stripes.map(stripe => ({
        color: this.state.colors[
          [randomInteger(0, this.state.colors.length - 1)]
        ],
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

  activeStreak() {
    const initialActiveStreak = [
      { index: -2, activeStyle: { opacity: 0.7 } },
      { index: -1, activeStyle: { opacity: 0.3 } },
      { index: 0, activeStyle: { opacity: 0 } },
      { index: 1, activeStyle: { opacity: 0.3 } },
      { index: 2, activeStyle: { opacity: 0.7 } }
    ];

    const step = streak =>
      streak.map(({ index, activeStyle }) => ({
        index: index === this.state.stripes.length ? 0 : index + 1,
        activeStyle
      }));

    if (this.state.activeStripes.length === 0) {
      this.setState({
        activeStripes: initialActiveStreak
      });
    } else {
      this.setState(({ activeStripes: a }) => ({
        activeStripes:
          a[0] === this.state.stripes.length
            ? initialActiveStreak
            : step(this.state.activeStripes)
      }));
    }
  }

  alternatingFlashes() {
    const numbers = Array.from(Array(this.state.stripes.length).keys());
    if (
      this.state.activeStripes.length === 0 ||
      this.state.activeStripes.includes(2)
    ) {
      this.setState({ activeStripes: numbers.filter(n => n % 2) });
    } else {
      this.setState({ activeStripes: numbers.filter(n => (n % 2) - 1) });
    }
  }

  flash() {
    const numbers = Array.from(Array(this.state.stripes.length).keys());
    setTimeout(() => this.setState({ activeStripes: numbers }), 150);
    setTimeout(() => this.setState({ activeStripes: [] }), 350);
    setTimeout(() => this.setState({ activeStripes: numbers }), 1000);
    setTimeout(() => this.setState({ activeStripes: [] }), 1200);
  }

  handleColorChange = (index, color) => this.changeColor(index, color);

  randomizeTexture() {
    this.handleTextureChange(textures[randomInteger(0, textures.length - 1)]);
  }

  render() {
    const {
      top,
      left,
      artWidth,
      artHeight,
      stripes,
      dotColors,
      activeStripes,
      texture
    } = this.state;
    return (
      <Container>
        <Controller>
          <button
            onClick={() =>
              this.setState(prevState => ({ flash: !prevState.flash }))
            }
          >
            flash
          </button>
          <button
            onClick={() =>
              this.setState(prevState => ({
                alternatingFlashes: !prevState.alternatingFlashes
              }))
            }
          >
            alternatingFlashes
          </button>
          <button
            onClick={() =>
              this.setState(prevState => ({
                activeStreak: !prevState.activeStreak
              }))
            }
          >
            activeStreak
          </button>
          <button
            onClick={() =>
              this.setState(prevState => ({
                randomizeColors: !prevState.randomizeColors
              }))
            }
          >
            randomizeColors
          </button>
          <button
            onClick={() =>
              this.setState(prevState => ({
                randomizeTexture: !prevState.randomizeTexture
              }))
            }
          >
            randomizeTexture
          </button>
          <button
            onClick={() =>
              this.setState(prevState => ({
                randomizeWidths: !prevState.randomizeWidths
              }))
            }
          >
            randomizeWidths
          </button>
        </Controller>
        <ReactInterval
          timeout={300}
          enabled={this.state.randomizeColors}
          callback={() => {
            setTimeout(this.randomizeColors, 500);
          }}
        />
        <ReactInterval
          timeout={300}
          enabled={this.state.randomizeWidths}
          callback={this.randomizeWidths}
        />
        <ReactInterval
          timeout={800}
          enabled={this.state.flash}
          callback={this.flash}
        />
        <ReactInterval
          timeout={500}
          enabled={this.state.randomizeTexture}
          callback={this.randomizeTexture}
        />
        <ReactInterval
          timeout={50}
          enabled={this.state.activeStreak}
          callback={this.activeStreak}
        />
        <Art
          top={top}
          left={left}
          artWidth={artWidth}
          artHeight={artHeight}
          dotColors={dotColors}
          texture={texture}
          stripes={stripes}
          activeStripes={activeStripes}
          ref={this.artRef}
        />
      </Container>
    );
  }
}

export default VisualController;
