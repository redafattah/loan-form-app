'use client';

import { Stepper, Step, StepLabel } from '@mui/material';

export default function StepperHeader({
  activeStep,
  steps,
}: {
  activeStep: number;
  steps: string[];
}) {
  return (
    <Stepper
      activeStep={activeStep}
      alternativeLabel
      sx={{
        '& .MuiStepIcon-root': {
          color: '#e0e0e0', // couleur par défaut
        },
        '& .Mui-completed .MuiStepIcon-root': {
          color: '#3b82f6', // Tailwind blue-500
        },
        '& .Mui-active .MuiStepIcon-root': {
          color: '#3b82f6', // Tailwind blue-500
        },
        '& .MuiStepLabel-label': {
          fontSize: '0.875rem',
        },
        '& .MuiStepLabel-label.Mui-active': {
          color: '#3b82f6',
          fontWeight: 600,
        },
        '& .MuiStepLabel-label.Mui-completed': {
          color: '#3b82f6',
        },
      }}
    >
      {steps.map((label) => (
        <Step key={label}>
          <StepLabel>{label}</StepLabel>
        </Step>
      ))}
    </Stepper>
  );
}
