import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
} from '@react-pdf/renderer';
import { LoanFormData } from '../schemas/loanFormSchema';

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 12,
    fontFamily: 'Helvetica',
    lineHeight: 1.6,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 100,
    height: 40,
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 8,
    marginTop: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    borderBottomStyle: 'solid',
    paddingBottom: 4,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e5e5',
    borderBottomStyle: 'solid',
    paddingBottom: 6,
    marginBottom: 6,
  },
  label: {
    fontWeight: 'bold',
    color: '#444',
    width: '45%',
  },
  value: {
    width: '55%',
    textAlign: 'right',
    color: '#000',
  },
  dateBlock: {
    marginTop: 12,
    textAlign: 'right',
  },
  footer: {
    marginTop: 40,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    borderTopStyle: 'solid',
    paddingTop: 12,
  },
  footerText: {
    fontSize: 10,
    textAlign: 'center',
    color: '#888',
  },
});

export default function RecapPdfDocument({ data }: { data: LoanFormData }) {
  const today = new Date().toLocaleDateString('fr-FR');

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Image
            src="https://upload.wikimedia.org/wikipedia/commons/a/ab/Logo_TV_2015.png"
            style={styles.logo}
          />
          <Text style={styles.title}>Résumé de la demande de prêt</Text>
        </View>

        {/* Date */}
        <View style={styles.dateBlock}>
          <Text>Généré le : {today}</Text>
        </View>

        {/* Loan Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Informations sur le prêt</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Mon besoin</Text>
            <Text style={styles.value}>{data.besoin}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Type de client</Text>
            <Text style={styles.value}>{data.clientType}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Montant demandé</Text>
            <Text style={styles.value}>{data.amount} MAD</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Durée du prêt</Text>
            <Text style={styles.value}>{data.duration} mois</Text>
          </View>
        </View>

        {/* Financial Situation */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Situation financière</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Revenu mensuel</Text>
            <Text style={styles.value}>{data.revenu} MAD</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Charges mensuelles</Text>
            <Text style={styles.value}>{data.charges} MAD</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>A des crédits existants</Text>
            <Text style={styles.value}>{data.hasCredit === 'oui' ? 'Oui' : 'Non'}</Text>
          </View>
          {data.hasCredit === 'oui' && (
            <>
              <View style={styles.row}>
                <Text style={styles.label}>Montant crédit existant</Text>
                <Text style={styles.value}>{data.existingCreditAmount} MAD</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.label}>Type crédit existant</Text>
                <Text style={styles.value}>{data.existingCreditType}</Text>
              </View>
            </>
          )}
        </View>

        {/* Identity */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Identité</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Civilité</Text>
            <Text style={styles.value}>{data.civilite}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Nom complet</Text>
            <Text style={styles.value}>{data.prenom} {data.nom}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Téléphone</Text>
            <Text style={styles.value}>{data.phone}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Email</Text>
            <Text style={styles.value}>{data.email}</Text>
          </View>
        </View>

        {/* Footer note */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Ce document est généré automatiquement et ne remplace pas un accord officiel.
          </Text>
        </View>
      </Page>
    </Document>
  );
}
