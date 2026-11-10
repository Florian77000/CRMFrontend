'use client'
import Link from 'next/link';
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Client () {
    const router = useRouter();
    const [clients, setClients] = useState([])
    const [search, setSearch] = useState('')

    const getCatColor = (cat) => {
    if (cat === 'devis') return 'text-yellow-500 bg-yellow-200';
    if (cat === 'facture') return 'text-red-500 bg-red-200';
    if (cat === 'prospect') return 'text-blue-500 bg-blue-200';
    return 'text-gray-500';
};

    const fetchClient = () => {
        // fetch('https://cr-mbackend-murex.vercel.app/clients')
        fetch('http://localhost:3000/clients')
        .then(res => res.json())
        .then(data => {
            console.log('data: ', data.data);
            setClients(data.data)
        })
    }
      useEffect(() => {
            fetchClient()
        }, [])

        const filterClients = clients.filter(e => 
            e.name.toLowerCase().includes(search.toLowerCase()) ||
            e.city.toLowerCase().includes(search.toLocaleLowerCase())
        )

        

    return (
        <div className="min-h-screen pb-[10vh] px-5 p">

            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">Mes clients</h1>
                <Link href={'/clients/add'} className="bg-(--primaire) w-6 h-6 flex justify-center items-center rounded-full text-2xl text-white">+</Link>
            </div>
            
            <div className="flex flex-col py-5">
                <input className="bg-gray-100 w-full rounded-2xl h-10" placeholder="🔍 Rechercher un client ..." onChange={(e) => setSearch(e.target.value)} value={search} />
                <div className="flex justify-between py-5">
                    <button className={`border p-2 rounded-2xl w-30 ${search === '' ? 'bg-(--primaire) text-white' : 'bg-white'}`} onClick={() => setSearch('')}>Tous ({clients.length})</button>
                    <button className="border p-2 rounded-2xl w-30">Devis</button>
                    <button className="border p-2 rounded-2xl w-30">Facture</button>
                </div>
                {filterClients.map((e,i) => (
                    <div key={i} 
                    onClick={() => router.push(`/clients/${e._id}`)}
                    className="text-gray-400/70 border-b py-4 flex justify-between">
                        <div className="flex flex-col">
                            <p className="text-black ">{e.name}</p>
                            <p>{e.phone.replace(/(\d{2})(?=\d)/g, '$1 ')}</p>
                            <p>{e.city}</p>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="flex items-center">
                                <p className={`${getCatColor(e.cat)} rounded-2xl p-2 w-20 text-center font-semibold`}>{e.cat}</p>
                            </div>
                            <div>
                                <p className="font-bold text-black">→</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}