# MyStore

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.0.5.

## Installation

`cd` into its root directory  
run `npm install` to install pacakge setting
run `ng serve` to launch the application

## Description

### Product  
- Displayed all items in one page.  
- Each item has its own textbox can input the number want to buy.  
- Click the image will navicagate to detail page.  
- Press `Add` to add item into cart, or `Remove item in cart` to remove item from cart.  

### Cart  
- If there is no item in shopping cart, do not display the check out page.   
- If item exists, left hand-side shows the item name, quantity, and total price in each item in shopping cart. Right hand-side will show the payment information form.     
- The quantity of item can change in the textbox, and reflect to total price in each item and final price.  
- Empty or set the quantity of textbox to zero will remove the item from shopping cart.  
- In the payment information form, name, card, and zip code is required. The validation rules are listed below.  
Card
: must be 16 digit number  
Zip code
: must be 5 digit number
- If context in form is valid, proceed to confirmation page.


