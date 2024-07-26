import { Link } from "react-router-dom";

function Button({children, disabled, to, type, onClick}){

    const base = "text-sm bg-yellow-400 font-semibold uppercase tracking-wide rounded-full inline-block hover:bg-yellow-300 text-stone-800 transition-colors duration-300 focus:outline-none focus:ring focus:bg-yellow-300 focus:ring-offset-2 focus:ring-yellow-300 disabled:cursor-not-allowed";

    const styles = {
        primary: base + " md:px-6 md:py-3 px-4 py-3",
        small: base + " text-xs px-4 py-2 md:px-5 md:py-2.5" ,
        round: base + " text-sm px-2.5 py-1 md:px-3.5 md:py-1.5" ,
        secondary: "text-sm font-semibold uppercase tracking-wide rounded-full inline-block hover:bg-stone-300 hover:text-stone-800 text-stone-400 transition-colors duration-300 focus:outline-none focus:ring focus:bg-stone-300 focus:ring-offset-2 focus:ring-stone-200 disabled:cursor-not-allowed md:px-5 md:py-3.5 px-2.5 py-2.5 border-stone-300 border-2"
    }

    if(onClick) return (
                    <button disabled={disabled} className={styles[type]} onClick={onClick}>
                        {children}
                    </button>)

    if(to) return (<Link className={styles[type]} to={to}> {children} </Link>)

    return (
        <button disabled={disabled} className={styles[type]}>
            {children}
        </button>
)
}

export default Button ;