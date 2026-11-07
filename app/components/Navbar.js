import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse, faUserGroup, faCalendarDays, faFileLines, faList } from '@fortawesome/free-solid-svg-icons'

export default function Navbar() {

    const icon = [
        {logo:faHouse, href:'/'},
        {logo:faUserGroup, href:'/client'},
        {logo:faCalendarDays, href:'/'},
        {logo:faFileLines, href:'/'},
        {logo:faList, href:'/'},
    ]
        
    return (
        <nav className='h-[10vh] fixed bottom-0 left-0 w-full flex justify-around items-center shadow-2xl'>
            {icon.map((e,i) => (
                <Link key={i} href={e.href}>
                <FontAwesomeIcon className='w-10 h-10 text-(--primaire)' icon={e.logo} />
                </Link>
            ))}
        </nav>
    )
}


