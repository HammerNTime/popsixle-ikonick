import React, { useEffect, useState } from "react";
import moment from "moment";
import { Chart as ChartJS } from "chart.js/auto";
import { Chart } from "react-chartjs-2";
import axios from "axios";
import {
  Card,
  Heading,
  TextContainer,
  DisplayText,
  TextStyle,
  Button,
  Page,
  Layout,
  Image,
  Stack,
  Link,
} from "@shopify/polaris";
import { Line } from "react-chartjs-2";

import popsixleImgUrl from "../assets/popsixle-logo.png";
import { PixelData } from "./PixelData";
import { PurchaseGraph } from "./PurchaseGraph";

export function HomePage({ currentShop, currentServer }) {
  const [totalFetchData, setTotalFetchData] = useState("");
  const [purchaseGraphData, setPurchaseGraphData] = useState([]);
  useEffect(() => {
    const getPurchaseData = async (currentShop, currentServer) => {
      try {
        const res = await axios({
          method: "POST",
          url: `${currentServer}popsixle_purchase_data.php`,
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
            Shop: `${currentShop}`,
          },
        });
        const data = res.data;
        setTotalFetchData(data);
      } catch (err) {
        throw err;
      }
    };
    getPurchaseData(currentShop, currentServer);
  }, []);
  useEffect(() => {

    if (totalFetchData.length > 0) {
      setPurchaseGraphData([
        {
          labels: totalFetchData.map((date) => date.date),
          type: "line",
          datasets: [
            {
              label: "Purchase Data",
              fill: true,
              lineTension: 0,
              backgroundColor: "rgba(73, 231, 249, 1)",
              borderColor: "rgba(0, 0, 0, 1)",
              borderWidth: 2,
              data: totalFetchData.map((total) => total["Total Revenue"]),
            },
            {
              label: "Total Purchase Events",
              fill: true,
              hidden: true,
              lineTension: 0,
              backgroundColor: "rgba(192, 60, 132, 0.8)",
              color: "rgba(192, 60, 132, 0.8)",
              borderColor: "rgba(0, 0, 0, 0.8)",
              borderWidth: 2,
              data: totalFetchData.map((total) => total["Total Events"]),
            },
          ],
        },
      ]);
    }
  }, [totalFetchData]);

  const getRange = async (graphRange) => {
    try {
      const res2 = await axios({
        method: "POST",
        url: `${currentServer}popsixle_purchase_data_range.php?graphRange=${graphRange}&shop=${currentShop}`,
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          Shop: `${currentShop}`,
          graphRange: `${graphRange}`,
        },
      });
      const data2 = res2.data;
      if (data2) {
        setTotalFetchData(data2);
      }
    } catch (err) {
      throw err;
    }
  };
  return (
    <Page fullWidth>
      <Layout>
        <Layout.Section>
          <Card sectioned>
            <Stack
              wrap={false}
              spacing="extraTight"
              distribution="trailing"
              alignment="center"
            >
              <Stack.Item fill>
                <TextContainer spacing="loose">
                  <Heading>Welcome to Popsixle on Shopify</Heading>
                  <p>
                    You are using the Popsixle Shopify Pre-Launch software. For
                    more info or any questions, email team@popsixle.com
                  </p>
                </TextContainer>
              </Stack.Item>
              <Stack.Item>
                <div style={{ padding: "0 20px" }}>
                  <Image
                    source={popsixleImgUrl}
                    alt="Popsixle Logo"
                    width={120}
                  />
                </div>
              </Stack.Item>
            </Stack>
          </Card>
        </Layout.Section>
        <Layout.Section>
          <PixelData currentShop={currentShop} currentServer={currentServer} />
        </Layout.Section>
        <Layout.Section>
          {purchaseGraphData.length > 0 ? (
            <PurchaseGraph
              purchaseGraphData={purchaseGraphData[0]}
              getRange={getRange}
            />
          ) : (
            "loading"
          )}
        </Layout.Section>
      </Layout>
    </Page>
  );
}
