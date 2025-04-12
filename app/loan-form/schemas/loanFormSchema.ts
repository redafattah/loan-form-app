import * as z from 'zod';

const MAX_FILE_SIZE_MB = 5;
const ALLOWED_TYPES = ['application/pdf', 'image/png', 'image/jpeg'];

export const loanFormSchema = z
  .object({
    besoin: z.string().min(1, 'Le champ est requis'),
    clientType: z.string().min(1, 'Le champ est requis'),
    amount: z.number().min(1000, 'Montant minimum : 1000 MAD'),
    duration: z.number().min(6, 'Durée minimum : 6 mois'),

    revenu: z
      .number({ required_error: 'Le revenu est requis' })
      .min(1, 'Le revenu est requis'),
    charges: z
      .number({ required_error: 'Les charges sont requises' })
      .min(0, 'Les charges ne peuvent pas être négatives'),

    hasCredit: z.enum(['oui', 'non'], {
      message: 'Veuillez indiquer si vous avez un crédit',
    }),

    existingCreditAmount: z.number().optional(),
    existingCreditType: z.string().optional(),

    civilite: z.string().min(1, "Veuillez sélectionner votre civilité"),
    nom: z.string().min(1, 'Le nom est requis'),
    prenom: z.string().min(1, 'Le prénom est requis'),
    email: z.string().email('Email invalide'),
    phone: z.string().min(6, 'Numéro invalide'),

    acceptCgu: z.literal(true, {
      errorMap: () => ({
        message: 'Vous devez accepter les conditions générales',
      }),
    }),
    newsletter: z.boolean(),
    notRobot: z.literal(true, {
      errorMap: () => ({
        message: 'Veuillez confirmer que vous n’êtes pas un robot',
      }),
    }),

    files: z
      .array(z.instanceof(File))
      .max(5, 'Vous pouvez uploader jusqu’à 5 fichiers maximum')
      .refine(
        (files) =>
          files.every((file) => file.size <= MAX_FILE_SIZE_MB * 1024 * 1024),
        `Chaque fichier ne doit pas dépasser ${MAX_FILE_SIZE_MB} Mo`
      )
      .refine(
        (files) => files.every((file) => ALLOWED_TYPES.includes(file.type)),
        'Seuls les fichiers PDF, PNG ou JPG sont autorisés'
      )
      .optional(),
  })
  .superRefine((data, ctx) => {
    if (data.hasCredit === 'oui') {
      if (!data.existingCreditAmount || data.existingCreditAmount <= 0) {
        ctx.addIssue({
          path: ['existingCreditAmount'],
          code: z.ZodIssueCode.custom,
          message: 'Veuillez indiquer le montant du crédit existant',
        });
      }

      if (!data.existingCreditType || data.existingCreditType.trim() === '') {
        ctx.addIssue({
          path: ['existingCreditType'],
          code: z.ZodIssueCode.custom,
          message: 'Veuillez sélectionner le type de crédit existant',
        });
      }
    }
  });

export type LoanFormData = z.infer<typeof loanFormSchema>;
