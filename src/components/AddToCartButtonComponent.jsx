import React, { useState, useEffect } from 'react';
import { Button, ButtonGroup } from 'reactstrap';

const AddToCartButton = () => {

    const [isAddedToCart, setIsAddedToCart] = useState(false);
    const [quantity, setQuantity] = useState(1);

    const handleAddToCart = () => {
        setIsAddedToCart(true);
    };

    const decreaseQuantity = () => {
        if (quantity > 0) {
            setQuantity(quantity - 1);
        }
    };

    const increaseQuantity = () => {
        setQuantity(quantity + 1);
    };

    useEffect(() => {
        if (quantity === 0) {
            setIsAddedToCart(false);
           setQuantity(1)
        }
    }, [quantity]);

    return (
        <>
            {isAddedToCart && (
                <ButtonGroup>
                    <Button onClick={decreaseQuantity}>-</Button>
                    <Button outline color="secondary">{quantity}</Button>
                    <Button onClick={increaseQuantity}>+</Button>
                </ButtonGroup>
            )}
            {!isAddedToCart && (
                <Button color="primary" onClick={handleAddToCart}>
                    Add to Cart
                </Button>
            )}
        </>
    );
};

export default AddToCartButton;
