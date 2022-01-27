import React, {Component} from 'react';
import './App.css';
import ProductList from "./components/product-list";
import Cart from "./components/cart";
import 'h8k-components';

const title = "HackerShop";

class App extends Component {
    constructor() {
        super();
        const products = [...PRODUCTS].map((product, index) => {
            product.id = index + 1;
            product.image = `/images/items/${product.name.toLocaleLowerCase()}.png`;
            product.cartQuantity = 0;
            return product;
        });
        this.state = {
            cart: {
                items: [],
                subTotal: 0,
                totalPrice: 0,
                discount: 0,
                selectedCoupon: '0'
            },
            products
        }
        this.addToCart = this.addToCart.bind(this);
        this.removeFromCart = this.removeFromCart.bind(this);
        this.descuentos = this.descuentos.bind(this)
    }

    addToCart(index) {
        const products = this.state.products;
        products[index].cartQuantity = 1;
        let cart = {...this.state.cart};
        cart.items.push({
            id: products[index].id,
            price: products[index].price,
            item: products[index].heading,
            quantity: 1
        });
        this.setState({
            products,
            cart
        })
        this.newCart(cart)
    }

    removeFromCart(index) {
        const products = this.state.products;
        console.log(products);
        products[index].cartQuantity = 0;
        let cart = {...this.state.cart};
        let cartIndex = this.state.cart.items.findIndex(item => item.id === products[index].id);
        cart.items.splice(cartIndex, 1);
        this.setState({
            cart,
            products
        })

        this.newCart(cart)
    }

    

    newCart(cart){
        
        const subTotal = [...cart.items].reduce( (acumulador, item) => acumulador + item.price, 0)
        const discount = this.state.cart.discount * subTotal
        const totalPrice = subTotal - discount

        this.setState(
            {cart:
         { ...this.state.cart, 
            subTotal, 
            discount,
            totalPrice
        }})

            
       }
  
       descuentos(event) {

        const subtotal = this.state.cart.subTotal 

        const discount = parseFloat(event / 100) * subtotal

        const totalPrice = this.state.cart.totalPrice - discount

        this.setState(
            {cart:
         {...this.state.cart, 
            subtotal,
            discount,
            totalPrice          
            }
        })
           
        }
       



    render() {

        return (
            <div>
                <h8k-navbar header={title}></h8k-navbar>
                <div className="layout-row shop-component">
                    <ProductList products={this.state.products} addition={this.addToCart} remove={this.removeFromCart}/>
                    <Cart cart={this.state.cart} set={this.descuentos}/>
                </div>
            </div>
        );
    }
}

export const PRODUCTS = [
    {
        heading: "Cap - $10",
        name: "Cap",
        price: 10
    },
    {
        heading: "Hand Bag - $30",
        name: "HandBag",
        price: 30
    },
    {
        heading: "Shirt - $30",
        name: "Shirt",
        price: 30
    },
    {
        heading: "Shoes - $50",
        name: "Shoe",
        price: 50
    },
    {
        heading: "Pant - $40",
        name: "Pant",
        price: 40
    },
    {
        heading: "Slipper - $20",
        name: "Slipper",
        price: 20
    }
];
export default App;
 




