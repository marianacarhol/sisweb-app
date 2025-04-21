export default function Filter() {
    return (
        <>
            <div className="flex justify-start items-center gap-3">
                <label className="text-gray-700 text-lg font-bold">Filtros</label>
                <input
                    type="text"
                    placeholder="Search product..."
                    className="px-3 py-2 border border-gray-300 rounded w-1/2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <select
                    className="px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="" disabled>Select an option</option>
                    <option key={1} value="All">All</option>
                    <option key={2} value="Verduras">Verduras</option>
                    <option key={3} value="Frutas">Frutas</option>
                </select>
            </div>
        </> 
    )
}