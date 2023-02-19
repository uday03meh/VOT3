import {useState,useEffect} from "react"



    function Winner({ state }){
    const [winner, setWinner] = useState([]);
    
    const declareWinner = async(event) => {
        event.preventDefault()
        const {contract} = state;
        const winner = await contract.getWinner();
        // await winner.wait()
        console.log("Winner:", winner.name);
        setWinner(winner.name)
        console.log("IMAGE: ",winner.imageURL)
        alert(`The winner is ${winner.name}!`)
    }

      return (
        <div className="flex flex-col gap-4 items-center justify-center">
          <button onClick={declareWinner} className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center justify-center">Declare Winner</button>
          <div className="text-4xl font-bold">{winner}</div>
          <img src={`${winner.imageURL}`} className="w-40 h-40 rounded-full" alt = {winner}/>
          <img src="https://pbs.twimg.com/profile_images/1609351112272007168/onsxRv3O_400x400.jpg" className="w-40 h-40 rounded-full" alt = {winner}/>
        </div>
      );
      }

export default Winner;