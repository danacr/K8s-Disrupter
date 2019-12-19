import React, { Component } from "react";
import { Alert, Button, StyleSheet, Text, View } from "react-native";
import { Grid, Col, Row } from "react-native-easy-grid";
import { ShakeEventExpo } from "./ShakeEventExpo";
import Constants from "expo-constants";

function Separator() {
  return <View style={styles.separator} />;
}

export default class App extends Component {
  name = Constants.deviceName;
  id = Constants.installationId;
  async componentWillMount() {
    ShakeEventExpo.addListener(() => {
      fetch("https://disrupt.mad.md/", {
        method: "POST",
        body: JSON.stringify({ Name: this.name, ID: this.id })
      }).catch();
      Alert.alert("Disruption sent!");
    });
  }

  render() {
    return (
      <Grid style={{ backgroundColor: "black" }}>
        <Row style={{ alignItems: "center" }} size={1}>
          <Col style={{ alignItems: "center" }}>
            <Text style={{ color: "#fff", fontSize: 32 }}>Hi {this.name}</Text>
            <Separator />
            <Button
              title="Trigger disruption"
              onPress={() => {
                fetch("https://disrupt.mad.md/", {
                  method: "POST",
                  body: JSON.stringify({ Name: this.name, ID: this.id })
                }).catch();
                Alert.alert("Disruption sent!");
              }}
            />
          </Col>
        </Row>
      </Grid>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
    marginHorizontal: 16
  },
  title: {
    textAlign: "center",
    marginVertical: 16
  },
  fixToText: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  separator: {
    marginVertical: 16,
    borderBottomColor: "#000000",
    borderBottomWidth: StyleSheet.hairlineWidth
  }
});
