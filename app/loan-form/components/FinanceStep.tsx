'use client';

import {
  Box,
  FormControl,
  FormControlLabel,
  FormHelperText,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';
import { LoanFormData } from '../schemas/loanFormSchema';

export default function FinanceStep() {
  const {
    control,
    watch,
    formState: { errors },
  } = useFormContext<LoanFormData>();

  const hasCredit = watch('hasCredit');

  return (
    <Box display="grid" gap={4}>
      {/* Revenu mensuel */}
      <Controller
        name="revenu"
        control={control}
        render={({ field }) => (
          <TextField
            label="Revenu mensuel (en MAD)"
            type="number"
            fullWidth
            value={field.value ?? ''}
            onChange={(e) => field.onChange(Number(e.target.value))}
            error={!!errors.revenu}
            helperText={errors.revenu?.message}
          />
        )}
      />

      {/* Charges mensuelles */}
      <Controller
        name="charges"
        control={control}
        render={({ field }) => (
          <TextField
            label="Charges mensuelles (en MAD)"
            type="number"
            fullWidth
            value={field.value ?? ''}
            onChange={(e) => field.onChange(Number(e.target.value))}
            error={!!errors.charges}
            helperText={errors.charges?.message}
          />
        )}
      />

      {/* Crédit en cours */}
      <Controller
        name="hasCredit"
        control={control}
        render={({ field }) => (
          <FormControl component="fieldset" error={!!errors.hasCredit}>
            <Typography className="text-sm font-medium text-gray-700 mb-2">
              Avez-vous un crédit en cours ?
            </Typography>
            <RadioGroup
              row
              value={field.value ?? ''}
              onChange={(e) => field.onChange(e.target.value)}
              aria-label="Crédit en cours"
            >
              <FormControlLabel value="oui" control={<Radio />} label="Oui" />
              <FormControlLabel value="non" control={<Radio />} label="Non" />
            </RadioGroup>
            {errors.hasCredit && (
              <FormHelperText>{errors.hasCredit.message}</FormHelperText>
            )}
          </FormControl>
        )}
      />

      {/* Conditional fields */}
      {hasCredit === 'oui' && (
        <>
          {/* Montant mensualités */}
          <Controller
            name="existingCreditAmount"
            control={control}
            render={({ field }) => (
              <TextField
                label="Montant total des mensualités"
                type="number"
                fullWidth
                value={field.value ?? ''}
                onChange={(e) => field.onChange(Number(e.target.value))}
                error={!!errors.existingCreditAmount}
                helperText={errors.existingCreditAmount?.message}
              />
            )}
          />

          {/* Type de crédit */}
          <Controller
            name="existingCreditType"
            control={control}
            render={({ field }) => (
              <FormControl fullWidth error={!!errors.existingCreditType}>
                <InputLabel>Type de crédit</InputLabel>
                <Select
                  {...field}
                  label="Type de crédit"
                  value={field.value ?? ''}
                  onChange={(e) => field.onChange(e.target.value)}
                >
                  <MenuItem value="personnel">Personnel</MenuItem>
                  <MenuItem value="auto">Auto</MenuItem>
                  <MenuItem value="immo">Immo</MenuItem>
                  <MenuItem value="autre">Autre</MenuItem>
                </Select>
                {errors.existingCreditType && (
                  <FormHelperText>{errors.existingCreditType.message}</FormHelperText>
                )}
              </FormControl>
            )}
          />
        </>
      )}
    </Box>
  );
}
