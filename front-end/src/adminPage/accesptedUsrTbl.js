
    import {
        flexRender,
        getCoreRowModel,
        getFilteredRowModel,
        getPaginationRowModel,
        getSortedRowModel,
        useReactTable,
        
      } from '@tanstack/react-table' 
      


      import {
        AlertDialog,
        AlertDialogAction,
       
        AlertDialogContent,
        AlertDialogDescription,
        AlertDialogFooter,
        AlertDialogHeader,
        AlertDialogTitle,
        AlertDialogTrigger,
      } from "../ui/alert-dialog"


      
      import React, { useState, useEffect,useRef } from 'react'


      
      
      
      
      
      
      
      const AcceptedUsrTbl = () => {
      
       const [tableData, setTableData] = useState([]);
       const uploadRef= useRef([]);
       const printRef= useRef([]);
       const downloadRef= useRef([]);
       const diffuseRef= useRef([])
      const rolesRef= useRef([]);
      var roles = useRef(null);
      var diffuse = useRef(null);
      var upload = useRef(null);
      var download = useRef(null);
      var print = useRef(null);
      var e = useRef(null);
      var fr = useRef(null);
      var ls = useRef(null);
var [openn, setOpenn] = useState(0);
      
      
      
      
      
        useEffect(() => {
         fetch('http://localhost:3000/admin/modify').then(res=>res.json()).then(results =>{ 
        
         setTableData(results);
      console.log(results)
        })}, []);
        
      
      
      
      
      
        async function UpdateUser(e ,diffuse,upload,download,print,roles){
          
      const res = await fetch('http://localhost:3000/admin/update',{
        method : 'POST',
        
        headers : {
            "Content-Type" : "application/json"
        },body : JSON.stringify({
          e : e,
          diffuse :diffuse,
                 upload : upload,
                 print : print, 
                 
                 download : download,
      roles : roles
            
        })
      })
      
      }
      
      
      
      
      
      
      
   
      
    
      function handleClickk(id,r, df, up, dw, p,n,pr) {
        e.current = id
        roles.current = r;
        diffuse.current = df;
        upload.current = up;
        download.current = dw;
        print.current = p;
        fr.current = pr;
        ls.current = n
        
        // Use functional update form to ensure that the state updates are applied based on the previous state
        setOpenn(true);
      }
      
      
    
      

        
      
      
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
           
          ; return (
           
          console.log(),
            <input ref={(el) => (diffuseRef.current[cell.row.id] = el)} type="checkbox" defaultChecked={cell.row.original.diffuse} />
          )}
          },
        {
          header: 'Upload',
          accessorKey: 'upload',
          cell: ({ cell }) =>{
        console.log(cell.row.original.upload) 
        ; return (
         
       
          <input ref={(el) => (uploadRef.current[cell.row.id] = el )}  type="checkbox"   defaultChecked={cell.row.original.upload} />
          
        )
        
        }
        },
        {
          header: 'Download',
          accessorKey: 'download',
          cell: ({ cell }) => <input ref={(el) => (downloadRef.current[cell.row.id] = el)} type="checkbox" defaultChecked={cell.row.original.download} />,
        },
        {
          header: 'Print',
          accessorKey: 'print',
          cell: ({ cell }) => 
              
          <input ref={(el) => (printRef.current[cell.row.id] = el)} type="checkbox"  defaultChecked={cell.row.original.print}/>,
          
        },
        {
          header: 'Roles',
          accessorKey: 'roles',
          cell:  (cell) => {
            
      
      
          
       
            return (
              <select defaultValue={cell.row.original.roles}  ref={(el) => (rolesRef.current[cell.row.id] = el)}  className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-max p-1.5'>
                <option value="admin">Admin</option>
                <option value="user">User</option>
                <option value="responsable">Responsable</option>
              </select>
            );
          }
          
        },
      {header: 'Update',
        accessorKey: 'add',
        cell:  (cell) => {
      
      
          function handleClick () {
           

            UpdateUser(e.current,diffuse.current,upload.current,download.current,print.current,roles.current)
          window.location.reload();
             }
          
             
        return(
    

< div>
<button onClick={ ()=> { handleClickk(cell.row.original.id_user,rolesRef.current[cell.row.id].value,diffuseRef.current[cell.row.id].checked,uploadRef.current[cell.row.id].checked,downloadRef.current[cell.row.id].checked,printRef.current[cell.row.id].checked,cell.row.original.nom,cell.row.original.prenom) ;setOpenn(true)} }>Update</button>
<br />
<br />
<AlertDialog  open = {openn}>
 
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
      <AlertDialogDescription>
        Do you want to set <span className='text-red-500'>{fr.current }  {ls.current}</span>'s role to : <span className='text-red-500'>{roles.current}</span> and set its permissions to 'download : <span className='text-red-500'>{download.current ? 'true' : 'false'}</span> and print : <span className='text-red-500'>{print.current ? 'true' : 'false'}</span> and upload : <span className='text-red-500'>{upload.current ? 'true' : 'false'}</span> and diffuse : <span className='text-red-500'>{diffuse.current ? 'true' : 'false'}</span>'  ?
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <button onClick={() => setOpenn(false)}>Cancel</button>
      <AlertDialogAction><button onClick={() =>{handleClick();setOpenn(false)}}>Confirm</button> </AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>


</div>

      )
      
      
      }
      },{
header: "Bloque",
cell:({cell})=>{
  return(
    <button className='text-red-500 relative bottom-[10px] '>Bloque</button>
  )
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
      
        return (
          <>  <h1 className="text-3xl font-poppins mb-4 p-2 "> Modify Employee's Account</h1>
          <div className="relative overflow-x-auto shadow-lg sm:rounded-xl w-[100%] left-4 top-4">
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
      

 
export default AcceptedUsrTbl;