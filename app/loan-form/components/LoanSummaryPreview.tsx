'use client';

import dynamic from 'next/dynamic';
import { useFormContext } from 'react-hook-form';
import { LoanFormData } from '../schemas/loanFormSchema';
import {
  FileText,
  Briefcase,
  Coins,
  Calendar,
  CreditCard,
  User,
  Mail,
  Phone,
  Info,
} from 'lucide-react';

const DownloadRecapPDF = dynamic(() => import('./DownloadRecapPDF'), {
  ssr: false,
});

export default function LoanSummaryPreview() {
  const { watch } = useFormContext<LoanFormData>();
  const data = watch();

  const fields = [
    { label: 'Mon besoin', value: data.besoin, icon: FileText },
    { label: 'Statut', value: data.clientType, icon: Briefcase },
    { label: 'Montant', value: `${data.amount} MAD`, icon: Coins },
    { label: 'Durée', value: `${data.duration} mois`, icon: Calendar },
    { label: 'Revenu', value: `${data.revenu} MAD`, icon: Coins },
    { label: 'Charges', value: `${data.charges} MAD`, icon: CreditCard },
    { label: 'Crédit', value: data.hasCredit === 'oui' ? 'Oui' : 'Non', icon: Info },
    ...(data.hasCredit === 'oui'
      ? [
          {
            label: 'Mensualités',
            value: `${data.existingCreditAmount} MAD`,
            icon: CreditCard,
          },
          {
            label: 'Type de crédit',
            value: data.existingCreditType,
            icon: Info,
          },
        ]
      : []),
    { label: 'Nom', value: data.nom, icon: User },
    { label: 'Prénom', value: data.prenom, icon: User },
    { label: 'Email', value: data.email, icon: Mail },
    { label: 'Téléphone', value: data.phone, icon: Phone },
  ];

  const isDataComplete =
    !!data.nom?.trim() &&
    !!data.email?.trim() &&
    data.amount > 0 &&
    data.duration > 0;

  return (
    <div className="w-full h-[800px]  max-w-md bg-white border-l flex flex-col">
      {/* Header */}
      <div className="text-center px-6 pt-6">
        <h2 className="text-lg font-bold text-zinc-800 mb-1">
          📋 Aperçu de la demande
        </h2>
        <p className="text-xs text-zinc-500 mb-4">
          Vous pouvez modifier vos informations à tout moment
        </p>
      </div>

      {/* Scrollable fields */}
      <div className="flex-1   overflow-scroll h-[500px] px-6 pb-4">
        <ul className="space-y-4">
          {fields.map((field, i) => (
            <li key={i} className="flex items-start border p-2 gap-3 rounded">
              <field.icon className="w-5 h-5 text-zinc-400 mt-0.5" />
              <div className="flex-1">
                <p className="text-xs text-zinc-500">{field.label}</p>
                <p className="text-sm font-medium text-zinc-900 truncate">
                  {field.value || '-'}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Download PDF footer */}
      <div className="w-full border-t border-zinc-200 px-6 py-4">
        <div className="flex justify-center">
          {isDataComplete && <DownloadRecapPDF data={data} />}
        </div>
      </div>
    </div>
  );
}
