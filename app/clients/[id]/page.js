'use client'

import {useState, useEffect} from "react";
import { useParams, useRouter } from "next/navigation";

export default function ClientId () {

     const { id } = useParams();
     const router = useRouter();
     const [client, setClient] = useState(null);

    useEffect(() => {
        // fetch(`https://cr-mbackend-murex.vercel.app/clients/${id}`)
        fetch(`http://localhost:3000/clients/${id}`)
        .then((res) => res.json())
        .then((data) => {
            setClient(data.data)
        })
    }, [id]);
    
    const deleteClient = () => {
        fetch(`http://localhost:3000/clients/${id}/delete`, {
            method:'DELETE'
        })
        .then((res) => res.json())
        .then(() => {
            router.push('/clients');
        })
    }

    if(!client) return <p>client introuvable</p>

    return(
        <div>
            <div className="flex gap-2 font-bold">   
                <button onClick={() => router.push('/clients')}>←</button>
                <h1>Fiche client</h1>
            </div>
            <div>
                <p>{client.name}</p>
                <p>{client.phone}</p>
                <p></p>
            </div>
            
            <button className='border' onClick={() => deleteClient()}>Supprimer</button>
        </div>

        
    )
}