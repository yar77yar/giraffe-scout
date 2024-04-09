<View style={gStyles.payHistoryOneDateContainer}>
                        <Text style={gStyles.payHistoryDate}>20 января 2024</Text>
                        <View style={gStyles.payHistoryBoxItem}>
                            
                            <View style={gStyles.payHistoryItem}>
                                <View style={gStyles.payHistoryItemData}>
                                    <View style={gStyles.payHistoryMethodIconBox}>
                                        <Image
                                            style={gStyles.payHistoryIcon}
                                            source={require("../../../assets/images/pay-method/mastercard.png")}
                                            resizeMode="contain"
                                        />
                                    </View>
                                    <View style={gStyles.payHistoryValueTxt}>
                                        <Text style={gStyles.payHistoryTypeTxt}>Пополнение кошелька</Text>
                                        <Text style={gStyles.pagePDescr}>MasterCard *2926</Text>
                                        
                                    </View>
                                </View>
                                <View style={gStyles.payHistoryPriceBox}>
                                    <View style={gStyles.payHistoryPriceWallet}>
                                        <Text style={gStyles.payHistoryPriceRefillTxt}>+150</Text>
                                        <Image
                                            style={gStyles.payHistoryIconMiniWallet}
                                            source={require("../../../assets/images/pay-method/mini-wallet.png")}
                                            resizeMode="contain"
                                        />
                                    </View>
                                </View>
                            </View>
                            <View style={gStyles.pageItemLine}></View>

                            <View style={gStyles.payHistoryItem}>
                                <View style={gStyles.payHistoryItemData}>
                                    <View style={gStyles.payHistoryMethodIconBox}>
                                        <Image
                                            style={gStyles.payHistoryIcon}
                                            source={require("../../../assets/images/pay-method/scooter-pay.png")}
                                            resizeMode="contain"
                                        />
                                    </View>
                                    <View style={gStyles.payHistoryValueTxt}>
                                        <Text style={gStyles.payHistoryTypeTxt}>Оплата поездки</Text>
                                        <Text style={gStyles.pagePDescr}>Самокат 245-328</Text>
                                    </View>
                                </View>
                                <View style={gStyles.payHistoryPriceBox}>
                                    <View style={gStyles.payHistoryPriceDebt}>
                                        <Text style={gStyles.payHistoryPriceDebtTxt}>-150,40</Text>
                                        <Image
                                            style={gStyles.payHistoryIconRub}
                                            source={require("../../../assets/images/rub-b.png")}
                                            resizeMode="contain"
                                        />
                                    </View>
                                </View>
                            </View>
                            <View style={gStyles.pageItemLine}></View>

                            <View style={gStyles.payHistoryItem}>
                                <View style={gStyles.payHistoryItemData}>
                                    <View style={gStyles.payHistoryMethodIconBox}>
                                        <Image
                                            style={gStyles.payHistoryIcon}
                                            source={require("../../../assets/images/pay-method/sbp.png")}
                                            resizeMode="contain"
                                        />
                                    </View>
                                    <View style={gStyles.payHistoryValueTxt}>
                                        <Text style={gStyles.payHistoryTypeTxt}>Пополнение кошелька</Text>
                                        <Text style={gStyles.pagePDescr}>СБП</Text>
                                        
                                    </View>
                                </View>
                                
                                <View style={gStyles.payHistoryPriceBox}>

                                    <View style={gStyles.payHistoryValueShadowBox}>
                                            <Shadow {...ShadowCard.param}
                                                style={{position: 'absolute', width: 1, height:40,  top: 0}}
                                            >
                                                <View style={gStyles.payHistoryValueShadow}></View>
                                            </Shadow>
                                    </View>

                                    <View style={gStyles.payHistoryPriceWallet}>
                                        <Text style={gStyles.payHistoryPriceDebtTxt}>-127,30</Text>
                                        <Image
                                            style={gStyles.payHistoryIconRub}
                                            source={require("../../../assets/images/rub-b.png")}
                                            resizeMode="contain"
                                        />
                                    </View>
                                
                                    <View style={gStyles.payHistoryPriceWallet}>
                                        
                                        <Text style={gStyles.payHistoryPriceRefillTxt}>+1 000 000</Text>
                                        <Image
                                            style={gStyles.payHistoryIconMiniWallet}
                                            source={require("../../../assets/images/pay-method/mini-wallet.png")}
                                            resizeMode="contain"
                                        />
                                    </View>
                                </View>
                            </View>
                            <View style={gStyles.pageItemLine}></View>
                            
                            <View style={gStyles.payHistoryItem}>
                                <View style={gStyles.payHistoryItemData}>
                                    <View style={gStyles.payHistoryMethodIconBox}>
                                        <Image
                                            style={gStyles.payHistoryIcon}
                                            source={require("../../../assets/images/pay-method/scooter-pay.png")}
                                            resizeMode="contain"
                                        />
                                    </View>
                                    <View style={gStyles.payHistoryValueTxt}>
                                        <Text style={gStyles.payHistoryTypeTxt}>Оплата поездки</Text>
                                        <Text style={gStyles.pagePDescr}>Самокат 458-687</Text>
                                    </View>
                                </View>
                                <View style={gStyles.payHistoryPriceBox}>
                                    <View style={gStyles.payHistoryPriceWallet}>
                                        <Text style={gStyles.payHistoryPriceDebtTxt}>-127,30</Text>
                                        <Image
                                            style={gStyles.payHistoryIconRub}
                                            source={require("../../../assets/images/rub-b.png")}
                                            resizeMode="contain"
                                        />
                                    </View>
                                    <View style={gStyles.payHistoryPriceWallet}>
                                        <Text style={gStyles.payHistoryPriceRefillTxt}>-100</Text>
                                        <Image
                                            style={gStyles.payHistoryIconMiniWallet}
                                            source={require("../../../assets/images/pay-method/mini-wallet.png")}
                                            resizeMode="contain"
                                        />
                                    </View>
                                </View>
                            </View>
                            <View style={gStyles.pageItemLine}></View>

                            <View style={gStyles.payHistoryItem}>
                                <View style={gStyles.payHistoryItemData}>
                                    <View style={gStyles.payHistoryMethodIconBox}>
                                        <Image
                                            style={gStyles.payHistoryIcon}
                                            source={require("../../../assets/images/pay-method/pass.png")}
                                            resizeMode="contain"
                                        />
                                    </View>
                                    <View style={gStyles.payHistoryValueTxt}>
                                        <Text style={gStyles.payHistoryTypeTxt}>Оплата подписки</Text>
                                        <Text style={gStyles.pagePDescr}>На 7 дней</Text>
                                    </View>
                                </View>
                                <View style={gStyles.payHistoryPriceBox}>
                                    <View style={gStyles.payHistoryPriceDebt}>
                                        <Text style={gStyles.payHistoryPriceDebtTxt}>-150,40</Text>
                                        <Image
                                            style={gStyles.payHistoryIconRub}
                                            source={require("../../../assets/images/rub-b.png")}
                                            resizeMode="contain"
                                        />
                                    </View>
                                </View>
                            </View>
                            {/* <View style={gStyles.pageItemLine}></View> */}

                        </View>
                    </View>






<View style={gStyles.payHistoryOneDateContainer}>
<Text style={gStyles.payHistoryDate}>14 января 2024</Text>
<View style={gStyles.payHistoryBoxItem}>
    
    <View style={gStyles.payHistoryItem}>
        <View style={gStyles.payHistoryItemData}>
            <View style={gStyles.payHistoryMethodIconBox}>
                <Image
                    style={gStyles.payHistoryIcon}
                    source={require("../../../assets/images/pay-method/mastercard.png")}
                    resizeMode="contain"
                />
            </View>
            <View style={gStyles.payHistoryValueTxt}>
                <Text style={gStyles.payHistoryTypeTxt}>Пополнение кошелька</Text>
                <Text style={gStyles.pagePDescr}>MasterCard *2926</Text>
                
            </View>
        </View>
        <View style={gStyles.payHistoryPriceBox}>
            <View style={gStyles.payHistoryPriceWallet}>
                <Text style={gStyles.payHistoryPriceRefillTxt}>+150</Text>
                <Image
                    style={gStyles.payHistoryIconMiniWallet}
                    source={require("../../../assets/images/pay-method/mini-wallet.png")}
                    resizeMode="contain"
                />
            </View>
        </View>
    </View>
    <View style={gStyles.pageItemLine}></View>

    <View style={gStyles.payHistoryItem}>
        <View style={gStyles.payHistoryItemData}>
            <View style={gStyles.payHistoryMethodIconBox}>
                <Image
                    style={gStyles.payHistoryIcon}
                    source={require("../../../assets/images/pay-method/scooter-pay.png")}
                    resizeMode="contain"
                />
            </View>
            <View style={gStyles.payHistoryValueTxt}>
                <Text style={gStyles.payHistoryTypeTxt}>Оплата поездки</Text>
                <Text style={gStyles.pagePDescr}>Самокат 245-328</Text>
            </View>
        </View>
        <View style={gStyles.payHistoryPriceBox}>
            <View style={gStyles.payHistoryPriceDebt}>
                <Text style={gStyles.payHistoryPriceDebtTxt}>-150,40</Text>
                <Image
                    style={gStyles.payHistoryIconRub}
                    source={require("../../../assets/images/rub-b.png")}
                    resizeMode="contain"
                />
            </View>
        </View>
    </View>
</View>
</View>