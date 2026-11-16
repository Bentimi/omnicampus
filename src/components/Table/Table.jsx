import { FileArchiveIcon } from "lucide-react"


const Table = ({ header=[], keys={}, tableData=[] }) => {
  // console.log(tableData)
  return (
    <div className="w-full text-left border-colapse shadow-lg dark:shadow-omni-light/20 bg-omni-light dark:bg-omni-navy/70 dark:text-omni-light rounded-lg h-full p-2">
      <table className="w-full">
        <thead>
          <tr className="tracking-wider bg-gray-200 text-gray-800 font-semibold">
            {
              header.map((col, i) => (
                <th
                 key={i}
                 >{col}</th>
              )) 
            }
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-300 bg-transparent items-center py-4">
              {
                (tableData.length > 0) ? 

                  (tableData.map((data, i) => (
                    <tr 
                    key={i}
                    className="py-5 whitespace-nowrap"
                    >
                    {
                      keys.map((keyName, index) => (
                        
                        <td key={index}>{data[keyName]}</td>
                      ))
                    }
                    </tr>
                  )))
                  
                 : <tr className="text-3xl">
                  <td colSpan={header.length} className="flex flex-col items-center justify-center"><FileArchiveIcon size={100} /> No record found</td>
                </tr>
              }
        </tbody>
      </table>
    </div>
  )
}

export default Table