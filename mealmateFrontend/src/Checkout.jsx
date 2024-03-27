import React, {useEffect, useState} from "react";
import "./style.css";
import backbutton from "./assets/backbutton.png";
import { useNavigate } from "react-router-dom";

const Checkout = () => {

    const [location, setLocation] = useState('');
    const [orderId, setOrderId] = useState('');
    const[orderItems, setOrderItems] = useState([]);
    const email = localStorage.getItem('userEmail') || 'No email found';
    const [isOrderPlaced, setIsOrderPlaced] = useState(false);

    const navigate = useNavigate();
    let [subtotal, setSubtotal] = useState(0.00);
    let [price, setPrice] = useState(0.00);

    useEffect(() => {
        const fetchItemDetails = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/deliveryCarts/orderer/${email}`);
                const data = await response.json();
                setOrderItems(data.orderItemsId);
                console.log(data.orderItemsId);
            } catch (error) {
                console.error('There was an error!', error, "orderItemList");
            }
        };
        fetchItemDetails();
    }, []);

    const ListItems = () => {
        const [myMap, setMap] = useState(new Map());
        const [isLoading, setIsLoading] = useState(false);

        useEffect(() => {
            const fetchItemDetails = async () => {
                setIsLoading(true);
                try {
                    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/deliveryCarts/itemList/${email}`);
                    const data = await response.json();
                    const newMap = new Map(Object.entries(data));
                    fetchItemNames(newMap);
                } catch (error) {
                    console.error('There was an error!', error, "itemList");
                }
            };
            fetchItemDetails();
        }, []);

        const fetchItemNames = async (initialMap) => {
            const promises = Array.from(initialMap.keys()).map(key =>
                fetch(`${import.meta.env.VITE_API_BASE_URL}/orderItems/${key}`).then(response => {
                    if (!response.ok) {
                        throw new Error('Failed to fetch item details');
                    }
                    return response.json();
                })
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
            setSubtotal(newPrice); // Update price state
            setPrice(newPrice+1)
            setIsLoading(false);
        };

        if (isLoading) {
            return <div>Loading...</div>;
        }

        return (
            <div className="overflow-auto" style={{maxHeight:"425px"}}>
                {[...myMap].map(([key, value]) => (
                    <div key={key} className="mb-0" style={{padding: '10px' }}>
                        {/* Quantity Card */}
                        <div className="row center-block pb-3">
                            <div className="col-2 d-flex justify-content-center align-self-center rounded-pill " style={{
                                backgroundColor: '#FFFFFF',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontWeight: 'bold',
                                marginLeft: '10px'
                            }}>
                                <div className="p-2 ">x{value.quantity}</div>
                            </div>
                            {/* Item Details */}
                            <div className="col-7 justify-content-center align-self-center" style={{ flex: 1, paddingLeft: '20px', textAlign: 'left', marginBottom: '0px'}}>
                                <h4>{value.name}</h4>
                            </div>
                            {/* Price */}
                            <div className="col-3" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center', marginRight: '10px', fontWeight: 'bold', fontSize: '20px' }}>
                                <p className="fw-normal m-0" style={{fontSize: '15px'}}>$ {value.price.toFixed(2)}</p>
                            </div>
                        </div>
                        {/* Horizontal Line */}
                        <div className="row pt-1 m-0">
                            <hr className="m-0," style={{ width: '100%', color: '#FFFFFF', marginBottom:"0px" }} />
                        </div>
                    </div>
                ))}
            </div>
        );
    };
    const HandleCheckout = (event) => {
        setIsOrderPlaced(true);
        event.preventDefault();
        const orderData = {
            ordererId: email,
            orderItemsId: orderItems,
            location: "SCIS SMU SR B1-01",
            totalPrice: price
            //status: "ORDER_SENT"
        }
        fetch(`${import.meta.env.VITE_API_BASE_URL}/orders/create`, {
            method: 'POST', // Set the request method to POST
            headers: {
                'Content-Type': 'application/json' // Indicate that the request body format is JSON
            },
            body: JSON.stringify(orderData) // Convert the JavaScript object to a JSON string
        })
        .then(response => {
            console.log(response);
            if (!response.ok) {
                // If the response status code is not in the 2xx range,
                // throw an error with the status text (e.g., "Not Found", "Forbidden")
                throw new Error('Failed to create order');
            }
            return response.json(); // Parse the JSON response body
        })
        .then(data => {
            setOrderId(data.orderId); // Assuming the response includes an 'id' field for the order ID
            console.log('Order ID:', orderId);
            console.log('Order created successfully:', data); // Handle the success case
        })
        .catch(error => {
                console.error('An error occurred:', error, "ORDER");
            // Handle any errors that occurred during order creation or cart update
        });
        fetch(`${import.meta.env.VITE_API_BASE_URL}/deliveryCarts/empty/${email}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to clear cart');
            }
            return response.json(); // Assuming the API responds with the updated cart details
        })
        .then(cartUpdateResponse => {
            console.log('Cart clear successfully:', cartUpdateResponse);
            // Handle successful cart update (e.g., redirect user, show confirmation, etc.)
            })
        .catch(error => {
                console.error('An error occurred:', error, "CLEAR CART");
                // Handle any errors that occurred during order creation or cart update
        });
    };
    const HandleTrackOrder = () => {
        localStorage.setItem('ordererTrackOrder', orderId);
        console.log('Going to track Order ID:', orderId);
        navigate('/track');
    }

    return (
    <div className="100-w vh-100 bg-white">
        <div className="container p-0">
            <div className="header bg-light" style={{ width: "100%", height: "50px", boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
                <div className="d-flex justify-content-between align-items-center mb-4" style={{ width: "100%", height: "50px", position: 'relative' }}>
                    <button style={{ background: 'none', border: 'none', cursor: 'pointer', transform: 'translateY(50%)'}}>
                        <img
                            src={backbutton}
                            alt="Back"
                            style={{ width: "20px", height: "auto" }} // Adjust size as needed
                            onClick={() => navigate(-1)}
                        />
                    </button>
                    <div style={{ position: 'absolute', width: "100%", top: '95%', transform: 'translateY(-50%)', textAlign: 'center' , fontWeight: 'bold'}}>
                        Zhang Liang Mala Tang Bencoolen
                    </div>
                    {/* If you plan to add another element (like a cart icon) on the right, you can add it here. */}
                    <div style={{ width: '30px' }}> {/* Placeholder for right-side symmetry, adjust as needed */}</div>
                </div>
            </div>
        </div>
        <form onSubmit={HandleCheckout}>
            <div className="container p-3 px-4">
                <div className="row my-3 d-flex justify-content-center">
                    <div className="col-auto px-3 p-2 border-0 rounded-start-pill" style={{backgroundColor:"#FFC218"}}>
                        <label className="col-form-label fw-bold" htmlFor="location">DELIVER TO:</label>
                    </div>
                    <div className="col-auto px-3 p-2 border-0 rounded-end-pill" style={{backgroundColor:"#FFC218"}}>
                        <input type="location" id="location" placeholder="Location" className="form-control" aria-describedby="locationInline" value="SCIS SMU SR B1-01" onChange={e => setLocation(e.target.value)}/>
                    </div>
                </div>
                <div className="row mt-4 px-2 pt-3 overflow-auto" style={{backgroundColor:"#FFC218"}}>
                    <div className="row">
                        <h5 >Order Summary</h5 >
                    </div>
                    <div className="row pb-2">
                        <hr className="m-0 ms-2" style={{ width: '200%', height:"2px", color: '#FFFFFF', backgroundColor:"#FFFFFF" }} />
                    </div>
                    <ListItems />
                    <div className="row pt-3">
                        <div className="col ">
                            <p>Subtotal</p>
                        </div>
                        <div className="col d-flex justify-content-end">
                            <p>${subtotal.toFixed(2)}</p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col ">
                            <p>Delivery Fees</p>
                        </div>
                        <div className="col d-flex justify-content-end">
                            <p>$1.00</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container ">
                {!isOrderPlaced ? (
                    <div className="row mt -4 px-2 py-3 justify-content-center" style={{backgroundColor:"#FEDD82", position:"fixed", bottom:'0', width:'100%'}}>
                        <div className="row pb-2">
                            <div className="col">
                                <h3>Total</h3>
                            </div>
                            <div className="col d-flex justify-content-end">
                                <h3>${price.toFixed(2)}</h3>
                            </div>
                        </div>
                        <div className="row">
                            <div className='col pe-0'>
                                <p className="fw-bold">Payment Type &nbsp;&nbsp;&nbsp;&nbsp;:</p>
                            </div>
                            <div className='col-7 d-flex justify-content-start ps-0'>
                                <p> Cash on delivery</p>
                            </div>
                        </div>
                        <div className="row">
                            {/* Checkout Button */}
                            <button type="submit" style={{
                                padding: '10px 20px',
                                cursor: 'pointer',
                                backgroundColor: '#FFC218',
                                borderRadius: '20px',
                                border: 'none',
                                fontWeight: 'bold',
                            }}>
                                Place Order
                            </button>
                        </div>
                    </div>) : (
                    <div className="row mt-4 px-2 py-3 justify-content-center" style={{backgroundColor:"#FEDD82", position:"fixed", bottom:'0', width:'100%'}}>
                        <div className="row pb-2">
                            <h4 className="text-center">Your order has been sent!</h4>
                        </div>
                        <div className="row pb-2">
                            <h4 className="text-center">Would you like to track your order?</h4>
                        </div>
                        <div className="row">
                            {/* Checkout Button */}
                            <button style={{
                                padding: '10px 20px',
                                cursor: 'pointer',
                                backgroundColor: '#FFC218',
                                borderRadius: '20px',
                                border: 'none',
                                fontWeight: 'bold'
                            }} onClick={HandleTrackOrder}>
                                Track My Order
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </form>
    </div>
    );
}

export default Checkout;
