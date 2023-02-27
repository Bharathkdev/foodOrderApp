import React, {useEffect} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {moderateScale} from 'react-native-size-matters';
import {CustomButton} from '../common/components/CustomButton';
import FeatherIcon from 'react-native-vector-icons/Feather';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import Ionicon from 'react-native-vector-icons/Ionicons';
import colors from '../common/Colors';
import strings from '../common/Strings';
import * as CartActions from '../store/actions/CartActions';
import Item from '../common/components/ListView';

const DATA = [
  {
    id: '1',
    name: 'Crispy Calamari Rings ',
    price: '7',
    ingredients: 'Squid rings, Tempura batter, Parsley sprig',
    categories: ['N', 'D'],
  },
  {
    id: '2',
    name: 'Sweet Potato Pie',
    price: '15',
    ingredients: 'Yams (red skinned), Marshmallows',
    categories: ['N'],
  },
  {
    id: '3',
    name: 'Sticky Toffee Pudding',
    price: '8',
    ingredients: 'chopped dates, egg, brown sugar',
    categories: ['N', 'D'],
  },
  {
    id: '4',
    name: 'Sausage and Potato Casserole',
    price: '15',
    ingredients: 'yellow and green bell pepper',
    categories: ['N', 'D'],
  },
  {
    id: '5',
    name: 'Poached Pear Salad',
    price: '5',
    ingredients: 'Pears, organic honey, radicchio leaves',
    categories: ['D'],
  },
  {
    id: '6',
    name: 'Stuffed Jacket Potatoes',
    price: '8',
    ingredients: 'potatoes, mushrooms, yogurt',
    categories: ['D'],
  },
  {
    id: '7',
    name: 'Chickpea Soup',
    price: '10',
    ingredients: 'Garlic cloves, Thyme',
    categories: ['N'],
  },
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.defaultLight,
  },
  imageWrapper: {
    flex: 1,
  },
  bookTableButton: {
    width: '45%',
    height: moderateScale(35),
    borderRadius: moderateScale(8),
    paddingBottom: moderateScale(5),
  },
  image: {
    width: '100%',
    height: moderateScale(210),
  },
  restaurantDetails: {
    backgroundColor: colors.defaultLight,
    borderRadius: moderateScale(5),
    elevation: moderateScale(7),
    marginHorizontal: moderateScale(20),
    position: 'absolute',
    top: moderateScale(150),
    left: moderateScale(0),
    right: moderateScale(0),
    bottom: moderateScale(0),
    height: moderateScale(175),
    alignItems: 'center',
  },
  iconView: {
    marginTop: moderateScale(3),
  },
  backArrow: {
    flex: 1,
    position: 'absolute',
    top: moderateScale(30),
    left: moderateScale(17),
  },
  share: {
    flex: 1,
    position: 'absolute',
    top: moderateScale(30),
    right: moderateScale(50),
  },
  info: {
    flex: 1,
    position: 'absolute',
    top: moderateScale(32),
    right: moderateScale(15),
  },
  restaurantName: {
    fontSize: moderateScale(19),
    marginTop: moderateScale(20),
    marginBottom: moderateScale(10),
    color: colors.defaultDark,
    fontFamily: 'Poppins-Medium',
  },
  restaurantTimingsView: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  restaurantTimings: {
    marginLeft: moderateScale(3),
    fontSize: moderateScale(14),
    color: colors.defaultDark,
    marginBottom: moderateScale(7),
    fontFamily: 'Poppins-Regular',
  },
  restaurantPhone: {
    marginLeft: moderateScale(10),
    fontSize: moderateScale(14),
    color: colors.defaultDark,
    marginBottom: moderateScale(8),
    fontFamily: 'Poppins-Regular',
  },
  verticleLine: {
    height: '70%',
    width: moderateScale(1.4),
    marginBottom: moderateScale(10),
    backgroundColor: colors.circle,
    marginHorizontal: moderateScale(2),
  },
  starterTitle: {
    fontFamily: 'Poppins-Medium',
    fontSize: moderateScale(18),
    marginVertical: moderateScale(10),
    marginLeft: moderateScale(20),
    color: colors.defaultDark,
  },
  listView: {
    flex: 1,
  },
  cartButton: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    height: moderateScale(60),
    backgroundColor: colors.primary,
  },
  cartButtonText: {
    color: colors.defaultLight,
    fontFamily: 'Poppins-Regular',
    fontSize: moderateScale(16),
    marginLeft: moderateScale(10),
  },
  detailsView: {
    flexDirection: 'row',
  },
  floatingButton: {
    position: 'absolute',
    bottom: moderateScale(80),
    right: moderateScale(145),
    backgroundColor: colors.secondary,
    paddingHorizontal: moderateScale(10),
    paddingVertical: moderateScale(2),
    borderRadius: moderateScale(6),
    elevation: moderateScale(3),
    flexDirection: 'row',
    alignItems: 'center',
  },
  floatingButtonText: {
    color: colors.defaultDark,
    fontSize: moderateScale(15),
    marginLeft: moderateScale(10),
    marginTop: moderateScale(3),
    fontFamily: 'Poppins-Medium',
  },
});

export default App = ({navigation}) => {
  const cartItems = useSelector(state => state?.data?.cartItems);
  const totalcartItems = useSelector(state => state?.data?.totalCartItems);

  const dispatch = useDispatch();

  let totalItems = 0,
    totalAmount = 0;
  const initialValue = 0;

  useEffect(() => {
    totalItems = cartItems?.reduce(
      (acc, currentValue) => acc + currentValue.count,
      initialValue,
    );
    totalAmount = cartItems?.reduce(
      (acc, currentValue) => acc + currentValue.count * currentValue.price,
      initialValue,
    );
    dispatch(CartActions.hanldeTotalCartItems(totalItems));
    dispatch(CartActions.handleTotalAmount(totalAmount));
  }, [cartItems]);

  const renderRestaurantDetails = () => {
    return (
      <View style={styles.imageWrapper}>
        <Image
          source={require('../../assets/images/restaurant.jpg')}
          style={styles.image}
        />
        <View style={styles.restaurantDetails}>
          <Text style={styles.restaurantName}>
            {strings.RestaurantDetails.restaurantName}
          </Text>
          <View style={styles.detailsView}>
            <View style={styles.iconView}>
              <FeatherIcon
                name="star"
                color={colors.defaultDark}
                size={moderateScale(15)}
              />
            </View>
            <View style={styles.restaurantTimingsView}>
              <Text style={styles.restaurantTimings}>
                {strings.RestaurantDetails.restaurantRatings}{' '}
              </Text>
              <View style={styles.verticleLine}></View>
              <Text style={styles.restaurantTimings}>
                {strings.RestaurantDetails.restaurantTimings}
              </Text>
            </View>
          </View>
          <View style={styles.detailsView}>
            <View style={styles.iconView}>
              <MaterialCommunityIcon
                name="phone-in-talk"
                color={colors.defaultDark}
                size={moderateScale(15)}
                onPress={() => {}}
              />
            </View>
            <Text style={styles.restaurantPhone}>
              {strings.RestaurantDetails.restaurantContact}
            </Text>
          </View>
          <CustomButton
            title={strings.RestaurantDetails.bookTable}
            onPress={() => {}}
            type="solid"
            buttonStyle={styles.bookTableButton}
          />
        </View>
      </View>
    );
  };

  const renderViewCart = () => {
    return (
      <TouchableOpacity
        activeOpacity={0.9}
        style={styles.cartButton}
        onPress={() => {
          navigation.navigate('ViewCart');
        }}>
        <MaterialCommunityIcon
          name="cart-variant"
          color={colors.defaultLight}
          size={moderateScale(25)}
        />
        <Text style={styles.cartButtonText}>
          {strings.RestaurantDetails.viewCart} ({totalcartItems}{' '}
          {strings.RestaurantDetails.cartItems})
        </Text>
      </TouchableOpacity>
    );
  };

  const renderMenu = () => {
    return (
      <TouchableOpacity
        style={styles.floatingButton}
        activeOpacity={0.8}
        onPress={() => console.log('Menu')}>
        <View style={{...styles.iconView, marginBottom: moderateScale(2)}}>
          <MaterialIcon
            name="restaurant"
            color={colors.defaultDark}
            size={moderateScale(18)}
            onPress={() => {}}
          />
        </View>
        <Text style={styles.floatingButtonText}>
          {strings.RestaurantDetails.menu}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {renderRestaurantDetails()}
      <View style={styles.backArrow}>
        <MaterialIcon
          name="arrow-back"
          color={colors.defaultLight}
          size={moderateScale(25)}
        />
      </View>
      <View style={styles.share}>
        <Ionicon
          name="share-outline"
          color={colors.defaultLight}
          size={moderateScale(25)}
        />
      </View>
      <View style={styles.info}>
        <MaterialIcon
          name="info-outline"
          color={colors.defaultLight}
          size={moderateScale(25)}
        />
      </View>
      <View style={styles.listView}>
        <Text style={styles.starterTitle}>
          {strings.RestaurantDetails.starter}
        </Text>
        <FlatList
          data={DATA}
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
              showAddButton={true}
            />
          )}
          showsVerticalScrollIndicator={false}
        />
      </View>
      {renderMenu()}
      {renderViewCart()}
    </View>
  );
};
