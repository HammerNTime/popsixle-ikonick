import React, { useEffect, useState } from "react";
import moment from "moment";
import { Chart as ChartJS } from "chart.js/auto";
import axios from "axios";
import {
  Card,
  Heading,
  TextContainer,
  DisplayText,
  TextStyle,
  Button,
} from "@shopify/polaris";
import { Line } from "react-chartjs-2";

export function PurchaseGraph({ purchaseGraphData, getRange }) {
  const [graphData, setGraphData] = useState(purchaseGraphData);
  function graphRangeChangeSubmit() {
    var graph_range_value = document.getElementById("graph_range_change");
    var table_range_value = document.getElementById("table_range_change");
    getRange(graph_range_value.value);
  }
  useEffect(() => {
    console.log(purchaseGraphData);
    setGraphData(purchaseGraphData);
  }, [purchaseGraphData]);
  return (
    <div>
      <Line
        data={graphData}
        options={{
          title: {
            display: false,
            text: "Purchase Data",
            fontSize: 20,
          },
          legend: {
            display: true,
            position: "right",
          },
        }}
      />{" "}
      <div>
        <input
          name="graph_range_change"
          id="graph_range_change"
          type="text"
          placeholder="Range: Days Back"
        />
        <button
          type="button"
          class="button cust-btn"
          onClick={() => {
            graphRangeChangeSubmit();
          }}
        >
          Go
        </button>
      </div>
    </div>
  );
}
