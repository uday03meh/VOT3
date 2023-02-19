import { useState, useEffect } from "react";
const Voting = ({ state }) => {
  const [candidates, setCandidates] = useState([]);
  const { contract } = state;

  useEffect(() => {
    const candidatesArray = async () => {
      const candidates = await contract.getCandidates();
      setCandidates(candidates);
    };
    contract && candidatesArray();
  }, [contract]);

  return (
    <div className="bg-black text-white" >
        
<div className="flex gap-10 items-center justify-center">
      {candidates.map((candidate,i) => {
        return (
          <div
            className="flex flex-col gap-4 items-center justify-center"
            key={i}
          >
             <div className="text-4xl font-bold">{candidate.name}</div>
             <img src={candidate.imageURL} className="w-40 h-40 rounded-full" alt = {candidate.name}/>
             <div className="text-2xl font-bold">{candidate.party}</div>
             <button onClick={() => {contract.vote(i+1)
                                    // if(contract.voted() === true){
                                    //   alert("Alert You cannot vote twice!")
                                    // }
                                    }} className="bg-blue-500 text-white px-4 py-2 rounded-lg">Vote</button>
           
          </div>
        );
      })}
      </div>
    </div>
  );
};
export default Voting;