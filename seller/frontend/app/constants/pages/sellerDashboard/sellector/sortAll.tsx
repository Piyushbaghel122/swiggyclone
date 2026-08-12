
export default function SortAll(){
    return (
        <button className="flex items-center gap-1.5 border border-[#EFEBE4] rounded-full px-4 py-1.5 text-sm font-medium text-gray-700 hover:shadow-md transition-shadow bg-white whitespace-nowrap">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="4" x2="20" y1="6" y2="6"/>
                <line x1="4" x2="14" y1="12" y2="12"/>
                <line x1="4" x2="8" y1="18" y2="18"/>
            </svg>
            Sort
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5">
                <path d="m6 9 6 6 6-6"/>
            </svg>
        </button>
    )
}