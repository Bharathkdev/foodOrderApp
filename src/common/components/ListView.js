import React from 'react';
import {View, Text, StyleSheet, Alert, TouchableOpacity} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {moderateScale} from 'react-native-size-matters';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import colors from '../Colors';
import strings from '../Strings';
import * as CartActions from '../../store/actions/CartActions';

const styles = StyleSheet.create({
  item: {
    flex: 1,
    paddingBottom: moderateScale(10),
    paddingHorizontal: moderateScale(20),
  },
  itemName: {
    fontSize: moderateScale(15),
    fontFamily: 'Poppins-Regular',
    color: colors.defaultDark,
  },
  counterContainer: {
    flex: 0.7,
  },
  foodDetailsContainer: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  foodDetailsView: {
    paddingRight: moderateScale(10),
    paddingTop: moderateScale(7),
  },
  chat: {
    paddingTop: moderateScale(10),
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
  },
  categoryView: {
    textAlign: 'center',
    paddingHorizontal: moderateScale(4),
    paddingTop: moderateScale(4),
    marginBottom: moderateScale(5),
    borderRadius: moderateScale(2),
    borderColor: colors.circle,
    borderWidth: 1,
    fontFamily: 'Poppins-Regular',
    color: colors.defaultDark,
    fontSize: moderateScale(13),
  },
  itemPrice: {
    fontSize: moderateScale(18),
    color: colors.secondary,
    fontFamily: 'Poppins-Regular',
  },
  addButtonText: {
    color: colors.defaultDark,
    fontSize: moderateScale(13),
    fontFamily: 'Poppins-Medium',
    textAlign: 'center',
  },
  addDetails: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  counter: {
    flexDirection: 'row',
    paddingVertical: moderateScale(2),
    backgroundColor: colors.defaultLight,
    borderColor: colors.secondary,
    borderWidth: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  details: {
    flex: 1,
    backgroundColor: colors.defaultLight,
    marginRight: moderateScale(10),
  },
  decrementButton: {
    paddingHorizontal: moderateScale(8),
  },
  incrementButton: {
    paddingHorizontal: moderateScale(8),
  },
  counterText: {
    fontSize: moderateScale(13),
    fontFamily: 'Poppins-Medium',
    color: colors.defaultDark,
  },
});

export default Item = ({
  id,
  name,
  ingredients,
  price,
  categories,
  showAddButton,
}) => {
  const cartItems = useSelector(state => state?.data?.cartItems);

  const dispatch = useDispatch();

  const index = cartItems?.findIndex(item => item.id === id);
  const count = (cartItems && cartItems[index]?.count) || 0;

  const incrementCount = () => {
    if (index === -1) {
      if (cartItems?.length > 0) {
        dispatch(
          CartActions.hanldeCartActions([
            ...cartItems,
            {id, name, price, ingredients, categories, count: 1},
          ]),
        );
      } else {
        dispatch(
          CartActions.hanldeCartActions([
            {id, name, price, ingredients, categories, count: 1},
          ]),
        );
      }
    } else {
      if (count < 20) {
        dispatch(
          CartActions.hanldeCartActions(
            cartItems?.map((item, i) =>
              i !== index
                ? item
                : {
                    ...item,
                    count: item.count + 1,
                  },
            ),
          ),
        );
      } else {
        Alert.alert(
          'INFO',
          'The maximum number of counts that can be added per food item is limited to 20.',
          [{text: 'OK', onPress: () => console.log('OK Pressed')}],
        );
      }
    }
  };

  const decrementCount = () => {
    if (index !== -1) {
      dispatch(
        CartActions.hanldeCartActions(
          cartItems
            ?.map((item, i) =>
              i !== index
                ? item
                : {
                    ...item,
                    count: item.count - 1,
                  },
            )
            .filter(item => item.count > 0),
        ),
      );
    }
  };

  return (
    <View style={styles.item}>
      <View style={styles.addDetails}>
        <View style={styles.foodDetailsContainer}>
          <View style={styles.foodDetailsView}>
            {categories.map(category => (
              <Text style={styles.categoryView}>{category}</Text>
            ))}
          </View>
          <View style={styles.details}>
            <Text style={styles.itemName}>{name}</Text>
            <Text style={{...styles.itemName, fontSize: moderateScale(12)}}>
              {ingredients}
            </Text>
            <Text style={styles.itemPrice}>
              {'\u20ac'}
              {price}
            </Text>
          </View>
        </View>
        {count > 0 ? (
          <View style={styles.counterContainer}>
            <View style={styles.counter}>
              <TouchableOpacity
                style={styles.decrementButton}
                onPress={decrementCount}>
                <Text style={styles.counterText}>-</Text>
              </TouchableOpacity>
              <Text style={styles.counterText}>{count}</Text>
              <TouchableOpacity
                style={styles.incrementButton}
                onPress={incrementCount}>
                <Text style={styles.counterText}>+</Text>
              </TouchableOpacity>
            </View>
            {!showAddButton ? (
              <View style={styles.chat}>
                <MaterialIcon
                  name="chat"
                  color={colors.tertiary}
                  size={moderateScale(30)}
                />
              </View>
            ) : null}
          </View>
        ) : showAddButton ? (
          <TouchableOpacity
            style={{...styles.counter, flex: 0.7}}
            onPress={incrementCount}>
            <Text style={styles.addButtonText}>{strings.ListItem.add}</Text>
          </TouchableOpacity>
        ) : null}
      </View>
    </View>
  );
};
