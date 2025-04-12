'use client';

import { PDFDownloadLink } from '@react-pdf/renderer';
import RecapPdfDocument from './RecapPdfDocument';
import { LoanFormData } from '../schemas/loanFormSchema';

export default function DownloadRecapPDF({ data }: { data: LoanFormData }) {
  const isIncomplete =
    !data.nom?.trim() || !data.prenom?.trim() || !data.email?.includes('@');

  if (isIncomplete) return null;

  return (
    <PDFDownloadLink
      document={<RecapPdfDocument data={data} />}
      fileName="recapitulatif-demande-pret.pdf"
    >
      {({ loading }) => (
        <button className="shadow-[0_4px_14px_0_rgb(0,0,0,10%)] hover:shadow-[0_6px_20px_rgba(93,93,93,23%)] px-8 py-2 bg-white text-gray-600 rounded-md font-light transition duration-200 ease-linear">
          {loading ? 'Préparation...' : '📄 Télécharger PDF'}
        </button>
      )}
    </PDFDownloadLink>
  );
}
