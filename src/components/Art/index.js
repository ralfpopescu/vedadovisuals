import React, { useRef } from "react";
import styled from "styled-components";

const StripeContainer = styled.div`
  position: relative;
  height: ${props => props.height}px;
  width: ${props => props.width}px;
  display: flex;
  overflow: auto;
  flex-grow: 1;
  transition: all 0.3s ease-in-out;
`;

const Dot = styled.div`
  height: ${props => props.size}px;
  width: ${props => props.size}px;
  background-color: ${props => props.color};
  top: ${props => props.top}px;
  left: ${props => props.left}px;
  border-radius: 50%;
  display: inline-block;
  position: absolute;
  transition: all 0.3s ease-in-out;
`;

const LogoContainer = styled.div`
  position: absolute;
  top: ${props => props.top}px;
  left: ${props => props.left}px;
  font-size: 200px;
  color: white;
  text-shadow: 10px 30px 20px #000000;
  transition: all 0.3s ease-in-out;
`;

const Texture = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  ${props => props.texture};
  transition: all 0.3s ease-in-out;
`;

const Gradient = styled.div`
  background-image: linear-gradient(
    to right,
    rgba(0, 0, 0, 0.3),
    rgba(255, 255, 255, 0.3)
  );
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
`;

const Art = ({
  artWidth,
  artHeight,
  dotColors,
  texture,
  stripes,
  forwardedRef,
  activeStripes,
  top,
  left
}) => {
  const logoRef = useRef(null);
  return (
    <StripeContainer ref={forwardedRef}>
      {stripes.map(
        ({ color, width }, index) =>
          console.log(
            Object.assign(
              {},
              ...activeStripes
                .filter(a => a.index === index)
                .map(({ activeStyle }) => ({
                  ...activeStyle
                }))
            )
          ) || (
            <div
              style={{
                backgroundColor: color,
                width,
                display: "flex",
                flexGrow: 1,
                opacity: activeStripes.includes(index) ? 0 : 1,
                transition: "all 0.3s ease-in-out",
                ...Object.assign(
                  {},
                  ...activeStripes
                    .filter(a => a.index === index)
                    .map(({ activeStyle }) => ({
                      ...activeStyle
                    }))
                )
              }}
              color={color}
              width={width}
            />
          )
      )}
      {dotColors.map(color => (
        <Dot
          color={color}
          size={Math.random() * 25}
          top={Math.random() * artHeight}
          left={Math.random() * artWidth}
        />
      ))}
      <Texture texture={texture.value} />
      <Gradient />
      {console.log(
        forwardedRef.current && forwardedRef.current.getBoundingClientRect()
      )}
      <LogoContainer
        top={
          forwardedRef.current &&
          forwardedRef.current.getBoundingClientRect().height / 2
        }
        left={
          forwardedRef.current &&
          forwardedRef.current.getBoundingClientRect().width / 2
        }
        ref={logoRef}
      >
        VEDADO
      </LogoContainer>
    </StripeContainer>
  );
};

const ArtWithForwardedRef = React.forwardRef((props, ref) => (
  <Art {...props} forwardedRef={ref} />
));

export default ArtWithForwardedRef;
