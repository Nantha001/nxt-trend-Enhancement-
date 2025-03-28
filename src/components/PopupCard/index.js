import {Component} from 'react'
import Popup from 'reactjs-popup'
import './index.css'
import 'reactjs-popup/dist/index.css'
import CartContext from '../../context/CartContext'

const paymentOptions = [
  {id: 1, displayText: 'Card'},
  {id: 2, displayText: 'Net Banking'},
  {id: 3, displayText: 'UPI'},
  {id: 4, displayText: 'Wallet'},
  {id: 5, displayText: 'Cash on Delivery'},
]

const cssStyledDisableBtn = selectOption => {
  if (selectOption === '') return ''
  if (selectOption === 'Cash on Delivery') return ''
  return 'disabled-style'
}

class PopupCard extends Component {
  state = {selectOption: '', isOrder: false}

  onChangePayment = e => {
    this.setState({selectOption: e.target.value})
  }

  totalAmount = cartList => {
    let total = 0
    cartList.map(each => {
      total += each.quantity * each.price

      return each
    })

    return total
  }

  orderBtnClick = () => {
    console.log('BUTTON CLICKED')
    const {selectOption} = this.state

    if (selectOption === 'Cash on Delivery') {
      this.setState({isOrder: true})
    }
  }

  render() {
    const {selectOption, isOrder} = this.state
    return (
      <>
        <CartContext.Consumer>
          {value => {
            const {cartList} = value
            return (
              <>
                <Popup
                  trigger={<button className="btn">Checkout</button>}
                  modal
                >
                  {closeBtn => (
                    <div className="popup-card">
                      <button onClick={() => closeBtn()} className="close-btn">
                        x
                      </button>
                      {!isOrder && (
                        <>
                          {paymentOptions.map(each => (
                            <div key={each.id}>
                              <input
                                id={each.displayText}
                                type="radio"
                                name="payment"
                                value={each.displayText}
                                checked={selectOption === each.displayText}
                                onChange={this.onChangePayment}
                                disabled={
                                  each.displayText !== 'Cash on Delivery'
                                }
                              />
                              <label htmlFor={each.displayText}>
                                {each.displayText}
                              </label>
                            </div>
                          ))}

                          <p className="total-amount">
                            <span style={{fontWeight: 'bold', color: 'black'}}>
                              Total Amount:
                            </span>
                            {this.totalAmount(cartList)}
                          </p>
                          <p className="total-item">
                            <sapn style={{fontWeight: 'bold', color: 'black'}}>
                              Total Items:
                            </sapn>
                            {cartList.length}
                          </p>
                          <button
                            onClick={() => this.orderBtnClick()}
                            className={cssStyledDisableBtn(selectOption)}
                            disabled={selectOption !== 'Cash on Delivery'}
                          >
                            Confirm Order
                          </button>
                        </>
                      )}
                      {isOrder && (
                        <div className="order-confirm-container">
                          <img
                            className="order-product-img"
                            src="https://res.cloudinary.com/dvkq1wvmz/image/upload/v1743093209/5d1d09f0-350a-44a4-9904-ebd624308616_p2tkiv.webp"
                            alt="order-product-img"
                          />
                          <p className="order-confirmed-msg">
                            Your order has been placed successfully
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </Popup>
              </>
            )
          }}
        </CartContext.Consumer>
      </>
    )
  }
}

export default PopupCard
