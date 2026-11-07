import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser,faCalendarDays, faClock ,faTriangleExclamation } from '@fortawesome/free-solid-svg-icons'

export default function Home() {

  const link = [
    {name:'Nouveaux prospects',color:'bg-blue-100',  logo:faUser, colorLogo:'text-blue-500'},
    {name:'RDV aujourd\'hui',color:'bg-green-100', logo:faCalendarDays, colorLogo:'text-green-500'},
    {name:'Devis en attente',color:'bg-yellow-100', logo:faClock, colorLogo:'text-yellow-500'},
    {name:'Facture en retard',color:'bg-red-100', logo:faTriangleExclamation, colorLogo:'text-red-500'},
  ]

  return (
    
        <>
        <div className="bg-gray-100/50">
          <h1 className="font-bold">Bonjour Thomas👋</h1>
          <p className="opacity-80">Mercredi 16 octobre 2026</p>
        </div>

        <div>
          <button className="btn btn-danger">Mon assistant virtuel</button>
        </div>

        <div>
          <div className="grid grid-cols-2 grid-rows-2 gap-5 w-full aspect-square">
            {link.map((e,i) => (
                <div key={i} className={`${e.color} rounded-xl flex flex-col justify-center gap-5`}>
                  <div className='flex items-center justify-center w-14 h-14 rounded-full p-2 bg-gray-100'>
                    <FontAwesomeIcon icon={e.logo} className={`${e.colorLogo}`}/>
                  </div>
                  <p>3</p>
                  <p>{e.name}</p>
                </div>
            ))}   
          </div>
        </div>

        <div>
          <button className="btn btn-primary">Voir ma journée →</button>
        </div>
          </>
    
  );
}
