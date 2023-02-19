import React from 'react'
import App from "../App"
import {ethers} from "ethers"
import ReactDOM from "react"
export default function AddCandidate({ state }) {
    const candidateAdd = async(event) => {
        event.preventDefault()
        const {contract} = state;
        const name = document.getElementById("name").value
        const party = document.getElementById("party").value
        const imageURL = document.getElementById("image-url").value
        console.log(name, party)
       const txn = await contract.addCandidate(name, party,imageURL)
       await txn.wait()
       console.log("Candidate added successfully!")
       console.log("Length: ", contract.candidateList.length)
       alert(`Candidate ${name} from Party ${party} added Successfully!`)

    }
	return (
        <div className="flex flex-col gap-4 items-center justify-center min-h-screen">
            <h1 className="text-4xl font-extrabold">Add Candidate</h1>
            <form onSubmit={candidateAdd} className="flex flex-col gap-4 items-center justify-center">
                <input type="text" placeholder="Name" id="name" className="bg-gray-800 text-white px-4 py-2 rounded-lg" />
                <input type="text" placeholder="Party" id="party" className="bg-gray-800 text-white px-4 py-2 rounded-lg" />
                <input type="text" placeholder="Image url" id="image-url" className="bg-gray-800 text-white px-4 py-2 rounded-lg" />
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg">Add Candidate</button>
            </form>
        </div>
	);
}