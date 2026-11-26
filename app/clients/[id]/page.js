'use client'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPhone, faLocationDot, faEnvelope } from '@fortawesome/free-solid-svg-icons'

import {useState, useEffect} from "react";
import { useParams, useRouter } from "next/navigation";
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

export default function ClientId () {

     const { id } = useParams();
     const router = useRouter();
     const [client, setClient] = useState(null);
     const [tab, setTab] = useState('infos')

     const formatDate = (date) => {
        return format(new Date(date), 'd/MM/yyyy', {
        locale: fr
    });};

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
                <h1 className="title">Fiche client</h1>
            </div>
            <div className='p-5 flex flex-col h-screen gap-10'>
                <p className="s_title">{client.lastname.charAt(0).toUpperCase() + client.lastname.slice(1)} {client.name.charAt(0).toUpperCase() + client.name.slice(1)}</p>  
               
               {/* coordonnées clients */}
                <div className='flex flex-col gap-2'>
                    <div className='flex gap-2'>
                    <div >
                        <FontAwesomeIcon icon={faLocationDot} />  
                    </div>
                    <div>
                        <p>{client.address.street}</p>
                        <p>{client.address.postCode} {client.address.city}</p>
                    </div>
                    </div>
                    <div className='flex gap-2'>
                        <div >
                            <FontAwesomeIcon icon={faPhone} />   
                        </div>
                        <div>
                            <p> {client.phone.replace(/(\d{2})(?=\d)/g, '$1 ')}</p>
                        </div>
                    </div>
                    <div className='flex gap-2'>
                        <div >
                            <FontAwesomeIcon icon={faEnvelope} />   
                        </div>
                        <div>
                            <p>{client.email}</p>
                        </div>
                    </div>
                    <div className='flex justify-between'>
                        <button className='btn btn-primary !p-1 !w-30'>Appeler</button>
                        <button className='btn btn-primary !p-1 !w-30'>Email</button>
                        <button className='btn btn-primary !p-1 !w-30'>Ajout photo</button>
                    </div>
                </div> {/* end coordonnées clients */}

                <div className='flex flex-col gap-2'>
                    <div className='flex justify-between font-semibold '>
                        <button onClick={() => setTab('infos')}
                                className={tab === 'infos' ? 'text-[#5b9aff] underline duration-400' : 'text-black'}>Infos
                        </button>
                        <button onClick={() => setTab('historique')}
                                className={tab === 'historique' ? 'text-[#5b9aff] underline duration-400' : 'text-black'}>Historique
                        </button>
                        <button onClick={() => setTab('devis')}
                                className={tab === 'devis' ? 'text-[#5b9aff] underline duration-400' : 'text-black'}>Devis
                        </button>
                        <button onClick={() => setTab('facture')}
                                className={tab === 'facture' ? 'text-[#5b9aff] underline duration-400' : 'text-black'}>Facture</button>
                    </div>
   
                    {tab === 'infos' && (
                    <div className='flex flex-col gap-2'>
                        <h2 className='title2'>Informations générales</h2>

                        <div className='flex'>
                            <div className='flex-1 flex flex-col gap-2 text-gray-400'>
                                <p>Type de client</p>
                                <p>Installation</p>
                                <p>Date de l'inscription</p>
                            </div>

                            <div className='flex-1 flex flex-col gap-2'>
                                <p>{client.type}</p>
                                <p>{client.home}</p>
                                <p>{formatDate(client.date)}</p>
                            </div>
                        </div>
                    </div>
                    )}

                    {tab === 'historique' && (
                        <div>
                            <h2 className='title2 '>Historique du client</h2>
                            <p>Affichage des interventions et événements...</p>
                        </div>
                    )}

                    {tab === 'devis' && (
                        <div>
                            <h2 className='title2'>Devis du client</h2>
                            <p>Affichage des devis...</p>
                        </div>
                    )}

                    {tab === 'facture' && (
                        <div>
                            <h2 className='title2'>Factures du client</h2>
                            <p>Affichage des factures...</p>
                        </div>
                    )}   
                </div>
                    <button className='btn btn-danger !h-20' onClick={() => deleteClient()}>Supprimer ce client</button>
            </div>
            
        </div>

        
    )
}