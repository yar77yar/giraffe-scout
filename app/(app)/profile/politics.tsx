import * as React from "react";
import { WebView } from "react-native-webview";

export default function PoliticsPage() {
  return (
    <WebView
      // style={styles.container}
      source={{ uri: "https://giraffe-go.ru/privacy-app/" }}
    />
  );
}
