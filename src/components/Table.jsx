import { ChevronsUpDown, FolderOpen, Search } from 'lucide-react';
import DataTable, { createTheme } from 'react-data-table-component';
import Spinner from './Spinner';
import { useEffect, useMemo, useState } from 'react';
import useDebounce from '../hooks/useDebounce';


createTheme(
  'customDark',
  {
    text: {
      primary: '#F9FAFB', // text-gray-50
      secondary: '#9CA3AF', // text-gray-400
    },
    background: {
      default: '#111827', // bg-gray-900
    },
    context: {
      background: '#1F2937', // bg-gray-800
      text: '#FFFFFF',
    },
    divider: {
      default: '#1F2937', // border-gray-800
    },
    button: {
      default: '#9CA3AF',
      hover: '#FFFFFF',
      focus: '#FFFFFF',
      disabled: '#4B5563',
    },
    sortFocus: {
      default: '#3B82F6',
    },
    selected: {
        background: '#1F2937', // bg-gray-800
      text: '#FFFFFF',
    }
  },
  'dark'
);


const Table = ({ columns, data, paginationTotalRows, onChangePage, onChangeRowsPerPage, progressPending, page, pageSize , searchableKey='', onSearch  }) => {

    // console.log(data)
    const [search, setSearch] = useState('');


    const [isDarkMode, setIsDarkMode] = useState(false);

    
  const debouncedSearch = useDebounce(search, 300);
  useEffect(() => {
    if (onSearch) {
        onSearch(debouncedSearch)
    }
  }, [debouncedSearch, onSearch])

  useEffect(() => {
    // Initial check
    const checkDarkMode = () => {
      setIsDarkMode(document.documentElement.classList.contains('dark'));
    };

    checkDarkMode();

    // Listen for dark mode toggle changes in Tailwind
    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    return () => observer.disconnect();
  }, []);


   const CustomNoData = () => (
  <div className="flex flex-col items-center justify-center py-10 px-4 text-center h-[50vh] w-full rounded-lg">
    <FolderOpen size={40} className="text-gray-400 dark:text-gray-600 mb-2" />
    <h3 className="text-sm font-semibold text-gray-700">No Records Found</h3>
    <p className="text-xs text-gray-400 mt-1">There are no records to display at the moment.</p>
  </div>
);

    const filteredData = useMemo(() => {
        if (!search.trim()) return data;

        return data.filter((item) => {
            if (searchableKey && item[searchableKey]) {
                return String(item[searchableKey])
                .toLowerCase()
                .includes(search.toLowerCase());
            }
            return Object.values(item).some((value) =>
            String(value).toLowerCase().includes(search.toLowerCase())
            )
        })
    }, [data, search, searchableKey])

    return (
        <div className='grid space-y-4 dark:text-omni-light'>
            <div>
            <div className='py-2 flex gap-2 items-center focus-within:ring-4 outline-gray-300/70 border-gray-300/70 focus-within:outline-omni-accent focus-within:border-omni-accent focus-within:ring-omni-accent/20 p-2 rounded-lg outline-2'>
                <label htmlFor="search">
                    <Search size={18} />
                </label>
                <input id='search' name='search' type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)} 
                className='w-full h-8 outline-0'
                placeholder='Type to search here..' />
            </div>
            </div>

            <div className="w-full rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm overflow-x-auto overflow-y-auto max-h-[400px] bg-white dark:bg-gray-900 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar]:h-1.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-thumb]:bg-gray-700">
            <DataTable 
            theme={isDarkMode? 'customDark' : 'default' }
            animateRows
            progressSkeleton
            columns={columns} 
            data={filteredData} 
            pagination
            paginationServer
            progressPending={progressPending}
            paginationTotalRows={paginationTotalRows}
            // paginationPerPage={pageSize}
            fixedHeader
            fixedHeaderScrollHeight='50vh'
            paginationRowsPerPageOptions={[5, 10, 20, 100]}
            onChangePage={onChangePage}
            onChangeRowsPerPage={onChangeRowsPerPage}
            sortable
            sortIcon={<ChevronsUpDown className='text-gray-400'/>}
            highlightOnHover
            rowsPerPageDown
            progressComponent={
                <div className='bg-black/10 inset-0 w-full h-100 flex justify-center items-center gap-2'>
                    <div className='h-6 w-6 rounded-full border-2 border-omni-navy animate-spin border-t-white'></div>
                    <h1>Fetching Data...</h1>
                </div>
            }
            responsive
            noDataComponent={<CustomNoData />}
            />
            
        </div>
        </div>
    )
}

export default Table;