import Link from "next/link";

export default function NavBar() {
    return (
        <>
            <div className="navbar bg-neutral text-neutral-content">
                <div className="navbar-start">
                    <div className="dropdown">
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                            <li><Link href="/signin/">Login</Link></li>
                            <li><a>Registered</a></li>
                        </ul>
                    </div>
                    <Link href="/" className="btn btn-ghost text-xl">Home</Link>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        <li><Link href="/signin/">Login</Link></li>
                    </ul>
                </div>
            </div></>
    );
}