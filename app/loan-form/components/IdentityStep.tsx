'use client';

import {
  Box,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography,
  FormHelperText,
} from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';
import { LoanFormData } from '../schemas/loanFormSchema';

export default function IdentityStep() {
  const {
    control,
    formState: { errors },
  } = useFormContext<LoanFormData>();

  return (
    <Box display="grid" gap={4}>
      {/* Civilité */}
      <Controller
        name="civilite"
        control={control}
        render={({ field }) => (
          <FormControl component="fieldset" error={!!errors.civilite}>
            <Typography className="text-sm font-medium text-zinc-700 mb-2">
              Civilité
            </Typography>
            <RadioGroup
              row
              {...field}
              aria-label="Civilité"
              onChange={(e) => field.onChange(e.target.value)}
            >
              <FormControlLabel value="monsieur" control={<Radio />} label="Monsieur" />
              <FormControlLabel value="madame" control={<Radio />} label="Madame" />
              <FormControlLabel value="mademoiselle" control={<Radio />} label="Mademoiselle" />
            </RadioGroup>
            {!!errors.civilite && (
              <FormHelperText>{errors.civilite.message}</FormHelperText>
            )}
          </FormControl>
        )}
      />

      {/* Nom */}
      <Controller
        name="nom"
        control={control}
        render={({ field }) => (
          <TextField
            label="Nom"
            fullWidth
            type="text"
            {...field}
            error={!!errors.nom}
            helperText={errors.nom?.message}
          />
        )}
      />

      {/* Prénom */}
      <Controller
        name="prenom"
        control={control}
        render={({ field }) => (
          <TextField
            label="Prénom"
            fullWidth
            type="text"
            {...field}
            error={!!errors.prenom}
            helperText={errors.prenom?.message}
          />
        )}
      />

      {/* Email */}
      <Controller
        name="email"
        control={control}
        render={({ field }) => (
          <TextField
            label="Email"
            fullWidth
            type="email"
            {...field}
            error={!!errors.email}
            helperText={errors.email?.message}
          />
        )}
      />

      {/* Numéro de téléphone */}
      <Controller
        name="phone"
        control={control}
        render={({ field }) => (
          <TextField
            label="Numéro de téléphone"
            fullWidth
            type="tel"
            {...field}
            error={!!errors.phone}
            helperText={errors.phone?.message}
          />
        )}
      />
    </Box>
  );
}
