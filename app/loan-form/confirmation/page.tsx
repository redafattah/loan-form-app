// /app/loan-form/success/page.tsx
'use client';

import { Box, Typography, Button } from '@mui/material';
import Link from 'next/link';

export default function SuccessPage() {
  return (
    <Box maxWidth={600} mx="auto" mt={10} textAlign="center">
      <Typography variant="h4" gutterBottom>
        🎉 Demande envoyée !
      </Typography>
      <Typography variant="body1" mb={4}>
        Votre demande de prêt a été soumise avec succès. Nous reviendrons vers vous très prochainement.
      </Typography>

      <Button variant="contained" component={Link} href="/">
        Retour à l'accueil
      </Button>
    </Box>
  );
}
