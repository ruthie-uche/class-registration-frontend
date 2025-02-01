import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import "./App.css";

function App() {
  const [contract, setContract] = useState(null);
  const [studentId, setStudentId] = useState("");
  const [studentName, setStudentName] = useState("");
  const [searchId, setSearchId] = useState("");
  const [foundStudent, setFoundStudent] = useState("");
  const [message, setMessage] = useState("");
  const [network, setNetwork] = useState("");
  const [account, setAccount] = useState("");

  const connectWallet = async () => {
    if (!window.ethereum) {
      setMessage("Please install MetaMask.");
      return;
    }

    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const accounts = await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      const networkInfo = await provider.getNetwork();

      setAccount(accounts[0]);
      setNetwork(networkInfo.name);

      const res = await fetch("/contractAddress.txt");
      const contractAddress = await res.text();

      const contractJson = await fetch("/ClassRegistration.json");
      const contractData = await contractJson.json();

      const contract = new ethers.Contract(
        contractAddress.trim(),
        contractData.abi,
        signer
      );
      setContract(contract);
      setMessage("");
    } catch (error) {
      setMessage("Failed to connect wallet.");
    }
  };

  const registerStudent = async () => {
    if (!contract || studentId.trim() === "" || studentName.trim() === "") {
      setMessage("Please enter a valid ID and name.");
      return;
    }
    try {
      const tx = await contract.registerStudent(studentId, studentName);
      await tx.wait();
      setMessage("Student registered successfully!");
      setStudentId("");
      setStudentName("");
    } catch (error) {
      setMessage("Error registering student.");
    }
  };

  const getStudentById = async () => {
    if (!contract || searchId.trim() === "") {
      setFoundStudent("Please enter a valid student ID.");
      return;
    }
    try {
      const name = await contract.getStudentById(searchId);
      setFoundStudent(name || "Student not found.");
    } catch (error) {
      setFoundStudent("Student not found.");
    }
  };

  return (
    <div className="app">
      <div className="header">
        <h1>Class Registration</h1>
        <div className="network-info">
          {account ? (
            <>
              <span>Network: {network || "Not Connected"}</span>
              <span>Wallet: {account.slice(0, 6)}...{account.slice(-4)}</span>
            </>
          ) : (
            <></>
          )}
        </div>
      </div>

     
      {!account && (
        <button onClick={connectWallet} className="connect-btn">
          Connect Wallet
        </button>
      )}

      {account ? (
        <div className="container">
          <div className="card">
            <h2>Register Student</h2>
            <input
              type="text"
              placeholder="ID"
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
            />
            <input
              type="text"
              placeholder="Name"
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
            />
            <button onClick={registerStudent} className="blue-btn">
              Register
            </button>
          </div>

          <div className="card">
            <h2>Find Student</h2>
            <input
              type="text"
              placeholder="Enter ID"
              value={searchId}
              onChange={(e) => setSearchId(e.target.value)}
            />
            <button onClick={getStudentById} className="green-btn">
              Get Student
            </button>
            {foundStudent && <p>Student Name: {foundStudent}</p>}
          </div>
        </div>
      ) : (
        <p className="message">{message || "Please connect your wallet to continue."}</p>
      )}
    </div>
  );
}

export default App;
