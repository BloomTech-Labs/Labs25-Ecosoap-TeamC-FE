import React, { useRef, useState, useEffect } from 'react';
import {
  Checkbox,
  Grid,
  Header,
  Image,
  Menu,
  Ref,
  Segment,
  Sidebar,
} from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import './MainSideBar.css';

const MainSideBarComp = () => {
  //This is for Sidebar functionality
  const segmentRef = useRef();
  // This is the state for the Sidebar Component
  const [visible, setVisible] = useState(false);

  return (
    <Grid columns={1}>
      <Grid.Column>
        <Checkbox
          checked={visible}
          label={{ children: <code>visible</code> }}
          onChange={(e, data) => setVisible(data.checked)}
        />
      </Grid.Column>
      <button onClick={(e, data) => setVisible(true)}>
        CLICK HERE TO OPEN SIDEBAR!
      </button>
      <Grid.Column>
        <Sidebar.Pushable as={Segment.Group} raised>
          <Sidebar
            as={Menu}
            animation="overlay"
            direction="bottom"
            icon="labeled"
            inverted
            onHide={() => setVisible(false)}
            vertical
            target={segmentRef}
            visible={visible}
            width="thin"
          >
            <Menu.Item as="a">Home</Menu.Item>
            <Menu.Item as="a">Games</Menu.Item>
            <Menu.Item as="a">Channels</Menu.Item>
          </Sidebar>

          <Ref innerRef={segmentRef}>
            <button>Close sidebar</button>
          </Ref>

          <h1>
            Should be able to highlight these words while Sidebar is open!
          </h1>
        </Sidebar.Pushable>
      </Grid.Column>
    </Grid>
  );
};

export default MainSideBarComp;
