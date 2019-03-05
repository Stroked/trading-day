import React from 'react';
import styled from 'styled-components'
import SpotlightScreenshot from '../../assets/design/spotlight.png'
import { Image, Table, Container, List } from "semantic-ui-react";

const ImageExampleImage = () => <Image src={SpotlightScreenshot}  />

const designTimeMock= styled.img`
display:block;
background:${SpotlightScreenshot};`;
const Spotlight = props => (
  <div id='StockSpotlight' class='columnGroup'>
    <ImageExampleImage />
    <List horizontal>
      <List.Item>
        <List.Header>Top Losers</List.Header>

        <List.Content>
          <Table color='green'>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Food</Table.HeaderCell>
                <Table.HeaderCell>Calories</Table.HeaderCell>
                <Table.HeaderCell>Protein</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              <Table.Row>
                <Table.Cell>Apples</Table.Cell>
                <Table.Cell>200</Table.Cell>
                <Table.Cell>0g</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Orange</Table.Cell>
                <Table.Cell>310</Table.Cell>
                <Table.Cell>0g</Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
        </List.Content>
      </List.Item>
      <List.Item>
        <List.Header>Top Losers</List.Header>
        <List.Content>
          <Table color='red'>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Food</Table.HeaderCell>
                <Table.HeaderCell>Calories</Table.HeaderCell>
                <Table.HeaderCell>Protein</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              <Table.Row>
                <Table.Cell>Apples</Table.Cell>
                <Table.Cell>200</Table.Cell>
                <Table.Cell>0g</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Orange</Table.Cell>
                <Table.Cell>310</Table.Cell>
                <Table.Cell>0g</Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
        </List.Content>
      </List.Item>
      <List.Item>
        <List.Header>Most Active</List.Header>

        <List.Content>
          <div class='col-xs-12 col-sm-4 col-md-4 margin-24-xs stock-spolight-table-container custom-right-pad'>
            <h5 fftaf='bodyBold' class='expanded-table-header' />
            <div class='tabContent tabContentActive tabContentUnboxed'>
              <table id='summ_vol+' class='stock-spotlight-table'>
                <thead>
                  <tr>
                    <th class='stock-spotlight-60 colText expanded-table-label text-grey'>
                      Stock
                    </th>
                    <th class='stock-spotlight-20 expanded-table-label text-grey'>
                      Latest
                    </th>
                    <th class='stock-spotlight-20 expanded-table-label text-grey'>
                      % change
                    </th>
                  </tr>
                </thead>
                <tfoot>
                  <tr>
                    <td colspan='3'>
                      <div
                        style={{ marginTop: "3px" }}
                        class='data-delayed text-left expanded-table-label text-grey'>
                        Data delayed at least 15 minutes
                      </div>
                    </td>
                  </tr>
                </tfoot>
                <tbody>
                  <tr>
                    <td class='colText'>
                      <a
                        class='truncateMeTo1'
                        href='https://nytimes.com/topic/company/coty-inc'>
                        Coty Inc
                      </a>
                    </td>
                    <td class='colPrimary'>
                      <span class='posData'>8.88</span>
                    </td>
                    <td>
                      <span class='posData'>+25.78%</span>
                    </td>
                  </tr>
                  <tr>
                    <td class='colText'>
                      <a
                        class='truncateMeTo1'
                        href='https://nytimes.com/topic/company/mattel-inc'>
                        Mattel Inc
                      </a>
                    </td>
                    <td class='colPrimary'>
                      <span class='posData'>14.82</span>
                    </td>
                    <td>
                      <span class='posData'>+19.90%</span>
                    </td>
                  </tr>
                  <tr>
                    <td class='colText'>
                      <a
                        class='truncateMeTo1'
                        href='https://nytimes.com/topic/company/cliffs-natural-resources-inc'>
                        Cleveland-Cliffs Inc
                      </a>
                    </td>
                    <td class='colPrimary'>
                      <span class='posData'>11.95</span>
                    </td>
                    <td>
                      <span class='posData'>+9.63%</span>
                    </td>
                  </tr>
                  <tr>
                    <td class='colText'>
                      <span class='truncateMeTo1'>Snap Inc</span>
                    </td>
                    <td class='colPrimary'>
                      <span class='posData'>8.75</span>
                    </td>
                    <td>
                      <span class='posData'>+2.10%</span>
                    </td>
                  </tr>
                  <tr>
                    <td class='colText'>
                      <a
                        class='truncateMeTo1'
                        href='https://nytimes.com/topic/company/electronic-arts-inc'>
                        Electronic Arts Inc
                      </a>
                    </td>
                    <td class='colPrimary'>
                      <span class='posData'>93.28</span>
                    </td>
                    <td>
                      <span class='posData'>+10.92%</span>
                    </td>
                  </tr>
                  <tr>
                    <td class='colText'>
                      <a
                        class='truncateMeTo1'
                        href='https://nytimes.com/topic/company/skechers-usa-inc'>
                        Skechers USA Inc
                      </a>
                    </td>
                    <td class='colPrimary'>
                      <span class='posData'>32.34</span>
                    </td>
                    <td>
                      <span class='posData'>+16.75%</span>
                    </td>
                  </tr>
                  <tr>
                    <td class='colText'>
                      <a
                        class='truncateMeTo1'
                        href='https://nytimes.com/topic/company/pfizer-inc'>
                        Pfizer Inc
                      </a>
                    </td>
                    <td class='colPrimary'>
                      <span class='posData'>41.91</span>
                    </td>
                    <td>
                      <span class='posData'>+0.50%</span>
                    </td>
                  </tr>
                  <tr>
                    <td class='colText'>
                      <a
                        class='truncateMeTo1'
                        href='https://nytimes.com/topic/company/eli-lilly-and-company'>
                        Eli Lilly and Co
                      </a>
                    </td>
                    <td class='colPrimary'>
                      <span class='posData'>120.44</span>
                    </td>
                    <td>
                      <span class='posData'>+2.50%</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </List.Content>
      </List.Item>
    </List>

    <div class='row'>
      <div class='col-xs-12 stock-spotlight-header'>
        <h3 fftaf='bodyBold' style={{ float: "left" }} class='section-label'>
          Stock Spotlight
        </h3>
        <div class='datestamp-stockspotlight'>At 11:01 AM ET</div>
      </div>

      <div class='col-xs-12 col-sm-4 col-md-4 margin-24-xs stock-spolight-table-container custom-left-pad custom-right-pad'>
        <h5 fftaf='bodyBold' class='expanded-table-header'>
          Top Gainers
        </h5>
        <div class='tabContent tabContentActive tabContentUnboxed'>
          <table id='summ_pctchg+' class='stock-spotlight-table'>
            <thead>
              <tr>
                <th class='stock-spotlight-60 colText expanded-table-label text-grey'>
                  Stock
                </th>
                <th class='stock-spotlight-20 expanded-table-label text-grey'>
                  Latest
                </th>
                <th class='stock-spotlight-20 expanded-table-label text-grey'>
                  % change
                </th>
              </tr>
            </thead>
            <tfoot>
              <tr>
                <td colspan='3'>
                  <div
                    style={{ marginTop: "3px" }}
                    class='data-delayed text-left expanded-table-label text-grey'>
                    Data delayed at least 15 minutes
                  </div>
                </td>
              </tr>
            </tfoot>
            <tbody>
              <tr>
                <td class='colText'>
                  <a
                    class='truncateMeTo1'
                    href='https://nytimes.com/topic/company/egain-communications-corporation'>
                    eGain Corp
                  </a>
                </td>
                <td class='colPrimary'>
                  <span class='posData'>10.06</span>
                </td>
                <td>
                  <span class='posData'>+35.22%</span>
                </td>
              </tr>
              <tr>
                <td class='colText'>
                  <a
                    class='truncateMeTo1'
                    href='https://nytimes.com/topic/company/coty-inc'>
                    Coty Inc
                  </a>
                </td>
                <td class='colPrimary'>
                  <span class='posData'>8.89</span>
                </td>
                <td>
                  <span class='posData'>+25.85%</span>
                </td>
              </tr>
              <tr>
                <td class='colText'>
                  <a
                    class='truncateMeTo1'
                    href='https://nytimes.com/topic/company/mattel-inc'>
                    Mattel Inc
                  </a>
                </td>
                <td class='colPrimary'>
                  <span class='posData'>14.82</span>
                </td>
                <td>
                  <span class='posData'>+19.86%</span>
                </td>
              </tr>
              <tr>
                <td class='colText'>
                  <a
                    class='truncateMeTo1'
                    href='https://nytimes.com/topic/company/columbia-sportswear-company'>
                    Columbia Sportswear Co
                  </a>
                </td>
                <td class='colPrimary'>
                  <span class='posData'>108.60</span>
                </td>
                <td>
                  <span class='posData'>+17.47%</span>
                </td>
              </tr>
              <tr>
                <td class='colText'>
                  <a
                    class='truncateMeTo1'
                    href='https://nytimes.com/topic/company/skechers-usa-inc'>
                    Skechers USA Inc
                  </a>
                </td>
                <td class='colPrimary'>
                  <span class='posData'>32.35</span>
                </td>
                <td>
                  <span class='posData'>+16.77%</span>
                </td>
              </tr>
              <tr>
                <td class='colText'>
                  <a
                    class='truncateMeTo1'
                    href='https://nytimes.com/topic/company/ubiquiti-networks-inc'>
                    Ubiquiti Networks Inc
                  </a>
                </td>
                <td class='colPrimary'>
                  <span class='posData'>124.46</span>
                </td>
                <td>
                  <span class='posData'>+16.01%</span>
                </td>
              </tr>
              <tr>
                <td class='colText'>
                  <a
                    class='truncateMeTo1'
                    href='https://nytimes.com/topic/company/aceto-corp'>
                    Aceto Corp
                  </a>
                </td>
                <td class='colPrimary'>
                  <span class='posData'>1.62</span>
                </td>
                <td>
                  <span class='posData'>+15.71%</span>
                </td>
              </tr>
              <tr>
                <td class='colText'>
                  <a
                    class='truncateMeTo1'
                    href='https://nytimes.com/topic/company/pc-connection-inc'>
                    PC Connection Inc
                  </a>
                </td>
                <td class='colPrimary'>
                  <span class='posData'>38.46</span>
                </td>
                <td>
                  <span class='posData'>+14.42%</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class='col-xs-12 col-sm-4 col-md-4 stock-spolight-table-container custom-left-pad'>
        <h5 fftaf='bodyBold' class='expanded-table-header'>
          Top Losers
        </h5>
        <div class='tabContent tabContentActive tabContentUnboxed'>
          <table id='summ_pctchg-' class='stock-spotlight-table'>
            <thead>
              <tr>
                <th class='stock-spotlight-60 colText expanded-table-label text-grey'>
                  Stock
                </th>
                <th class='stock-spotlight-20 expanded-table-label text-grey'>
                  Latest
                </th>
                <th class='stock-spotlight-20 expanded-table-label text-grey'>
                  % change
                </th>
              </tr>
            </thead>
            <tfoot>
              <tr>
                <td colspan='3'>
                  <div
                    style={{ marginTop: "3px" }}
                    class='data-delayed text-left expanded-table-label text-grey'>
                    Data delayed at least 15 minutes
                  </div>
                </td>
              </tr>
            </tfoot>
            <tbody>
              <tr>
                <td class='colText'>
                  <a
                    class='truncateMeTo1'
                    href='https://nytimes.com/topic/company/biocept-inc'>
                    Biocept Inc
                  </a>
                </td>
                <td class='colPrimary'>
                  <span class='negData'>1.12</span>
                </td>
                <td>
                  <span class='negData'>–45.07%</span>
                </td>
              </tr>
              <tr>
                <td class='colText'>
                  <a
                    class='truncateMeTo1'
                    href='https://nytimes.com/topic/company/css-industries-inc'>
                    CSS Industries Inc
                  </a>
                </td>
                <td class='colPrimary'>
                  <span class='negData'>7.01</span>
                </td>
                <td>
                  <span class='negData'>–24.11%</span>
                </td>
              </tr>
              <tr>
                <td class='colText'>
                  <a
                    class='truncateMeTo1'
                    href='https://nytimes.com/topic/company/staffing-360-solutions-inc'>
                    Staffing 360 Solutions Inc
                  </a>
                </td>
                <td class='colPrimary'>
                  <span class='negData'>1.72</span>
                </td>
                <td>
                  <span class='negData'>–21.10%</span>
                </td>
              </tr>
              <tr>
                <td class='colText'>
                  <a class='truncateMeTo1' href='/quinstreet-inc'>
                    Quinstreet Inc
                  </a>
                </td>
                <td class='colPrimary'>
                  <span class='negData'>14.75</span>
                </td>
                <td>
                  <span class='negData'>–20.40%</span>
                </td>
              </tr>
              <tr>
                <td class='colText'>
                  <span class='truncateMeTo1'>Myomo Inc</span>
                </td>
                <td class='colPrimary'>
                  <span class='negData'>1.37</span>
                </td>
                <td>
                  <span class='negData'>–20.05%</span>
                </td>
              </tr>
              <tr>
                <td class='colText'>
                  <a
                    class='truncateMeTo1'
                    href='https://nytimes.com/topic/company/vocera-communications-inc'>
                    Vocera Communications Inc
                  </a>
                </td>
                <td class='colPrimary'>
                  <span class='negData'>31.75</span>
                </td>
                <td>
                  <span class='negData'>–20.01%</span>
                </td>
              </tr>
              <tr>
                <td class='colText'>
                  <a
                    class='truncateMeTo1'
                    href='https://nytimes.com/topic/company/carbonite-inc'>
                    Carbonite Inc
                  </a>
                </td>
                <td class='colPrimary'>
                  <span class='negData'>24.06</span>
                </td>
                <td>
                  <span class='negData'>–17.90%</span>
                </td>
              </tr>
              <tr>
                <td class='colText'>
                  <a
                    class='truncateMeTo1'
                    href='https://nytimes.com/topic/company/pixelworks-inc'>
                    Pixelworks Inc
                  </a>
                </td>
                <td class='colPrimary'>
                  <span class='negData'>3.37</span>
                </td>
                <td>
                  <span class='negData'>–17.12%</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
);

export default Spotlight;