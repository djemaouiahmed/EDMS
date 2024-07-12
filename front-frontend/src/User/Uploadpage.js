
  import * as React from "react"
  import { CloudUpload } from 'lucide-react';
import { Check, ChevronsUpDown,ChevronRight,ChevronLeft } from "lucide-react"
import { cn } from "../ui/utils"
import { Button } from "../ui/button"
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
import { Document, Page } from 'react-pdf'
import { pdfjs } from 'react-pdf';

import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.js',
  import.meta.url,
).toString();
const Uploadpage = () => {
    
const types = [
  {
    value: "Official Document",
    label: "Official Document",
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


 

const [usrArr, setUsrArr] = React.useState([])
async function sendUploadinfo(file, type, keyword, comment, name) {
  
  const formData = new FormData();
  formData.append("type", type);
  formData.append("file", file); 
  
  formData.append("mot_cle", keyword);
  formData.append("comment", comment);
  formData.append("name", name)


  
    const response = await fetch("http://localhost:3000/post_docs", {
      method: "POST",  credentials : "include" ,
     
      body: formData
    }); 
    const responseData = await response.json();
    console.log(responseData);
}

const[nofile, setNofile] = React.useState(false)
const[noType,setNoType] =  React.useState(false)
const[noKeyword,setNoKeyword ] =  React.useState(false)
const[noName,setNoName] =  React.useState(false)
async function handleClick(file, type, keyword, comment,name) {
  if(file===null | keyword === "" | type ===""){
if(file===null){
  setNofile(true); 
}
if(keyword===""){
setNoKeyword(true);
}else{
  setNoKeyword(false);
}
if(type===""){
  setNoType(true);
}else{setNoType(false);}
if(name===""){
  setNoName(true);
}else{setNoName(false);}
return;
};
sendUploadinfo(file, type, keyword, comment, name);
window.location.reload()
}

function setupuser(item) {

  return {value: item.id_user, label: item.nom + " " + item.prenom};
}

const [users, setUsers] = React.useState([])
  React.useEffect(() => {
    fetch('http://localhost:3000/list_user', {credentials : "include"}).then(res => res.json()).then(valid => {

console.log(valid)
const fetched = valid.map(setupuser)
setUsers(fetched)
  })}, []);


  const onPageChange = (newPage) => {
    setPageNumber(newPage);
  };


  const [numPages, setNumPages] = React.useState(null);
  const [pageNumber, setPageNumber] = React.useState(1);
  const onDocumentLoadSuccess = ({ numPages }) => {
   setNumPages(numPages);
 };



  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState("")

  const [fileName, setFileName] = React.useState("");
  const keywordRef = React.useRef('')
  const commentRef = React.useRef('')
const [doc , setDoc] = React.useState(null)

const inputRef = React.useRef(null)
const docNameRef = React.useRef(null)
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setDoc(file)
        console.log(doc)
        if (file) {
            setFileName(file.name);
        } else {
            setFileName("");
        }
      }
  return (<>

    <div className="relative bottom-5 left-5 pb-6 px-6 w-1/3  shadow-md bg-white rounded-xl">
    <h1 className="text-3xl font-poppins mb-4 p-2 ">Search Documents</h1>
       <br />
       
      

       <div class="flex items-center justify-center w-full ">
       <label htmlFor="dropzone-file" className={`flex flex-col items-center justify-center w-full h-28 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 ${nofile ? 'border-red-500 ' :'  border-gray-300'}`}>
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <CloudUpload className={`size-7 mb-3 text-gray-400 ${nofile ? 'text-red-500' :' '} `} />
                <p className={ `mb-2 text-sm text-gray-500 ${nofile ? 'text-red-500' :' '} `}><span className="font-semibold">Click to upload</span> or drag and drop</p>
                <p className="mb-2 text-sm text-blue-500 ">{fileName}</p>
            </div>
            <input id="dropzone-file" type="file" className="hidden" onChange={handleFileChange} ref={inputRef} required />
        </label>
</div> 


                    <br />
                    <input type="text" className= {`  bg-white border border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[200px] p-2.5  ${noName ? 'border-red-500 placeholder:text-red-500' :' '}`} placeholder="Document Name"  ref={docNameRef} />
<br />
              <>
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          
          className={ `w-[200px] justify-between ${noType ? 'text-red-500 border-red-500' :' '} `}
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
    
<br />
<br />





  


   
    <textarea ref={keywordRef} rows="4" className={`block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500  h-16 ${ noKeyword? 'text-red-500 border-red-500 placeholder:text-red-500' :' '}`} placeholder="Keywords : seperated by semicolon"></textarea>

<br />

    <textarea ref={commentRef} rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 " placeholder="Comments..."></textarea>
   

<br />

    
 
<button  className="w-24 rounded-full bg-slate-500 px-4 py-2 font-bold text-white  hover:bg-slate-700" onClick={()=> handleClick(doc,value,keywordRef.current.value,commentRef.current.value,docNameRef.current.value)} type="submit" value="Submit"> Upload</button>
{nofile && <p className="text-red-500">Please select a file</p>}
    </div> 
  
  <div className="relative w-[50%] left-[650px] bottom-[100%]">
    <Document
                file={doc}
                onLoadSuccess={onDocumentLoadSuccess}
                className="shadow-lg w-[33%] rounded-xl  "
              >
                <Page  width={440} height={440} pageNumber={pageNumber} />
                <div className="">
              <button
      className="bg-gray-100 font-bold py-2 px-2 rounded-l-xl hover:bg-gray-200"
        disabled={pageNumber === 1}
        onClick={() => onPageChange(pageNumber - 1)}
      >
       <ChevronLeft className=" text-black h-5 w-5" />
      </button>
  
      <button className=" bg-gray-100 font-bold py-2 px-2 rounded-r-xl hover:bg-gray-200" disabled={pageNumber === numPages} onClick={() => onPageChange( pageNumber + 1)}>
        <ChevronRight className=" text-black h-5 w-5" />
      </button>
      </div>
              </Document>
   
              </div>
  
    </>
  );
}
 
export default Uploadpage;