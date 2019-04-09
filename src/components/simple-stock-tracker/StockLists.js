import React from "react";
import EnumsManager from "./enumsManager";
import { fetchData } from "./utils";
import images from './icons/'
import { SectionHeader } from "./SectionHeader";
import { ToggleButtons } from "./ToggleButtons";
import { StandardTable } from "./StandardTable";
// import SpotLightTable from "./SpotLightTable"
export class StockLists extends React.Component {
 state = {
      activeType: EnumsManager.StockListTypes[0].type,
      stockData: [],
      updatedTime: null,
    }

  componentDidMount() {
    // auto update every 10s
    //this.timerID = setInterval(
      //() =>
       this.fetchDataByType(this.state.activeType)
      //,10000
    //);
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  fetchDataByType=(activeType)=> {
    const api = this.getApiByType(activeType);
    fetchData(api, function(data) {
      this.setState({ 
        updatedTime: new Date(),
        stockData: data,
      });
    }, this);
  }

  getApiByType=(activeType)=> {
    let api = "";
    EnumsManager.StockListTypes.forEach((type) => {
      if (activeType === type.type)
        api = type.api;
    });
    return api;
  }

  handleToggleButtonsClick=(e)=> {
    const newType = e.target.dataset.type;
    this.setState({ activeType: newType });
    this.fetchDataByType(newType);
  }

  handleRefreshButtonClick=()=> {
    this.fetchDataByType(this.state.activeType);
  }

  render() {
    // should I put those buttons here or componentWillMount?
    // if I put them in componentwillmount, those configs will be only generate once, but have to use this.xx to reference them, does the shallow compare or compare will tell the difference when each time render calls to save the render of them?
    const headerButtons = [];
    const toggleButtons = <ToggleButtons key="buttonsGroup"
                                         buttons={EnumsManager.StockListTypes}
                                         activeType={this.state.activeType}
                                         onClick={(e)=>this.handleToggleButtonsClick(e)} />;
    const refreshButton = <button key="refresh"
                                  title="refresh this stock list"
                                  className="btnRefresh"
                                  onClick={this.handleRefreshButtonClick} />;
    headerButtons.push(toggleButtons);
    headerButtons.push(refreshButton);

    return (
      <>
        <div className='floatPanel'>
          <SectionHeader title='Stock List' buttons={headerButtons} />
          <StandardTable
            columns={EnumsManager.StockListColumns}
            data={this.state.stockData}
            onClick={this.props.handleCellClick}
            activeType={this.state.activeType}
          />
          <div className='updatedTime'>
            updated on{" "}
            {this.state.updatedTime
              ? this.state.updatedTime.toLocaleString()
              : "--"}
            <img
              src={images.info_grey}
              className='iconInfo'
              title={`The stock list table will automatically update every 10 seconds to make sure you have up-to-date data.
If you want to retrieve real-time data, please click refresh button.`}
              alt=''
            />
          </div>
        </div>
        {/* <SpotLightTable data={this.state.stockData} /> */}
      </>
    );
  }
}