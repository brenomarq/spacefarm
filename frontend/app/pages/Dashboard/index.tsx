import React from 'react';
import { View, Text, ScrollView, Image } from 'react-native';
import { Feather } from '@expo/vector-icons';
import styles from './styles';

// ------------------------
// COMPONENTES INDIVIDUAIS DE CARDS
// É uma boa prática manter cada card separado para melhor organização e possível reaproveitamento.

// ---------- PRODUCTIVITY CARD ----------
const ProductivityCard: React.FC = () => {
  return (
    <View style={styles.productivityCard}>
      <View style={styles.cardContent}>
        {/* Header do card com ícone e título */}
        <View style={styles.cardHeader}>
          <View style={styles.iconContainer}>
            <Feather name="zap" size={24} color="white" />
          </View>
          <View>
            <Text style={styles.cardLabel}>Produtividade</Text>
            <Text style={styles.cardValue}>+12%</Text>
          </View>
        </View>

        {/* Descrição do card */}
        <Text style={styles.cardDescription}>
          Sua fazenda teve um aumento de{' '}
          <Text style={styles.highlight}>12% na eficiência média</Text> do cultivo este mês.
        </Text>

        {/* Imagem ilustrativa abaixo da descrição */}
        <View style={styles.cardImageContainer}>
          <Image
            source={require('../../../assets/images/produtividade.png')}
            style={styles.cardImage}
            resizeMode="contain"
          />
        </View>

        {/* Estatísticas adicionais */}
        <View style={styles.statsGrid}>
          <View style={styles.statCard}>
            <View style={styles.statHeader}>
              <Feather name="trending-up" size={16} color="rgba(255, 255, 255, 0.7)" />
              <Text style={styles.statLabel}>Crescimento</Text>
            </View>
            <Text style={styles.statValue}>12%</Text>
            <Text style={styles.statSubtitle}>vs. mês anterior</Text>
          </View>

          <View style={styles.statCard}>
            <View style={styles.statHeader}>
              <Feather name="calendar" size={16} color="rgba(255, 255, 255, 0.7)" />
              <Text style={styles.statLabel}>Período</Text>
            </View>
            <Text style={styles.statValue}>30</Text>
            <Text style={styles.statSubtitle}>dias analisados</Text>
          </View>
        </View>

        {/* Indicador flutuante decorativo */}
        <View style={styles.floatingIndicator} />
      </View>
    </View>
  );
};

// ---------- IRRIGATION CARD ----------
const IrrigationCard: React.FC = () => {
  return (
    <View style={styles.irrigationCard}>
      {/* Header do card com título e status */}
      <View style={styles.irrigationHeader}>
        <View style={styles.irrigationTitleGroup}>
          <View style={styles.irrigationIconContainer}>
            <Feather name="droplet" size={24} color="white" />
          </View>
          <View>
            <Text style={styles.irrigationTitle}>Irrigação</Text>
            <View style={styles.irrigationStatus}>
              <Feather name="check-circle" size={16} color="#22c55e" />
              <Text style={styles.statusTextHeader}>Funcionando</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Descrição */}
      <Text style={styles.irrigationDescription}>
        O sistema de irrigação está funcionando normalmente.
      </Text>

      {/* Imagem ilustrativa */}
      <View style={styles.cardImageContainer}>
        <Image
          source={require('../../../assets/images/irrigacao.png')}
          style={styles.cardImage}
          resizeMode="contain"
        />
      </View>

      {/* Última checagem */}
      <View style={styles.lastCheckContainer}>
        <View style={styles.lastCheckHeader}>
          <Feather name="clock" size={16} color="#2563eb" />
          <Text style={styles.checkLabel}>Última checagem</Text>
        </View>
        <Text style={styles.checkTime}>há 2h</Text>
      </View>
    </View>
  );
};

// ---------- SOIL CARD ----------
const SoilCard: React.FC = () => {
  return (
    <View style={styles.soilCard}>
      {/* Header do solo */}
      <View style={styles.soilHeader}>
        <View style={styles.soilIconContainer}>
          <Feather name="sun" size={24} color="white" />
        </View>
        <View>
          <Text style={styles.soilTitle}>Condições do Solo</Text>
          <Text style={styles.soilSubtitle}>Monitoramento em tempo real</Text>
        </View>
      </View>

      {/* Métricas do solo */}
      <View style={styles.soilMetrics}>
        {/* Umidade do solo */}
        <View style={styles.humidityMetric}>
          <View style={styles.metricHeader}>
            <View style={styles.metricLabelGroup}>
              <Feather name="activity" size={16} color="#2563eb" />
              <Text style={styles.metricLabel}>Umidade do solo</Text>
            </View>
            <Text style={styles.metricValue}>65%</Text>
          </View>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: '65%' }]} />
          </View>
          <Text style={styles.metricInfo}>Nível ideal: 60-70%</Text>
        </View>

        {/* Nutrientes do solo */}
        <View style={styles.nutrientsMetric}>
          <View style={styles.nutrientsHeader}>
            <View style={styles.nutrientsLabelGroup}>
              <View style={styles.nutrientsDot} />
              <Text style={styles.nutrientsLabel}>Nível de nutrientes</Text>
            </View>
            <Text style={styles.nutrientsValue}>Estável</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

// ---------- RECENT ACTIVITIES ----------
const RecentActivities: React.FC = () => {
  const activities = [
    { id: 1, title: 'Dados atualizados com sucesso', time: '14:32', description: 'Sincronização completa de todos os sensores' },
    { id: 2, title: 'Nenhuma anomalia detectada', time: '14:32', description: 'Todos os sistemas operando dentro dos parâmetros normais' }
  ];

  return (
    <View style={styles.activitiesCard}>
      {/* Header do card */}
      <View style={styles.activitiesHeader}>
        <View style={styles.activitiesIconContainer}>
          <Feather name="activity" size={24} color="white" />
        </View>
        <View>
          <Text style={styles.activitiesTitle}>Atividades Recentes</Text>
          <Text style={styles.activitiesSubtitle}>Últimas atualizações do sistema</Text>
        </View>
      </View>

      {/* Timeline de atividades */}
      <View style={styles.activitiesTimeline}>
        {activities.map((activity, index) => (
          <View key={activity.id} style={styles.timelineItem}>
            <View style={styles.timelineIndicator}>
              <View style={styles.timelineIconWrapper}>
                <Feather name="check-circle" size={20} color="white" />
              </View>
              {index < activities.length - 1 && <View style={styles.timelineLine} />}
            </View>

            <View style={styles.timelineContentWrapper}>
              <View style={styles.timelineContent}>
                <View style={styles.activityHeader}>
                  <Text style={styles.activityTitle}>{activity.title}</Text>
                  <View style={styles.activityTime}>
                    <Feather name="clock" size={14} color="#6b7280" />
                    <Text style={styles.timeText}>{activity.time}</Text>
                  </View>
                </View>
                <Text style={styles.activityDescription}>{activity.description}</Text>
              </View>
            </View>
          </View>
        ))}
      </View>

      {/* Badge final */}
      <View style={styles.allClearBadge}>
        <View style={styles.badgeIconContainer}>
          <Feather name="check-circle" size={20} color="white" />
        </View>
        <View>
          <Text style={styles.badgeTitle}>Sistema Operacional</Text>
          <Text style={styles.badgeSubtitle}>Todos os parâmetros dentro do esperado</Text>
        </View>
      </View>
    </View>
  );
};

// ------------------------
// DASHBOARD PRINCIPAL
const Dashboard: React.FC = () => {
  return (
    <View style={styles.container}>
      {/* HEADER: coloquei primeiro para leitura e hierarquia */}
      <View style={styles.header}>
        {/* Menu à esquerda */}
        <Image
          source={require('../../../assets/images/menu.png')}
          style={styles.menuIcon}
          resizeMode="contain"
        />

        {/* Logo central */}
        <View style={styles.logoContainer}>
          <Image
            source={require('../../../assets/images/LogoEscrita.png')}
            style={styles.logoWritten}
            resizeMode="contain"
          />
          <Image
            source={require('../../../assets/images/Logo.png')}
            style={styles.logoImage}
            resizeMode="contain"
          />
        </View>
      </View>

      {/* MAIN CONTENT */}
      <ScrollView 
        style={styles.scrollView} 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.main}>
          {/* Introdução do dashboard */}
          <View style={styles.intro}>
            <Text style={styles.pageTitle}>Painel de Controle</Text>
            <Text style={styles.pageDescription}>
              Monitore o desempenho da sua fazenda em tempo real
            </Text>
          </View>

          {/* GRID COM TODOS OS CARDS */}
          <View style={styles.grid}>
            <ProductivityCard />
            <IrrigationCard />
            <SoilCard />
            <RecentActivities />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Dashboard;
