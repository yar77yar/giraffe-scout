import * as React from "react";
import { WebView } from "react-native-webview";

export default function AgreementPage() {
  return (
    <WebView
      // style={styles.container}
      source={{ uri: "https://giraffe-go.ru/agreement-app/" }}
    />
  );
}
