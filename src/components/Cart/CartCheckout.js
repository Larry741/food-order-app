import { useContext} from 'react';
import useInput from "../../Hooks/useInput";

import CartContext from '../../store/cart-context';

import classes from './CartCheckout.module.css';

const CartCheckout = (props) => {
  const cartCtx = useContext(CartContext);
  const {
    inputValue: nameInputValue,
    inputIsTouched: nameInputIsTouched,
    inputIsValid: nameInputIsValid,
    inputHandler: nameInputHandler,
    reset: resetNameInput
  } = useInput(val => val.trim() === "");
  const {
    inputValue: streetInputValue,
    inputIsTouched: streetInputIsTouched,
    inputIsValid: streetInputIsValid,
    inputHandler: streetInputHandler,
    reset: resetStreetInput,
  } = useInput((val) => val.trim() === "");
  const {
    inputValue: postalInputValue,
    inputIsTouched: postalInputIsTouched,
    inputIsValid: postalInputIsValid,
    inputHandler: postalInputHandler,
    reset: resetPostalInput,
  } = useInput(val => val.trim.lenth === 5);
  const {
    inputValue: cityInputValue,
    inputIsTouched: cityInputIsTouched,
    inputIsValid: cityInputIsValid,
    inputHandler: cityInputHandler,
    reset: resetCityInput,
  } = useInput((val) => val.trim() === "");

  let formIsIsValid = false;

  if (nameInputIsValid && streetInputIsValid && postalInputIsValid && cityInputIsValid) {
    formIsIsValid = true;
  }

  const confirmHandler = (event) => {
    event.preventDefault();

    if (!formIsIsValid) {
      return;
    }

    const enteredData = {
      name: nameInputValue,
      street: streetInputValue,
      postal: postalInputValue,
      city: cityInputValue
    };

    props.onSendData(enteredData);

    resetNameInput();
    resetStreetInput();
    resetPostalInput();
    resetCityInput();
  }

  const nameControlClasses = `${classes.control} ${
    !nameInputIsValid && nameInputIsTouched ? classes.invalid : ""
  }`;
  const streetControlClasses = `${classes.control} ${
    !streetInputIsValid && streetInputIsTouched ? classes.invalid : ""
  }`;
  const postalCodeControlClasses = `${classes.control} ${
    !postalInputIsValid && postalInputIsTouched ? classes.invalid : ""
  }`;
  const cityControlClasses = `${classes.control} ${
    !cityInputIsValid && cityInputIsTouched ? classes.invalid : ""
  }`;

  return (
    <form onSubmit={confirmHandler} className={classes.form}>
      <div className={nameControlClasses}>
        <label htmlFor="name">Your name</label>
        <input id="name" type="text" onChange={nameInputHandler} onBlur={nameInputHandler} value={nameInputValue} />
        {!nameInputIsValid && nameInputIsTouched ? <p>Please enter a valid name</p> : <></>}
      </div>
      <div className={streetControlClasses}>
        <label htmlFor="street">Street</label>
        <input id="street" type="text" onChange={streetInputHandler} onBlur={streetInputHandler} value={streetInputValue} />
        {!streetInputIsValid && streetInputIsTouched ? <p>Please enter a valid street</p> : <></>}
      </div>
      <div className={postalCodeControlClasses}>
        <label htmlFor="postal">Postal code</label>
        <input id="postal" type="text" onChange={postalInputHandler} onBlur={postalInputHandler} value={postalInputValue} />
        {!postalInputIsValid && postalInputIsTouched ? <p>Please enter a valid name</p> : <></>}
      </div>
      <div className={cityControlClasses}>
        <label htmlFor="City">City</label>
        <input id="City" type="text" onChange={cityInputHandler} onBlur={cityInputHandler} value={cityInputValue} />
        {!cityInputIsValid && cityInputIsTouched ? <p>Please enter a valid name</p> : <></>}
      </div>
      <div className={classes.actions}>
        <button type='button' onClick={cartCtx.closeCart}>Cancel</button>
        <button type='submit' disabled={!formIsIsValid}>Confirm</button>
      </div>
    </form>
  );
}

export default CartCheckout;