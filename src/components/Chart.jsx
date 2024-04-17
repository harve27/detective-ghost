// SurveyChart.js
import React from 'react';
import { VictoryStack, VictoryBar, VictoryChart, VictoryAxis, VictoryTheme } from 'victory';

const SurveyChart = ({ responses }) => {
  // Convert responses to data array for VictoryStack
  const data = Object.keys(responses).map(key => ({
    answer: key,
    count: responses[key]
  })); 

  // Calculate total responses
  const totalResponses = Object.values(responses).reduce((acc, val) => acc + val, 0);

  return (
    <VictoryChart
      domainPadding={{ x: 20 }}
      theme={VictoryTheme.material}
    >
      <VictoryAxis
        dependentAxis
        tickFormat={(t) => `${t.toFixed(0)}%`}
        style={{ tickLabels: { fontSize: 12 } }}
      />
      <VictoryStack horizontal>
        {data.map((datum, index) => (
          <VictoryBar
            key={index}
            data={[{ x: datum.answer, y: (datum.count / totalResponses) * 100 }]}
            style={{ data: { fill: datum.answer === "yes" ? "#4CAF50" : "#F44336" } }}
          />
        ))}
      </VictoryStack>
    </VictoryChart>
  );
};

export default SurveyChart;
