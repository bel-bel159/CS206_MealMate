import React from "react";
import "./style.css";
import backbutton from "./Assets/backbutton.png"
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Cart = () => {
    const navigate = useNavigate();
    const ListItems = () => {
        const [myMap, setMap] = useState(new Map());
        const [isLoading, setIsLoading] = useState(false);
        let [price, setPrice] = useState(0.00);

        useEffect(() => {
            const fetchItemDetails = async () => {
                setIsLoading(true);
                try {
                    const response = await fetch('http://localhost:8080/deliveryCarts/itemList/12345');
                    const data = await response.json();
                    const newMap = new Map(Object.entries(data));
                    fetchItemNames(newMap);
                } catch (error) {
                    console.error('There was an error!', error);
                }
            };

            fetchItemDetails();
        }, []);

        const fetchItemNames = async (initialMap) => {
            const promises = Array.from(initialMap.keys()).map(key =>
                fetch(`http://localhost:8080/orderItems/${key}`).then(response => response.json())
            );

            const results = await Promise.all(promises);
            let newPrice = 0; // Temporarily store price to avoid direct state mutation in loop
            const updatedMap = new Map();
            results.forEach((result, index) => {
                const key = Array.from(initialMap.keys())[index];
                const quantity = initialMap.get(key);
                updatedMap.set(key, { name: result.itemName, quantity: quantity, price: result.itemPrice });
                newPrice += result.itemPrice * quantity;
            });

            setMap(updatedMap);
            setPrice(newPrice); // Update price state
            setIsLoading(false);
        };

        if (isLoading) {
            return <div>Loading...</div>;
        }

        if (myMap.size === 0){
            return (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100%', padding: '20px' }}>
                    <div style={{ textAlign: 'center', marginBottom: '20px', marginTop: '20px'}}>
                        There are currently no items in your basket.
                    </div>
                    <hr style={{ width: '100%', marginBottom: '20px', color: '#FFC218'}} />
                    <button style={{ padding: '10px 20px', cursor: 'pointer', backgroundColor: '#FFC218', borderRadius: '20px', border: 'none' }}
                            onClick={() => navigate('/home')}>
                        Explore Options
                    </button>
                </div>
            )}

        return (
            <div>
                {[...myMap].map(([key, value]) => (
                    <div key={key} style={{ top:"100px", padding: '10px' }}>
                        {/* Quantity Card */}
                        <div className="row pt-2 pb-2">
                            <div className="col-4 d-flex justify-content-center align-self-center" style={{
                                width: "55px",
                                height: "55px",
                                backgroundColor: '#FFC218',
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontWeight: 'bold',
                                marginLeft: '10px'
                            }}>
                                x{value.quantity}
                            </div>
                            {/* Item Details */}
                            <div className="col-5 justify-content-center align-self-center" style={{ flex: 1, paddingLeft: '20px', textAlign: 'left', marginBottom: '0px'}}>
                                <h4>Zhang Liang Mala Tang Bencoolen</h4>
                                <p className="m-0">{value.name}</p>
                            </div>
                            {/* Price */}
                            <div className="col-3" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', justifyContent: 'center', marginRight: '10px', fontWeight: 'bold', fontSize: '20px' }}>
                                <h4 style={{ fontWeight: 'bold', fontSize: '20px' }}>$ {value.price.toFixed(2)}</h4>
                            </div>
                        </div>
                        {/* Horizontal Line */}
                        <div className="row">
                            <hr className="m-0," style={{ width: '100%', color: '#FFC218' }} />
                        </div>
                    </div>
                ))}
                <div style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-end', justifyContent: 'center', marginRight: '10px', fontWeight: 'bold', fontSize: '20px'}}>
                    <h4 style={{ fontWeight: 'bold', fontSize: '20px' }}>Total: $ {price.toFixed(2)}</h4>
                </div>
                {/* Checkout Button */}
                <button style={{
                    padding: '10px 20px',
                    cursor: 'pointer',
                    backgroundColor: '#FFC218',
                    borderRadius: '20px',
                    border: 'none',
                    fontWeight: 'bold',
                    position: 'fixed',
                    bottom: '80px',
                    left : '50%',
                    transform: 'translateX(-50%)'
                }} onClick={() => navigate('/checkout')}>
                    Checkout
                </button>
            </div>
        );
    };


    return (
        <div>
            <div className="row">
                <div className="header bg-light" style={{ width: "100%", height: "50px", boxShadow: '0 2px 4px rgba(0,0,0,0.1)', position: 'fixed' }}>
                    <div className="d-flex justify-content-between align-items-center mb-4" style={{ width: "100%", height: "50px", position: 'relative' }}>
                        <button style={{ background: 'none', border: 'none', cursor: 'pointer', transform: 'translateY(50%)'}}>
                            <img
                                src={backbutton}
                                alt="Back"
                                style={{ width: "20px", height: "auto" }} // Adjust size as needed
                                onClick={() => navigate(-1)}
                            />
                        </button>
                        <div style={{ position: 'absolute', width: "100%", top: '90%', transform: 'translateY(-50%)', textAlign: 'center' , fontWeight: 'bold'}}>
                            My Cart
                        </div>
                        {/* If you plan to add another element (like a cart icon) on the right, you can add it here. */}
                        <div style={{ width: '30px' }}> {/* Placeholder for right-side symmetry, adjust as needed */}</div>
                    </div>
                </div>
            </div>
            <div className='row overflow-auto' style={{paddingTop:'60px',maxHeight:"800px"}}>
                <ListItems />
            </div>
        </div>
    );
}

export default Cart;