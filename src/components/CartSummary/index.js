// Write your code here

import CartContext from '../../context/CartContext'

const CartSummary = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList} = value
      let total = 0
      cartList.forEach(each => {
        total += each.price * each.quantity

        return each
      })

      return (
        <>
          {' '}
          <h1>
            Order Total: <span>Rs {total}/-</span>
          </h1>
          <p>{cartList.length} Items in cart</p>
        </>
      )
    }}
  </CartContext.Consumer>
)

export default CartSummary
