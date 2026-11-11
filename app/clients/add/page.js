'use client'

import { useState, useEffect } from "react"

export default function Add () {

    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [displayAddress, setDisplayAddress] = useState("");
    const [street, setStreet] = useState("");
    const [city, setCity] = useState("");
    const [cat, setCat] = useState("");

    const [suggestions, setSuggestions] = useState([]); 

    useEffect(() => {
    if (street.length < 3) {
        setSuggestions([]);
        return;
    }

     fetch(`https://data.geopf.fr/geocodage/search?q=${encodeURIComponent(street)}&index=address&limit=5&autocomplete=1`)

        .then(res => res.json())
        .then(data => {
            setSuggestions(data.features);
        });

}, [street]);

    const clickAdd = () => {
            fetch('http://localhost:3000/clients/add', {
                method:'POST',
                headers:{"content-type":"application/json"},
                body:JSON.stringify({
                    name:name,
                    phone:phone,
                    address:{
                        street : street,
                        city : city,
                    },
                    cat:cat
                })
            })
            .then((res) => res.json())
            .then(()=> {
                setName('')
                setPhone('');
                setDisplayAddress('')
                setStreet('');
                setCity('');
                setCat('')
            })
        }

    return (
        <div>
            <div className="grid grid-cols-3 items-center">
                <h1>Client</h1>
                <h2 className="text-center">Ajouter un client</h2>
            </div>

            <div className="flex flex-col gap-5 p-5">         

            <div className="flex justify-between">
                <h3>Nom</h3>
                <input type='text' 
                onChange={(e) =>setName(e.target.value)} value={name}
                placeholder="Entrer le nom"
                className="border w-[70%] rounded-md"
                />
            </div>   
            
            <div className="flex justify-between">
                <h3>Téléphone</h3>
                <input type='tel' 
                onChange={(e) =>setPhone(e.target.value.replace(/[^0-9]/g, ""))} value={phone}
                placeholder="Entrer le telephone"
                maxLength={10}
                className="border w-[70%] rounded-md"
                />
            </div>

            <div className="flex justify-between">
                <h3>Adresse</h3>
                <div className="flex flex-col w-[70%] border rounded-md  ">
                    <input
                        type="text"
                        value={displayAddress}
                        onChange={(e) => {setDisplayAddress(e.target.value);
                                          setStreet(e.target.value)
                                          setCity('')}}             
                        placeholder="Entrer une adresse"
                        className="font-bold"
                    />
                    {(suggestions || []).map((e, i) => ( // le || [] permet le crash si pas de retour de l'api
                    <p
                    key={i}
                    className="text-gray-500"
                    onClick={() => {
                        setDisplayAddress(e.properties.label);
                        setStreet(e.properties.name);
                        setCity(e.properties.city);
                        setSuggestions([]);
                    }}
                    >
                    
                    {e.properties.label}
                    </p>
                    ))}
                </div>
            </div>
           
            <div className="flex justify-between">
                <h3>Catégorie</h3>
                <select type='text' 
                onChange={(e) =>setCat(e.target.value)} value={cat}
                placeholder="Entrer la catégorie"
                className="border w-[70%] rounded-md">
                    <option>Prospect</option>
                    <option>Devis</option>
                    <option>Facture</option>
                    <option>Payé</option>
                </select>    
            </div>
            
            <button
            onClick={() =>clickAdd()} 
            className="btn btn-primary">Enregistrer
            </button>
        </div>
    </div>
    )
}