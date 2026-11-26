'use client'

import { useState, useEffect } from "react"

export default function Add () {

    const [name, setName] = useState("");
    const [lastname, setLastname] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [displayAddress, setDisplayAddress] = useState("");
    const [street, setStreet] = useState("");
    const [city, setCity] = useState("");
    const [postCode, setPostCode] = useState("");
    const [cat, setCat] = useState("Prospect");
    const [type, setType] = useState("Particulier");
    const [home, setHome] = useState("Maison individuelle");

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
                    lastname:lastname,
                    phone:phone,
                    email:email,
                    address:{
                        street : street,
                        city : city,
                        postCode : postCode,
                    },
                    cat:cat,
                    type:type,
                    home:home,
                })
            })
            .then((res) => res.json())
            .then(()=> {
                setName('');
                setLastname('');
                setPhone('');
                setEmail('');
                setDisplayAddress('')
                setStreet('');
                setCity('');
                setPostCode('');
                setCat('Prospect')
                setType('Particulier');
                setHome("Maison individuelle");
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
                <h3>Prénom</h3>
                <input type='text' 
                onChange={(e) =>setLastname(e.target.value)} value={lastname}
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
                <h3>Email</h3>
                <input type='email' 
                onChange={(e) =>setEmail(e.target.value)} value={email}
                placeholder="Entrer l'email"
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
                                          setCity('')
                                          setPostCode('')}}             
                        placeholder="Entrer une adresse"
                        className="font-bold"
                    />
                    {(suggestions || []).map((e, i) => ( // le || [] permet d'éviter le crash si pas de retour de l'api
                    <p
                    key={i}
                    className="text-gray-500"
                    onClick={() => {
                        setDisplayAddress(e.properties.label);
                        setStreet(e.properties.name);
                        setCity(e.properties.city);
                        setPostCode(e.properties.postcode);
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

            <div className="flex justify-between">
                <h3>Type de client</h3>
                <select type='text' 
                onChange={(e) =>setType(e.target.value)} value={type}
                placeholder="Entrer la catégorie"
                className="border w-[70%] rounded-md">
                    <option>Particulier</option>
                    <option>Professionnel</option>
                    <option>Autre</option>
                </select>    
            </div>

            <div className="flex justify-between">
                <h3>Installation</h3>
                <select type='text' 
                onChange={(e) =>setHome(e.target.value)} value={home}
                placeholder="Entrer la catégorie"
                className="border w-[70%] rounded-md">
                    <option>Maison individuelle</option>
                    <option>Appartement</option>
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