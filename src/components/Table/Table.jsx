import { Search, FolderOpen } from "lucide-react"
import Spinner from "../Spinner"


const Table = ({ header=[], keys={}, tableData=[], loading }) => {
  // console.log(header.length)
  return (
    <div className="w-full text-left border-colapse bg-omni-light dark:bg-omni-navy/70 dark:text-omni-light rounded-lg h-full p-2">
      <table className="w-full">
        <thead>
          <tr className="tracking-wider border border-gray-300 dark:border-gray-800 divide-x divide-gray-300 dark:divide-gray-800 font-semibold h-14">
            {
              header.map((col, i) => (
                <th
                 key={i}
                 className="text-left p-3"
                 >{col}</th>
              )) 
            }
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-300 dark:divide-gray-800  bg-transparent items-center py-4 border border-gray-300 dark:border-gray-800 ">
              {
                loading ? <tr className="text-xl">
                  <td colSpan={header.length} className="">
                    <div className="flex flex-col justify-center items-center w-full min-h-[30vh] lg:min-h-[45vh]">
                      <Spinner />
                      <span>fetching data...</span>
                    </div>
                  </td>
                </tr> :
                (tableData.length > 0) ? 

                  (tableData.map((data, i) => (
                    <tr 
                    key={i}
                    className="py-5 whitespace-nowrap h-14 items-center"
                    >
                    {
                      keys.map((keyName, index) => (
                        
                        <td key={index} className="p-3 text-left">{data[keyName]}</td>
                      ))
                    }
                    </tr>
                  )))
                  
                 : <tr>
                  <td colSpan={header.length} className="">
                    <div className="flex flex-col justify-center items-center w-full min-h-[30vh] lg:min-h-[45vh]">
                      <FolderOpen size={100} /> 
                      <p className="text-lg flex items-center  gap-2 justify-center"> No record found</p>
                    </div>
                  </td>
                </tr>
              }
        </tbody>
      </table>
    </div>
  )
}

export default Table