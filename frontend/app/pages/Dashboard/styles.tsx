import { StyleSheet } from 'react-native';

export const estilos = StyleSheet.create({
  // --- GERAL ---
  container: { flex: 1, backgroundColor: '#ecfdf5' },
  
  // Moldura para Notebook
  webContainer: {
    flex: 1,
    backgroundColor: '#f0f2f5',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  webFrame: {
    width: 420,
    height: '95%',
    backgroundColor: '#ecfdf5',
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: "#000",
    shadowOpacity: 0.2,
    elevation: 10,
  },

  scrollContainer: { flex: 1 },
  conteudoScroll: { paddingBottom: 40 },
  areaPrincipal: { padding: 20 },

  // --- HEADER ---
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    marginTop: 10,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#bbf7d0',
    position: 'relative',
    zIndex: 10,
  },
  iconeMenu: { width: 22, height: 22, position: 'absolute', left: 20 },
  logoContainer: { flexDirection: 'row', alignItems: 'center' },
  logoEscrita: { width: 160, height: 45 },
  logoImagem: { width: 40, height: 40, marginLeft: 8 },

  // --- TEXTOS ---
  secaoIntro: { marginBottom: 24 },
  tituloPagina: { fontSize: 28, fontWeight: '700', color: '#111827', marginBottom: 8 },
  descricaoPagina: { fontSize: 14, color: '#4b5563' },
  gradeCards: { gap: 16 },

  // --- CARDS (Estilos unificados) ---
  cardProdutividade: { backgroundColor: '#22c55e', borderRadius: 16, padding: 24, marginBottom: 16, elevation: 8 },
  cardIrrigacao: { backgroundColor: 'white', borderRadius: 16, padding: 20, marginBottom: 16, borderWidth: 1, borderColor: '#bfdbfe', elevation: 5 },
  cardSolo: { backgroundColor: 'white', borderRadius: 16, padding: 20, marginBottom: 16, borderWidth: 1, borderColor: '#fde68a', elevation: 5 },
  cardAtividades: { backgroundColor: 'white', borderRadius: 16, padding: 20, marginBottom: 16, borderWidth: 1, borderColor: '#e5e7eb', elevation: 5 },

  cardContent: { position: 'relative' },
  cardHeader: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 20 },
  
  // Ícones coloridos
  iconContainer: { width: 48, height: 48, borderRadius: 12, backgroundColor: 'rgba(255,255,255,0.2)', justifyContent: 'center', alignItems: 'center' },
  iconContainerAzul: { width: 48, height: 48, borderRadius: 12, backgroundColor: '#3b82f6', justifyContent: 'center', alignItems: 'center' },
  iconContainerAmarelo: { width: 48, height: 48, backgroundColor: '#f59e0b', borderRadius: 12, justifyContent: 'center', alignItems: 'center' },
  iconContainerRoxo: { width: 48, height: 48, backgroundColor: '#a855f7', borderRadius: 12, justifyContent: 'center', alignItems: 'center' },

  // Textos dos Cards
  cardLabel: { fontSize: 14, color: 'rgba(255,255,255,0.8)', fontWeight: '500' },
  cardValue: { fontSize: 24, color: 'white', fontWeight: '700' },
  cardTitleDark: { fontSize: 18, fontWeight: '700', color: '#111827' },
  cardDescDark: { fontSize: 14, color: '#4b5563', lineHeight: 20, marginBottom: 16 },
  cardDescription: { fontSize: 16, color: 'rgba(255,255,255,0.9)', lineHeight: 24, marginBottom: 20 },
  cardSubtitle: { fontSize: 12, color: '#6b7280' },
  highlight: { fontWeight: '700' },

  // Stats e Status
  statsGrid: { flexDirection: 'row', gap: 12 },
  statCard: { flex: 1, backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: 12, padding: 16, borderWidth: 1, borderColor: 'rgba(255,255,255,0.2)' },
  statHeader: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 8 },
  statLabel: { fontSize: 12, color: 'rgba(255,255,255,0.7)' },
  statValue: { fontSize: 20, color: 'white', fontWeight: '700' },
  statSubtitle: { fontSize: 12, color: 'rgba(255,255,255,0.6)', marginTop: 4 },
  
  floatingIndicator: { position: 'absolute', top: 0, right: 0, width: 12, height: 12, borderRadius: 6, backgroundColor: '#bef264' },
  
  titleGroup: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  statusRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 4 },
  statusText: { fontSize: 12, color: '#4b5563' },
  
  lastCheck: { backgroundColor: '#eff6ff', borderRadius: 12, padding: 16, borderWidth: 1, borderColor: '#bfdbfe' },
  lastCheckHeader: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 8 },
  checkLabel: { fontSize: 14, color: '#374151', fontWeight: '500' },
  checkTime: { fontSize: 20, fontWeight: '700', color: '#1d4ed8' },

  // Métricas do Solo
  metricsContainer: { gap: 20 },
  metricBlock: { gap: 8 },
  metricHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  metricLabelGroup: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  metricLabel: { fontSize: 14, color: '#374151', fontWeight: '500' },
  metricValue: { fontSize: 18, color: '#1d4ed8', fontWeight: '700' },
  progressBar: { width: '100%', height: 8, backgroundColor: '#dbeafe', borderRadius: 4, overflow: 'hidden' },
  progressFill: { height: '100%', backgroundColor: '#3b82f6', borderRadius: 4 },
  metricInfo: { fontSize: 12, color: '#6b7280' },
  nutrientBlock: { backgroundColor: '#d1fae5', borderRadius: 12, padding: 16, borderWidth: 1, borderColor: '#86efac' },
  greenDot: { width: 8, height: 8, backgroundColor: '#22c55e', borderRadius: 4 },
  metricValueGreen: { fontSize: 14, color: '#15803d', fontWeight: '700' },

  // Atividades
  actTitle: { fontSize: 14, fontWeight: '600', color: '#111827' },
  actTime: { fontSize: 12, color: '#6b7280' },
  actDesc: { fontSize: 14, color: '#4b5563' },
  
  allClearBadge: { backgroundColor: '#d1fae5', borderRadius: 12, padding: 16, borderWidth: 1, borderColor: '#86efac', flexDirection: 'row', alignItems: 'center', gap: 12, marginTop: 20 },
  badgeIconContainer: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#22c55e', justifyContent: 'center', alignItems: 'center' },
  badgeTitle: { fontSize: 14, fontWeight: '600', color: '#14532d' },
  badgeSubtitle: { fontSize: 12, color: '#15803d' },
});