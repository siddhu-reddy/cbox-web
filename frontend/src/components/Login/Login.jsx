import React, { useState } from "react";
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

const Login = () => {
    const [phone, setPhone] = useState("");
    const [otp, setOtp] = useState("");
    const [otpSent, setOtpSent] = useState(false);

    const sendOtp = async () => {
        try {
            const response = await fetch("http://localhost:3000/send-otp", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ phone }),
            });

            const data = await response.json();
            if (response.ok) {
                setOtpSent(true);
                alert("OTP sent successfully!");
            } else {
                alert(data.error);
            }
        } catch (error) {
            console.error("Error sending OTP:", error);
        }
    };

    const verifyOtp = async () => {
        try {
            const response = await fetch("http://localhost:3000/verify-otp", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ phone, otp }),
            });

            const data = await response.json();
            if (response.ok) {
                alert("Login successful!");
            } else {
                alert(data.error);
            }
        } catch (error) {
            console.error("Error verifying OTP:", error);
        }
    };

    return (
        <div className="phone-signin">
            <PhoneInput country={'in'} value={phone} onChange={(value) => setPhone("+" + value)} />
            <button onClick={sendOtp}>Send OTP</button>
            
            {otpSent && (
                <>
                    <input type="text" placeholder="Enter OTP" value={otp} onChange={(e) => setOtp(e.target.value)} />
                    <button onClick={verifyOtp}>Verify OTP</button>
                </>
            )}
        </div>
    );
};

export default Login;
