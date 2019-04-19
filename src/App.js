// react ecosystem
import React from "react";
import styled, { keyframes } from "styled-components";
import { Switch, Route } from "react-router-dom";
import { Grid, Segment, Button } from "semantic-ui-react";
//---------------------------------------------------
import Routes from "./routes";
import { DataProvider } from "./components/TradingDay/WithDataContext";
import WithInstantSearch from "./components/TradingDay/WithInstantSearch";
import SearchInput from "./components/TradingDay/SearchInput";
import Header from "./components/TradingDay/Header";
import RoundButtons from "./components/coolook/RoundButtons";
export default class App extends React.Component {
  render() {
    return (
      <AppWrapper>
        <WithInstantSearch>
          <DataProvider>
            <Header />
            <SearchInput />
                <RoundButtons />
            {/* <Grid columns={2}>
              <Grid.Column> 
               <SquareButtons /> 
             </Grid.Column>
              <Grid.Column>
             </Grid.Column>
            </Grid> */}
            <Routes />
          </DataProvider>
        </WithInstantSearch>
      </AppWrapper>
    );
  }
}

//-------------------------------------------------
const AppWrapper = styled.div`
  /* text-align: center; */
  /* body > div,
  body > div > div ,
  body > div > div > div,
  body > div > div > div > div.login-form {
    height: 100%;
  } */
`;
// const rotate360 = keyframes`
//   from {
//     transform: rotate(0deg);
//   }
//   to {
//     transform: rotate(360deg);
//   }
// `;
// const AppLogo = styled.img`
//   animation: ${rotate360} infinite 120s linear;
//   height: 80px;
//   &:hover {
//     animation: ${rotate360} infinite 1.5s linear;
//   }
// `;
// const AppHeader = styled.div`
//   background-color: #222;
//   height: 150px;
//   padding: 20px;
//   color: white;
// `;
// const AppTitle = styled.h1`
//   font-size: 1.3em;
// `;
//-----------------------------------------------------
// <AppWrapper>
//   <AppHeader>
//     <AppLogo src={logo} alt='logo' />
//     <AppTitle>Welcome to React</AppTitle>
//   </AppHeader>
// </AppWrapper>;
