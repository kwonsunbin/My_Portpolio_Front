import * as React from 'react';
import Paper from '@mui/material/Paper';
import {
  Chart,
  PieSeries,
  Title,
} from '@devexpress/dx-react-chart-material-ui';
import { Animation } from '@devexpress/dx-react-chart';

const createChartData = (data) => {
  const chartData = data.map((row) => {
    return {
      ticker: row.ticker,
      haveInUSD: row.haveInUSD,
    };
  });
  return chartData;
};

export default class Demo extends React.PureComponent {
  render() {
    const chartData = createChartData(this.props.data);
    console.log(chartData);

    return (
      <Paper>
        <Chart data={chartData}>
          <PieSeries
            valueField="haveInUSD"
            argumentField="ticker"
            innerRadius={0.6}
          />
          <Title text="Portpolio" />
          <Animation />
        </Chart>
      </Paper>
    );
  }
}
