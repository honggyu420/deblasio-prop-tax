import React, { Component } from "react";
// import {Container, Row, Col} from 'react-bootstrap'
import "./App.css";
import DataChart from "./components/datachart";
import AddressForm from "./components/address_form";
import PropertyInfo from "./components/property_info";
import CalculatedTaxInfo from "./components/calculated_tax_info";
import AggregateReport from "./components/aggregate_report";
import load from "./assets/loading.gif";
import Result from "./components/result";

import "fullpage.js/vendors/scrolloverflow"; // Optional. When using scrollOverflow:true
import ReactFullpage from "@fullpage/react-fullpage";

const example_data = require("./data/property_example")

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      geoclient_json: null,
      property_tax_json: null,
      agg_result: null,
      message: null,
      loading: false,
      first_load_transition: true,
    };

    this.handleAddressSubmit = this.handleAddressSubmit.bind(this);
    this.showLoading = this.showLoading.bind(this);
  }
  componentDidMount(){
    // console.log(localStorage)
  }
  onLeave(origin, destination, direction) {
    console.log("Leaving section " + origin.index);
  }
  afterLoad(origin, destination, direction) {
    console.log("After load: " + destination.index);
  }

  handleAddressSubmit(geoclient_json, property_tax_json, agg_result, message) {
    this.setState({
      geoclient_json,
      property_tax_json,
      agg_result,
      message,
      loading: false,
    });
  }

  resetState() {
    this.setState({
      geoclient_json: null,
      property_tax_json: null,
      agg_result: null,
      message: null,
      loading: false,
    });
  }

  showLoading() {
    this.resetState();
    this.setState({ loading: true });
  }

  render() {
    let {
      property_tax_json,
      agg_result,
      message,
      loading,
    } = this.state;

    let fullpageRender = ({ state, fullpageApi }) => {
      if (property_tax_json) {
        fullpageApi.moveTo(2, 0)
      }

      // test
      return (
        <div id="fullpage-wrapper">
          <div className="section section1">
            <div>
              <h1>
                How much property tax do you pay compared to Mayor DeBlasio?
              </h1>
              <h2>Enter your address to find out.</h2>
              <AddressForm
                handleAddressSubmit={this.handleAddressSubmit}
                showLoading={this.showLoading}
              ></AddressForm>
            </div>
          </div>
          {property_tax_json ? (
            <div className="section section2">
              <Result property_tax_data={property_tax_json} datapoint="market_val"></Result>
            </div>
          ) : (
            ""
          )}
          {property_tax_json ? (
            <div className="section section3">
              <Result property_tax_data={property_tax_json} datapoint="tax_bill"></Result>
              <button onClick={() => fullpageApi.moveTo(1, 0)}>Move top</button>
            </div>
          ) : (
            ""
          )}
        </div>
      );
    };
    return (
      <ReactFullpage
        licenseKey=''
        scrollOverflow={true}
        // sectionsColor={["orange", "purple", "green"]}
        onLeave={this.onLeave.bind(this)}
        afterLoad={this.afterLoad.bind(this)}
        render={fullpageRender}
      />
    );
  }
}


//   <h3>{message}</h3>
//   <PropertyInfo property_tax_data={property_tax_json}></PropertyInfo>
//   <DataChart property_tax_data={property_tax_json}></DataChart>
//   <CalculatedTaxInfo
//     property_tax_data={property_tax_json}
//   ></CalculatedTaxInfo>
//   <AggregateReport agg_result={agg_result}></AggregateReport>

export default App;
