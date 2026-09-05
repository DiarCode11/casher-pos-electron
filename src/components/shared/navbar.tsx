import { ReactNode } from "react"

type NavbarProps = {
    children?: ReactNode
}

export default function Navbar({ children }: NavbarProps){
    return (
        <div className="h-20 bg-white border-b border-b-slate-200 flex items-center">
            {children}
        </div>
    )
}