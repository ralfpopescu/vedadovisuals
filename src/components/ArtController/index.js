import React from "react";
import styled from "styled-components";
import Art from "../Art/Art";
import { textures } from "./Textures";
import randomColor from "randomcolor";
import domtoimage from "dom-to-image";
import Select from "react-select";
import ColorPanel from "./ColorPanel";
import { ReactComponent as Arrow } from "./icons/play-arrow.svg";
import { ReactComponent as Download } from "./icons/download.svg";

const DirectionButton = styled.div`
  width: 25px;
  height: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
  fill: #636363;
  cursor: pointer;
  opacity: 1;

  &:hover {
    opacity: 0.7;
  }
`;

const DownloadContainer = styled.div`
  opacity: 1;
  cursor: pointer;
  width: 50px;
  fill: white;

  &:hover {
    opacity: 0.7;
  }
`;

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

const LayoutRow = styled.div`
  display: flex;
  flex-direction: row;
`;
const LayoutColumn = styled.div`
  display: flex;
  flex-direction: column;
`;

const NakedInput = styled.input`
  font-family: Unica One;
  outline: none;
  width: 100%;
  font-size: 1.2rem;
  background: transparent;
  border-top: transparent !important;
  border-left: transparent !important;
  border-right: transparent !important;
  border-bottom: transparent !important;
  font-size: 1.1rem;
  color: white;
  padding: 8px;
`;

const InputContainer = styled.div`
  margin-bottom: 16px;
  border-radius: 8px;
  background-color: #636363;
`;

const Input = ({ style, ...inputProps }) => (
  <InputContainer style={style}>
    <NakedInput {...inputProps} />
  </InputContainer>
);

const FieldHeader = styled.div`
  font-size: 1.5rem;
  margin-bottom: 8px;
  margin-top: 8px;
  display: flex;
  flex-direction: row;
`;

const RandomIconWrapper = styled.div`
  font-size: 2rem;
  cursor: pointer;
  transition: all 0.05s ease-in-out;
  display: flex;

  &:active {
    transform: scale(0.9);
  }

  &:hover {
    opacity: 0.7;
  }
`;

const selectStyles = {
  option: (provided, state) => ({
    ...provided,
    color: "white",
    background: "#636363"
  }),
  control: (provided, state) => ({
    ...provided,
    color: "white",
    background: "#636363"
  }),
  singleValue: (provided, state) => ({
    ...provided,
    color: "white",
    background: "#636363"
  })
};

const RandomizeIcon = ({ onClick }) => (
  <RandomIconWrapper onClick={onClick}>↻</RandomIconWrapper>
);

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

class ArtController extends React.Component {
  constructor(props) {
    super(props);
    this.artRef = React.createRef();
    this.state = {
      logoTop: 0,
      logoLeft: 0,
      trackNameTop: 0,
      trackNameLeft: 0,
      trackName: "",
      hue: "random",
      artWidth: 500,
      artHeight: 500,
      numberOfStripes: 15,
      numberOfDots: 0,
      centerLogo: false,
      centerTrackname: false,
      stripeColors: generateColors(15, "random"),
      dotColors: generateColors(0, "random"),
      stripes: generateStripes(15, "random"),
      texture: "none"
    };
    this.handleTrackNameChange = this.handleTrackNameChange.bind(this);
    this.handleHueChange = this.handleHueChange.bind(this);
    this.handleWidthChange = this.handleWidthChange.bind(this);
    this.handleHeightChange = this.handleHeightChange.bind(this);
    this.handleStripeNumberChange = this.handleStripeNumberChange.bind(this);
    this.handleDotNumberChange = this.handleDotNumberChange.bind(this);
    this.randomizeColors = this.randomizeColors.bind(this);
    this.handleTextureChange = this.handleTextureChange.bind(this);
    this.randomizeTexture = this.randomizeTexture.bind(this);
    this.randomizeWidths = this.randomizeWidths.bind(this);
    this.handleColorChange = this.handleColorChange.bind(this);
    this.changeColor = this.changeColor.bind(this);
    this.changeWidth = this.changeWidth.bind(this);
    this.download = this.download.bind(this);
  }

  handleTrackNameChange(event) {
    this.setState({ trackName: event.target.value });
  }

  handleHueChange(event) {
    this.setState({ hue: event.target.value });
    this.setState({
      stripeColors: generateColors(
        this.state.numberOfStripes,
        event.target.value
      )
    });
    this.setState({
      dotColors: generateColors(this.state.numberOfDots, event.target.value)
    });
  }

  handleWidthChange(event) {
    this.setState({ artWidth: event.target.value });
  }

  handleHeightChange(event) {
    this.setState({ artHeight: event.target.value });
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

  handleColorChange = index => event =>
    console.log(event) || this.changeColor(index, event.target.value);

  randomizeTexture() {
    const randomInteger = (min, max) => {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    this.handleTextureChange(textures[randomInteger(1, textures.length - 1)]);
  }

  download() {
    console.log(this.artRef.current);
    domtoimage
      .toPng(this.artRef.current)
      .then(function(dataUrl) {
        var link = document.createElement("a");
        link.download = "my-image-name.jpeg";
        link.href = dataUrl;
        link.click();
      })
      .catch(function(error) {
        console.error("oops, something went wrong!", error);
      });
  }

  ButtonGroup = ({ fieldTop, fieldLeft, center, amount }) => (
    <LayoutRow>
      <LayoutColumn style={{ justifyContent: "center" }}>
        <DirectionButton
          onClick={() =>
            this.setState(prevState => ({
              [fieldLeft]: prevState[fieldLeft] - amount,
              [center]: false
            }))
          }
        >
          <Arrow
            style={{
              width: "25px",
              height: "25px",
              transform: "rotate(180deg)"
            }}
          />
        </DirectionButton>
      </LayoutColumn>
      <LayoutColumn>
        <DirectionButton
          onClick={() =>
            this.setState(prevState => ({
              [fieldTop]: prevState[fieldTop] - amount,
              [center]: false
            }))
          }
        >
          <Arrow
            style={{
              width: "25px",
              height: "25px",
              transform: "rotate(270deg)"
            }}
          />
        </DirectionButton>
        <DirectionButton
          onClick={() =>
            this.setState(prevState => ({
              [center]: !prevState[center]
            }))
          }
        >
          <div
            style={{
              border: `${this.state[center] ? 3 : 2}px solid ${
                this.state[center] ? "#bfbfbf" : "#666666"
              }`,
              height: "10px",
              width: "10px",
              borderRadius: "4px"
            }}
          />
        </DirectionButton>
        <DirectionButton
          onClick={() =>
            this.setState(prevState => ({
              [fieldTop]: prevState[fieldTop] + amount,
              [center]: false
            }))
          }
        >
          <Arrow
            style={{
              width: "25px",
              height: "25px",
              transform: "rotate(90deg)"
            }}
          />
        </DirectionButton>
      </LayoutColumn>
      <LayoutColumn style={{ justifyContent: "center" }}>
        <DirectionButton
          onClick={() =>
            this.setState(prevState => ({
              [fieldLeft]: prevState[fieldLeft] + amount,
              [center]: false
            }))
          }
        >
          <Arrow
            style={{
              width: "25px",
              height: "25px"
            }}
          />
        </DirectionButton>
      </LayoutColumn>
    </LayoutRow>
  );

  render() {
    const {
      logoTop,
      logoLeft,
      trackNameLeft,
      trackNameTop,
      trackName,
      hue,
      artWidth,
      artHeight,
      centerLogo,
      centerTrackname,
      stripeColors,
      stripes,
      dotColors,
      texture
    } = this.state;
    const { ButtonGroup } = this;
    return (
      <Container>
        <LayoutColumn
          style={{
            padding: "30px",
            overflowY: "auto",
            background: "#323232"
          }}
        >
          <LayoutColumn>
            <FieldHeader>POSITION</FieldHeader>
            <LayoutRow style={{ marginBottom: "16px" }}>
              <LayoutColumn
                style={{ alignItems: "center", marginRight: "32px" }}
              >
                Logo
                <ButtonGroup
                  fieldTop="logoTop"
                  fieldLeft="logoLeft"
                  center="centerLogo"
                  amount={10}
                />
                top: {logoTop} left: {logoLeft}
              </LayoutColumn>
              <LayoutColumn>
                Track Name
                <ButtonGroup
                  fieldTop="trackNameTop"
                  fieldLeft="trackNameLeft"
                  center="centerTrackname"
                  amount={10}
                />
                top: {trackNameTop} left: {trackNameLeft}
              </LayoutColumn>
            </LayoutRow>
          </LayoutColumn>
          <FieldHeader>CONTENT</FieldHeader>
          Track Name
          <Input
            type="text"
            value={this.state.trackName}
            onChange={this.handleTrackNameChange}
          />
          <FieldHeader>ATTRIBUTES</FieldHeader>
          Art Width
          <Input
            type="text"
            value={this.state.artWidth}
            onChange={this.handleWidthChange}
          />
          Art Height
          <Input
            type="text"
            value={this.state.artHeight}
            onChange={this.handleHeightChange}
          />
          Number of Stripes
          <Input
            type="text"
            value={this.state.numberOfStripes}
            onChange={this.handleStripeNumberChange}
          />
          Number of Dots
          <Input
            type="text"
            value={this.state.numberOfDots}
            onChange={this.handleDotNumberChange}
          />
          <FieldHeader>APPEARANCE</FieldHeader>
          Hue
          <Input
            type="text"
            value={this.state.hue}
            onChange={this.handleHueChange}
          />
          Texture
          <Select
            options={textures}
            onChange={this.handleTextureChange}
            value={texture.value}
            placeholder="Select a texture"
            styles={selectStyles}
          />
          <FieldHeader style={{ alignItems: "center", marginTop: "16px" }}>
            <div style={{ flexGrow: 1 }}>RANDOMIZE</div>
            <RandomizeIcon
              onClick={() => {
                this.randomizeTexture();
                this.randomizeWidths();
                this.randomizeColors();
              }}
            />
          </FieldHeader>
          <LayoutRow style={{ alignItems: "center" }}>
            <div style={{ flexGrow: 1 }}>Colors</div>
            <RandomizeIcon onClick={this.randomizeColors} />
          </LayoutRow>
          <LayoutRow style={{ alignItems: "center" }}>
            <div style={{ flexGrow: 1 }}>Widths</div>
            <RandomizeIcon onClick={this.randomizeWidths} />
          </LayoutRow>
          <LayoutRow style={{ alignItems: "center" }}>
            <div style={{ flexGrow: 1 }}>Texture</div>
            <RandomizeIcon onClick={this.randomizeTexture} />
          </LayoutRow>
          <DownloadContainer>
            <Download
              onClick={this.download}
              style={{ width: "50px", height: "50px" }}
            />
          </DownloadContainer>
        </LayoutColumn>
        <div
          style={{
            height: "100%",
            width: this.state.artWidth,
            padding: "50px"
          }}
        >
          <Art
            logoTop={logoTop}
            logoLeft={logoLeft}
            trackNameTop={trackNameTop}
            trackNameLeft={trackNameLeft}
            trackName={trackName}
            artWidth={artWidth}
            artHeight={artHeight}
            hue={hue}
            stripeColors={stripeColors}
            dotColors={dotColors}
            texture={texture}
            centerLogo={centerLogo}
            centerTrackname={centerTrackname}
            stripes={stripes}
            ref={this.artRef}
          />
        </div>
        <LayoutColumn style={{ padding: "50px" }}>
          <ColorPanel
            stripes={stripes}
            handleColorChange={index => event =>
              this.changeColor(index, event.target.value)}
            handleWidthChange={index => event =>
              this.changeWidth(index, event.target.value)}
          />
        </LayoutColumn>
      </Container>
    );
  }
}

export default ArtController;
