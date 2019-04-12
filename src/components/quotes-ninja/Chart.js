import React, { useState } from "react";
import PropTypes from "prop-types";
import _ from "lodash";
import { Grid, Segment, List, Icon, Header } from "semantic-ui-react";

import ChartMenu from "./ChartMenu";
import {
  price,
  numRounded,
  formatNumber,
  chartUpDown
} from "../../utils/format";
import styled from "styled-components";
const ChartWrapper = styled.div`
  @media (min-width: 768px) {
    /* justify-content: space-around; */
    /* flex-direction: inherit; */
  }
`;

const CustomTooltip = ({ chart, label, active }) => {
  if (chart[label] && active) {
    const item = chart[label];
    return (
      <Segment inverted>
        <List size='mini' inverted>
          <List.Item>
            <List.Header>{item.label}</List.Header>
          </List.Item>
          <List.Item>Close: {price(item.close)}</List.Item>
          <List.Item>Vol: {formatNumber(item.volume)}</List.Item>
        </List>
      </Segment>
    );
  }

  return null;
};

const Chart = ({ charts, display }) => {
  const [activeChart, setActiveChart] = useState("d1");
  const { up, perc } = chartUpDown(activeChart, charts[activeChart], display);
  console.log(charts[activeChart]);
  return (
    <ChartWrapper>
      {matches => (
        <React.Fragment>
          <Grid.Row>
            <Grid.Column>
              <ChartMenu
                active={activeChart}
                perc={perc}
                up={up}
                onClick={setActiveChart}
              />
              <Segment attached>
                {/* {!_.isEmpty(charts[activeChart]) ? (
                  <ResponsiveContainer height={300}>
                    <ComposedChart data={charts[activeChart]}>
                      <Tooltip
                        content={<CustomTooltip chart={charts[activeChart]} />}
                      />
                      {activeChart === 'd1' ? (
                        <XAxis
                          tick={false}
                          hide
                          type="number"
                          dataKey="index"
                          domain={['dataMin', 390]}
                        />
                      ) : (
                        <XAxis tick={false} hide />
                      )}
                      <YAxis
                        hide
                        dataKey="close"
                        yAxisId="left"
                        tick={false}
                        type="number"
                        tickFormatter={t => numRounded(t)}
                        interval={2}
                        domain={[
                          dataMin => dataMin - dataMin * 0.005,
                          'dataMax'
                        ]}
                      />
                      <YAxis
                        hide
                        dataKey="volume"
                        yAxisId="right"
                        tick={false}
                        type="number"
                        padding={{ top: 200 }}
                        domain={[dataMin => dataMin - dataMin * 0.2, 'dataMax']}
                      />
                      <Area
                        type="monotone"
                        yAxisId="left"
                        dataKey="close"
                        connectNulls={true}
                        stroke={up ? '#2ecc40' : '#db2828'}
                        fill={up ? '#2ecc408a' : '#db28288a'}
                      />
                      <Bar
                        dataKey="volume"
                        yAxisId="right"
                        barSize={5}
                        fill="#1b1c1d36"
                      />
                    </ComposedChart>
                  </ResponsiveContainer> 
                ) : (
                <Segment placeholder>
                  {' '}
                  <Header icon>
                    <Icon name="time" />
                    Market Not Open
                  </Header>
                </Segment>
                )} */}
              </Segment>
            </Grid.Column>
          </Grid.Row>
        </React.Fragment>
      )}
    </ChartWrapper>
  );
};

Chart.propTypes = {
  charts: PropTypes.object.isRequired,
  display: PropTypes.object.isRequired
};

export default Chart;
