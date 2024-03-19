import React, {useEffect, useState} from "react";
import "./style.css";
import backbutton from "./assets/backbutton.png";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
    const navigate = useNavigate();
    let [subtotal, setSubtotal] = useState(0.00);

    const ListItems = () => {
        const [myMap, setMap] = useState(new Map());
        const [isLoading, setIsLoading] = useState(false);

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
            setSubtotal(newPrice); // Update price state
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
        <div className="container p-3 px-4">
            <div className="row my-3 d-flex justify-content-center">
                <div className="col-auto px-3 p-2 border-0 rounded-start-pill" style={{backgroundColor:"#FFC218"}}>
                    <label className="col-form-label fw-bold" htmlFor="location">DELIVER TO:</label>
                </div>
                <div className="col-auto px-3 p-2 border-0 rounded-end-pill" style={{backgroundColor:"#FFC218"}}>
                    <input type="location" id="location" placeholder="Location" className="form-control" aria-describedby="locationInline"></input>
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
            <div className="row mt -4 px-2 py-3 justify-content-center" style={{backgroundColor:"#FEDD82", position:"fixed", bottom:'0', width:'100%'}}>
                <div className="row pb-2">
                    <div className="col">
                        <h3>Total</h3>
                    </div>
                    <div className="col d-flex justify-content-end">
                        <h3>${(subtotal + 1).toFixed(2)}</h3>
                    </div>
                </div>
                <div className="row">
                <div className='col pe-0'>
                    <p className="fw-bold">Payment Type &nbsp;&nbsp;&nbsp;&nbsp;:</p>
                </div>
                    <div className='col-7 d-flex justify-content-start ps-0'>
                    <p> Cash on deivery</p>
                    </div>
                </div>
                <div className="row">
                    {/* Checkout Button */}
                    <button style={{
                        padding: '10px 20px',
                        cursor: 'pointer',
                        backgroundColor: '#FFC218',
                        borderRadius: '20px',
                        border: 'none',
                        fontWeight: 'bold',
                    }} onClick={() => navigate('/checkout')}>
                        Place Order
                    </button>
                </div>
            </div>
        </div>
    </div>
    );
}

export default Checkout;
