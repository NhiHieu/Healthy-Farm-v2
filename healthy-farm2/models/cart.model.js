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

  this.reduce = function(id) {
    this.items[id].quantity--;
    this.items[id].price -= this.items[id].item.price;

    this.totalQuantity--;
    this.totalPrice -= this.items[id].item.price;

    if (this.items[id].quantity===0){ 
      delete this.items[id];
    }
  }

  this.remove = function(id) {
    this.totalQuantity -= this.items[id].quantity;
    this.totalPrice -= this.items[id].price;
    delete this.items[id];
  }
  this.toArray = function() {
    let arr = [];
    for (const id in this.items) {
      arr.push(this.items[id]);
    }
    return arr;
  }

  this.concat = function(anotherCart) {
    if (anotherCart) {
      // 
      this.totalQuantity += anotherCart.totalQuantity;
      this.totalPrice += anotherCart.totalPrice;

      // find product in list items1 has same product in items
      for (const key in this.items) {
        if (anotherCart.items[key]) {
          this.items[key].quantity += anotherCart.items[key].quantity;
          this.items[key].price += anotherCart.items[key].price
        }
      }

      // find product in anotherCart.items but not exist in this.items
      for (const key in anotherCart.items) {
        if (!this.items[key]) {
          this.items[key] = anotherCart.items[key];
        }
      }

    }
  }

}

// our cart has folowing form: 
/*
cart{
  items:
   { '5c19f94c411d9a6758150032': { item: [Object], quantity: 2, price: 30000 },
     '5c19f94c411d9a6758150031': { item: [Object], quantity: 1, price: 15000 } },
    totalQuantity: 3,
    totalPrice: 45000,
}
*/

module.exports = Cart;