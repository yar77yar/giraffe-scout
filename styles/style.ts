import { StyleSheet, Animated } from "react-native";
import { RotateInDownLeft } from "react-native-reanimated";
import { red } from "react-native-reanimated/lib/typescript/reanimated2/Colors";

const gStyles = StyleSheet.create({
  // Общие стили
  f1: {
    flex: 1,
  },
  pageBgWht:{
    backgroundColor: '#fff', 
  },
  bottomRadius:{
    borderBottomRightRadius: 28,
    borderBottomLeftRadius: 28,
  },
  absoluteFillObject: {
    position: "absolute",
    // height: '100%',
    // width: '100%',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 0,
  },
  // ПЕРВЫЙ ЭКРАН
  container: {
    flex: 1,
    // height: 300,
    backgroundColor: "#462736",
  },
  // Нижнее меню
  bottomMenu: {
    position: "absolute",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "stretch",
    // left: 20,
    // right: 20,
    height: 56,
    // padding: 16,
    paddingLeft: 8,
    paddingRight: 8,
    justifyContent: "center",
    // backgroundColor: '#000',
    width: "100%",
    // position: 'relative',
    // position: 'absolute',
    // left: 10,
    // right: 10,
    bottom: 10,
    // borderTopRightRadius: 16,
    // borderTopLeftRadius: 16,
    borderRadius: 200,
    zIndex: 0,
  },
  BackgroundBotMenu: {
    width: "100%",
    height: "100%",
    flex: 1,
    position: "absolute",
    // left: 30,
    // right: 0,
    justifyContent: "center",
    // resizeMode: 'contain',
  },
  bottomMenuItemBox: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    // gap: 40,
    alignItems: "center",
    alignSelf: "stretch",
    paddingLeft: 32,
    paddingRight: 32,
  },

  // Кнопка меню - бургер
  burgerBox: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: 0,
    // padding: 2,
    width: 42,
    // backgroundColor: '#FEC303'
    // borderRadius: 50,
  },
  burgerIcon: {
    width: 24,
    height: 24,
  },
  burgerIconTitle: {
    fontSize: 12,
    fontWeight: "400",
    lineHeight: 16,
    color: "#FAF5F5",
  },
  // end Кнопка меню - бургер

  logoBox: {
    padding: 8,
    borderRadius: 50,
  },
  logoIcon: {
    width: 74,
    height: 16,
  },
  logo: {
    // Стили для .logo
  },
  stock: {
    position: "absolute",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 200,
    backgroundColor: "#343030",
    width: 82,
    height: 82,
    bottom: 8,
  },
  btnQR: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 200,
    backgroundColor: "#FEC303",
    width: 70,
    height: 70,
  },
  btnQRIcon: {
    width: 28,
    height: 28,
  },

  // !!! === Предложение для первой поездки-Настройка
  firstRideOffer: {
    // Стили для .first-ride-offer
    position: "absolute",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "stretch",
    left: 20,
    right: 20,

    backgroundColor: "#fff",
    gap: 16,
    padding: 16,
    top: 160,
    zIndex: 1,
    borderRadius: 16,

    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  tapIcon: {
    // Стили для .tap-icon
  },
  tapOfferIcon: {
    width: 48,
    height: 48,
  },
  offer: {
    display: "flex",
    // flexWrap: 'wrap',
    flexShrink: 1,
  },
  title: {
    // Стили для .title
  },
  desc: {
    // Стили для .desc
  },
  // !!! === end Предложение для первой поездки-Настройка

  // !!! === Блок ActionBtnMap Кнопки Сканер/Навигация
  btnActionWrapper: {
    // Стили для .btn-action_wrapper
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    position: "absolute",
    padding: 24,
    zIndex: 2,
    bottom: 50,
  },
  myGeoBtn: {
    // Стили для .my-geo_btn
  },
  myGeoBtnIcon: {
    width: 80,
    height: 80,
  },
  box: {
    // Стили для .box
  },
  qrBtnIcon: {
    // Стили для .qr_btn
    width: 80,
    height: 80,
  },
  // !!! === end Блок ActionBtnMap Кнопки Сканер/Навигация

  // ===
  // ===
  // ===
  // !!! === Дорожые знаки и Иконки устройст на карте

  // Иконка ограничения скорости
  roadSignMapBox: {
    position: "absolute",
    top: 280,
    left: 40,
    // zIndex: 0,
  },
  roadSignMap: {
    width: 40,
    height: 40,
  },

  // маркер Парковки интерактивная с кол-вом самокатов
  parkingMapContainer: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
  },
  parkingMapContainerActive: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    gap: 3,
    zIndex: 2,
  },
  parkingMapBox: {
    display: "flex",
    alignItems: "center",
  },
  parkingMapWrapper: {
    width: 54,
    height: 34,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 3,
    backgroundColor: "#343030",
    // backgroundColor: "#8C57D0",
    borderRadius: 200,
    borderColor: "#10F442",
    borderWidth: 1,
    padding: 2,
    paddingEnd: 4,

    // shadowColor: '#000',
    // shadowOffset: {
    //   width: 0,
    //   height: 1,
    // },
    // shadowOpacity: 0.1,
    // shadowRadius: 2,
  },
  parkingMapWrapperActive: {
    width: 64,
    height: 40,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    backgroundColor: "#8C57D0",
    borderRadius: 200,
    borderColor: "#10F442",
    borderWidth: 1.5,
    padding: 2,
    paddingEnd: 4,

    // shadowColor: '#000',
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    // shadowOpacity: 0.2,
    // shadowRadius: 2,

    // elevation:3,
  },
  parkingMapIcon: {
    width: 24,
    height: 24,
  },
  parkingMapCountScoot: {
    fontSize: 14,
    color: "#fff",
    lineHeight: 20,
    fontWeight: "500",
  },
  parkingMapCircle: {
    width: 10,
    height: 10,
    backgroundColor: "#8C57D0",
    borderRadius: 200,
    marginBottom: 1,

    // shadowColor: '#257CFF',
    // shadowOffset: {
    //   width: 0,
    //   height: 1,
    // },
    // shadowOpacity: 0.6,
    // shadowRadius: 2,
  },

  parkingMapArrowDown: {
    marginTop: -1,
    // position: 'absolute',
    // bottom: 0,
    zIndex: -1,
    width: 0,
    height: 0,
    borderLeftWidth: 4,
    borderLeftColor: "transparent",
    borderRightWidth: 4,
    borderRightColor: "transparent",
    borderTopColor: "#343030",
    // borderTopColor: '#8C57D0'
    borderTopWidth: 8,

    // shadowColor: '#000',
    // shadowOffset: {
    //   width: 1,
    //   height: 1,
    // },
    // shadowOpacity: 0.2,
    // shadowRadius: 2,
  },

  parkingMapArrowDownActive: {
    marginTop: -1,
    zIndex: -1,
    width: 0,
    height: 0,
    borderLeftWidth: 4,
    borderLeftColor: "transparent",
    borderRightWidth: 4,
    borderRightColor: "transparent",
    borderTopColor: "#8C57D0",
    borderTopWidth: 8,

    // shadowColor: '#000',
    // shadowOffset: {
    //   width: 1,
    //   height: 1,
    // },
    // shadowOpacity: 0.3,
    // shadowRadius: 2,
  },

  //
  //
  // маркер Самоката на карте
  scootMarkerContainer: {
    // position: "absolute",
    // top: 390,
    // left: 80,
    display: "flex",
    alignItems: "center",
  },
  scootMarkerContainerActive: {
    // position: "absolute",
    // top: 390,
    // left: 80,
    display: "flex",
    alignItems: "center",
    gap: 3,
    zIndex: 2,
  },
  scootMarkerBox: {
    display: "flex",
    alignItems: "center",
  },
  scootMarkerArea: {
    width: 34,
    height: 34,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#343030",
    borderRadius: 200,
  },
  scootMarkerAreaActive: {
    width: 40,
    height: 40,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#8C57D0",
    borderRadius: 200,
  },

  scootMarkerWrapper: {
    position: "relative",
    width: 31,
    height: 31,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#343030",
    borderRadius: 200,
    borderColor: "#BEB1B1",
    borderWidth: 3,
  },
  scootMarkerWrapperActive: {
    position: "relative",
    width: 36,
    height: 36,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#8C57D0",
    borderRadius: 200,
    borderColor: "#BEB1B1",
    borderWidth: 4,
  },

  svgBattaryRadius: {
    position: "absolute",
    borderRadius: 200,
    width: 34,
    height: 34,
    zIndex: 1,
    transform: [{ rotateX: "180deg" }],
  },
  svgBattaryRadiusActive: {
    position: "absolute",
    borderRadius: 200,
    width: 40,
    height: 40,
    zIndex: 1,
    transform: [{ rotateX: "180deg" }],
  },

  scootMarkerIcon: {
    width: 20,
    height: 20,
  },

  // !!! === end Дорожые знаки и Иконки устройст на карте
  // ===
  // ===
  // ===

  // !!! === Список самокатов
  scootListContainer: {
    display: "flex",
    alignSelf: "stretch",
  },
  scootListItem: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    alignSelf: "stretch",
    paddingTop: 14,
    paddingBottom: 14,
    paddingLeft: 20,
    paddingRight: 20,
    borderBottomWidth: 2,
    borderBottomColor: "#D0F0F9",
  },
  sLIBoxOne: {
    display: "flex",
    flexDirection: "row",
    // justifyContent: 'flex-start',
    alignItems: "center",
    gap: 12,
    alignSelf: "stretch",
    paddingTop: 14,
    paddingBottom: 14,
  },
  sLIImageWrap: {
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    width: 60,
    height: 60,
  },
  sLIImageScoot: {
    width: 52,
    height: 60,
    zIndex: 1,
  },
  sLIImageScootBack: {
    width: 58,
    height: 58,
    position: "absolute",
    // alignItems: 'center',
  },
  sLIInfoWrap: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
  },
  sLIModelTxt: {
    fontSize: 18,
    fontWeight: "400",
    lineHeight: 22,
    color: "#646161",
  },
  sLIqr: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    // justifyContent: 'center',
    gap: 6,
  },
  sLIqrIcon: {
    width: 22,
    height: 22,
  },
  sLIqrTxt: {
    fontSize: 20,
    fontWeight: "600",
    lineHeight: 23,
    color: "#000",
  },
  // Бокс с индикатором зарядки
  sLIBoxTwo: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 2,
  },

  sLIChargeBox: {
    position: 'relative',
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "center",
    // width: 56,
    // height: 26,
    width: 66,
    height: 32,
    // backgroundColor: '#f2f4f6',
    backgroundColor: "#C2C2C2",
    // backgroundColor: '#343030',
    borderRadius: 6,
    // borderRadius: 200,
    // overflow: 'hidden',
    // borderColor: '#C2C2C2',
    // borderWidth: 1,
    // padding: 1,
    paddingBottom: 2,
    paddingTop: 2,
    paddingLeft: 2,
    paddingRight: 2,
  },
  innerShadow: {
    position: "relative",
    overflow: "hidden",
  },
  innerShadowContent: {
    borderRadius: 10,
    margin: 0,
    position: "absolute",
    width: "100%",
    height: "100%",
    flex: 1,
    backgroundColor: "transparent",
    // borderColor: '#E8E8E8',
    borderColor: "#fff",
    borderWidth: 1,
    overflow: "hidden",
    shadowColor: "black",
    shadowRadius: 1,
    shadowOpacity: 1,
  },

  sLILevelBox: {
    display: "flex",
    backgroundColor: "#10F442",
    width: "100%",
    height: "100%",
    borderRadius: 5,
    // borderRadius: 200,
    // shadowColor: "rgba(0, 0, 0, 0.20)",
    // shadowOffset: { width: 2, height: 1 },
    // shadowOpacity: 1,
    // shadowRadius: 1,
    // margin: 6,
    zIndex: 1,
  },
  sLILevelIcTxtBox:{
    // flex: 1,
    position: "absolute",
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems:'center',
    gap: 2,
    width: '100%',
    zIndex: 2,
    height: '100%',
  },
  sLILightIcon: {
    width: 10,
    height: 16,
    // position: "absolute",
    // left: 22,
    // zIndex: 2,
  },

  // ==========
  // ==========
  // ==========
  // !!! === МЕНЮ ГЛАВНОЕ
  lineModSwipeBox: {
    flex: 1,
    display: "flex",
    alignItems: "center",
  },
  lineModSwipe: {
    width: 36,
    height: 4,
    backgroundColor: "#CACACA",
    borderRadius: 4,
  },
  menuContainer: {
    backgroundColor: "#fff",
    display: "flex",
    flexDirection: "column",
    // justifyContent: 'center',
    // alignItems: "center",
    gap: 16,
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 6,
    paddingBottom: 20,
    borderTopRightRadius: 28,
    borderTopLeftRadius: 28,
  },
  menuInfoTitleB: {
    color: "#000",
    fontSize: 16,
    fontWeight: "600",
    lineHeight: 20,
  },
  menuInfoTitleW: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    lineHeight: 20,
  },
  menuInfoDescW: {
    color: "#BCB2B2",
    fontSize: 14,
    fontWeight: "400",
    lineHeight: 16,
  },
  menuInfoDescB: {
    color: "#585555",
    fontSize: 14,
    fontWeight: "400",
    lineHeight: 16,
  },

  // Профиль - карточка
  menuWrapperProfile: {
    display: "flex",
    alignSelf: "stretch",
    justifyContent: "space-between",
    height: 120,
    // backgroundColor: '#80668c',
    backgroundColor: "#75528c",
    borderRadius: 20,
    padding: 12,
    overflow: "hidden",
  },
  menuProfileIconSmile: {
    position: "absolute",
    top: -18,
    right: -28,
    width: 140,
    height: 140,
  },
  menuProfileHelloBox: {
    display: "flex",
    flexDirection: "row",
    paddingBottom: 3,
  },
  menuProfileHelloTxt: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "700",
    lineHeight: 28,
  },
  menuProfileInfoBox: {
    display: "flex",
    flexDirection: "column",
    gap: 4,
  },
  menuProfileInfoTitle: {
    color: "#000",
    fontSize: 16,
    fontWeight: "600",
    lineHeight: 20,
  },
  menuProfileInfoTel: {
    // color: '#444444',
    color: "#D7C5C5",
    fontSize: 16,
    fontWeight: "500",
    lineHeight: 20,
  },

  // Блок карточек - Помощь, Как это работает
  menuHelpGuidBox: {
    display: "flex",
    flex: 1,
    alignSelf: "stretch",
    flexDirection: "row",
    // justifyContent: 'space-between',
    height: 180,
    gap: 12,
  },

  // Помощь - карточка
  menuWrapperHelp: {
    display: "flex",
    flex: 1,
    flexDirection: "column",
    alignSelf: "stretch",
    justifyContent: "flex-end",
    // height: '100%',
    // width: '40%',
    backgroundColor: "#3ECAF6",
    borderRadius: 20,
    padding: 12,
    overflow: "hidden",
  },
  menuHelpInfo: {
    display: "flex",
    gap: 14,
    paddingBottom: 4,
  },
  menuHelpIconTg: {
    position: "absolute",
    top: 14,
    right: 14,
    width: 30,
    height: 26,
  },
  // Как это работает - блок
  menuWrapperGuid: {
    display: "flex",
    flex: 1,
    flexDirection: "column",
    alignSelf: "stretch",
    // justifyContent: 'flex-start',
    height: 100,
    // width: '90%',
    // backgroundColor: '#373232',
    borderRadius: 20,
    overflow: "hidden",
  },
  menuGuidInfoBox: {
    display: "flex",
    padding: 12,
    paddingTop: 20,
    // alignItems: 'stretch',
    alignSelf: "stretch",
  },
  menuGuidInfoTxt: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "700",
    lineHeight: 22,
  },

  menuWrapperGuidImgBack: {
    width: "100%",
    height: "100%",
    flex: 1,
    resizeMode: "cover",
    // top:0,
    // bottom: 0,
    position: "absolute",
    // borderRadius: 20,
  },

  // Кошелек - карточка
  menuWrapperWallet: {
    display: "flex",
    flex: 1,
    gap: 20,
    width: "96%",
    height: 160,
    borderRadius: 20,
    overflow: "hidden",
  },
  menuWrapperWalletImgBack: {
    width: "100%",
    height: "100%",
    flex: 1,
    position: "absolute",
  },

  menuWalletInfoBox: {
    height: "100%",
    display: "flex",
    // flex: 1,
    flexDirection: "column",
    // alignItems: 'flex-end',
    justifyContent: "center",
    gap: 24,
    padding: 16,
  },
  menuWalletInfoTitle: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    lineHeight: 20,
  },
  menuWalletInfoMoney: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: 2,
  },
  menuWalletMonneyValue: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "700",
    lineHeight: 28,
  },
  menuWalletIconRub: {
    width: 17,
    height: 20,
  },

  //
  // Блок карточек - Промокод, Подписки
  menuPPBox: {
    display: "flex",
    flex: 1,
    alignSelf: "stretch",
    flexDirection: "row",
    // justifyContent: 'space-between',
    height: 160,
    gap: 12,
  },

  // Промокод - карточка
  menuWrapperPromo: {
    display: "flex",
    flex: 1,
    flexDirection: "column",
    alignSelf: "stretch",
    justifyContent: "flex-end",
    // height: '100%',
    // width: '40%',
    // backgroundColor: '#3ECAF6',
    borderRadius: 20,
    padding: 12,
    overflow: "hidden",
  },
  menuPromoInfo: {
    paddingBottom: 4,
  },
  menuPromoIconMegaphone: {
    position: "absolute",
    bottom: 25,
    right: 10,
    width: 70,
    height: 70,
    transform: [{ rotate: "10deg" }],
  },
  menuPromoIconPercent: {
    position: "absolute",
    top: 5,
    left: -10,
    width: 120,
    height: 80,
    transform: [{ rotate: "10deg" }],
  },

  // Подписка - карточка
  menuWrapperPass: {
    display: "flex",
    flex: 1,
    flexDirection: "column",
    alignSelf: "stretch",
    justifyContent: "flex-start",
    height: "100%",
    // width: '40%',
    // backgroundColor: '#3ECAF6',
    borderRadius: 20,
    padding: 12,
    overflow: "hidden",
  },
  menuPassInfo: {
    display: "flex",
    gap: 14,
    paddingTop: 4,
  },
  menuPassIconStart: {
    position: "absolute",
    bottom: 12,
    right: 10,
    width: 80,
    height: 80,
    transform: [{ rotate: "20deg" }],
  },

  //
  // История поездок - карточка
  menuWrapperHtrip: {
    display: "flex",
    alignSelf: "stretch",
    justifyContent: "center",
    // alignItems: 'center',
    height: 70,
    backgroundColor: "#ff547880",
    // backgroundColor: 'rgb(227 249 114)',
    // backgroundColor: 'rgb(222 241 107)',
    // backgroundColor: '#FDDA30',
    // backgroundColor: '#50328c99',
    borderRadius: 20,
    padding: 12,
    overflow: "hidden",
  },
  menuHtripIconRoad: {
    position: "absolute",
    top: 4,
    right: 30,
    width: 60,
    height: 60,
  },


  //
  // О приложении - карточка
  menuWrapperApp: {
    display: "flex",
    flex: 1,
    alignItems: "center",
    alignSelf: "stretch",
    gap: 12,
    width: "100%",
    // height: 160,
    borderRadius: 20,
    backgroundColor: "#D6E7EC70",
    padding: 14,
    marginTop: 24,
  },
  menuWrapperAppInfoBox: {
    display: "flex",
    // justifyContent: 'center',
    alignItems: "center",
    alignSelf: "stretch",
    gap: 2,
  },
  menuWrapperAppLogo: {
    width: 70,
    height: 100,
  },
  menuWrapperAppVers: {
    fontSize: 12,
    fontWeight: "400",
    lineHeight: 16,
    color: "#000",
  },
  menuWrapperAppLaw: {
    fontSize: 14,
    fontWeight: "400",
    lineHeight: 16,
    color: "#000",
  },
  menuWrapperAppSocBox: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  menuWrapperAppSocItem: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 46,
    height: 46,
    backgroundColor: "#fff",
    borderRadius: 200,
  },
  menuAppIconSoc: {
    width: 36,
    height: 36,
  },
  // end О приложении - карточка
  // !!! === end МЕНЮ ГЛАВНОЕ
  // ==========
  // ==========
  // ==========

  // ==========
  // ==========
  // ==========
  // !!! === Профиль - Страница

  pageProfile: {
    flex: 1,
    display: "flex",
    gap: 8,
  },
  pageProfileSection: {
    display: "flex",
    gap: 20,
    padding: 20,
    backgroundColor: "#fff",
  },
  pagePTitle: {
    fontSize: 12,
    fontWeight: "400",
    lineHeight: 16,
    color: "#000",
    textTransform: "uppercase",
  },
  pageProfileUserData: {
    display: "flex",
    gap: 6,
    alignSelf: "stretch",
  },
  pageItemLine: {
    // flex:1,
    display: "flex",
    alignSelf: "stretch",
    width: "100%",
    height: 1,
    backgroundColor: "#f0f0f0",
  },
  pageProfileUserItem: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    //  borderColor: "#F6F6F6",
    //  borderBottomWidth: 1,
    paddingTop: 8,
    paddingBottom: 8,
  },
  pageProfileUserItemData: {
    display: "flex",
    gap: 6,
  },
  pagePDescr: {
    fontSize: 13,
    fontWeight: "500",
    lineHeight: 16,
    color: "#857B7B",
  },
  pagePName: {
    fontSize: 18,
    fontWeight: "700",
    lineHeight: 20,
    color: "#262626",
  },
  pagePNamePH: {
    fontSize: 18,
    fontWeight: "700",
    lineHeight: 20,
    color: "#C9BCBC",
  },
  pageProfileIconArrow: {
    width: 24,
    height: 24,
  },

  pageProfileOneItem: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  pageProfileSectionDel: {
    display: "flex",
    padding: 20,
  },
  pagePTxtDel: {
    fontSize: 16,
    fontWeight: "400",
    lineHeight: 20,
    color: "#FF1111",
  },
  // Страница - Имя изменить
  pageNameInput: {
    flex: 1,
    display: "flex",
    textAlign: "center",
    fontSize: 28,
    fontWeight: "700",
    lineHeight: 32,
    color: "#262626",
  },

  // !!! === end Профиль - Страница
  // ==========
  // ==========
  // ==========

  // ==========
  // ==========
  // ==========
  // !!! === Кошелек - Страница
  pageWalletWpapper: {
    display: "flex",
    // flex: 1,
    gap: 20,
    // width: '96%',
    height: 160,
    borderRadius: 20,
    overflow: "hidden",
  },
  pageWalletPayMethodStub: {
    display: "flex",
    alignItems: "center",
    gap: 4,
  },
  pageWalletPayStubMess: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    alignSelf: "stretch",
    padding: 6,
    gap: 6,
    // backgroundColor: "#F6F6F6",
    borderRadius: 16,
  },
  btnPayMethod: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 56,
    width: "100%",
    fontSize: 20,
    // backgroundColor: '#f2f4f6',
    backgroundColor: "#F0F0F0",
    borderRadius: 16,
  },

  pageWalletPayData: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  payMethodSelectTitle:{
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  payMethodSelectTitleTxt: {
    fontSize: 18,
    fontWeight: "500",
    lineHeight: 22,
    color: "#000",
  },
  payMethodIconBox: {
    width: 40,
    height: 40,
    display: "flex",
    alignItems: "center",
    position: "relative",
  },
  payMethodAddBtnBox:{
    display: "flex",
    flexDirection: 'row',
    alignItems: "center",
    justifyContent: 'center',
    gap: 8,
  },
  payMethodIcon: {
    // flex: 1,
    width: "100%",
    height: "100%",
  },
  payMethodIconPlus:{
    width: 24,
    height: 24,
  },
  payMethodIconBack: {
    width: 24,
    height: 24,
    display: "flex",
    alignItems: "center",
    position: "relative",
  },
  tabsPayHistory: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    gap: 8,
  },
  tabsPayHistoryBtn: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F2F4F6",
    borderRadius: 16,
    paddingTop: 6,
    paddingBottom: 6,
    paddingLeft: 12,
    paddingRight: 12,
  },
  tabsPayHistoryBtnActive: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#373232",
    borderRadius: 16,
    paddingTop: 6,
    paddingBottom: 6,
    paddingLeft: 12,
    paddingRight: 12,
  },
  tabsPayHistoryBtnTxtActive: {
    fontSize: 16,
    fontWeight: "500",
    lineHeight: 20,
    color: "#fff",
  },
  tabsPayHistoryBtnTxt: {
    fontSize: 16,
    fontWeight: "400",
    lineHeight: 20,
    color: "#2E3032",
  },

  // История платежей
  payHistoryWrapper: {
    display: "flex",
    gap: 18,
  },
  payHistoryOneDateContainer: {
    display: "flex",
    gap: 18,
    paddingTop: 16,
  },
  payHistoryDate: {
    fontSize: 18,
    fontWeight: "700",
    lineHeight: 24,
    color: "#2E3032",
  },
  payHistoryBoxItem: {
    display: "flex",
    gap: 6,
    // alignSelf: 'stretch',
  },
  payHistoryItem: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    // gap: 12,
    alignItems: "center",
    paddingTop: 8,
    paddingBottom: 8,
    // flex: 1,
  },
  payHistoryItemData: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    flexShrink: 1,
    overflow: "hidden",
  },
  payHistoryMethodIconBox: {
    width: 40,
    height: 40,
    display: "flex",
    alignItems: "center",
    position: "relative",
    backgroundColor: "#F2F4F6",
    borderRadius: 200,
  },
  payHistoryIcon: {
    // flex: 1,
    width: 28,
    height: "100%",
  },
  payHistoryValueTxt: {
    display: "flex",
    gap: 6,
    // alignSelf: 'stretch',
    // overflow: 'hidden',
  },
  payHistoryTypeTxt: {
    fontSize: 16,
    fontWeight: "600",
    lineHeight: 16,
    color: "#262626",
  },
  payHistoryPriceBox: {
    display: "flex",
    flexDirection: "column",
    alignSelf: "stretch",
    alignItems: "flex-end",
    paddingLeft: 6,
  },
  // payHistoryPriceWallet:{
  //   display: 'flex',
  //   flexDirection: 'row',
  //   justifyContent: 'center',
  //   gap: 2,
  //   backgroundColor: '#FDDA3090',
  //   borderRadius: 16,
  //   paddingTop: 4,
  //   paddingBottom: 4,
  //   paddingLeft: 6,
  //   paddingRight: 6,
  // },
  payHistoryPriceWallet: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    gap: 2,
    // backgroundColor: '#FDDA3090',
    borderRadius: 16,
    paddingTop: 4,
    paddingBottom: 4,
    paddingLeft: 6,
    paddingRight: 6,
  },
  payHistoryPriceWalletTxt: {
    fontSize: 16,
    fontWeight: "600",
    lineHeight: 20,
    color: "#000",
    // color: "#D7BA30",
  },
  payHistoryPriceDebtTxt: {
    fontSize: 16,
    fontWeight: "600",
    lineHeight: 20,
    color: "#000",
    // color: "#D7BA30",
  },
  payHistoryPriceRefillTxt: {
    fontSize: 16,
    fontWeight: "600",
    lineHeight: 20,
    color: "#CCAB0A",
    // color: "#D7BA30",
    // color: '#FEC303',
  },

  payHistoryIconRub: {
    width: 10,
    height: "auto",
  },
  payHistoryPriceDebt: {
    display: "flex",
    flexDirection: "row",
    // alignItems: 'center',
    justifyContent: "center",
    gap: 2,
    // backgroundColor: '#FDDA3090',
    borderRadius: 16,
    paddingTop: 4,
    paddingBottom: 4,
    paddingLeft: 6,
    paddingRight: 6,
  },

  payHistoryIconMiniWallet: {
    width: 24,
    height: "auto",
  },
  payHistoryValueShadowBox: {
    position: "absolute",
    // width: 1,
    height: "100%",
    backgroundColor: "#000",
    left: 0,
    // right: 0,
    top: 0,
  },
  payHistoryValueShadow: {
    position: "absolute",
    // width: 1,
    height: "100%",
    // backgroundColor: '#000',
    // left: -5,
    // right: 0,
    top: 0,
  },

  // СТраница - Пополнение кошелька
  pageRefill: {
    backgroundColor: "#fff",
    flex: 1,
    // alignSelf: 'stretch',
    // display: 'flex',
  },
  pageRefillIconRub: {
    width: 20,
    height: 24,
  },
  pageRefillInput: {
    color: "#000",
    fontSize: 28,
    fontWeight: "700",
    lineHeight: 32,
  },
  pageRefillAddSum: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
  },
  pageRefillIAddBtnBox: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "stretch",
    paddingTop: 20,
    paddingBottom: 20,
    borderTopColor: "#F6F6F6",
    borderTopWidth: 6,
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: "#fff",
  },

  // !!! === end Кошелек - Страница
  // ==========
  // ==========
  // ==========

  // ==========
  // ==========
  // ==========
  // !!! === ПОДПИСКИ - Страница

  passCardWrapper: {
    // flex: 1,
    // display: 'flex',
    width: "100%",
    height: 140,
    backgroundColor: "#F0F0F0",
    borderRadius: 16,
    padding: 14,
    zIndex: 1,
  },
  // Табуляция
  passCardTabsBox: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    gap: 8,
    backgroundColor: "#F2F4F6",
    borderRadius: 200,
    padding: 4,
  },

  passCardTabs: {
    flex: 1,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    // backgroundColor: "#fff",
    borderRadius: 16,
    paddingTop: 8,
    paddingBottom: 8,
    // paddingLeft: 12,
    // paddingRight: 12,
  },
  passCardTabsActive: {
    backgroundColor: "#373232",
  },
  passCardTabsTxt: {
    fontSize: 16,
    fontWeight: "400",
    lineHeight: 20,
    color: "#2E3032",
  },

  passCardTabsTxtActive: {
    fontWeight: "500",
    color: "#fff",
  },

  // tabsPayHistoryBtnActive:{
  //   display: "flex",
  //   flexDirection: "row",
  //   alignItems: "center",
  //   justifyContent: "center",
  //   backgroundColor: "#373232",
  //   borderRadius: 16,
  //   paddingTop: 6,
  //   paddingBottom: 6,
  //   paddingLeft: 12,
  //   paddingRight: 12,
  // },
  // tabsPayHistoryBtnTxtActive:{
  //   fontSize: 16,
  //   fontWeight: "500",
  //   lineHeight: 20,
  //   color: "#fff",
  // },

  passCardListBox: {
    display: "flex",
    gap: 24,
    // alignSelf: 'stretch',
  },

  passCardNamePrice: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  passCardName: {
    // color: '#FDDA30',
    color: "#fff",
    fontSize: 22,
    fontWeight: "600",
    lineHeight: 24,
  },
  passCardPriceBox: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
    // backgroundColor: '#CCAB0A',
    backgroundColor: "#FEC303",
    borderWidth: 1,
    borderColor: "#ffffff50",
    borderRadius: 200,
    paddingTop: 6,
    paddingBottom: 6,
    paddingLeft: 12,
    paddingRight: 12,
  },
  passCardPrice: {
    // color: '#fff',
    color: "#262626",
    fontSize: 18,
    fontWeight: "700",
    lineHeight: 24,
  },
  passCardIconRub: {
    width: 12,
    height: 14,
  },
  passCardIconStart: {
    position: "absolute",
    bottom: 16,
    left: 16,
    width: 56,
    height: 56,
    // transform: [{ rotate: '20deg'}],
  },
  passCardIconBlur: {
    position: "absolute",
    bottom: 0,
    top: 0,
    right: -20,
    width: 130,
    height: 140,
  },
  passCardIconRoad: {
    position: "absolute",
    bottom: -30,
    top: 0,
    right: 50,
    width: 140,
    height: "auto",
    transform: [{ rotate: "-15deg" }],
  },
  // всплывашка одной подписки
  passPopupTitleBox: {
    display: "flex",
    flexDirection: "row",
  },
  passPopupTitle: {
    fontSize: 20,
    fontWeight: "700",
    lineHeight: 20,
    color: "#262626",
  },
  passPopupTitleValue: {
    fontSize: 20,
    fontWeight: "900",
    lineHeight: 20,
    color: "#262626",
    // borderBottomWidth: 1,
    // borderColor: "#FEC303",
  },
  passPopupAdvItem: {
    width: 50,
    height: 50,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    // backgroundColor: '#F2F4F6',
    borderRadius: 200,
  },
  passPopupAdvItemBgRed: {
    backgroundColor: "#EA906A",
  },
  passPopupAdvItemBgOrange: {
    backgroundColor: "#E5AA50",
  },
  passPopupAdvItemBgGreen: {
    backgroundColor: "#6CB849",
  },
  passCardPriceBoxInBtn: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
    borderRadius: 200,
    // paddingTop: 6,
    // paddingBottom: 6,
    paddingLeft: 6,
    // paddingRight: 12,
  },
  passCardItemData: {
    display: "flex",
    // alignSelf: 'stretch',
    justifyContent: "center",
    gap: 2,
    flex: 1,
  },
  passCardPDescr: {
    fontSize: 13,
    fontWeight: "500",
    lineHeight: 16,
    color: "#857B7B",
    // flexWrap: 'wrap',
  },
  passPopupAdvIcon: {
    width: 32,
  },

  //Вкладка МОИ ПОДПИСКИ
  passCardNopassBox: {
    display: "flex",
    alignItems: "center",
    gap: 2,
    paddingTop: 30,
  },
  passCardNopassIcon: {
    width: 160,
    height: 160,
  },
  passCardNopassTitle: {
    fontSize: 14,
    fontWeight: "500",
    lineHeight: 20,
    color: "#646161",
  },
  passCardPocketBox: {
    display: "flex",
    // alignSelf: 'stretch',
    // alignItems: 'flex-end',
    justifyContent: "flex-end",
    gap: 8,
    // height: 80,
    backgroundColor: "#F2F4F6",
    // position: "absolute",
    // bottom: -130,
    // left: 8,
    // right: 8,
    // width: '100%',
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    padding: 12,
    paddingTop: 40,
    // margin: 20,
  },
  passCardPocketItem: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  passCardPocketItemTxt: {
    fontSize: 16,
    fontWeight: "400",
    lineHeight: 22,
  },
  passCardPocketItemTxtBold: {
    fontSize: 16,
    fontWeight: "600",
    lineHeight: 22,
  },
  passCardPocketPtb: {
    paddingBottom: 12,
    paddingTop: 12,
  },

  // !!! === end ПОДПИСКИ - Страница
  // ==========
  // ==========
  // ==========

  // ==========
  // ==========
  // !!! === ИСТОРИЯ ПОЕЗДОК - Страница
  boxCardHtripsValue:{
    display: "flex",
    alignItems: 'flex-end',
    flexDirection: 'row',
    gap: 8,
  },
  pageHtripsDescr: {
    fontSize: 13,
    fontWeight: "500",
    lineHeight: 16,
    color: "#262626",
    // color: '#857B7B',
  },
  pageHtripsQrTxt: {
    fontSize: 15,
    fontWeight: "500",
    lineHeight: 20,
    // color: "#262626",
    color: '#857B7B',
  },
  boxCardHtripsPrice: {
    display: "flex",
    flexDirection: "column",
    gap: 6,
    // alignSelf: "stretch",
    alignItems: 'flex-start',
    paddingLeft: 6,
  },
  cardHtripsPrice: {
    display: "flex",
    flexDirection: "row",
    // alignItems: 'center',
    justifyContent: "center",
    gap: 2,
    borderColor: '#FEC303',
    borderBottomWidth: 2,
  },
  cardHtripsDateTxt: {
    fontSize: 16,
    fontWeight: "600",
    lineHeight: 20,
    color: "#262626",
  },
  cardHtripsPriceTxt: {
    fontSize: 15,
    fontWeight: "400",
    lineHeight: 17,
    color: "#000",
    // color: "#D7BA30",
  },
  boxCardHtripsStat:{
    backgroundColor: '#F2F4F6',
    display: "flex",
    alignItems: 'center',
    // justifyContent: 'center',
    flexDirection: 'row',
    gap: 4,
    paddingTop: 3,
    paddingBottom: 3,
    paddingLeft: 4,
    paddingRight: 4,
    borderRadius: 20,
  },
  boxCardHtripsQr:{
    // backgroundColor: '#F2F4F6',
    display: "flex",
    alignItems: 'center',
    // justifyContent: 'center',
    flexDirection: 'row',
    gap: 4,
  },
  cardHtripsIconTime: {
    width: 16,
    height: 16,
  },

  // Новая карточка
  cardHtripyItem: {
    display: "flex",
    flexDirection: "row",
    // justifyContent: 'flex-start',
    gap: 12,
    alignItems: "center",
    paddingTop: 8,
    paddingBottom: 8,
  },

  boxCardHtripsStroke: {
    display: "flex",
    flexDirection: 'column',
    gap: 8,
    // alignSelf: 'stretch',
    flex: 1,
  },
  cardHtripsStroke: {
    display: "flex",
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 6,
    alignItems: 'center',
    // flex: 1,
  },


  // Страница одной поездки
  tabHtripSection: {
    display: "flex",
    flex: 1,
    // gap: 20,
    // padding: 20,
    backgroundColor: "#fff",
    marginTop: 6,
    borderTopRightRadius: 28,
    borderTopLeftRadius: 28,
    overflow: 'hidden',
  },
  tabHtripMap:{
    marginTop: 6,
    borderTopRightRadius: 28,
    borderTopLeftRadius: 28,
    overflow: 'hidden',
  },
  tabHtripInfoWrapper: {
    display: "flex",
    gap: 32,
    padding: 20,
    // alignSelf: 'stretch',
  },
  tabHtripInfoBox:{
    display: 'flex',
    gap: 26,
  },
  tabHtripInnerTitle:{
    fontSize: 18,
    fontWeight: "700",
    lineHeight: 20,
    color: "#262626",
    // borderBottomWidth: 2,
    // borderBottomColor: "#000",
    
  },
  tabHtripInnerTitleTotal:{
    fontSize: 19,
    fontWeight: "700",
    lineHeight: 20,
    color: "#262626",
    textTransform: 'uppercase',
  },
  tabHtripInnerTxt:{
    fontSize: 16,
    fontWeight: "400",
    lineHeight: 20,
    color: "#262626",
  },
  tabHtripInnerBox:{
    display: 'flex',
    gap: 16,
  },
  tabHtripInnerBoxStroke:{
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 16,
  },
  tabHtripInfoImgBox:{
    display: 'flex',
    width: "100%",
    height:400,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: 'green',
  },
  tabHtripInfoImg:{
    // display: 'flex',
    width: '100%',
    height: '100%',
    // height: 400,
  },
  htripiInsuranceBox:{
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f2f4f6',
    borderRadius: 20,
    height: 80,
    padding: 16,
  },
  htripTarifBox:{
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    gap: 8,
    backgroundColor: '#A62AA9',
    borderRadius: 20,
    height: 80,
    padding: 16,
  },
  htripTarifBoxTitle:{
    fontSize: 18,
    fontWeight: "700",
    lineHeight: 20,
    color: "#fff",
  },
  tabHtripIconTotal: {
    width: 12,
    height: "auto",
  },
  htripTarifValue:{
    fontSize: 16,
    fontWeight: "500",
    lineHeight: 20,
    color: "#fff",
  },

  // !!! === end ИСТОРИЯ ПОЕЗДОК - Страница
  // ==========
  // ==========


 // ==========
  // ==========
  // !!! === САМОКАТ ПЕРЕД ПОЕЗДКОЙ - Всплывашка
  sheetScooterBox:{
    display: 'flex',
    flexDirection: 'row',
    gap: 16,
    paddingRight: 20,
    height: 150,
    alignItems: 'center',
  },
  sheetScooterImgBox:{
    width: 80,
    height: 130,
    // backgroundColor: 'green'
  },

  sheetScooterImgEl: {
    position: 'absolute',
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    // width: 100,
    // height: 100,
    top: -10,
    left: -40,
  },
  sheetScooterImg: {
    width: 130,
    height: 152,
    zIndex: 1,
  },
  sheetScooterImgBack: {
    width: 150,
    height: 150,
    position: "absolute",
    left: -30,
    // alignItems: 'center',
  },

  sheetScooterInfoWrapper:{
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
    flex: 1,
    paddingTop: 10,
  },
  sheetScooterInfoOne:{
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  ssioDistance:{
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#D1EEF7',
    borderRadius: 200,
    paddingLeft: 6,
    paddingRight: 6,
    paddingBottom: 4,
    paddingTop: 4,
    height: 32,
  },
  ssioDistanceImg:{
    width: 18,
    height: 18,
  },
  ssioDistanceValue:{
    display: 'flex',
    flexDirection: 'row',
    gap: 4,
    alignItems: 'center',
  },
  ssioDistanceValueTxt:{
    fontSize: 15,
    // fontWeight: "500",
    // lineHeight: 20,
    color: "#000",
  },
  ssioDistanceDot:{
    width: 3,
    height: 3,
    backgroundColor: '#000',
  },


  sheetScooterInfoTwo:{
    display: 'flex',
    justifyContent: 'space-between',
    paddingLeft: 6,
  },

  tariffsContainerScrollLine:{
    display: 'flex',
    flex: 1,
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tariffCard: {
    display: 'flex',
    justifyContent: 'center',
    gap: 2,
    paddingLeft: 20,
    paddingRight: 20,
    // paddingBottom: 12,
    // paddingTop: 12,
    borderRadius: 12,
    height: 60,
  },
  tariffsCardName:{
    fontSize: 18,
    fontWeight: "600",
    lineHeight: 20,
    color: "#fff",
  },
  tariffsCardPrice:{
    fontSize: 16,
    fontWeight: "400",
    lineHeight: 20,
    color: "#fff",
  },
  // !!! === САМОКАТ ПЕРЕД ПОЕЗДКОЙ - Всплывашка
  // ==========
  // ==========

  // ==========
  // ==========
  // !!! === СТРАНИЦА ТАРИФА ПЕРЕД ПОЕЗДКОЙ - Всплывашка
  radiusBoxTop:{
    borderTopLeftRadius: 28,
    borderTopEndRadius: 28,
  },
  radiusBoxBottom:{
    borderBottomLeftRadius: 28,
    borderBottomEndRadius: 28,
  },
  radiusBoxQuad:{
    borderTopLeftRadius: 28,
    borderTopEndRadius: 28,
    borderBottomLeftRadius: 28,
    borderBottomEndRadius: 28,
  },
  pageTariffContainer:{
    backgroundColor: '#fff',
    height: '100%',
    flex: 1,
    marginBottom: 96,
  },
  pageTariff: {
    // flex: 1,
    display: "flex",
    flexDirection: 'column',
    gap: 8,
    backgroundColor: "#f2f4f6",
    alignSelf: 'stretch',
    // alignItems: 'center',
    height: '100%'
  },
  pageTariffTwoBox:{
    // flex: 1,
    gap:8
  },
  pageTariffRentSection: {
    display: "flex",
    gap: 20,
    padding: 20,
    backgroundColor: "#fff",
  },
  pageTariffRentSectionLast:{
    // height: 300,
    flex: 1,
    height: '100%',
    // flexShrink: 4
    backgroundColor: "#fff",
  },
  downPos:{
    position: 'absolute',
    bottom: 0,
  },
  ptrTariffBox:{
    display: 'flex',
    gap: 0,
  },
  ptrTariffCard:{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: '#0A58CE',
    height: 60,
    borderRadius: 16,
  },
  ptrTariffTxt:{
    fontSize: 20,
    fontWeight: "600",
    lineHeight: 22,
    color: "#fff",
  },
  ptrTariffInfoCard:{
    display: 'flex',
    gap: 16,
    padding: 16,
    backgroundColor: '#f2f4f6',
    marginLeft: 12,
    marginRight: 12,
    borderBottomLeftRadius: 16,
    borderBottomEndRadius: 16,
  },
  ptrTariffInfoStroke:{
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  ptrTariffInfoTitle:{
    fontSize: 16,
    fontWeight: "400",
    lineHeight: 22,
    color: "#000",
  },
  ptrTariffInfoValue:{
    fontSize: 16,
    fontWeight: "600",
    lineHeight: 22,
    color: "#000",
  },
  ptrInfoTxtMin:{
    fontSize: 11,
    fontWeight: "400",
    lineHeight: 14,
    color: "#857B7B",
  },

  ptrPassBox: {
    display: 'flex',
    gap: 16,
  },
  ptrPassBoxWrapperCard:{
    height: 60,
  },
  // Подписка - карточка
  ptrPassBoxCard: {
    display: "flex",
    flex: 1,
    flexDirection: "row",
    alignItems: 'center',
    gap: 16,
    alignSelf: "stretch",
    justifyContent: "flex-start",
    // height: "100%",
    // width: '40%',
    // backgroundColor: '#3ECAF6',
    borderRadius: 20,
    padding: 12,
    // overflow: "hidden",
  },
  ptrPassBoxCardTitle:{
    fontSize: 16,
    fontWeight: "600",
    lineHeight: 20,
    color: "#fff",
  },
  ptrPassIconStart: {
    position: "absolute",
    bottom: 0,
    right: 10,
    width: 60,
    height: 60,
    transform: [{ rotate: "40deg" }],
  },
  ptrPassBoxOffer:{
    display: 'flex',
    flexDirection: 'row',
    gap: 2,
  },
  ptrPassBoxOfferTxt:{
    fontSize: 16,
    fontWeight: "400",
    lineHeight: 20,
    color: "#000",
  },
  ptrPassBoxOfferTxtBold:{
    fontSize: 16,
    fontWeight: "700",
    lineHeight: 20,
    color: "#000",
    
  },
  yellowBorder:{
    borderBottomWidth: 2,
    borderColor: "#FEC303",
  },
  // Страховка карточки
  ptrInsWrapper:{
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 16,
  },
  ptrInsCard:{
    flex: 1,
    display: 'flex',
    justifyContent: 'space-between', 
    gap: 8,
    alignItems: 'center',
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#f0f0f0',
    backgroundColor: "#fff"
  },
  ptrInsIconAct: {
    position: "absolute",
    // bottom: 0,
    // right: 0,
    top: -10,
    left: -10,
    width: 36,
    height: 36,
    zIndex:-1
    // transform: [{ rotate: "40deg" }],
  },


  // !!! === end СТРАНИЦА ТАРИФА ПЕРЕД ПОЕЗДКОЙ - Всплывашка
  // ==========
  // ==========

  // ==========
  // ==========
  // !!! === СТРАНИЦЫ Аутентификации
  pageAuthWrapper: {
    display: "flex",
    // justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
    padding: 20,
    backgroundColor: "#fff",
  },
  pageAuthTitle:{
    fontSize: 20,
    fontWeight: "600",
    lineHeight: 24,
    color: "#000",
    // textTransform: "uppercase",
  },
  pageAuthDesc:{
    fontSize: 15,
    fontWeight: "400",
    lineHeight: 20,
  },
  PAphoneBox:{
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  PAphoneCoutry:{
    backgroundColor: '#F2F4F6',
    borderRadius: 12,
    height: 50,
    width: 60,
    padding: 8,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  PAphoneCoutryImg:{
    width: 36,
  },
  PAphoneNumber:{
    flex: 1,
    padding: 8,
    // backgroundColor: '#F2F4F6',
    borderWidth: 2,
    borderColor: '#FEC303',
    borderRadius: 12,
    height: 50,
    display: 'flex',
    // alignItems: 'center',
    justifyContent: 'center',
  },


  pageAuthBtnBox: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "stretch",
    gap: 24,
    paddingTop: 20,
    paddingBottom: 24,
    // borderTopColor: "#F6F6F6",
    // borderTopWidth: 6,
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: "#fff",
  },

  // !!! === end СТРАНИЦЫ Аутентификации
  // ==========
  // ==========

  // ОКНО УДАЛЕНИЯ АККАУНТА
  rideEndContainer: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: 24,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 8,
    paddingBottom: 20,
    borderTopRightRadius: 28,
    borderTopLeftRadius: 28,
  },
  rideEndTitle: {
    color: "#000",
    fontSize: 24,
    lineHeight: 28,
    fontWeight: "700",
    textAlign: "center",
  },
  rideEndRecBox: {
    display: "flex",
    gap: 20,
  },
  rideEndRecCard: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    backgroundColor: "#f2f4f6",
    padding: 12,
    borderRadius: 12,
    // flex: 1,
  },
  rideEndRecTxt: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
    // flexWrap: "wrap",
  },
  rideEndDepositDesc: {
    color: "#000",
    fontSize: 16,
    lineHeight: 20,
    fontWeight: "400",
    textAlign: "left",
  },
  modalAcDelContainer: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: 'center',
    justifyContent: 'center',
    gap: 24,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 8,
    paddingBottom: 20,
    borderTopRightRadius: 28,
    borderTopLeftRadius: 28,
  },

  
  // ==========
  // ==========
  // !!! === Карточка Поездки
  cardRide:{
    display: "flex",
    flexDirection: "column",
    gap: 20,
    paddingTop: 16,
    paddingBottom: 16,
    paddingLeft: 20,
    paddingRight: 20,
  },
  statusTimeBox:{
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 16,
  },
  statusBox:{
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    backgroundColor: '#f2f4f6',
    // borderColor: '#CCBABA',
    // borderWidth: 2,
    borderRadius: 20,
    // padding: 20,
    height: 34,
    paddingLeft: 12,
    paddingRight: 12,
  },
  statusName:{
    fontSize: 16,
    fontWeight: "600",
    lineHeight: 20,
    color: "#000",
  },
  statusDotColor:{
    width: 8,
    height: 8,
    borderRadius: 20,
  },
  timeBoxTxt:{
    fontSize: 20,
    fontWeight: "700",
    lineHeight: 24,
    color: "#000",
  },
  // основная инфа катрочки поездки
  mainWrapper:{
    display: 'flex',
    flexDirection: 'row',
    gap: 24,
  },
  mainImgBox:{
    width: 45,
    height: 60,
  },
  mainImgBoxIcon:{
    width:45,
    height: 60,
  },
  mainInfoContent:{
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 6,
    // height: 50,
    // backgroundColor: 'green',
    // paddingTop: 12,
  },
  timeBoxTxtVal:{
    fontSize: 19,
    fontWeight: "700",
    lineHeight: 24,
    // color: "#000",
    color: '#373232',
  },
  mainInfoContentItem:{
    display: 'flex',
    justifyContent: 'space-between',
    height: 44,
    // backgroundColor: 'blue',
  },
  mainItemLine: {
    // flex:1,
    display: "flex",
    alignSelf: "stretch",
    width: 1,
    height: '100%',
    backgroundColor: "#f0f0f0",
  },
  mainDistValue:{
    fontSize: 14,
    fontWeight: "500",
    lineHeight: 16,
    // color: "#706666",
    color: "#908383",
  },
  mainBattaryHead:{
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  mainChargeBox: {
    position: 'relative',
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "center",
    width: 50,
    height: 24,
    // width: 66,
    // height: 32,
    backgroundColor: "#C2C2C2",
    borderRadius: 6,
    paddingBottom: 2,
    paddingTop: 2,
    paddingLeft: 2,
    paddingRight: 2,
  },
// Кнопки Пауза-Завершить-Включить
  rideControlWrapper:{
    display: "flex",
    flexDirection: "row",
    padding: 20,
    gap: 8,
  },
  rideBtn:{
    flex: 1,
    height: 50,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 6,
    borderRadius: 16,
  },
  rideBtnPause:{
    backgroundColor: '#EBE2E2'
  },
  rideBtnFinish:{
    backgroundColor: '#373232'
  },
  rideBtnPlay:{
    backgroundColor: '#FEC303'
  },
  rideBtnTxtW:{
    fontSize: 16,
    fontWeight: "600",
    lineHeight: 20,
    color: "#EEE7E7",
  },
  rideBtnTxtBG:{
    fontSize: 16,
    fontWeight: "700",
    lineHeight: 20,
    color: "#2E3032",
  },

  //====
  // ОКНО ПРЕДУПРЕЖДЕНИЯ ВО ВРЕМЯ ПОЕЗДКИ
  alertRideContainer: {
    width: '100%',
    flex: 1,
    position: "absolute",
    display: "flex",
    gap: 8,
    // left: 20,
    // right: 20,
    top: 40,
    zIndex: 1,
  },
  alertBoxMess:{
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    // padding: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 28,
    // left: 20,
    // right: 20,
  },
  alertBgRed:{
    backgroundColor: "#EE0D0D",
  },
  alertBgOth:{
    backgroundColor: "#FF6262",
    // backgroundColor: '#D59A04',
  },
  alertWrapperTxt:{
    flex: 1,
    // flexShrink: 1,
    // flexWrap: 'nowrap', 
  },
  alertBoxTxtW: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
    lineHeight: 22,
  },

});




export default gStyles;
