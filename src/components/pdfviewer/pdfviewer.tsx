import React from 'react';
import { Document, Page} from 'react-pdf';
// pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
import { pdfjs } from 'react-pdf';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

interface MyPdfViewerProps {
    pdfPath: string;
}

const PdfViewer: React.FC<MyPdfViewerProps> = ({ pdfPath }) => {
    return (
        <Document file={pdfPath}>
            <Page pageNumber={1}/>
        </Document>
    );
};

export default PdfViewer;