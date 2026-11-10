'use client'

import { useState, useEffect } from "react"

export default function Add () {

    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [city, setCity] = useState("");
    const [cat, setCat] = useState("");

    const [suggestions, setSuggestions] = useState([]); 

    useEffect(() => {
    if (city.length < 3) {
        setSuggestions([]);
        return;
    }

    fetch(`https://api-adresse.data.gouv.fr/search/?q=${city}&type=municipality&limit=5`)
        .then(res => res.json())
        .then(data => {
            setSuggestions(data.features);
        });

}, [city]);

    const clickAdd = () => {
            fetch('https://cr-mbackend-murex.vercel.app/clients/add', {
                method:'POST',
                headers:{"content-type":"application/json"},
                body:JSON.stringify({
                    name:name,
                    phone:phone,
                    city:city,
                    cat:cat
                })
            })
            .then((res) => res.json())
            .then(()=> {
                console.log('ajout ok')
                setName('')
                setPhone('')
                setCity('')
                setCat('')
            })
        }

    return (
        <div>
            <h1>Ajout client</h1>

            <input type='text' 
            onChange={(e) =>setName(e.target.value)} value={name}
            placeholder="Entrer le nom"
            className="border w-[80%]" />

            <input type='tel' 
            onChange={(e) =>setPhone(e.target.value.replace(/[^0-9]/g, ""))} value={phone}
            placeholder="Entrer le telephone"
            maxLength={10}
            className="border w-[80%]" />


            <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Entrer une ville"
                    className="border w-[80%]"
                />
            {suggestions.map((e, i) => (
            <p
            key={i}
            onClick={() => {
                setCity(e.properties.city);
                setSuggestions([]);
            }}
            
            >
            {e.properties.city} ({e.properties.postcode})
            </p>
    ))}

            <input type='text' 
            onChange={(e) =>setCat(e.target.value)} value={cat}
            placeholder="Entrer la catégorie"
            className="border w-[80%]" />

            <button
            onClick={() =>clickAdd()} 
            className="btn btn-primary">Ajout du client</button>
        </div>
    )
}