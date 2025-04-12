'use client';

import {
  FormControlLabel,
  Switch,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Avatar,
  IconButton,
  Tooltip,
  FormControl,
  FormHelperText,
} from '@mui/material';
import { PictureAsPdf, Delete } from '@mui/icons-material';
import { Controller, useFormContext } from 'react-hook-form';
import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { LoanFormData } from '../schemas/loanFormSchema';

export default function DocumentsStep() {
  const {
    control,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext<LoanFormData>();

  const uploadedFiles = watch('files') || [];
  const clientType = watch('clientType');

  const requiredDocs: Record<string, string[]> = {
    salarié: ['Contrat de travail', 'Bulletins de paie', 'Attestation de salaire'],
    commerçant: ['RC ou Patente', 'Relevés bancaires', 'Déclarations fiscales'],
    'profession libérale': ['Justificatif d’activité', 'Relevés bancaires', 'Derniers avis d’imposition'],
    fonctionnaire: ['Attestation d’affectation', 'Bulletins de paie', 'Carte fonctionnaire'],
    artisan: ['Attestation de métier', 'RC', 'Relevés bancaires'],
    retraité: ['Attestation de pension', 'Relevés bancaires', 'Justificatif de retraite'],
  };

  const docsForClient = requiredDocs[clientType] || [];

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const updatedFiles = [...uploadedFiles, ...acceptedFiles].slice(0, 5);
      setValue('files', updatedFiles, { shouldValidate: true });
    },
    [setValue, uploadedFiles]
  );

  const onDeleteFile = (indexToDelete: number) => {
    const filtered = uploadedFiles.filter((_, i) => i !== indexToDelete);
    setValue('files', filtered, { shouldValidate: true });
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: true,
    maxFiles: 5,
    accept: {
      'application/pdf': ['.pdf'],
      'image/*': ['.jpg', '.jpeg', '.png'],
    },
  });

  return (
    <div className="grid gap-6">
      {/* Required documents */}
      {docsForClient.length > 0 && (
        <div className="p-4 border">
          <Typography variant="subtitle2" fontWeight="bold" gutterBottom>
            📄 Documents requis pour {clientType}
          </Typography>
          <ul className="pl-6 m-0 list-disc">
            {docsForClient.map((doc, idx) => (
              <li key={idx}>
                <Typography variant="body2">{doc}</Typography>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Upload Section */}
      <FormControl error={!!errors.files}>
        <div className="border p-4">
          <Typography variant="subtitle1" gutterBottom>
            📎 Upload de documents
          </Typography>

          <Paper
            variant="outlined"
            sx={{
              p: 3,
              textAlign: 'center',
              borderColor: isDragActive ? 'primary.main' : 'grey.400',
              borderStyle: 'dashed',
              cursor: 'pointer',
              transition: 'border 0.3s ease-in-out',
            }}
            {...getRootProps()}
          >
            <input {...getInputProps()} />
            {isDragActive ? (
              <Typography variant="body1" color="primary">
                Déposez les fichiers ici...
              </Typography>
            ) : (
              <Typography variant="body2" color="textSecondary">
                Glissez-déposez vos fichiers ici, ou cliquez pour en sélectionner (max 5)
              </Typography>
            )}
          </Paper>

          {errors.files && (
            <FormHelperText sx={{ mt: 1 }}>
              {errors.files.message?.toString()}
            </FormHelperText>
          )}

          {uploadedFiles.length > 0 && (
            <List dense sx={{ mt: 2 }}>
              {uploadedFiles.map((file: File, index: number) => (
                <ListItem
                  key={index}
                  secondaryAction={
                    <Tooltip title="Supprimer">
                      <IconButton edge="end" onClick={() => onDeleteFile(index)}>
                        <Delete color="error" />
                      </IconButton>
                    </Tooltip>
                  }
                >
                  <ListItemIcon>
                    {file.type === 'application/pdf' ? (
                      <PictureAsPdf color="error" />
                    ) : (
                      <Avatar
                        variant="rounded"
                        src={URL.createObjectURL(file)}
                        alt={file.name}
                        sx={{ width: 40, height: 40 }}
                      />
                    )}
                  </ListItemIcon>
                  <ListItemText
                    primary={file.name}
                    secondary={`${(file.size / 1024).toFixed(2)} KB`}
                  />
                </ListItem>
              ))}
            </List>
          )}
        </div>
      </FormControl>

      {/* Switches Group */}
      <div className="grid gap-2 border p-4">
        <Controller
          name="notRobot"
          control={control}
          render={({ field }) => (
            <FormControl error={!!errors.notRobot}>
              <FormControlLabel
                control={
                  <Switch
                    checked={field.value}
                    onChange={(e) => field.onChange(e.target.checked)}
                  />
                }
                label="Je ne suis pas un robot"
              />
              {errors.notRobot && (
                <FormHelperText>{errors.notRobot.message?.toString()}</FormHelperText>
              )}
            </FormControl>
          )}
        />

        <Controller
          name="acceptCgu"
          control={control}
          render={({ field }) => (
            <FormControl error={!!errors.acceptCgu}>
              <FormControlLabel
                control={
                  <Switch
                    checked={field.value}
                    onChange={(e) => field.onChange(e.target.checked)}
                  />
                }
                label="J'accepte les conditions générales d'utilisation"
              />
              {errors.acceptCgu && (
                <FormHelperText>{errors.acceptCgu.message?.toString()}</FormHelperText>
              )}
            </FormControl>
          )}
        />

        <Controller
          name="newsletter"
          control={control}
          render={({ field }) => (
            <FormControlLabel
              control={
                <Switch
                  checked={field.value}
                  onChange={(e) => field.onChange(e.target.checked)}
                />
              }
              label="S'inscrire à la newsletter"
            />
          )}
        />
      </div>
    </div>
  );
}
