import { Search as SearchIcon } from "lucide-react";

interface SearchProps {
    size?: number;
    className?: string;
}

export default function Search({ size = 24, className }: SearchProps) {
    return (
        <div className="flex justify-center items-center">
            <SearchIcon size={size} className={className} style={{display: "cursor"}}  />
        </div>
    )
}