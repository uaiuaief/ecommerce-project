import './App.css';

// PAGES
import { ContactPage } from './Components/ContactPage';

import { Banner } from './Components/Banner';
import { Header } from './Components/Header';
import { Showcase } from './Components/Showcase';
import { Footer } from './Components/Footer';
import { Login } from './Components/Login';
import { Logout } from './Components/Logout';
import { Register } from './Components/Register';
import { About } from './Components/About';
import { ProductDetail } from './Components/ProductDetail';
import { ProfilePage } from './Components/ProfilePage';
import { ShoppingCartPage } from './Components/ShoppingCartPage';
import { PurchaseOrders } from './Components/PurchaseOrders';
import { MyPurchases } from './Components/MyPurchases';

import { CreateProductPage } from './Components/Admin/CreateProductPage';

import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Component } from 'react';


let local_cart = JSON.parse(localStorage.getItem('cart'));
let local_cart_amount = localStorage.getItem('cart_amount');

class App extends Component {
  state = {
    logged_in: false,
    cart_items: local_cart ? local_cart : [],
    cart_amount: local_cart_amount ? Number(local_cart_amount) : 0,
    last_added_item: null,
  }

  setState(dict) {
    super.setState(dict, () => {
      localStorage.setItem('cart', JSON.stringify(this.state.cart_items))
      localStorage.setItem('cart_amount', this.state.cart_amount)
    });

  }

  addToCart(product, increase=false) {
    let hasID = this.state.cart_items.some(each => {
      if (each.id == product.id) {
        let newcart = [...this.state.cart_items];
        let index = newcart.indexOf(each);
        newcart[index].amount += 1

        this.setState({
          cart_items: [...newcart],
          cart_amount: this.state.cart_amount + 1,
          last_added_item: increase ? null : product

        })

        return true
      }
      else {
        return false
      }
    })

    if (!hasID) {
      this.setState({
        cart_items: [...this.state.cart_items, product],
        cart_amount: this.state.cart_amount + 1,
        last_added_item: product
      })
    }

  }

  render() {
    const appState = [this.state, (dict) => this.setState(dict)]

    return (
      <BrowserRouter>
        <div>
          <Header appState={appState} />
          <div style={{ height: "65px" }}></div>
          <div style={{ minHeight: '257px' }}>
            {/* <Route path="/" exact component={Banner} /> */}

            <Route path="/" exact render={() => (
              <Showcase
                appState={appState}
                addToCart={(product) => this.addToCart(product)} />
            )} />

            <Route path="/login" exact render={props => (
              <Login
                location={props.location}
                logged_in={this.state.logged_in}
                setAppState={list => this.setState(list)} />
            )} />

            <Route path="/logout" exact render={props => (
              <Logout logged_in={this.state.logged_in}
                setAppState={list => this.setState(list)} />
            )} />

            <Route path="/register" exact component={Register} />
            <Route path="/about" exact component={About} />
            <Route path="/contact" exact component={ContactPage} />

            <Route path="/product/:product_id" exact appState={appState} render={(props) => (
              <ProductDetail
                props={props}
                appState={appState}
                addToCart={(product) => this.addToCart(product)} />
            )} />
            <Route path="/profile/:user_id" exact component={ProfilePage} />

            <Route path="/shopping-cart" exact render={() => (
              <ShoppingCartPage
                addToCart={(product) => this.addToCart(product, true)}
                appState={appState} />
            )} />

            <Route path="/my_purchases" exact component={MyPurchases} />

            <Route path="/purchase_orders/:user_id" exact render={() =>
              <PurchaseOrders
                appState={appState} />
            } />

            <Route path="/create-product" exact component={CreateProductPage} />

          </div>
          {/* <Showcase /> */}
          <Footer />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
