import { storage } from "@/storage";
import { useRouter,  } from "expo-router";
import { View, Button, Text } from "react-native";

export default function SuccessPaymentPage() {

    const router = useRouter();

    const handleGoBack = () => {
        // storage.delete('payment');
        router.navigate('/(app)/wallet/');

    }

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Платеж на сумму успешно зачислен!</Text>
            <Button title="Хорошо" onPress={() => handleGoBack()}/>
        </View>
    )
}