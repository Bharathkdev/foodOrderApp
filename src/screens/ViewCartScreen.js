import React, {useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import {useSelector} from 'react-redux';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Item from '../common/components/ListView';
import colors from '../common/Colors';
import strings from '../common/Strings';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.defaultLight,
  },
  priceViewBackground: {
    height: '28%',
    backgroundColor: colors.primary,
  },
  listView: {
    flex: 1,
  },
  radioLabel: {
    fontFamily: 'Poppins-Regular',
    marginLeft: moderateScale(15),
    color: colors.defaultDark,
  },
  radioCircle: {
    height: moderateScale(24),
    width: moderateScale(24),
    borderRadius: moderateScale(12),
    borderWidth: moderateScale(2),
    marginLeft: moderateScale(15),
    alignItems: 'center',
    justifyContent: 'center',
  },
  showMore: {
    alignItems: 'flex-end',
    marginRight: moderateScale(22),
    marginBottom: moderateScale(10),
  },
  radioCircleSelected: {
    height: moderateScale(12),
    width: moderateScale(12),
    borderRadius: moderateScale(6),
    backgroundColor: colors.secondary,
  },
  radioInnerContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: moderateScale(60),
  },
  priceView: {
    backgroundColor: colors.defaultLight,
    borderRadius: moderateScale(5),
    elevation: moderateScale(7),
    marginHorizontal: moderateScale(100),
    position: 'absolute',
    top: moderateScale(50),
    left: moderateScale(0),
    right: moderateScale(0),
    bottom: moderateScale(0),
    height: moderateScale(85),
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: moderateScale(22),
  },
  radioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: moderateScale(40),
  },
  showMoreText: {
    textDecorationLine: 'underline',
    fontFamily: 'Poppins-Regular',
    fontSize: moderateScale(13),
    color: colors.defaultDark,
  },
  footerLine: {
    borderBottomColor: colors.circle,
    borderBottomWidth: moderateScale(1),
    width: '100%',
    marginBottom: moderateScale(18),
  },
  totalCostTitle: {
    fontSize: moderateScale(15),
    marginTop: moderateScale(18),
    color: colors.secondary,
    fontFamily: 'Poppins-Regular',
  },
  totalCost: {
    fontSize: moderateScale(20),
    color: colors.defaultDark,
    marginBottom: moderateScale(16),
    fontFamily: 'Poppins-Medium',
  },
  reviewOrderTitle: {
    fontFamily: 'Poppins-Regular',
    fontSize: moderateScale(15),
    marginTop: moderateScale(10),
    marginBottom: moderateScale(20),
    marginLeft: moderateScale(10),
    color: colors.defaultDark,
  },
  orderButton: {
    justifyContent: 'center',
    alignItems: 'center',
    height: moderateScale(60),
    backgroundColor: colors.primary,
  },
  orderButtonText: {
    color: colors.defaultLight,
    fontFamily: 'Poppins-Regular',
    fontSize: moderateScale(16),
    marginLeft: moderateScale(10),
  },
  emptyCart: {
    textAlign: 'center',
    marginBottom: moderateScale(20),
    fontSize: moderateScale(15),
    fontFamily: 'Poppins-Medium',
    color: colors.defaultDark,
  },
});

export default ViewCartScreen = props => {
  const [showMore, setShowMore] = useState(false);
  const [selectedOption, setSelectedOption] = useState('dine-in');

  const cartItems = useSelector(state => state?.data?.cartItems);
  const totalcartAmount = useSelector(state => state?.data?.totalAmount);

  const deliveryOptions = [
    {label: 'Dine-In', value: 'dine-in', icon: 'seat-passenger'},
    {label: 'Take Away', value: 'take-away', icon: 'truck-delivery'},
  ];

  const renderOrderDetails = () => {
    return (
      <View style={styles.priceViewBackground}>
        <View style={styles.priceView}>
          <Text style={styles.totalCostTitle}>
            {strings.ViewCart.totalCost}
          </Text>
          <Text style={styles.totalCost}>
            {'\u20ac'}
            {totalcartAmount.toFixed(2)}
          </Text>
        </View>
      </View>
    );
  };

  const renderPlaceOrder = () => {
    return (
      <TouchableOpacity
        activeOpacity={0.9}
        style={styles.orderButton}
        onPress={() => {}}>
        <Text style={styles.orderButtonText}>
          {strings.ViewCart.placeOrder}
        </Text>
      </TouchableOpacity>
    );
  };

  const RadioButton = ({options, selectedOption, onSelect, icon}) => {
    return (
      <View style={styles.radioContainer}>
        {options.map((option, index) => {
          const isSelected = selectedOption === option.value;
          return (
            <TouchableOpacity
              key={index}
              activeOpacity={1}
              style={styles.radioInnerContainer}
              onPress={() => onSelect(option.value)}>
              <MaterialCommunityIcon
                name={option.icon}
                color={colors.tertiary}
                size={moderateScale(25)}
              />
              <Text style={styles.radioLabel}>{option.label}</Text>
              <View
                style={{
                  ...styles.radioCircle,
                  borderColor: isSelected ? colors.secondary : colors.circle,
                }}>
                {isSelected && <View style={styles.radioCircleSelected} />}
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {renderOrderDetails()}
      <View style={styles.listView}>
        <Text style={styles.reviewOrderTitle}>
          {strings.ViewCart.reviewOrders}
        </Text>
        <ScrollView>
          <FlatList
            data={showMore ? cartItems : cartItems?.slice(0, 2)}
            keyExtractor={(item, index) => {
              return item.id.toString();
            }}
            renderItem={({item}) => (
              <Item
                id={item.id}
                name={item.name}
                ingredients={item.ingredients}
                price={item.price}
                categories={item.categories}
              />
            )}
            ItemSeparatorComponent={() => <View style={styles.footerLine} />}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={() => (
              <Text style={styles.emptyCart}>{strings.ViewCart.emptyCart}</Text>
            )}
          />
          {cartItems?.length > 2 && (
            <TouchableOpacity
              onPress={() => setShowMore(!showMore)}
              style={styles.showMore}>
              <Text style={styles.showMoreText}>
                {!showMore
                  ? strings.ViewCart.showMore
                  : strings.ViewCart.showLess}
              </Text>
            </TouchableOpacity>
          )}
          <View>
            <Text
              style={{...styles.reviewOrderTitle, marginTop: moderateScale(0)}}>
              {strings.ViewCart.deliveryOptions}
            </Text>
            <RadioButton
              options={deliveryOptions}
              selectedOption={selectedOption}
              onSelect={value => setSelectedOption(value)}
            />
          </View>
        </ScrollView>
      </View>
      {renderPlaceOrder()}
    </View>
  );
};
