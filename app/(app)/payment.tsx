import userService from "@/services/user.service";
import { useUserStore } from "@/stores/user-store";
import { router } from "expo-router";
import { WebView, WebViewNavigation } from "react-native-webview";

export default function PaymentPage() {
  const { paymentUrl, setUser } = useUserStore();

  const orderId = paymentUrl?.split("orderId=")[1].split("&")[0];

  const handleNavigationStateChange = async (newState: WebViewNavigation) => {
    const successUrl = `https://yoomoney.ru/checkout/payments/v2/success?orderId=${orderId}`;

    if (newState.url === successUrl) {
      const data = await userService.getMe();
      console.log(data);
      if (data) {
        setUser(data);
      }
      console.log("Платеж успешно завершен");
    }

    if (newState.url.includes("http://localhost:3000/api")) {
      router.back();
    }
  };

  return (
    <WebView
      source={{ uri: paymentUrl ? paymentUrl : "" }}
      onNavigationStateChange={handleNavigationStateChange}
    />
  );
}
