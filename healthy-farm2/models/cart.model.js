function Cart(oldCart) {
  this.items = oldCart.items || {};
  this.totalQuantity = oldCart.totalQuantity || 0;
  this.totalPrice = oldCart.totalPrice || 0;

  this.add = function(item, id) {
    let storedItem = this.items[id];
    if (!storedItem) {
      storedItem = this.items[id] = { item, quantity: 0, price: 0};
    }
    //
    storedItem.quantity++;
    storedItem.price = this.items[id].item.price * storedItem.quantity;

    //
    this.totalQuantity++;
    this.totalPrice += this.items[id].item.price;
  }

  this.toArray = function() {
    let arr = [];
    for (const id in this.items) {
      arr.push(this.items[id]);
    }
    return arr;
  }
}

module.exports = Cart;