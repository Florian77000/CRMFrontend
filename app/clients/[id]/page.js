'use client'

import {useState, useEffect} from "react";
import { useParams } from "next/navigation";

export default function ClientId () {

     const { id } = useParams();
     const [client, setClient] = useState(null);

    useEffect(() => {
        fetch(`https://cr-mbackend-murex.vercel.app/clients/${id}`)
        // fetch(`http://localhost:3000/clients/${id}`)
        .then((res) => res.json())
        .then((data) => {
            setClient(data.data)
        })
    }, [id]);

    if(!client) return <p>client introuvable</p>

    return(
        <div>
            <div className="flex gap-2 font-bold">   
                <p>←</p>
                <h1>Fiche client</h1>
            </div>
            
            <p>{client.name}</p>
        </div>
    )
}