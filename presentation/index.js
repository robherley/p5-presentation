// Import React
import React from 'react';

// Import Spectacle Core tags
import {
  BlockQuote,
  Cite,
  Deck,
  Heading,
  ListItem,
  List,
  Quote,
  Slide,
  Text,
  Markdown,
  Image,
  CodePane,
  Fill,
  Fit,
  Layout,
  Code
} from 'spectacle';
import ReactPlayer from 'react-player';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faSlack } from '@fortawesome/fontawesome-free-brands';
import P5Wrapper from 'react-p5-wrapper';

let socket = io.connect('http://express-p5.mybluemix.net');

// Import theme
import createTheme from 'spectacle/lib/themes/default';

function circle(p) {
  p.setup = function() {
    p.createCanvas(400, 400, p.WEBGL);
  };

  p.draw = function() {
    p.background('white');
    let c = p.color('#0cce6b');
    p.fill(c);
    p.noStroke();
    p.ellipse(0, 0, 200, 200);
  };
}

function colors(p) {
  p.setup = function() {
    p.createCanvas(400, 400, p.WEBGL);
    p.frameRate(5);
  };

  p.draw = function() {
    let c = p.color(p.random(255), p.random(255), p.random(255));
    p.background('white');
    p.fill(c);
    p.noStroke();
    p.ellipse(0, 0, 200, 200);
  };
}

function interactive(p) {
  p.setup = function() {
    p.createCanvas(400, 400, p.WEBGL);
    p.background('white');
  };

  p.draw = function() {
    let c = p.color(p.random(255), p.random(255), p.random(255));
    if (p.mouseIsPressed) {
      p.fill(0);
    } else {
      p.fill(c);
    }
    p.noStroke();
    p.ellipse(p.mouseX - 200, p.mouseY - 200, 40, 40);
  };
}

function socketTest(p) {
  p.setup = function() {
    p.createCanvas(900, 800);
    p.background('#1f2022');
    socket.on('mouse', data => {
      p.fill('#03A9FC');
      p.noStroke();
      p.ellipse(data.x, data.y, 20, 20);
    });
  };

  p.draw = function() {};

  p.mouseDragged = function() {
    p.fill('#ed225d');
    p.noStroke();
    p.ellipse(p.mouseX, p.mouseY, 20, 20);
    sendmouse(p.mouseX, p.mouseY);
  };

  function sendmouse(xpos, ypos) {
    socket.emit('mouse', {
      x: xpos,
      y: ypos
    });
  }
}

// Require CSS
require('normalize.css');

const Center = ({ children }) => (
  <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
    {children}
  </div>
);

const theme = createTheme(
  {
    primary: 'white',
    secondary: '#1F2022',
    tertiary: '#03A9FC',
    quarternary: '#CECECE',
    pink: '#ed225d',
    green: '#0cce6b',
    yellow: '#f1d302'
  },
  {
    primary: 'Montserrat',
    secondary: 'Helvetica'
  }
);

export default class Presentation extends React.Component {
  render() {
    return (
      <Deck
        transition={['zoom', 'slide']}
        transitionDuration={500}
        theme={theme}
      >
        <Slide transition={['zoom']} bgColor="tertiary">
          <Heading size={4} caps lineHeight={1} textColor="primary">
            Creative Programming
          </Heading>
          <Heading size={4} caps lineHeight={1} textColor="secondary">
            with P5.js
          </Heading>
          <Text
            margin="1em 0em"
            size={1}
            textColor="primary"
            caps
            textSize="0.8em"
          >
            <FontAwesomeIcon icon={faSlack} />{' '}
            <code>https://stevenscsc.slack.com</code>
          </Text>
        </Slide>
        <Slide transition={['zoom']} bgColor="primary" textColor="tertiary">
          <Image src="https://p5js.org/assets/img/p5js.svg" />
          <Text>
            JavaScript library that starts with the original goal of Processing,
            to make coding accessible for artists, designers, educators, and
            beginners, and reinterprets this for today's web.
          </Text>
        </Slide>
        <Slide transition={['zoom']} bgColor="primary" textColor="tertiary">
          <Heading size={5}>Processing Variants</Heading>
          <Center>
            <List>
              <ListItem textColor="pink" textSize="1em">
                p5.js (JavaScript)
              </ListItem>
              <ListItem textColor="tertiary" textSize="1em">
                Processing 3 (Java)
              </ListItem>
              <ListItem textColor="yellow" textSize="1em">
                Processing.py (Python)
              </ListItem>
              <ListItem textColor="green" textSize="1em">
                Processing for Android
              </ListItem>
            </List>
          </Center>
        </Slide>
        <Slide transition={['zoom']} bgColor="tertiary" textColor="primary">
          <Heading size={5}>Getting Started with p5.js</Heading>
          <CodePane
            textSize="1em"
            lang="html"
            source={`<html>
  <head>
      ...
  </head>
  <body>
    <script src="../p5.min.js"></script>
    <script src="sketch.js"></script>
  </body>
</html>`}
          />
          <Text textSize="1em">There's a CDN too!</Text>
        </Slide>
        <Slide transition={['zoom']} bgColor="tertiary" textColor="primary">
          <Code size={5}>sketch.js</Code>
          <CodePane
            textSize="0.8em"
            lang="javascript"
            source={`  function setup(){
    /* Setup & Initialization
        - define initial environment properties
        - load media such as images and fonts
    */
  }

  function draw(){
    /* What to draw!
        - similar to "game loops"
        - continuously executes code in a loop 
        - controlled with frameRate(), noLoop(), loop()
    */
  }`}
          />
        </Slide>
        <Slide transition={['zoom']} bgColor="tertiary" textColor="primary">
          <Layout>
            <Fill>
              <CodePane
                textSize="0.8em"
                lang="javascript"
                source={`function setup() {
  createCanvas(400, 400);
}

function draw() {
  background('white');
  fill(color('#0cce6b'));
  noStroke();
  ellipse(0, 0, 200, 200);
}`}
              />
            </Fill>
            <Fill>
              <P5Wrapper sketch={circle} />
            </Fill>
          </Layout>
        </Slide>
        <Slide transition={['zoom']} bgColor="tertiary" textColor="primary">
          <Layout>
            <Fill>
              <CodePane
                textSize="0.8em"
                lang="javascript"
                source={`function setup() {
  createCanvas(400, 400);
  framerate(5);
}

function draw() {
  let color = color(
    random(255), 
    random(255), 
    random(255)
  );
  background('white');
  fill(color);
  noStroke();
  ellipse(0, 0, 200, 200);
}`}
              />
            </Fill>
            <Fill>
              <P5Wrapper sketch={colors} />
            </Fill>
          </Layout>
        </Slide>
        <Slide transition={['zoom']} bgColor="tertiary" textColor="primary">
          <Layout>
            <Fill>
              <CodePane
                textSize="0.6em"
                lang="javascript"
                source={`function setup() {
  createCanvas(400, 400);
  background('white');
}

function draw() {
  let c = color(...);
  if (p.mouseIsPressed) {
    p.fill(0);
  } else {
    p.fill(c);
  }
  noStroke();
  ellipse(mouseX, mouseY, 40, 40);
}`}
              />
            </Fill>
            <Fill>
              <P5Wrapper sketch={interactive} />
            </Fill>
          </Layout>
        </Slide>
        <Slide transition={['zoom']} bgColor="#1F2022">
          <Heading textColor="tertiary" size={5}>
            Just the beginning!
          </Heading>
          <Center>
            <ReactPlayer
              url="https://www.youtube.com/watch?v=O8tT0GXTOPo"
              playing
              muted={true}
              width={1000}
              height={550}
            />
          </Center>
        </Slide>
        <Slide transition={['zoom']} bgColor="#1F2022" align="flex-start">
          <Text textColor="tertiary">http://express-p5.mybluemix.net</Text>
          <P5Wrapper sketch={socketTest} />
        </Slide>
      </Deck>
    );
  }
}
