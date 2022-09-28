import React, { useEffect, useState } from "react";
import moment from "moment";
import axios from "axios";
import {
  Card,
  Heading,
  TextContainer,
  DisplayText,
  TextStyle,
  Button,
} from "@shopify/polaris";

export function PixelData({ currentShop, currentServer }) {
  const [thisMoment, setThisMoment] = useState(moment().format("YYYY-MM-DD"));
  const [lowRange, setLowRange] = useState(
    moment().subtract(7, "days").format("YYYY-MM-DD")
  );
  const [highRange, setHighRange] = useState(
    moment().add(1, "days").format("YYYY-MM-DD")
  );
  const [pixelData, setPixelData] = useState("");
  useEffect(() => {
    const getUsers = async (
      currentShop,
      currentServer,
      lowRange,
      highRange
    ) => {
      try {
        const res = await axios({
          method: "POST",
          url: `${currentServer}popsixle_pixel_data.php`,
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
            Shop: `${currentShop}`,
            "Low-Range": `${lowRange}`,
            "High-Range": `${highRange}`,
          },
        });
        const data = res.data;
        setPixelData(data);
      } catch (err) {
        throw err;
      }
    };
    getUsers(currentShop, currentServer, lowRange, highRange);
  }, []);

  return currentShop != "THIS IS WHERE THE SHOP GOES" ? (
    pixelData ? (
      <>
        <Card title="Real-Time Event Data (Past 7 days)" sectioned>
          <TextContainer spacing="loose">
            <table
              style={{
                backgroundColor: "#80fcff",
                borderCollapse: "collapse",
                borderColor: "#ee5af1",
                borderStyle: "solid",
                borderWidth: "2px",
                width: "100%",
                color: "#000000",
              }}
            >
              <thead
                style={{
                  backgroundColor: "#ee5af1",
                }}
              >
                <tr>
                  <th
                    style={{
                      borderColor: "#ee5af1",
                      borderStyle: "solid",
                      borderWidth: "2px",
                      padding: "3px",
                    }}
                  >
                    Event Type
                  </th>
                  <th
                    style={{
                      borderColor: "#ee5af1",
                      borderStyle: "solid",
                      borderWidth: "2px",
                      padding: "3px",
                    }}
                  >
                    Total Events
                  </th>
                  <th
                    style={{
                      borderColor: "#ee5af1",
                      borderStyle: "solid",
                      borderWidth: "2px",
                      padding: "3px",
                    }}
                  >
                    % Recorded
                  </th>
                  <th
                    style={{
                      borderColor: "#ee5af1",
                      borderStyle: "solid",
                      borderWidth: "2px",
                      padding: "3px",
                    }}
                  >
                    Email %
                  </th>
                  <th
                    style={{
                      borderColor: "#ee5af1",
                      borderStyle: "solid",
                      borderWidth: "2px",
                      padding: "3px",
                    }}
                  >
                    Phone %
                  </th>
                  <th
                    style={{
                      borderColor: "#ee5af1",
                      borderStyle: "solid",
                      borderWidth: "2px",
                      padding: "3px",
                    }}
                  >
                    F Name %
                  </th>
                  <th
                    style={{
                      borderColor: "#ee5af1",
                      borderStyle: "solid",
                      borderWidth: "2px",
                      padding: "3px",
                    }}
                  >
                    L Name %
                  </th>
                  <th
                    style={{
                      borderColor: "#ee5af1",
                      borderStyle: "solid",
                      borderWidth: "2px",
                      padding: "3px",
                    }}
                  >
                    IP %
                  </th>
                  <th
                    style={{
                      borderColor: "#ee5af1",
                      borderStyle: "solid",
                      borderWidth: "2px",
                      padding: "3px",
                    }}
                  >
                    Browser %
                  </th>
                  <th
                    style={{
                      borderColor: "#ee5af1",
                      borderStyle: "solid",
                      borderWidth: "2px",
                      padding: "3px",
                    }}
                  >
                    FB Session %
                  </th>
                  <th
                    style={{
                      borderColor: "#ee5af1",
                      borderStyle: "solid",
                      borderWidth: "2px",
                      padding: "3px",
                    }}
                  >
                    FB Click %
                  </th>
                  <th
                    style={{
                      borderColor: "#ee5af1",
                      borderStyle: "solid",
                      borderWidth: "2px",
                      padding: "3px",
                    }}
                  >
                    Total Revenue
                  </th>
                </tr>
              </thead>
              <tbody>
                {pixelData.map((row) => {
                  return (
                    <tr>
                      <td
                        style={{
                          borderColor: "#ee5af1",
                          borderStyle: "solid",
                          borderWidth: "2px",
                          padding: "3px",
                        }}
                      >
                        {row["event_type"]}
                      </td>
                      <td
                        style={{
                          borderColor: "#ee5af1",
                          borderStyle: "solid",
                          borderWidth: "2px",
                          padding: "3px",
                          textAlign: "right",
                        }}
                      >
                        {row["Total Events"] ? row["Total Events"] : 0}
                      </td>
                      <td
                        style={{
                          borderColor: "#ee5af1",
                          borderStyle: "solid",
                          borderWidth: "2px",
                          padding: "3px",
                          textAlign: "right",
                        }}
                      >
                        {row["% recorded"]
                          ? parseFloat(row["% recorded"]).toFixed(2)
                          : parseFloat("0.00").toFixed(2)}
                      </td>
                      <td
                        style={{
                          borderColor: "#ee5af1",
                          borderStyle: "solid",
                          borderWidth: "2px",
                          padding: "3px",
                          textAlign: "right",
                        }}
                      >
                        {row["Em"]
                          ? parseFloat(row["Em"]).toFixed(2)
                          : parseFloat("0.00").toFixed(2)}
                      </td>
                      <td
                        style={{
                          borderColor: "#ee5af1",
                          borderStyle: "solid",
                          borderWidth: "2px",
                          padding: "3px",
                          textAlign: "right",
                        }}
                      >
                        {row["Ph"]
                          ? parseFloat(row["Ph"]).toFixed(2)
                          : parseFloat("0.00").toFixed(2)}
                      </td>
                      <td
                        style={{
                          borderColor: "#ee5af1",
                          borderStyle: "solid",
                          borderWidth: "2px",
                          padding: "3px",
                          textAlign: "right",
                        }}
                      >
                        {row["Fn"]
                          ? parseFloat(row["Fn"]).toFixed(2)
                          : parseFloat("0.00").toFixed(2)}
                      </td>
                      <td
                        style={{
                          borderColor: "#ee5af1",
                          borderStyle: "solid",
                          borderWidth: "2px",
                          padding: "3px",
                          textAlign: "right",
                        }}
                      >
                        {row["Ln"]
                          ? parseFloat(row["Ln"]).toFixed(2)
                          : parseFloat("0.00").toFixed(2)}
                      </td>
                      <td
                        style={{
                          borderColor: "#ee5af1",
                          borderStyle: "solid",
                          borderWidth: "2px",
                          padding: "3px",
                          textAlign: "right",
                        }}
                      >
                        {row["IP"]
                          ? parseFloat(row["IP"]).toFixed(2)
                          : parseFloat("0.00").toFixed(2)}
                      </td>
                      <td
                        style={{
                          borderColor: "#ee5af1",
                          borderStyle: "solid",
                          borderWidth: "2px",
                          padding: "3px",
                          textAlign: "right",
                        }}
                      >
                        {row["User Agent"]
                          ? parseFloat(row["User Agent"]).toFixed(2)
                          : parseFloat("0.00").toFixed(2)}
                      </td>
                      <td
                        style={{
                          borderColor: "#ee5af1",
                          borderStyle: "solid",
                          borderWidth: "2px",
                          padding: "3px",
                          textAlign: "right",
                        }}
                      >
                        {row["fbp"]
                          ? parseFloat(row["fbp"]).toFixed(2)
                          : parseFloat("0.00").toFixed(2)}
                      </td>
                      <td
                        style={{
                          borderColor: "#ee5af1",
                          borderStyle: "solid",
                          borderWidth: "2px",
                          padding: "3px",
                          textAlign: "right",
                        }}
                      >
                        {row["fbc"]
                          ? parseFloat(row["fbc"]).toFixed(2)
                          : parseFloat("0.00").toFixed(2)}
                      </td>
                      <td
                        style={{
                          borderColor: "#ee5af1",
                          borderStyle: "solid",
                          borderWidth: "2px",
                          padding: "3px",
                          textAlign: "right",
                        }}
                      >
                        {row["Total Revenue"]
                          ? parseFloat(row["Total Revenue"]).toFixed(2)
                          : parseFloat("0.00").toFixed(2)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </TextContainer>
        </Card>
      </>
    ) : (
      <>
        <Card title="Pixel Data" sectioned>
          <TextContainer spacing="loose">
            <Heading element="h4">
              Loading
              <DisplayText size="medium">
                <TextStyle variation="strong"></TextStyle>
              </DisplayText>
            </Heading>
          </TextContainer>
        </Card>
      </>
    )
  ) : (
    <Heading element="h4">
      YOU FORGOT TO UPDATE SHOP
      <DisplayText size="medium">
        <TextStyle variation="strong"></TextStyle>
      </DisplayText>
    </Heading>
  );
}
