# CartController
```
 Action: Add an item to cart
curl -X POST http://localhost:8080/cart/112349122332300 \
-H "Content-Type: application/json" \
-d '{
    "id": 1,
    "cartId": 159725574670500,
    "catalogItemId": 163347653846700,
    "quantity": 2,
    "state": 1
}' Action: Get items from cart
curl -X GET http://localhost:8080/cart
 Action: Checkout from cart
curl -X GET http://localhost:8080/cart/checkout
 Action: Update state of item
curl -X PUT http://localhost:8080/cart/163347653846700/state
-H "Content-Type: application/json" \
-d '{
    "id": 1,
    "cartId": 159725574670500,
    "catalogItemId": 163347653846700,
    "quantity": 2,
    "state": 1}'
```


