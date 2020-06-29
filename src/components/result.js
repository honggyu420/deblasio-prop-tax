import React, { Component } from "react";
// import { Container, Row, Col } from "react-bootstrap";
import "../App.css";
import { numWithCommas } from "../helpers/helpers";
import { Bar } from "react-chartjs-2";

const deblasio_data = require("../data/deblasio.json");

const label_mapping = {
	"market_val": "Market Value ($)",
	"tax_bill": "2021 Property Tax Bill ($)"
}
class Result extends Component {
  transformChartData(data, datapoint) {
    let chart_data = {
      labels: [],
      datasets: [
        {
          label: label_mapping[datapoint],
          data: [],
          backgroundColor: ["rgba(255,99,132,0.6)", "rgba(54,162,235,0.6)"],
        },
      ],
    };

    for (let prop_data of data) {
      chart_data.labels.push(prop_data.label);
      chart_data.datasets[0].data.push(prop_data[datapoint]);
		}
		
		return chart_data
  }

  constructor(props) {
		super(props);
    let tax_rate = 0.21167;
    let chart_data = {};
    let {
      curtxbtot,
      curmkttot,
      curtxbextot,
      housenum_lo,
      street_name,
      boro,
      zip_code,
      parid,
    } = this.props.property_tax_data;

    let tax_bill = (curtxbtot - curtxbextot) * tax_rate;
    let effective_tax_rate = tax_bill / curmkttot;

    let my_data = {
			address: `${housenum_lo} ${street_name}`,
			label: 'Your property',
      borough: boro,
      zip_code: zip_code,
      bbl: parid,
      market_val: curmkttot,
      assessed_val: curtxbtot,
      exemption: curtxbextot,
      tax_bill,
      effective_tax_rate,
    };
		
		chart_data = this.transformChartData([my_data, deblasio_data], this.props.datapoint);
		console.log(chart_data);
		
    this.state = { chart_data };
  }

  render() {
		
    return (
			<div className="chart">
				<Bar
				data={this.state.chart_data}
				options= {{
					// maintainAspectRatio: false
				}}
				/>
			</div>
		);
  }
}

export default Result;
