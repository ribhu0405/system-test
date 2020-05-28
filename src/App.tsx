import React from 'react';
import './App.scss';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';

// import { Icon, IIconProps } from "office-ui-fabric-react/lib/Icon";
import { initializeIcons } from '@uifabric/icons';

// import { Button } from 'office-ui-fabric-react/lib/Button';

initializeIcons();

function App() {
  return (
    <div className="App">
      <div className="ms-Grid" dir="ltr">
        <div className="row">
          <div className="column">A</div>
          <div className="column">B</div>
        </div>
      </div>
    </div>
  );
}

export default App;
