import React, { useState } from "react";
import CreatePromocode from "../../functions/CREATE/CreatePromocode";
import { useNavigate } from "react-router-dom";
const tCreatePromocode=(productId:number)=>{

    const [code,setCode]=useState<string>('')
    const[sale,setSale]=useState<number>(0)
    const navigate=useNavigate()

    const request={
        code:code,
        sale:sale,
        productId:productId,
    }

    const handleCreatePromocode=async()=>{
        const response=await CreatePromocode(request)

        if(response.success){
            navigate(`/product/${productId}`)
        }
    }

    return(
        <div className="my-modal" onClick={(e)=>e.stopPropagation()}>
            <h1>Create Promocode</h1>
            <label>Code</label>
            <input type="text" placeholder="Enter Code" value={code} onChange={(e)=>setCode(e.target.value)}/>
            <label>Sale</label>
            <input type="number" placeholder="Enter Sale" value={sale} onChange={(e)=>setSale(Number(e.target.value))}/>
            <button onClick={handleCreatePromocode}>Create</button>
        </div>
    )
}

export default tCreatePromocode;