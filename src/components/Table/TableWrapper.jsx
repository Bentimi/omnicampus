import { ChevronFirst, ChevronLast, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react"
import Table from "./Table"
import { useMemo, useState } from "react"


const TableWrapper = ({ header=[], keys=[], tableData=[], loading }) => {

  // console.log(tableData.map(item => item.status));
  const [isSearchTerm, setIsSearchTerm] = useState('');
  const [isPage, setIsPage] = useState(1);
  const [isPageSize, setIsPageSize] = useState(10);
  const [statusFilter, setStatusFilter] = useState('all');


  const filteredData = useMemo(() => {
    return tableData.filter(item => {
      const matchStatus = statusFilter === 'all' || (statusFilter === 'active' && Boolean(item.isActive)) || (statusFilter === 'inactive' && !Boolean(item.isActive));

      const matchSearch = !isSearchTerm.trim().toLowerCase() || keys.some((key) => String(item[key] ?? "")
      .toLowerCase()
      .includes(isSearchTerm.toLowerCase()));

      return matchSearch && matchStatus;
    });

  })
  
  const handlePageSizeChange = (e) => {
    setIsPageSize(Number(e.target.value));
    setIsPage(1);
  }

  const handleSearchChange = (e) => {
    setIsSearchTerm(e.target.value);
    setIsPage(1);
  }

  const handleStatusChange = (e) => {
    setStatusFilter(e.target.value);
    setIsPage(1);
  }

  const totalPages = Math.max(1, Math.ceil(filteredData.length / isPageSize));
  const safePage = Math.min(isPage, totalPages);
  const startIndex = (safePage - 1) * isPageSize;
  const endIndex = startIndex + isPageSize;
  const paginatedData = filteredData.slice(startIndex, endIndex);

  const getCompactPages = (currentPage, totalPages, windowSize = 3) => {
  if (totalPages <= windowSize + 1) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  // Keep a window of `windowSize` pages, then `...` and the last page
  const maxStart = Math.max(1, totalPages - windowSize);
  const start = Math.min(Math.max(1, currentPage - 1), maxStart);
  const end = Math.min(start + windowSize - 1, totalPages);

  const pages = [];
  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  if (end < totalPages - 1) {
    pages.push("...");
  }

  if (end < totalPages) {
    pages.push(totalPages);
  }

  return pages;
};

  return (
    <>
      <div className="p-4 shadow-2xl bg-transparent dark:shadow-omni-light/10 rounded-xl dark:border dark:border-omni-light my-5">
        <div className="flex justify-between py-4">
          <div>
            <select 
            onChange={handlePageSizeChange}
            value={isPageSize} name="" id="" className="border p-1 outline-none rounded-md focus:outline-none focus:ring-1 focus:ring-black focus:border-black focus-within:border-black cursor-pointer dark:border-omni-light dark:text-omni-light dark:focus:ring-omni-light">
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </select>
          </div>

        <div className="flex gap-2">
          <div>
            <select 
            onChange={handleStatusChange}
            value={statusFilter} name="" id="" className="border p-1 outline-none rounded-md focus:outline-none focus:ring-1 focus:ring-black focus:border-black focus-within:border-black cursor-pointer dark:border-omni-light dark:text-omni-light dark:focus:ring-omni-light">
              <option value="all">All</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>

          <div>
            <input 
            value={isSearchTerm}
            onChange={handleSearchChange}
            type="search" name="" id="" placeholder="Search here..." className="border p-1 outline-none rounded-md focus:outline-none focus:ring-1 focus:ring-black focus:border-black focus-within:border-black dark:border-omni-light dark:text-omni-light dark:focus:ring-omni-light dark:focus-within:border-omni-light"/>
          </div>
        </div>
        </div>
       <div className="overflow-x-auto w-full">
         <Table header={header} keys={keys} tableData={paginatedData} loading={loading} />
       </div>

       <section>
        <div className='flex justify-between items-center py-4'>
          <div className="dark:text-gray-200">
          Showing{" "}
            <span className="font-medium text-gray-900 dark:text-gray-100">
              {filteredData.length === 0 ? 0 : startIndex + 1}
            </span>{" "}
          to{" "}
            <span className="font-medium text-gray-900 dark:text-gray-100">
              {Math.min(startIndex + isPageSize, filteredData.length)}
            </span>{" "}
          of <span className="font-medium text-gray-900 dark:text-gray-100">{filteredData.length}</span>{" "}
          entries
        </div>
          <div>
            <ul className="flex gap-2 items-center">
              <li className="dark:text-gray-200 cursor-pointer">
                 <button
            onClick={() => setIsPage((p) => Math.max(1, p - 1))}
            disabled={safePage === 1}
            className="p-1.5 rounded-md hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed"
            aria-label="Previous page"
          >
              Previous
          </button></li>

              <li className="dark:text-gray-200">
                <button
            onClick={() => setIsPage((p) => Math.max(1, p - 1))}
            disabled={safePage === 1}
            className="p-1.5 rounded-md border border-gray-300 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed"
            aria-label="Previous page"
          >
            <ChevronLeft size={16} />
          </button>
              </li>
              <li className="dark:text-gray-200 flex gap-1">
                {getCompactPages(safePage, totalPages, 2).map((item, idx) =>
            item === "..." ? (
              <span key={`dots-${idx}`} className="px-2 py-1 text-gray-400 select-none">
                ...
              </span>
            ) : (
              <button
                key={item}
                type="button"
                onClick={() => setIsPage(item)}
                className={`w-8 h-8 rounded-md font-semibold text-sm ${
                  safePage === item
                    ? "bg-amber-500 text-white"
                    : "bg-transparent0 text-gray-400 hover:bg-transparent"
                }`}
              >
            {item}
          </button>
  )
)}
              </li>
              <li className="dark:text-gray-200">

                <button
            onClick={() => setIsPage((p) => Math.min(totalPages, p + 1))}
            disabled={safePage === totalPages || filteredData.length === 0}
            className="p-1.5 rounded-md border border-gray-300 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed"
            aria-label="Next page"
          >
            <ChevronRight size={16} />
          </button>
              </li>
              <li className="dark:text-gray-200 cursor-pointer">
                <button
            onClick={() => setIsPage((p) => Math.min(totalPages, p + 1))}
            disabled={safePage === totalPages || filteredData.length === 0}
            className="p-1.5 rounded-md border-gray-300 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed"
            aria-label="Next page"
          >
                Next
          </button>
                </li>
            </ul>
          </div>
        </div>
       </section>
      </div>
    </>
  )
}

export default TableWrapper