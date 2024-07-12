import {
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
    
  } from '@tanstack/react-table' 
  


import {  FileUp, FileDown,FileInput, Printer } from "lucide-react"

  
  import React, { useState, useEffect,useRef } from 'react'


const DashboardTab = () => {
  


      
      
      
      
      
      
      
      
       const [tableData, setTableData] = useState([]);
     

      
      
      
      
      
        useEffect(() => {
         fetch('http://localhost:3000/admin/modify').then(res=>res.json()).then(results =>{ 
        
         setTableData(results);
      console.log(results)
        })}, []);
        
      
      
      
      
      

      
      
      
      
      
      
      
   
      

      
      
    
      

        
      
      
       const columns = [
        {
          header: '#',
          accessorKey: 'id_user',
        },
        {
          header: 'First Name',
          accessorKey: 'prenom',
        },
        {
          header: 'Last Name',
          accessorKey: 'nom',
        },
        {
          header: 'Email',
          accessorKey: 'email',
        },
        {
            header: 'Diffuse',
            accessorKey: 'diffuse',
            cell: ({ cell }) =>{
        if (cell.row.original.diffuse)
            {return <FileInput className='text-green-500'/>}else {return <FileInput className='text-red-500' />}
    
          }},
        {
          header: 'Upload',
          accessorKey: 'upload',
          cell: ({ cell }) =>{
            if (cell.row.original.upload)
                {return <FileUp className='text-green-500'/>}else {return <FileUp className='text-red-500' />}
        
        }
        },
        {
          header: 'Download',
          accessorKey: 'download',
          cell: ({ cell }) => { if (cell.row.original.download)
            {return <FileDown className='text-green-500'/>}else {return <FileDown className='text-red-500' />}}
        },
        {
          header: 'Print',
          accessorKey: 'print',
          cell: ({ cell }) => { if (cell.row.original.diffuse)
            {return <Printer className='text-green-500'/>}else {return <Printer className='text-red-500' />}}
              
       
          
        },
        {
          header: 'Roles',
          accessorKey: 'roles',
          cell:  (cell) => {
        
            return (
              <p>{cell.row.original.roles === "responsable"  ? "Responsible" : cell.row.original.roles  }</p>)
          }
          
        }

      
      
      
      
      
      ];
      
      
      const [pagination, setPagination] = useState({
        pageIndex: 0, //initial page index
        pageSize: 5, //default page size
      });
      
        const [sorting, setSorting] = useState([])
        const [filtering, setFiltering] = useState('')
      
        const table = useReactTable({
          data: tableData,
          columns : columns,
          getCoreRowModel: getCoreRowModel(),
          getPaginationRowModel: getPaginationRowModel(),
          getSortedRowModel: getSortedRowModel(),
          getFilteredRowModel: getFilteredRowModel(),
            onPaginationChange: setPagination,
          state: {
            sorting: sorting,
            globalFilter: filtering,
            pagination,
          },
          onSortingChange: setSorting,
          onGlobalFilterChange: setFiltering,
        
        })
      
        return (<><h1 className="absolute bottom-[100%] text-3xl font-poppins mb-8 p-2 ">Dashboard</h1>
      <br /><br />
          <div className="relative overflow-x-auto shadow-lg sm:rounded-xl w-[80%] left-24 top-24 bg-white">
              <div className="pb-4 bg-white m-2  ">
           
              <div className="relative mt-1">
                
                  <div className="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
               
                      <svg className="w-4 h-4 text-gray-500 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                      </svg>
                  
                  </div>
             <input
             className='block pt-2 ps-10 pb-2 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500'
             type="text" id="table-search"
              value={filtering}
              onChange={e => setFiltering(e.target.value)}
             placeholder='Search'
             /> <label htmlFor="table-search" className="sr-only">Search</label>
             </div>
            
             </div>
            <table className="w-full text-sm text-left rtl:text-right  text-gray-500">
              <thead className="text-xs text-gray-700 uppercase bg-gray-200">
                {table.getHeaderGroups().map(headerGroup => (
                  <tr key={headerGroup.id}>
                    {headerGroup.headers.map(header => (
                      <th className="px-6 py-3"
                        key={header.id}
                        onClick={header.column.getToggleSortingHandler()}
                      >
                        {header.isPlaceholder ? null : (
                          <div>
                            {flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                            {
                              { asc: ' ↓', desc: ' ↑' }[
                                header.column.getIsSorted() ?? null
                              ]
                            }
                          </div>
                        )}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
      
              <tbody>
                {table.getRowModel().rows.map(row => (
                  <tr className="bg-white border-b   hover:bg-gray-50 " key={row.id}>
                    {row.getVisibleCells().map(cell => (
                      <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap" key={cell.id}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
            <div>
              <button
              className=' px-3 h-8 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700'
                disabled={!table.getCanPreviousPage()}
                onClick={() => table.previousPage()}
              >
                Previous
              </button>
              <button
              className=" px-3 h-8 ms-3 text-sm m-2 font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700"
                disabled={!table.getCanNextPage()}
                onClick={() => table.nextPage()}
              >
                Next
              </button>
         
            </div>
          </div>
          </>
        )
      }
      


 
export default DashboardTab;