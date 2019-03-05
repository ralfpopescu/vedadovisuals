import React, { Component } from "react";
import VisualController from "./components/VisualController";
import styled from "styled-components";

const Container = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  position: absolute;
`;

class App extends Component {
  render() {
    return (
      <html lang="en">
        <head>
          <meta charset="utf-8" />
          <title>The HTML5 Herald</title>
          <meta name="description" content="The HTML5 Herald" />
          <meta name="author" content="SitePoint" />
          <link
            href="https://fonts.googleapis.com/css?family=Unica One"
            rel="stylesheet"
          />
        </head>
        <body>
          <div
            style={{
              fontFamily: `Unica One`
            }}
          >
            <Container>
              <VisualController />
            </Container>
          </div>
        </body>
      </html>
    );
  }
}

export default App;
