'use client';

import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Slider,
  TextField,
  Typography,
  FormHelperText,
} from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';
import { LoanFormData } from '../schemas/loanFormSchema';

export default function SimulationStep() {
  const {
    control,
    watch,
    formState: { errors },
  } = useFormContext<LoanFormData>();

  const amount = watch('amount') || 0;
  const duration = watch('duration') || 1; // Avoid divide-by-zero
  const monthly = (amount / duration).toFixed(2);

  return (
    <div className="grid grid-cols-2 gap-6">
      {/* Mon besoin */}
      <Controller
        name="besoin"
        control={control}
        render={({ field }) => (
          <FormControl fullWidth error={!!errors.besoin}>
            <InputLabel id="besoin-label">Mon besoin</InputLabel>
            <Select
              {...field}
              labelId="besoin-label"
              label="Mon besoin"
              aria-label="Choisissez votre besoin"
            >
              <MenuItem value="pret personnel">Prêt personnel</MenuItem>
              <MenuItem value="pret auto">Prêt auto</MenuItem>
              <MenuItem value="pret auto occasion">Prêt auto occasion</MenuItem>
              <MenuItem value="équipement">Équipement</MenuItem>
              <MenuItem value="imprévus">Imprévus</MenuItem>
            </Select>
            {errors.besoin && (
              <FormHelperText>{errors.besoin.message}</FormHelperText>
            )}
          </FormControl>
        )}
      />

      {/* Je suis */}
      <Controller
        name="clientType"
        control={control}
        render={({ field }) => (
          <FormControl fullWidth error={!!errors.clientType}>
            <InputLabel id="clientType-label">Je suis</InputLabel>
            <Select
              {...field}
              labelId="clientType-label"
              label="Je suis"
              aria-label="Type de client"
            >
              <MenuItem value="salarié">Salarié</MenuItem>
              <MenuItem value="profession libérale">Profession libérale</MenuItem>
              <MenuItem value="fonctionnaire">Fonctionnaire</MenuItem>
              <MenuItem value="commerçant">Commerçant</MenuItem>
              <MenuItem value="artisan">Artisan</MenuItem>
              <MenuItem value="retraité">Retraité</MenuItem>
            </Select>
            {errors.clientType && (
              <FormHelperText>{errors.clientType.message}</FormHelperText>
            )}
          </FormControl>
        )}
      />

      {/* Montant */}
      <Controller
        name="amount"
        control={control}
        render={({ field }) => (
          <div className="space-y-2 col-span-2">
            <Typography className="text-sm font-medium text-blue-500">
              Montant souhaité (en DH)
            </Typography>
            <Slider
              min={1000}
              max={500000}
              step={1000}
              value={field.value}
              onChange={(_, val) => field.onChange(val)}
              aria-label="Montant"
              sx={{ color: 'rgb(59,130,246)' }}
            />
            <TextField
              label="Montant"
              type="number"
              fullWidth
              inputProps={{ min: 1000, step: 1000 }}
              value={field.value}
              onChange={(e) => field.onChange(Number(e.target.value))}
              error={!!errors.amount}
              helperText={errors.amount?.message}
              sx={{
                '& label.Mui-focused': { color: 'rgb(59,130,246)' },
                '& .MuiOutlinedInput-root.Mui-focused fieldset': {
                  borderColor: 'rgb(59,130,246)',
                },
              }}
            />
          </div>
        )}
      />

      {/* Durée */}
      <Controller
        name="duration"
        control={control}
        render={({ field }) => (
          <div className="space-y-2 col-span-2">
            <Typography className="text-sm font-medium text-blue-500">
              Durée (en mois)
            </Typography>
            <Slider
              min={6}
              max={84}
              step={1}
              value={field.value}
              onChange={(_, val) => field.onChange(val)}
              aria-label="Durée"
              sx={{ color: 'rgb(59,130,246)' }}
            />
            <TextField
              label="Durée"
              type="number"
              fullWidth
              inputProps={{ min: 6, step: 1 }}
              value={field.value}
              onChange={(e) => field.onChange(Number(e.target.value))}
              error={!!errors.duration}
              helperText={errors.duration?.message}
              sx={{
                '& label.Mui-focused': { color: 'rgb(59,130,246)' },
                '& .MuiOutlinedInput-root.Mui-focused fieldset': {
                  borderColor: 'rgb(59,130,246)',
                },
              }}
            />
          </div>
        )}
      />

      {/* Mensualité estimée */}
      <TextField
        label="Mensualité estimée (en DH)"
        value={monthly}
        fullWidth
        disabled
        className="col-span-2"
      />
    </div>
  );
}
