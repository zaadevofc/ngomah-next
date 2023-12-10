import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { TbHistory, TbHome, TbMessageCircle, TbStar } from 'react-icons/tb';

let list = [
    { title: 'Beranda', icon: TbHome, class: 'nav-bottom-l-active', href: '/_' },
    { title: 'Pesan', icon: TbMessageCircle, class: 'nav-bottom-active', href: '/_/pesan' },
    { title: 'Riwayat', icon: TbHistory, class: 'nav-bottom-active', href: '/_/riwayat' },
    { title: 'Favorit', icon: TbStar, class: 'nav-bottom-r-active', href: '/_/favorit' },
]

const BottomBar = () => {
    const pathname = usePathname();
    return (
        <>
            <div className="btm-nav z-[999] rounded-t-3xl drop-shadow-md default-border sm:max-w-sm flex mx-auto">
                {list.map((x) => (
                    <Link href={x.href} className={`${x.href == pathname && x.class} duration-300`}>
                        <x.icon className='text-2xl text-green-600 fill-green-500/50' />
                        <p className="text-[10px]">{x.title}</p>
                    </Link>
                ))}
            </div>
        </>
    )
}

export default BottomBar