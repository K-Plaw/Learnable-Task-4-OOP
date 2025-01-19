// TITLE: PLAW's Big Fat Burger Order Management System
// DESCRIPTION: This code is for PLAW's Big Fat Burger and Sitout which is a restaurant that serves burgers and things people eat with them. This code is to facilitate the ordering system for each order a customer makes.

// Defining MenuItem class
class MenuItem {
    //Constructor for menu
    constructor(itemId, name, description, price, currency = '₦') {
      this.itemId = itemId; 
      this.name = name;
      this.description = description;
      this.price = price;
      this.currency = currency;
    }
  
    getItemDetails() {
      return `${this.name}: ${this.description} - ${this.currency}${this.price}`;
    }
  
    updatePrice(newPrice) {
      this.price = newPrice;
    }
  }
  
  // Customer class
  class Customer {
    constructor(customerId, name, email) {
      this.customerId = customerId;
      this.name = name;
      this.email = email;
      this.order = new Order(customerId); 
    }
  
    placeOrder() {
      console.log(`${this.name} has placed an order at PLAW's Big Fat Burger and Sitout.`);
    }
  
    viewMenu(menuItems) {
      menuItems.forEach(item => {
        console.log(item.getItemDetails());
      });
    }
  
    specifyTakeout(isTakeout) {
      this.order.isTakeout = isTakeout;
      console.log(`${this.name} chose ${isTakeout ? 'Takeout' : 'Eat-in'} for the order.`);
    }
  }
  
  // Order class
  class Order {
    constructor(orderId) {
      this.orderId = orderId;
      this.items = [];
      this.totalAmount = 0;
      this.isTakeout = false; // Default to eat-in
    }
  
    addItem(menuItem) {
      this.items.push(menuItem);
      this.totalAmount += menuItem.price;
    }
  
    removeItem(menuItem) {
      const index = this.items.indexOf(menuItem);
      if (index > -1) {
        this.items.splice(index, 1);
        this.totalAmount -= menuItem.price;
      }
    }
  
    calculateTotal() {
      return this.totalAmount;
    }
  }
  
  // Waiter class
  class Waiter {
    constructor(waiterId, name) {
      this.waiterId = waiterId;
      this.name = name;
    }
  
    takeOrder(order) {
      console.log(`${this.name} is taking the order at PLAW's Big Fat Burger and Sitout.`);
    }
  
    serveOrder(order) {
      if (order.isTakeout) {
        this.prepareTakeout(order);
      } else {
        console.log(`${this.name} is serving the order at the table.`);
      }
    }
  
    prepareTakeout(order) {
      console.log(`${this.name} is preparing the takeout order ${order.orderId}.`);
    }
  }
  
  // Payment class
  class Payment {
    constructor(paymentId, amount, currency = '₦') {
      this.paymentId = paymentId;
      this.amount = amount;
      this.currency = currency;
    }
  
    processPayment() {
      console.log(`Payment of ${this.currency}${this.amount} has been processed.`);
    }
  }
  
  // Example Usage:
  const doubleCheeseBurger = new MenuItem(1, "Double Cheese Burger", "A juicy double cheese burger with all the meaty goodness", 7000);
  const sodaAndFries = new MenuItem(2, "Soda and Fries w Ketchup", "A refreshing soda and crispy fries with ketchup to top it off", 3500);
  
  const customer = new Customer(1, "Etukudoh Effiong", "etukudoh01@gmail.com");
  const waiter = new Waiter(1, "Chioma");
  
  customer.viewMenu([doubleCheeseBurger, sodaAndFries]);
  customer.placeOrder();
  customer.specifyTakeout(true); // Etukudoh chooses takeout here
  
  const order = customer.order;
  order.addItem(doubleCheeseBurger);
  order.addItem(sodaAndFries);
  
  waiter.takeOrder(order);
  waiter.serveOrder(order);
  
  const payment = new Payment(1, order.calculateTotal());
  payment.processPayment();
