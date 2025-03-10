import React, { useState } from "react";

const App = () => {
  const [cost, setCost] = useState(0);
  const [interest, setInterest] = useState(10);
  const [fee, setFee] = useState(0);
  const [downpayment, setDownpayment] = useState(0);
  const [tenure, setTenure] = useState(12);
  const [emi, setEmi] = useState(0);

  // EMI Calculation Formula
  const calculateEmi = (loanAmount) => {
    const monthlyRate = interest / 100 / 12;
    return loanAmount
      ? (
          (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, tenure)) /
          (Math.pow(1 + monthlyRate, tenure) - 1)
        ).toFixed(2)
      : 0;
  };

  // Update EMI when downpayment changes
  const updateEmi = (e) => {
    const newDownpayment = Number(e.target.value);
    setDownpayment(newDownpayment);
    setEmi(calculateEmi(cost - newDownpayment));
  };

  // Update downpayment when EMI slider changes
  const updateDownpayment = (e) => {
    const newEmi = Number(e.target.value);
    setEmi(newEmi);
    setDownpayment(cost - newEmi * tenure);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <span
        style={{
          color: "red",
          fontSize: "30px",
          fontFamily: "cursive",
          marginTop: "20px",
          padding: "10px",
        }}
      >
        EMI Calculator
      </span>

      {/* Total Cost */}
      <span style={{ marginTop: "20px", padding: "10px", fontSize: "30px" }}>
        Total Cost
      </span>
      <input
        style={{ padding: "10px" }}
        value={cost}
        onChange={(e) => setCost(Number(e.target.value))}
        type="number"
      />

      {/* Interest Rate */}
      <span style={{ marginTop: "20px", padding: "10px", fontSize: "30px" }}>
        Interest Rate
      </span>
      <input
        style={{ padding: "10px" }}
        value={interest}
        onChange={(e) => setInterest(Number(e.target.value))}
        type="number"
      />

      {/* Processing Fee */}
      <span style={{ marginTop: "20px", padding: "10px", fontSize: "30px" }}>
        Processing Fee
      </span>
      <input
        style={{ padding: "10px" }}
        value={fee}
        onChange={(e) => setFee(Number(e.target.value))}
        type="number"
      />

      {/* Downpayment */}
      <span style={{ marginTop: "20px", padding: "10px", fontSize: "30px" }}>
        Downpayment
      </span>
      <input
        style={{ padding: "10px" }}
        type="range"
        min={0}
        max={cost}
        value={downpayment}
        onChange={updateEmi}
      />

      {/* Loan Tenure */}
      <span style={{ marginTop: "20px", padding: "10px", fontSize: "30px" }}>
        Loan Tenure
      </span>
      <input
        style={{ padding: "10px" }}
        type="range"
        min={6}
        max={60}
        value={tenure}
        onChange={(e) => {
          setTenure(Number(e.target.value));
          setEmi(calculateEmi(cost - downpayment)); // Recalculate EMI when tenure changes
        }}
      />

      {/* EMI */}
      <span style={{ marginTop: "20px", padding: "10px", fontSize: "30px" }}>
        EMI
      </span>
      <input
        style={{ padding: "10px" }}
        type="range"
        min={calculateEmi(cost)}
        max={calculateEmi(0)}
        value={emi}
        onChange={updateDownpayment}
      />

      {/* Display EMI */}
      <span style={{ fontSize: "25px", padding: "10px", color: "blue" }}>
        Your EMI: ₹{emi}
      </span>
    </div>
  );
};

export default App;
