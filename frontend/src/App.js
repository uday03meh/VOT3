// Importing contract's ABI
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import ABI from "./artifacts/contracts/Voting.sol/Voting.json"
import {useState,useEffect} from "react"
import {ethers} from "ethers"
import ReactDOM from "react-dom";
import About from "./About"
import AddCandidate from "./Components/AddCandidate";
import Voting from "./Components/Voting";
import Winner from "./Components/Winner";
function App() {
  
  const [candidates, setCandidates] = useState([])
  const [state, setState] = useState({
    provider:null,
    signer:null,
    contract:null
  })

  

  useEffect(() => {
    const connectWallet = async() => {
    const contractAddress = "0x41bCAD8D92f386f0226138564B34e7D9eeeCCd5E"
    
    const contractABI = ABI.abi;
    
      const {ethereum} = window
      if(ethereum){
        const account = await ethereum.request({method:"eth_requestAccounts"})
      }
      const provider = new ethers.providers.Web3Provider(ethereum)
      const signer = provider.getSigner()
      const contract = new ethers.Contract(contractAddress, contractABI, signer)
      setState({provider,signer,contract})
      if (contract) {
        const getCandidateCount = async () => {
          const count = await contract.candidateCount()
          console.log("Candidate Count ", count.toString())
        }
        const getTotalVotes = async () => {
          const count = await contract.totalVotes()
          console.log("Total Votes ", count.toString())
        }
        getCandidateCount()
        getTotalVotes()
      }
      const getCandidates = async() => {
        try {
          const count = await contract.candidateCount()
          console.log("Candidate Count ", count.toString())
          let candidatesArr = []
          for(let i = 1; i <= count; i++) {
            const candidate = await contract.candidates(i)
            console.log(candidate)
            let candidate_obj = {
              name: candidate[0],
              party: candidate[1],
              imageURL: candidate[2],
            }
            candidatesArr.push(candidate_obj)
          }
          setCandidates(candidatesArr)
        } catch(err) {
          console.log(err)
        }
      }
    
      const getTotalVotes = async() => {
        try {
          const count = await contract.totalVotes()
          console.log("Total Votes ", count.toString())
          // getTotalVotes(count.toString())
        } catch(err) {
          console.log(err)
        }
      }
        if(contract) {
          getCandidates()
          getCandidates()
		getTotalVotes()
        }

  }
  connectWallet()
},[])

console.log("Candidates: ", candidates)
console.log(state)

  return (

    <div className="bg-black text-white">
    
					<div className="flex flex-col gap-4 items-center justify-center min-h-screen">
						<h1 className="text-4xl font-extrabold">Election</h1>
        
            <AddCandidate state = {state} />
                <h1 style={{margin:"20px auto", width:"200px", fontWeight:"900",fontSize:"35px"}}>Candidates</h1>
                <div className = "candidates-div">
                <Voting state = {state} />
                </div>
             <Winner state = {state} /> 
     
    
					</div>
		</div>

  )
    }
export default App;
