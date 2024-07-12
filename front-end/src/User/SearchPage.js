
import {
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
    
  } from '@tanstack/react-table' 
  
  
  import React, { useState, useEffect,useRef } from 'react'
  
  import {
    Command,
    CommandEmpty,
  
    CommandInput,
    CommandItem,
    CommandList,
  
  } from "../ui/command"
  import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "../ui/popover"

  import { Check, ChevronsUpDown,Download } from "lucide-react"
  import { cn } from "../ui/utils"
  import { Button } from "../ui/button"
  import { Document, Page } from 'react-pdf'
  import { pdfjs } from 'react-pdf';
  import { Eye } from 'lucide-react';
  import 'react-pdf/dist/Page/AnnotationLayer.css';
  import 'react-pdf/dist/Page/TextLayer.css';
  pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    'pdfjs-dist/build/pdf.worker.min.js',
    import.meta.url,
  ).toString();

const SearchPage = () => {





    const [open, setOpen] = React.useState(false)

    const [tableData, setTableData] = useState([]);
    const [value, setValue] = React.useState("")
   
   const docNameRef = useRef(null);
   const keyWordRef = useRef(null);

   
   
   
   
   const [nofile, setnofile] = useState(false)

   async function diffuse(nom_doc,usrArr) {
   

    const response = await fetch('http://localhost:3000/diffuser', {
           method: 'POST',credentials : "include",
           headers: {
               'Content-Type': 'application/json'
           },
           body: JSON.stringify({
               nom_doc: nom_doc,
               target : usrArr
           })
       });
       console.log(usrArr)
   }

   async function search(docName,type,keywords) {
    const searchParams = {
       nom_doc: docName,
       type: type,
       keywords: keywords
    };
console.log(searchParams)
    await fetch('http://localhost:3000/search/post', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(searchParams)
    });

    try {
      const response = await fetch('http://localhost:3000/search/get', {
        method: 'GET'
    });
  
    const result = await response.json();
  if(result.length == 0){
    setnofile(true)
  }else{setnofile(false)}
  console.log(result)
      setTableData(result)
     
     
    

        
    } catch (error) {
        console.error('Error:', error);
    }
  }

    

      
      


   
   
  const [pdfUrl, setPdfUrl] = useState('');
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const onDocumentLoadSuccess = ({ numPages }) => {
   setNumPages(numPages);
 };

 const fetchPdfUrl = async (doc,docName) => {
   try {
     console.log(`http://localhost:3000/pdfs${doc}`);

     const response = await fetch(`http://localhost:3000/pdfs${doc}`,{ContentType:'application/pdf',method:'GET',credentials : "include" });

     if (!response.ok) {
       throw new Error(`Failed to fetch PDF for document: ${doc}`);
     }

     const pdfBlob = await response.blob();
console.log(pdfBlob);
     if (pdfBlob.type !== 'application/pdf') {
       throw new Error('Downloaded content is not a PDF');
     }



     const pdfUrl = URL.createObjectURL(pdfBlob);

     setPdfUrl(pdfUrl);


     setIsOpen(true);

     const res = await fetch(`http://localhost:3000/doc/open/${docName}`, {
       method: 'POST',
       credentials: 'include',
     })
   } catch (error) {
     console.error('Error fetching PDF:', error);
   
   }
 };
 function filterBycheck(item) {
  if (item.checked) {
return item.value
  }
}


    
   function setupuser(item) {

      return {value: item.id_user, label: item.nom + " " + item.prenom};
    }
    
    
      React.useEffect(() => {
        fetch('http://localhost:3000/list_user', {credentials : "include"}).then(res => res.json()).then(valid => {
    
    console.log(valid)
    const fetched = valid.map(setupuser)
    setUsers(fetched)
      })}, []);


 function handleCheckboxChange(nom_doc){
   
  
   
  
  const nA = checkRef.current.filter(filterBycheck); 

  const newArray2 = nA.map((element, index) => ({
    id: element.value, 
    download: (downloadRef.current.filter(filterBycheck)[index] == null? false : true ), 
    upload: (uploadRef.current.filter(filterBycheck)[index]  == null? false : true ),
    print: (printRef.current.filter(filterBycheck)[index]  == null? false : true),
    comment : commentRef.current[element.value].value
  }));
console.log(newArray2)
 setUsrArr(newArray2);
 
 diffuse(nom_doc,newArray2);
  setOpenUsr(false);


};
const diffuseRef = React.useRef([])
const checkRef = React.useRef([])
const uploadRef = React.useRef([])
const downloadRef = React.useRef([])
const printRef = React.useRef([])
const commentRef = React.useRef([])
const [openUsr, setOpenUsr] = React.useState(false)
const [usrArr, setUsrArr] = React.useState([])
const [users, setUsers] = React.useState([])

async function downloaddoc (doc){

  try {
    const response = await fetch(`http://localhost:3000/download/`+doc, {
      method: 'GET',
      credentials: 'include' 
      
    });


    if (!response.ok) {
      throw new Error('Failed to download document');
    }

    
    const blob = await response.blob();
   
    const url = window.URL.createObjectURL(blob); 
    const a = document.createElement('a');
    a.href = url;
   
    a.download = response.headers.get('Content-Disposition').split('=')[1]; 

    
    console.log(a.download);
    document.body.appendChild(a); // Append the <a> element to the document body
    a.click(); // Programmatically click the <a> element to initiate the download
    window.URL.revokeObjectURL(url); // Release the temporary URL resource
  } catch (error) {
    console.error('Error downloading document:', error);
  
  }


};

 const onPageChange = (newPage) => {
   setPageNumber(newPage);
 };

   
   
   
   
   
   
   const types = [
    {
      value: "t1",
      label: "t1",
    },
    {
      value: "t2",
      label: "t2",
    },
    {
      value: "t3",
      label: "t3",
    },
    {
      value: "t4",
      label: "t4",
    },
  
  ]
  
   
   
  const [isOpen, setIsOpen] = useState(false);
  const closePopup = () => setIsOpen(false);

   
    const columns = [
     {
       header: 'Document Name',
       accessorKey: 'nom_doc',
     },
     {
       header: 'Type',
       accessorKey: 'type',
    
     },
     {
       header: 'status',
       accessorKey: 'isVerfied',
       cell: ({ cell }) =>{
      
        ; return (<>{ (cell.row.original.isVerfied === 1) ? <p className='text-green-500 underline'> Verified </p> : <p className='text-red-500 underline'> Not Verified </p>}</>)
          }
     },
     {
       header: 'Upload Date',
      

cell:({cell})=>{
return (<p>{(cell.row.original.date_time.replace('.000Z','').replace('T',' at '))}</p>)
}
     },
     {
         header: 'Comments',
         accessorKey: 'commentaire',
         cell: ({ cell }) =>{
        
       ; return (
        <></>
       
       )}
       },
       {
        header: 'Diffuse',
        accessorKey: 'download',
 cell : ({ cell }) =>{
  fetch('http://localhost:3000/Previleges/' + cell.row.original.nom_doc, {method:'GET',credentials : "include"})
  .then(res=>res.json())
  .then(results => {
  if (results.length > 0) {
     diffuseRef.current[cell.row.id].disabled = results[0].upload === 1 ? false : true;
  }
 
  })


          return (
              <Popover   >
              <PopoverTrigger asChild >
                <Button  
                ref={(el) => (diffuseRef.current[cell.row.id] = el)} 
                  variant="outline"
                  role="combobox"
                  aria-expanded={openUsr}
                  className="w-[100px] justify-between relative right-4"

                >
                  {usrArr.length > 0
                    ? usrArr.length + " users selected"
                    : "Diffuse"}
             
                </Button>
              </PopoverTrigger >
              <PopoverContent side = "right"   className="  w-[800px] h-[600px] ">
                
                <Command className=" h-[530px]" >
                  <CommandInput placeholder="Search User..." />
                  <CommandEmpty>No User found.</CommandEmpty>
                  <CommandList className=" h-" >
                   
                    {users.map((user) => (
                        
                      <CommandItem
                      className="px-4 py-12 border-[1px] m-3 border-gray-100 rounded-md left shadow-md "
                        key={user.value}
                        value={user.value.toString}
                       
                          
                        
                          
                        
                      
                      >
                            
                      
                       <div className="absolute left-[7%] font-semibold text-md text">{user.label}</div> 
                 
        
                       <div className="inline-flex items-center cursor-pointer absolute left-[79%] top-2  ">comment</div>
                        <label className="inline-flex items-center cursor-pointer absolute left-[70%] top-[37px] ">
                            
                       <textarea  className="rounded shadow-md w-52 h-12  p-1 bg-slate-50 border-zinc-800 " ref={(el) => (commentRef.current[user.value] = el)} ></textarea>
                     
        
                      </label>
                    
                       <div className="inline-flex items-center cursor-pointer absolute left-[59%] top-2  ">Download</div>
                        <label className="inline-flex items-center cursor-pointer absolute left-[60%]  ">
                            
                          <input type="checkbox" value="download" ref={(el) => (downloadRef.current[user.value] = el)} class="sr-only peer" />
                          <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
        
                      </label>
        
        
        
        
        <div className="inline-flex items-center cursor-pointer absolute left-[45%] top-2  ">Diffuse</div>
                        <label className="inline-flex items-center cursor-pointer absolute left-[45%]  ">
                            
          <input type="checkbox" value="upload" ref={(el) => (uploadRef.current[user.value] = el)} class="sr-only peer" />
          <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
        
          </label>
        
        
        
        
        
        
        <div className="inline-flex items-center cursor-pointer absolute left-[31%] top-2  ">Print</div>
                        <label className="inline-flex items-center cursor-pointer absolute left-[30%]  ">
                            
          <input type="checkbox" value="print" ref={(el) => (printRef.current[user.value] = el)} class="sr-only peer" />
          <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
          </label>
      

  
                        <input value={user.value} className="absolute  pt-2 size-4 " ref={(el) => (checkRef.current[user.value] = el)} type="checkbox"></input>
                      </CommandItem>
                    
                    ))}
                  
                     
                    </CommandList>
                   
                </Command>
                 <button className="w-full rounded-full bg-slate-500 mt-[6px] px-4 py-2 font-bold text-white  hover:bg-slate-700" onClick={()=>handleCheckboxChange(cell.row.original.nom_doc)}>Diffuse the file:{cell.row.original.nom_doc}</button>
              </PopoverContent >
            </Popover>
          )
        }
      },
      {
        header: 'Download',
        accessorKey: 'download',
 cell :  ({ cell }) =>{
  fetch('http://localhost:3000/Previleges/' + cell.row.original.nom_doc, {method:'GET',credentials : "include"})
  .then(res=>res.json())
  .then(results => {
if(  results[0] === undefined ){
  console.log(  results[0] === undefined )
  downloadButton.current[cell.row.id].disabled = false
}
  else{downloadButton.current[cell.row.id].disabled =  results[0].download === 1  ? false : true;}
     

 
  })

          return (
          <button ref={(el) => (downloadButton.current[cell.row.id] = el)} onClick={() =>{downloaddoc(cell.row.original.nom_doc)}} className="ml-5 disabled:text-gray-400"><Download /></button>
          )
        }
      },
       {
        header: 'Visualize',
        accessorKey: 'visualize',
        cell : ({ cell }) =>{ 

       


          return( 
            <button onClick={() =>fetchPdfUrl(cell.row.original.path.replace(".","")+"/"+cell.row.original.nom_doc,cell.row.original.nom_doc )} className="ml-5"><Eye /></button>
         
         )
        }
      }
    
   ];
   
   const downloadButton = useRef([]);
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
         pagination
       },
       onSortingChange: setSorting,
       onGlobalFilterChange: setFiltering,
     
     })











    return (  
        <>
         <h1 className="text-3xl font-poppins mb-4 ">Search Documents</h1>
        <div class=" absolute top-28 left-96">
        <span class="flex items-center   ">   
    

    <div class="relative  ">
   
        <input type="text" class= " shadow-md bg-white border border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-64 pr-10  p-2.5" placeholder="Search by document"  ref={docNameRef} />
      
    </div>



    <>
    <Popover open={open} onOpenChange={setOpen} >
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between shadow-md mx-2 rounded-md"
        >
          {value
            ? types.find((type) => type.value === value)?.label
            : "Select type..."}
           <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent side = "right" className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search type..." />
          <CommandEmpty>No type found.</CommandEmpty>
          <CommandList>
            
            {types.map((type) => (
                
              <CommandItem
                key={type.value}
                value={type.value.toString}
                onSelect={(currentValue) => {
                  setValue(currentValue === value ? "" : currentValue)
                  setOpen(false)
                  
                }}
              
              >
                    
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value === type.value ? "opacity-100" : "opacity-0"
                  )}
                />
                {type.label}
              </CommandItem>
              
            ))}
        
            </CommandList>
       
        </Command>
      </PopoverContent>
    </Popover>
    </>

<textarea className='shadow-md bg-white border border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block pr-8 h-10 w-[300px] mr-2 place-content-center pl-1 resize-x' placeholder="Search by keywords" ref={keyWordRef}></textarea>

    <button type='button' class=" shadow-md inline-flex items-center py-2.5 px-3 text-sm font-medium text-white bg-gray-900 rounded-lg border border-blue-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-blue-300 " onClick={()=> search(docNameRef.current.value, value, keyWordRef.current.value)}>
        <svg class="w-4 h-4 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
        </svg>Search
    </button>
</span>

        </div>
        
        
        
        
        
        
        
        
        <div className="relative overflow-x-auto shadow-lg sm:rounded-xl w-full left-6 top-20 bg-white ">
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
  {nofile === true && <p className=" absolute top-32 left-56 text-red-500 ">No file found</p>}
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
  
  
  {isOpen && (
          <div className="fixed z-10 inset-0 overflow-y-auto bg-gray-500 bg-opacity-75 transition-opacity">
            <div className="fixed inset-0 flex items-center justify-center">
              <div className="fixed transform origin-center rounded-lg bg-white shadow-xl p-6">
                <button type="button" onClick={closePopup}>
                  <svg
                    className="absolute right-3 top-3 h-6 w-6 cursor-pointer text-gray-400 hover:text-gray-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
                <Document
                  file={pdfUrl}
                  onLoadSuccess={onDocumentLoadSuccess}
                >
                  <Page  width={400} height={400} pageNumber={pageNumber} />
                </Document>
                 <div className="pagination-container">
        <button
        className="bg-gray-700 text-white font-bold py-2 px-4 rounded w-28"
          disabled={pageNumber === 1}
          onClick={() => onPageChange(pageNumber - 1)}
        >
          Previous
        </button>
    
        <button className=" ml-52 w-28 bg-gray-700 text-white font-bold py-2 px-4 rounded" disabled={pageNumber === numPages} onClick={() => onPageChange( pageNumber + 1)}>
          Next
         
        </button>
      
      </div>
              </div>
            
            </div>
           
          </div>
        )}
</> );
}
 
export default SearchPage;