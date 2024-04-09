import { useUserStore } from "@/stores/user-store";
import gStyles from "@/styles/style";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetScrollView,
} from "@gorhom/bottom-sheet";
import { router } from "expo-router";
import { Fragment, useRef, useState } from "react";
import { View, Text, Image, TouchableOpacity, Alert } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import userService from "@/services/user.service";
import DeleteProfileModal from "@/components/profile/DeleteProfileModal";
import { deleteData } from "@/storage/async-storage";
import DeleteProfileSheetContent from "@/components/profile/DeleteProfileSheetContent";

export default function ProfilePage() {
  const user = useUserStore((state) => state.user);

  const { top } = useSafeAreaInsets();

  const deleteProfileRef = useRef<BottomSheet>(null);

  const open = () => deleteProfileRef.current?.expand();
  const close = () => deleteProfileRef.current?.close();

  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  const handleDeleteProfile = async () => {
    try {
      // const res = await userService.delete();
      // Тут будет логика по удалинию токена после слияния веток
      close();
      setIsModalVisible(true);
    } catch (error) {
      Alert.alert("Не удалось удалить учетную запись");
    }
  };

  const handleBackToAuth = () => {
    setIsModalVisible(false);
    router.replace("/(public)/auth");
  };

  const logout = async () => {
    await deleteData("token");
    router.replace("/(public)/auth");
  };

  return (
    <GestureHandlerRootView style={gStyles.pageProfile}>
      <View style={gStyles.pageProfileSection}>
        <Text style={gStyles.pagePTitle}>Аккаунт</Text>
        <View style={gStyles.pageProfileUserData}>
          <View style={gStyles.pageProfileUserItem}>
            <View style={gStyles.pageProfileUserItemData}>
              <Text style={gStyles.pagePDescr}>Телефон</Text>
              <Text style={gStyles.pagePName}>{user?.phone}</Text>
            </View>
          </View>
          <TouchableOpacity
            style={gStyles.pageProfileUserItem}
            onPress={() => router.push("/profile/name")}
          >
            <View style={gStyles.pageProfileUserItemData}>
              <Text style={gStyles.pagePDescr}>Имя</Text>
              {user?.name ? (
                <Text style={gStyles.pagePName}>{user.name}</Text>
              ) : (
                <Text style={gStyles.pagePNamePH}>Как вас зовут?</Text>
              )}
            </View>
            <Image
              style={gStyles.pageProfileIconArrow}
              source={require("../../../assets/images/arrow-upward.png")}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={gStyles.pageProfileUserItem}
            onPress={() => router.push("/(app)/profile/email")}
          >
            <View style={gStyles.pageProfileUserItemData}>
              <Text style={gStyles.pagePDescr}>Email</Text>
              {user?.email ? (
                <Text style={gStyles.pagePName}>{user.email}</Text>
              ) : (
                <Text style={gStyles.pagePNamePH}>Ваша почта</Text>
              )}
              {/* Текст, если значение пустое, вместо Placeholder */}
            </View>
            <Image
              style={gStyles.pageProfileIconArrow}
              source={require("../../../assets/images/arrow-upward.png")}
            />
          </TouchableOpacity>
        </View>
      </View>

      <View style={gStyles.pageProfileSection}>
        <Text style={gStyles.pagePTitle}>Уведомления</Text>
      </View>

      <View style={gStyles.pageProfileSection}>
        <TouchableOpacity
          style={gStyles.pageProfileOneItem}
          onPress={() => router.push("/(app)/profile/agreement")}
        >
          <View style={gStyles.pageProfileUserItemData}>
            <Text style={gStyles.pagePName}>Договор о присоединении</Text>
          </View>
          <Image
            style={gStyles.pageProfileIconArrow}
            source={require("../../../assets/images/arrow-upward.png")}
          />
        </TouchableOpacity>
      </View>

      <View style={gStyles.pageProfileSection}>
        <TouchableOpacity
          style={gStyles.pageProfileOneItem}
          onPress={() => logout()}
        >
          <View style={gStyles.pageProfileUserItemData}>
            <Text style={gStyles.pagePName}>Выйти из аккаунта</Text>
          </View>
          <Image
            style={gStyles.pageProfileIconArrow}
            source={require("../../../assets/images/logout.png")}
          />
        </TouchableOpacity>
      </View>

      <View style={gStyles.pageProfileSectionDel}>
        <TouchableOpacity onPress={open}>
          <Text style={gStyles.pagePTxtDel}>Удалить аккаунт</Text>
        </TouchableOpacity>
      </View>

      <BottomSheet
        containerStyle={{
          marginTop: top,
          zIndex: 100,
        }}
        ref={deleteProfileRef}
        index={-1}
        enableDynamicSizing={true}
        enablePanDownToClose={true}
        handleIndicatorStyle={{
          backgroundColor: "#CACACA",
          width: 36,
          height: 4,
        }}
        handleHeight={0}
        backgroundStyle={{ backgroundColor: "#fff", borderRadius: 28 }}
        handleStyle={{ padding: 6 }}
        backdropComponent={(props) => (
          <BottomSheetBackdrop
            {...props}
            opacity={0.3}
            enableTouchThrough={false}
            appearsOnIndex={0}
            disappearsOnIndex={-1}
            style={[{ backgroundColor: "#000" }, gStyles.absoluteFillObject]}
          />
        )}
      >
        <BottomSheetScrollView>
          <DeleteProfileSheetContent
            close={close}
            handleDeleteProfile={handleDeleteProfile}
          />
        </BottomSheetScrollView>
      </BottomSheet>

      <DeleteProfileModal
        isModalVisible={isModalVisible}
        handleBackToAuth={handleBackToAuth}
      />
    </GestureHandlerRootView>
  );
}
