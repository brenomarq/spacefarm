import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  // ========================
  // CONTAINER PRINCIPAL
  // ========================
  container: {
    flex: 1,
    backgroundColor: '#ecfdf5',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  main: {
    padding: 20,
  },
  intro: {
    marginBottom: 24,
  },
  pageTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 8,
  },
  pageDescription: {
    fontSize: 14,
    color: '#4b5563',
  },
  grid: {
    gap: 16,
  },

  // ========================
  // HEADER & LOGOS
  // ========================
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 14,
    marginTop: 10,
    position: 'relative',
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#bbf7d0',
    zIndex: 10,
  },
  menuIcon: {
    width: 22,
    height: 22,
    position: 'absolute',
    left: 20,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoWritten: {
    width: 160,
    height: 45,
  },
  logoImage: {
    width: 40,
    height: 40,
    marginLeft: 8,
  },

  // ========================
  // CARD IMAGES
  // ========================
  cardImageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  cardImage: {
    width: '70%',
    maxWidth: 350,
    height: undefined,
    aspectRatio: 1.2,
    resizeMode: 'contain',
  },

  // ========================
  // PRODUCTIVITY CARD
  // ========================
  productivityCard: {
    backgroundColor: '#22c55e',
    borderRadius: 16,
    padding: 24,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
    position: 'relative',
  },
  decorativeBgTop: {
    position: 'absolute',
    top: -20,
    right: -20,
    width: 60,
    height: 60,
    backgroundColor: '#bef264',
    borderRadius: 30,
    opacity: 0.3,
  },
  decorativeBgBottom: {
    position: 'absolute',
    bottom: -20,
    left: -20,
    width: 60,
    height: 60,
    backgroundColor: '#d9f99d',
    borderRadius: 30,
    opacity: 0.3,
  },
  cardContent: {
    position: 'relative',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 20,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardLabel: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    fontWeight: '500',
  },
  cardValue: {
    fontSize: 24,
    color: 'white',
    fontWeight: '700',
  },
  cardDescription: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
    lineHeight: 24,
    marginBottom: 20,
  },
  highlight: {
    fontWeight: '700',
  },
  statsGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  statHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  statLabel: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.7)',
  },
  statValue: {
    fontSize: 20,
    color: 'white',
    fontWeight: '700',
  },
  statSubtitle: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.6)',
    marginTop: 4,
  },
  floatingIndicator: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#bef264',
    shadowColor: '#bef264',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
  },

  // ========================
  // IRRIGATION CARD
  // ========================
  irrigationCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#bfdbfe',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    position: 'relative',
  },
  irrigationDecorative: {
    position: 'absolute',
    top: -15,
    right: -15,
    width: 50,
    height: 50,
    backgroundColor: '#93c5fd',
    borderRadius: 25,
    opacity: 0.3,
  },
  irrigationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  irrigationTitleGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  irrigationIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: '#3b82f6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  irrigationTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
  },
  irrigationStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 4,
  },
  statusText: {
    fontSize: 12,
    color: '#4b5563',
  },
  irrigationDescription: {
    fontSize: 14,
    color: '#4b5563',
    lineHeight: 20,
    marginBottom: 16,
  },
  lastCheckContainer: {
    backgroundColor: '#eff6ff',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#bfdbfe',
  },
  lastCheckHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  checkLabel: {
    fontSize: 14,
    color: '#374151',
    fontWeight: '500',
  },
  checkTime: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1d4ed8',
  },

  // ========================
  // SOIL CARD
  // ========================
  soilCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#fde68a',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    position: 'relative',
  },
  soilDecorative: {
    position: 'absolute',
    bottom: -15,
    left: -15,
    width: 50,
    height: 50,
    backgroundColor: '#fef9c3',
    borderRadius: 25,
    opacity: 0.3,
  },
  soilHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 16,
  },
  soilIconContainer: {
    width: 48,
    height: 48,
    backgroundColor: '#f59e0b',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  soilTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
  },
  soilSubtitle: {
    fontSize: 12,
    color: '#6b7280',
  },
  soilMetrics: {
    gap: 20,
  },
  humidityMetric: {
    gap: 8,
  },
  metricHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  metricLabelGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  metricLabel: {
    fontSize: 14,
    color: '#374151',
    fontWeight: '500',
  },
  metricValue: {
    fontSize: 18,
    color: '#1d4ed8',
    fontWeight: '700',
  },
  progressBar: {
    width: '100%',
    height: 8,
    backgroundColor: '#dbeafe',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#3b82f6',
    borderRadius: 4,
  },
  metricInfo: {
    fontSize: 12,
    color: '#6b7280',
  },

  // ========================
  // NUTRIENTS CARD
  // ========================
  nutrientsMetric: {
    backgroundColor: '#d1fae5',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#86efac',
  },
  nutrientsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  nutrientsLabelGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  nutrientsDot: {
    width: 8,
    height: 8,
    backgroundColor: '#22c55e',
    borderRadius: 4,
  },
  nutrientsLabel: {
    fontSize: 14,
    color: '#374151',
    fontWeight: '500',
  },
  nutrientsValue: {
    fontSize: 14,
    color: '#15803d',
    fontWeight: '700',
  },

  // ========================
  // ACTIVITIES CARD
  // ========================
  activitiesCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    position: 'relative',
  },
  activitiesDecorative: {
    position: 'absolute',
    top: -10,
    right: -10,
    width: 40,
    height: 40,
    backgroundColor: '#ddd6fe',
    borderRadius: 20,
    opacity: 0.3,
  },
  activitiesHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 20,
  },
  activitiesIconContainer: {
    width: 48,
    height: 48,
    backgroundColor: '#a855f7',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activitiesTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
  },
  activitiesSubtitle: {
    fontSize: 12,
    color: '#6b7280',
  },
  activitiesTimeline: {
    gap: 16,
  },
  timelineItem: {
    flexDirection: 'row',
    gap: 16,
  },
  timelineIndicator: {
    alignItems: 'center',
  },
  timelineIconWrapper: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#22c55e',
    justifyContent: 'center',
    alignItems: 'center',
  },
  timelineLine: {
    width: 2,
    flex: 1,
    backgroundColor: '#e5e7eb',
    marginTop: 8,
  },
  timelineContentWrapper: {
    flex: 1,
    paddingBottom: 20,
  },
  timelineContent: {
    backgroundColor: '#f9fafb',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  activityHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  activityTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
    flex: 1,
  },
  activityTime: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  timeText: {
    fontSize: 12,
    color: '#6b7280',
    fontWeight: '500',
  },
  activityDescription: {
    fontSize: 14,
    color: '#4b5563',
    lineHeight: 20,
  },

  // ========================
  // BADGES
  // ========================
  allClearBadge: {
    backgroundColor: '#d1fae5',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#86efac',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginTop: 20,
  },
  badgeIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#22c55e',
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#14532d',
  },
  badgeSubtitle: {
    fontSize: 12,
    color: '#15803d',
  },
  statusTextHeader: {
    fontSize: 12,
    color: '#4b5563',
    fontWeight: '500',
  },
});

export default styles;
