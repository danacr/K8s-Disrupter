import React, { Component } from "react";
import { Text } from "react-native";
import { Grid, Col, Row } from "react-native-easy-grid";
import { ShakeEventExpo } from "./ShakeEventExpo";
import Constants from "expo-constants";

export default class App extends Component {
  name = Constants.deviceName;
  id = Constants.installationId;
  async componentWillMount() {
    ShakeEventExpo.addListener(() => {
      fetch("https://disrupt.mad.md/", {
        method: "POST",
        body: JSON.stringify({ Name: this.name, ID: this.id })
      }).catch();
    });
  }

  render() {
    return (
      <Grid style={{ backgroundColor: "black" }}>
        <Row style={{ alignItems: "center" }} size={1}>
          <Col style={{ alignItems: "center" }}>
            <Text style={{ color: "#fff", fontSize: 32 }}>Hi {this.name}</Text>
          </Col>
        </Row>
      </Grid>
    );
  }
}
