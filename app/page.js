import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser,faCalendarDays, faClock ,faTriangleExclamation } from '@fortawesome/free-solid-svg-icons'

export default function Home() {

  const link = [
    {name:'Nouveaux prospects',color:'bg-blue-100',  logo:faUser, colorLogo:'text-blue-500', bgColor:'bg-blue-50'},
    {name:'RDV aujourd\'hui',color:'bg-green-100', logo:faCalendarDays, colorLogo:'text-green-500', bgColor:'bg-green-50'},
    {name:'Devis en attente',color:'bg-yellow-100', logo:faClock, colorLogo:'text-yellow-500', bgColor:'bg-yellow-50'},
    {name:'Facture en retard',color:'bg-red-100', logo:faTriangleExclamation, colorLogo:'text-red-500', bgColor:'bg-red-50'},
  ]

  return (
    <div className='flex flex-col h-full'>

      <div className="bg-gray-100/50">
        <h1 className="font-bold">Bonjour Thomas👋</h1>
        <p className="opacity-80">Mercredi 16 octobre 2026</p>
      </div>
      
      <div className='h-full flex flex-col justify-around px-5'>
        <div>
          <button className="btn btn-danger">Mon assistant virtuel</button>
        </div>

        <div>
          <div className="grid grid-cols-2 grid-rows-2 gap-5 w-full aspect-square">
            {link.map((e,i) => (
                <div key={i} className={`${e.color} rounded-xl flex flex-col justify-center p-5 gap-5`}>
                  <div className={`flex items-center justify-center w-14 h-14 rounded-full p-2 ${e.bgColor}`}>
                    <FontAwesomeIcon icon={e.logo} className={`${e.colorLogo}`}/>
                  </div>
                  <p>3</p>
                  <p>{e.name}</p>
                </div>
            ))}   
          </div>
        </div>

        <div className='mb-5'>
          <button className="btn btn-primary">Voir ma journée →</button>
        </div>
      </div>

    </div>
    
  );
}
