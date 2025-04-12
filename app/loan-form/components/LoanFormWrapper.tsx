"use client";

import {
  Step,
  StepLabel,
  Stepper,
  Typography,
} from "@mui/material";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  forwardRef,
  useImperativeHandle,
  useState,
  useEffect,
} from "react";
import toast from "react-hot-toast";
import { loanFormSchema, LoanFormData } from "../schemas/loanFormSchema";
import SimulationStep from "./SimulationStep";
import FinanceStep from "./FinanceStep";
import IdentityStep from "./IdentityStep";
import DocumentsStep from "./DocumentsStep";
import LoanSummaryPreview from "./LoanSummaryPreview";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabaseClient";

export type LoanFormHandle = {
  getSubmittedData: () => LoanFormData | null;
};

const steps = ["Simulation", "Situation", "Identité", "Documents"];

const stepTitles = [
  {
    title: "Simulation de prêt",
    description: "Choisissez le type de prêt et simulez les paramètres de votre crédit.",
  },
  {
    title: "Situation financière",
    description: "Renseignez vos revenus, charges et éventuels crédits en cours.",
  },
  {
    title: "Identité",
    description: "Remplissez vos informations personnelles pour constituer votre dossier.",
  },
  {
    title: "Documents à fournir",
    description: "Chargez les pièces justificatives requises pour finaliser votre demande.",
  },
];

const LoanFormWrapper = forwardRef<LoanFormHandle>((_, ref) => {
  const [activeStep, setActiveStep] = useState(0);
  const [submittedData, setSubmittedData] = useState<LoanFormData | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  useImperativeHandle(ref, () => ({
    getSubmittedData: () => submittedData,
  }));

  const methods = useForm<LoanFormData>({
    resolver: zodResolver(loanFormSchema),
    defaultValues: {
      besoin: "",
      clientType: "",
      amount: 10000,
      duration: 12,
      revenu: 0,
      existingCreditAmount: 0,
      existingCreditType: "",
      charges: 0,
      hasCredit: "non",
      civilite: "",
      nom: "",
      prenom: "",
      email: "",
      phone: "",
      acceptCgu: true,
      newsletter: false,
      notRobot: true,
      files: [],
    },
  });

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [activeStep]);

  const getFieldsForStep = (step: number): (keyof LoanFormData)[] => {
    switch (step) {
      case 0:
        return ["besoin", "clientType", "amount", "duration"];
      case 1:
        return [
          "revenu",
          "charges",
          "hasCredit",
          ...(methods.getValues("hasCredit") === "oui"
            ? ["existingCreditAmount", "existingCreditType"]
            : []),
        ] as (keyof LoanFormData)[];
      case 2:
        return ["civilite", "nom", "prenom", "email", "phone"];
      case 3:
        return ["notRobot", "acceptCgu", "newsletter"];
      default:
        return [];
    }
  };

  const onNext = async () => {
    const isValid = await methods.trigger(getFieldsForStep(activeStep));
    if (!isValid) return;
    setActiveStep((prev) => prev + 1);
  };

  const onBack = () => setActiveStep((prev) => prev - 1);

  const uploadFiles = async (files: File[], userId: string) => {
    const uploaded = [];

    for (const file of files) {
      const path = `${userId}/${Date.now()}_${file.name}`;
      const { data, error } = await supabase.storage
        .from("loan_files")
        .upload(path, file);

      if (error) throw new Error(error.message);

      const { data: urlData } = supabase.storage
        .from("loan_files")
        .getPublicUrl(path);

      uploaded.push({
        name: file.name,
        type: file.type,
        url: urlData.publicUrl,
      });
    }

    return uploaded;
  };

  const onSubmitFinalStep = async () => {
    const isValid = await methods.trigger(getFieldsForStep(activeStep));
    if (!isValid) return;

    const data = methods.getValues();

    try {
      setIsSubmitting(true);

      const userId = crypto.randomUUID(); // You can replace with user ID if using Supabase Auth
      const uploadedFiles = data.files ? await uploadFiles(data.files, userId) : [];

      const { error } = await supabase.from("loan_requests").insert([
        {
          besoin: data.besoin,
          client_type: data.clientType,
          amount: data.amount,
          duration: data.duration,
          revenu: data.revenu,
          charges: data.charges,
          has_credit: data.hasCredit,
          existing_credit_amount: data.existingCreditAmount,
          existing_credit_type: data.existingCreditType,
          civilite: data.civilite,
          nom: data.nom,
          prenom: data.prenom,
          email: data.email,
          phone: data.phone,
          accept_cgu: data.acceptCgu,
          newsletter: data.newsletter,
          not_robot: data.notRobot,
          files: uploadedFiles,
        },
      ]);

      if (error) throw new Error(error.message);

      setSubmittedData(data);
      toast.success("Demande envoyée avec succès !");
      router.push("/loan-form/confirmation");
    } catch (err) {
      toast.error((err as Error).message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getStepContent = (step: number) => {
    switch (step) {
      case 0:
        return <SimulationStep />;
      case 1:
        return <FinanceStep />;
      case 2:
        return <IdentityStep />;
      case 3:
        return <DocumentsStep />;
      default:
        return null;
    }
  };

  return (
    <FormProvider {...methods}>
      <div className="flex justify-between">
        <div className="w-full border-l">
          <div className="bg-white border-b p-6 px-12 mb-8">
            <Stepper activeStep={activeStep} orientation="horizontal">
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
          </div>

          <div className="w-full px-12 relative">
            <form onSubmit={(e) => e.preventDefault()} className="pb-10">
              <div className="mb-8">
                <Typography variant="h6" fontWeight="bold">
                  {stepTitles[activeStep].title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {stepTitles[activeStep].description}
                </Typography>
              </div>

              {getStepContent(activeStep)}
            </form>
          </div>

          <div className="bg-white border-t border-gray-200 flex justify-between px-12 py-6">
            {activeStep > 0 && (
              <Button
                type="button"
                onClick={onBack}
                className="bg-white border border-blue-500 text-blue-500 hover:bg-blue-100 rounded-full px-8 py-2"
              >
                Retour
              </Button>
            )}
            {activeStep < steps.length - 1 ? (
              <Button
                type="button"
                onClick={onNext}
                className="px-8 py-2 rounded-full bg-gradient-to-b from-blue-500 to-blue-600 text-white focus:ring-2 focus:ring-blue-400 hover:shadow-xl transition duration-200"
              >
                Suivant
              </Button>
            ) : (
              <Button
                type="button"
                disabled={isSubmitting}
                onClick={onSubmitFinalStep}
                className="px-8 py-2 rounded-full bg-gradient-to-b from-blue-500 to-blue-600 text-white focus:ring-2 focus:ring-blue-400 hover:shadow-xl transition duration-200"
              >
                {isSubmitting ? "Envoi en cours..." : "Envoyer"}
              </Button>
            )}
          </div>
        </div>

        <div>
          <LoanSummaryPreview />
        </div>
      </div>
    </FormProvider>
  );
});

LoanFormWrapper.displayName = "LoanFormWrapper";

export default LoanFormWrapper;
