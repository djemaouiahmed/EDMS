import { useState, useEffect } from 'react';
import { pdfjs } from 'react-pdf';
import { Document, Page } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.js',
  import.meta.url
).toString();

const HomePage = () => {
  const [docs, setDocs] = useState([]);
  const [isLoading, setIsLoading] = useState(false); 
  const [error, setError] = useState(null); 
const [docname, setDocname] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null); 

      try {
        const frequentlyUsedResponse = await fetch(
          'http://localhost:3000/FrequentlyUsed',
          { method: 'GET', credentials: 'include' }
        );

        if (!frequentlyUsedResponse.ok) {
          throw new Error('Failed to fetch frequently used documents');
        }

        const frequentlyUsedDocs = await frequentlyUsedResponse.json();
      
        const pdfUrls = await Promise.all(
          frequentlyUsedDocs.map(async (doc) => {
            const pathResponse = await fetch(
              `http://localhost:3000/getpath/${doc.documentName}`,
              { method: 'GET', credentials: 'include' }
            );

            if (!pathResponse.ok) {
              throw new Error('Failed to fetch path for document');
            }

            const path = await pathResponse.json();
            const fullPath = `${path}/${doc.documentName}`;

            const pdfResponse = await fetch(`http://localhost:3000/pdfs${fullPath}`, {
              ContentType: 'application/pdf',
              method: 'GET',
              credentials: 'include',
            });

            if (!pdfResponse.ok) {
              throw new Error('Failed to fetch PDF document');
            }

            const pdfBlob = await pdfResponse.blob();
            return URL.createObjectURL(pdfBlob);
          })
        );
        setDocname( frequentlyUsedDocs);
        setDocs(pdfUrls);
      } catch (error) {
        setError(error.message); 
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
<div>
 <h1 className="text-3xl font-poppins mb-4 ">Frequently opened Files</h1>
 <br />
<br />
<br />

  {isLoading && <p>Loading documents...</p>}
  {error && <p>{"You have not opened any documents recently"}</p>}
  {!isLoading && !error && (<div>
    <div className="flex flex-wrap bg-white p-4 rounded-lg shadow-lg w-[55%]">
      {docs.slice(0, Math.min(docs.length, 5)).map((doc, index) => (
        <div key={index} className=" rounded-sm mr-2 mb-2">
          <Document className="" file={doc}>
            <Page width={120} height={120} pageNumber={1} />
            <p className="text-center">{docname[index].documentName}</p>
          </Document>
        </div>
      ))}
 
    </div>
    <div>
    {docs.length > 5 && (
        <div className="flex flex-wrap mt-4 bg-white p-4 rounded-lg shadow-lg w-[55%]"> 
          {docs.slice(5).map((doc, index) => (
            <div key={index + 5} className=" rounded-sm mr-2 mb-2">
              <Document className="" file={doc}>
                <Page width={100} height={100} pageNumber={1} />
                <p className="text-center">{docname[index+5].documentName}</p>
              </Document>
            </div>
          ))}
        </div>
      )}

      
    </div>



</div>
  )}
</div>



  
  );
};

export default HomePage;
