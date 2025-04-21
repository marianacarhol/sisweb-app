type Props = {
    products : Array<{ category: string; price: number; stocked: boolean; name: string }>
}

export default function List({products}:Props) {
    return (
        <>
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
                    {products.map((product, index) => (
                        <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                {product.category}
                            </th>
                            <td className="px-6 py-4">
                                {product.price}
                            </td>
                            <td className="px-6 py-4">
                                {product.stocked ? "Yes" : "No"}
                            </td>
                            <td className="px-6 py-4">
                                {product.name}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </> 
    )
}