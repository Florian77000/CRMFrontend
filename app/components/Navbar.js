import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse, faUserGroup, faCalendarDays, faFileLines, faList } from '@fortawesome/free-solid-svg-icons'

export default function Navbar() {

    const icon = [
        {logo:faHouse, href:'/'},
        {logo:faUserGroup, href:'/clients'},
        {logo:faCalendarDays, href:'/'},
        {logo:faFileLines, href:'/'},
        {logo:faList, href:'/'},
    ]
        
    return (
        <nav className='h-[7vh] bg-white fixed bottom-0 left-0 w-full flex justify-around items-center shadow-2xl border-t-2 border-gray-200'>
            {icon.map((e,i) => (
                <Link key={i} href={e.href}>
                <FontAwesomeIcon className='w-8 h-8 text-(--primaire)' icon={e.logo} />
                </Link>
            ))}
        </nav>
    )
}


