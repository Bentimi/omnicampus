import { FileArchiveIcon, Folder } from "lucide-react"
import Spinner from "../Spinner"


const Table = ({ header=[], keys={}, tableData=[], loading }) => {
  // console.log(header.length)
  return (
    <div className="w-full text-left border-colapse shadow-lg dark:shadow-omni-light/20 bg-omni-light dark:bg-omni-navy/70 dark:text-omni-light rounded-lg h-full p-2">
      <table className="w-full">
        <thead>
          <tr className="tracking-wider bg-gray-200 text-gray-800 font-semibold h-14">
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
                loading ? <tr className="text-xl">
                  <td colSpan={header.length} className="">
                    <div className="flex flex-col justify-center items-center w-full min-h-[35vh]">
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
                        
                        <td key={index}>{data[keyName]}</td>
                      ))
                    }
                    </tr>
                  )))
                  
                 : <tr className="text-3xl">
                  <td colSpan={header.length} className="">
                    <div className="flex flex-col justify-center items-center w-full min-h-[35vh]">
                      <Folder size={100} /> 
                      <span>No record found</span>
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