import { Link } from "react-router-dom"
export default function NotFoundPage() {
    return (
        <div
            className="flex flex-col background-not-found-image items-center"
        >
            <button className="mt-[58vh] rounded-md bg-gray-200 mr-5 px-2">
                {/* 
                    className="
                    text-white 
                    font-extrabold 
                    text-4xl 
                    border 
                    border-gray-500 
                    rounded-md 
                    p-2 
                    shadow-md 
                    shadow-gray-300 
                    hover:shadow-lg" 
                    */}
                <Link
                    to="/"
                >
                    <p
                        className="
                        text-white 
                        font-extrabold 
                        text-3xl
                        text-shadow
                        "
                    >
                        Voltar
                    </p>
                </Link>
            </button>
        </div>
    )
}