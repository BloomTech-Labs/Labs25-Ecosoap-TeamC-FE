import React, { useState, useEffect } from 'react';
import { Checkbox, Sidebar } from 'semantic-ui-react';
import Carousel from '../Carousel/Carousel';

import './PopUpBar.css';
import 'semantic-ui-css/semantic.min.css';

function PopUpBar(props) {
  // This is the state for the Sidebar Component
  const [visible, setVisible] = useState(false);
  // This is the state for the changing of the className "active"
  const [popUpActive, setPopUpActive] = useState(1);

  let { recordData } = props;

  useEffect(() => {
    setVisible(true);
    console.log('Inside useEffect ', recordData);
  }, [recordData]);

  return (
    <div>
      <Checkbox
        checked={visible}
        label={{ children: <code>visible</code> }}
        onChange={(e, data) => setVisible(data.checked)}
      />
      <Sidebar
        animation="overlay"
        direction="bottom"
        className="popUpBar"
        // onHide={() => setVisible(false)} Disabled because it closes the popup when moving around map!
        visible={visible}
      >
        <div className="divClass">
          <button
            id="xButton"
            className="buttonClass"
            onClick={() => {
              setVisible(!visible);
            }}
          >
            X
          </button>
        </div>

        {/* {console.log("This is recordData ", recordData)} */}
        {recordData.name && (
          <div key={recordData.id} className="bigDiv">
            <div className="recordDiv">
              <h1 id="recordTitle">{recordData.name}</h1>
              <div className="recordDetails">
                <h3>Type: {recordData.type.name}</h3>
                <h3>
                  Coordinates: [ {recordData.coordinates.longitude},{' '}
                  {recordData.coordinates.latitude} ]
                </h3>
                {recordData.fields.map(field =>
                  // console.log("THIS IS FIELD!", field),
                  field.name === 'Website' ? (
                    <h3>
                      Website:{' '}
                      <a
                        href={field.value}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Link
                      </a>
                    </h3>
                  ) : null
                )}
              </div>
            </div>

            <div className="galleryDiv"></div>
          </div>
        )}
      </Sidebar>
      <Carousel />
    </div>
  );
}

export default PopUpBar;
