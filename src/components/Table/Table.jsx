import { FileArchiveIcon } from "lucide-react"


const Table = ({ header=[], keys={}, tableData=[] }) => {
  // console.log(tableData)
  return (
    <div>
      <table>
        <thead>
          <tr>(
            {
              header.map((col, i) => (
                <th key={i}>{col}</th>
              )) 
            }
          </tr>
        </thead>
        <tbody>
              {
                (tableData.length > 0) ? 

                  (tableData.map((data, i) => (
                    <tr key={i}>
                    {
                      keys.map((keyName, index) => (
                        
                        <td key={index}>{data[keyName]}</td>
                      ))
                    }
                    </tr>
                  )))
                  
                 : <tr>
                  <td colSpan={header.length}><FileArchiveIcon /></td>
                </tr>
              }
        </tbody>
      </table>
    </div>
  )
}

export default Table