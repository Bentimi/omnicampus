import Table from "./Table"


const TableWrapper = ({ header=[], keys=[], tableData=[] }) => {
  return (
    <>
      <div className="p-4">
        <div className="flex justify-between py-4">
          <div>
            <select name="" id="" className="border-1 p-1 outline-none rounded-md focus:outline-none focus:ring-1 focus:ring-black focus:border-black focus-within:border-black cursor-pointer dark:border-omni-light dark:text-omni-light dark:focus:ring-omni-light dark:border-omni-light dark:focus-within:border-omni-light">
              <option value="">5</option>
              <option value="">10</option>
              <option value="">25</option>
              <option value="">50</option>
              <option value="">100</option>
            </select>
          </div>
          <div>
            <input type="search" name="" id="" placeholder="Search here..." className="border-1 p-1 outline-none rounded-md focus:outline-none focus:ring-1 focus:ring-black focus:border-black focus-within:border-black dark:border-omni-light dark:text-omni-light dark:focus:ring-omni-light dark:border-omni-light dark:focus-within:border-omni-light"/>
          </div>
        </div>
       <div className="overflow-x-auto w-full">
         <Table header={header} keys={keys} tableData={tableData} />
       </div>
      </div>
    </>
  )
}

export default TableWrapper