import React from 'react';
import { 
  View, Text, ScrollView, Image, Dimensions, Platform 
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useLocalSearchParams } from 'expo-router';
import { LineChart } from "react-native-chart-kit"; 
import { estilos } from './styles';

// Ajuste de largura
const screenWidth = Platform.OS === 'web' ? 350 : Dimensions.get("window").width;

// --- GRÁFICOS ---
const graficoVerde = {
  backgroundGradientFrom: "#ffffff",
  backgroundGradientTo: "#ffffff",
  color: (opacity = 1) => `rgba(16, 185, 129, ${opacity})`,
  strokeWidth: 3, decimalPlaces: 0,
  propsForDots: { r: "5", strokeWidth: "2", stroke: "#047857" }
};
const graficoAzul = {
  backgroundGradientFrom: "#ffffff",
  backgroundGradientTo: "#ffffff",
  color: (opacity = 1) => `rgba(37, 99, 235, ${opacity})`,
  strokeWidth: 3, decimalPlaces: 0,
  propsForDots: { r: "4", strokeWidth: "2", stroke: "#1e40af" }
};

// --- CARDS ---
const CardProdutividade: React.FC = () => (
  <View style={estilos.cardProdutividade}>
    <View style={estilos.cardContent}>
      <View style={estilos.cardHeader}>
        <View style={estilos.iconContainer}><Feather name="zap" size={24} color="white" /></View>
        <View><Text style={estilos.cardLabel}>Produtividade</Text><Text style={estilos.cardValue}>+12%</Text></View>
      </View>
      <Text style={estilos.cardDescription}>Sua fazenda teve um aumento de <Text style={estilos.highlight}>12% na eficiência média</Text> do cultivo.</Text>
      <View style={{ alignItems: 'center', marginVertical: 10 }}>
        <LineChart
          data={{ labels: ["Sem 1", "Sem 2", "Sem 3", "Sem 4"], datasets: [{ data: [20, 45, 28, 80] }] }}
          width={screenWidth - 60} height={180} yAxisSuffix="kg" chartConfig={graficoVerde} bezier style={{ borderRadius: 16 }}
        />
      </View>
      <View style={estilos.statsGrid}>
        <View style={estilos.statCard}><View style={estilos.statHeader}><Feather name="trending-up" size={16} color="rgba(255, 255, 255, 0.7)" /><Text style={estilos.statLabel}>Crescimento</Text></View><Text style={estilos.statValue}>12%</Text><Text style={estilos.statSubtitle}>vs. mês anterior</Text></View>
        <View style={estilos.statCard}><View style={estilos.statHeader}><Feather name="calendar" size={16} color="rgba(255, 255, 255, 0.7)" /><Text style={estilos.statLabel}>Período</Text></View><Text style={estilos.statValue}>30</Text><Text style={estilos.statSubtitle}>dias analisados</Text></View>
      </View>
    </View>
  </View>
);

const CardIrrigacao: React.FC = () => (
  <View style={estilos.cardIrrigacao}>
    <View style={estilos.cardHeader}>
      <View style={estilos.titleGroup}><View style={estilos.iconContainerAzul}><Feather name="droplet" size={24} color="white" /></View><View><Text style={estilos.cardTitleDark}>Irrigação</Text><View style={estilos.statusRow}><Feather name="check-circle" size={16} color="#22c55e" /><Text style={estilos.statusText}>Funcionando</Text></View></View></View>
    </View>
    <Text style={estilos.cardDescDark}>O sistema de irrigação está funcionando normalmente.</Text>
    <View style={{ alignItems: 'center', marginVertical: 10 }}>
      <LineChart
        data={{ labels: ["08h", "10h", "12h", "14h", "16h"], datasets: [{ data: [60, 55, 40, 35, 65] }] }}
        width={screenWidth - 60} height={160} yAxisSuffix="%" chartConfig={graficoAzul} style={{ borderRadius: 16 }}
      />
    </View>
    <View style={estilos.lastCheck}><View style={estilos.lastCheckHeader}><Feather name="clock" size={16} color="#2563eb" /><Text style={estilos.checkLabel}>Última checagem</Text></View><Text style={estilos.checkTime}>há 2h</Text></View>
  </View>
);

const CardSolo: React.FC = () => (
  <View style={estilos.cardSolo}>
    <View style={estilos.cardHeader}><View style={estilos.iconContainerAmarelo}><Feather name="sun" size={24} color="white" /></View><View><Text style={estilos.cardTitleDark}>Condições do Solo</Text><Text style={estilos.cardSubtitle}>Monitoramento em tempo real</Text></View></View>
    <View style={estilos.metricsContainer}>
      <View style={estilos.metricBlock}><View style={estilos.metricHeader}><View style={estilos.metricLabelGroup}><Feather name="activity" size={16} color="#2563eb" /><Text style={estilos.metricLabel}>Umidade do solo</Text></View><Text style={estilos.metricValue}>65%</Text></View><View style={estilos.progressBar}><View style={[estilos.progressFill, { width: '65%' }]} /></View><Text style={estilos.metricInfo}>Nível ideal: 60-70%</Text></View>
      <View style={estilos.nutrientBlock}><View style={estilos.metricHeader}><View style={estilos.metricLabelGroup}><View style={estilos.greenDot} /><Text style={estilos.metricLabel}>Nível de nutrientes</Text></View><Text style={estilos.metricValueGreen}>Estável</Text></View></View>
    </View>
  </View>
);

const CardAtividades: React.FC = () => {
  const activities = [{ id: 1, title: 'Dados atualizados', time: '14:32', desc: 'Sincronização completa' }, { id: 2, title: 'Sem anomalias', time: '14:32', desc: 'Sistemas normais' }];
  return (
    <View style={estilos.cardAtividades}>
      <View style={estilos.cardHeader}><View style={estilos.iconContainerRoxo}><Feather name="activity" size={24} color="white" /></View><View><Text style={estilos.cardTitleDark}>Atividades Recentes</Text><Text style={estilos.cardSubtitle}>Últimas atualizações</Text></View></View>
      <View style={{ gap: 15 }}>{activities.map((act, i) => (<View key={act.id} style={{ flexDirection: 'row', gap: 10 }}><Feather name="check-circle" size={20} color="#22c55e" /><View><View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '85%' }}><Text style={estilos.actTitle}>{act.title}</Text><Text style={estilos.actTime}>{act.time}</Text></View><Text style={estilos.actDesc}>{act.desc}</Text></View></View>))}</View>
      <View style={estilos.allClearBadge}><View style={estilos.badgeIconContainer}><Feather name="check-circle" size={20} color="white" /></View><View><Text style={estilos.badgeTitle}>Sistema Operacional</Text><Text style={estilos.badgeSubtitle}>Todos os parâmetros dentro do esperado</Text></View></View>
    </View>
  );
};

// --- TELA PRINCIPAL ---
const Dashboard: React.FC = () => {
  const { nomeUsuario } = useLocalSearchParams(); 

  // Conteúdo do App (Miolo)
  const renderConteudo = () => (
    <View style={estilos.areaPrincipal}>
      <View style={estilos.secaoIntro}>
        <Text style={estilos.tituloPagina}>
          {nomeUsuario ? `Seja bem-vindo, ${nomeUsuario}!` : 'Painel de Controle'}
        </Text>
        <Text style={estilos.descricaoPagina}>Monitore o desempenho da sua fazenda em tempo real</Text>
      </View>

      <View style={estilos.gradeCards}>
        <CardProdutividade />
        <CardIrrigacao />
        <CardSolo />
        <CardAtividades />
      </View>
    </View>
  );

  // --- MOLDURA APENAS NO WEB ---
  if (Platform.OS === 'web') {
    return (
      <View style={estilos.webContainer}>
        <View style={estilos.webFrame}>
          <View style={estilos.headerContainer}>
            <Image source={require('../../../assets/images/menu.png')} style={estilos.iconeMenu} resizeMode="contain" />
            <View style={estilos.logoContainer}>
              <Image source={require('../../../assets/images/LogoEscrita.png')} style={estilos.logoEscrita} resizeMode="contain" />
              <Image source={require('../../../assets/images/Logo.png')} style={estilos.logoImagem} resizeMode="contain" />
            </View>
          </View>
          <ScrollView style={estilos.scrollContainer} contentContainerStyle={estilos.conteudoScroll} showsVerticalScrollIndicator={true}>
            {renderConteudo()}
          </ScrollView>
        </View>
      </View>
    );
  }

  // --- MOBILE: TELA CHEIA (ORIGINAL) ---
  return (
    <View style={estilos.container}>
      <View style={estilos.headerContainer}>
        <Image source={require('../../../assets/images/menu.png')} style={estilos.iconeMenu} resizeMode="contain" />
        <View style={estilos.logoContainer}>
          <Image source={require('../../../assets/images/LogoEscrita.png')} style={estilos.logoEscrita} resizeMode="contain" />
          <Image source={require('../../../assets/images/Logo.png')} style={estilos.logoImagem} resizeMode="contain" />
        </View>
      </View>
      <ScrollView style={estilos.scrollContainer} contentContainerStyle={estilos.conteudoScroll} showsVerticalScrollIndicator={false}>
        {renderConteudo()}
      </ScrollView>
    </View>
  );
};

export default Dashboard;