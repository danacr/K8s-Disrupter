import React, { Component } from "react";
import {
  Animated,
  Easing,
  StyleSheet,
  Text,
  View,
  Vibration
} from "react-native";
import { Grid, Col, Row } from "react-native-easy-grid";
import { ShakeEventExpo } from "./ShakeEventExpo";
import Constants from "expo-constants";
import LottieView from "lottie-react-native";
import AwesomeButton from "react-native-really-awesome-button/src/themes/red";

function Separator() {
  return <View style={styles.separator} />;
}

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      progress: new Animated.Value(0)
    };
  }

  runAnimation() {
    // reset animation progress, to enable retriggering
    this.state.progress.setValue(0);

    Animated.timing(this.state.progress, {
      toValue: 1,
      duration: 2 * 1000,
      easing: Easing.linear
    }).start();
  }
  name = Constants.deviceName;
  id = Constants.installationId;
  async componentWillMount() {
    ShakeEventExpo.addListener(() => {
      fetch("https://disrupt.mad.md/", {
        method: "POST",
        body: JSON.stringify({ Name: this.name, ID: this.id })
      }).catch();
      this.runAnimation();
      Vibration.vibrate(500);
    });
  }

  render() {
    return (
      <Grid style={{ backgroundColor: "black" }}>
        {/* <Separator /> */}
        <Separator />
        <View style={{ flex: 1, alignItems: "center" }}>
          <LottieView
            resizeMode={"cover"}
            key={1}
            source={require("./7598-particle-explosion.json")}
            progress={this.state.progress}
          />
        </View>
        <Row style={{ alignItems: "center" }}>
          <Col style={{ alignItems: "center" }}>
            <Text style={{ color: "#fff", fontSize: 32 }}>Hi {this.name}</Text>

            <Separator />

            <AwesomeButton
              onPress={() => {
                fetch("https://disrupt.mad.md/", {
                  method: "POST",
                  body: JSON.stringify({ Name: this.name, ID: this.id })
                }).catch();
                this.runAnimation();
                Vibration.vibrate(500);
              }}
            >
              <Text
                style={{
                  color: "#fff",
                  fontSize: 20,
                  padding: 10
                }}
              >
                Trigger Disruption
              </Text>
            </AwesomeButton>
          </Col>
        </Row>
        <Separator />
      </Grid>
    );
  }
}

const styles = StyleSheet.create({
  separator: {
    marginVertical: 32,
    borderBottomColor: "#000000",
    borderBottomWidth: StyleSheet.hairlineWidth
  }
});
