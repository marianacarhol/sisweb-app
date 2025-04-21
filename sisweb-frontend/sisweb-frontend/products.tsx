export default function ListProducts() {
    let products: Array<{ category: string; price: number; stocked: boolean; name: string }> = [
        { category: "Frutas", price: 1, stocked: true, name: "Manzana" },
        { category: "Frutas", price: 1, stocked: true, name: "Fruta del dragón" },
        { category: "Frutas", price: 2, stocked: false, name: "Maracuyá" },
        { category: "Verduras", price: 2, stocked: true, name: "Espinaca" },
        { category: "Verduras", price: 4, stocked: false, name: "Calabaza" },
        { category: "Verduras", price: 1, stocked: true, name: "Guisantes" }
    ]


    return (
        <>
            <div className="flex flex-col gap-4 my-4">
                <h1 className="text-3xl font-bold text-gray-800 text-left">Lista de productos</h1>
                <div className="h-4"></div>

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

                <div className="flex justify-end items-center">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Add product
                    </button>
                </div>
            </div>
            <div className="relative overflow-x-auto">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Category
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Price
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Stocked
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Name
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                       <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                  <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    Apple MacBook Pro 17"
                  </th>
                  <td className="px-6 py-4">
                    Silver
                  </td>
                  <td className="px-6 py-4">
                    Laptop
                  </td>
                  <td className="px-6 py-4">
                    $2999
                  </td>
                </tr>
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                  <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    Microsoft Surface Pro
                  </th>
                  <td className="px-6 py-4">
                    White
                  </td>
                  <td className="px-6 py-4">
                    Laptop PC
                  </td>
                  <td className="px-6 py-4">
                    $1999
                  </td>
                </tr>
                <tr className="bg-white border-b dark:bg-gray-800">
                  <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    Magic Mouse 2
                  </th>
                  <td className="px-6 py-4">
                    Black
                  </td>
                  <td className="px-6 py-4">
                    Accessories
                  </td>
                  <td className="px-6 py-4">
                    $99
                  </td>
                </tr> 
                    </tbody>
                </table>
            </div>
        </>
    )
}