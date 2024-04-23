import React from 'react';
import ProgressBar from 'react-bootstrap/ProgressBar';

const Chart = ({ yesNumber, noNumber }) => {
  return (
    <div>
      <ProgressBar>
        <ProgressBar variant="success" now={yesNumber/(yesNumber+noNumber)*100} label={`${Math.round(yesNumber/(yesNumber+noNumber)*100)}%`} key={1} />
        <ProgressBar variant="danger" now={noNumber/(yesNumber+noNumber)*100} label={`${Math.round(noNumber/(yesNumber+noNumber)*100)}%`} key={2} />
      </ProgressBar>
      <h5 style={{'margin-top': '20 px', 'margin-right': '20px'}}>Total bets: {yesNumber+noNumber}</h5>
    </div>
  );
};

export default Chart;
