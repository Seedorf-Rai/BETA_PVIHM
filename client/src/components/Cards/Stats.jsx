

export function Stats(){
    return(
        <div className="stats">
           <div className="overlay"></div>
           <div className="content">
             <div className="xl:px-24 flex gap-10 ">
               <div className="text-center">
                <h1 className="font-bold text-4xl mb-3">90%</h1>
                <p>
                of the teachers use some kind of digital resources for student instruction
                </p>
               </div>
               <div className="text-center">
                <h1 className="font-bold text-4xl mb-3">70%</h1>
                <p>
                of teachers use video of some kind to support instruction on weekly basis
                </p>
               </div>
               <div className="text-center">
                <h1 className="font-bold text-4xl mb-3">90%</h1>
                <p>
                of teachers give peer to peer training and guidance for each students who are in need
                </p>
               </div>
             </div>
           </div>
        </div>
    )
}