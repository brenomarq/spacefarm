import { StyleSheet } from "react-native";

export const estilos = StyleSheet.create({
  // --- CONFIGURAÇÃO GERAL ---
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  // --- MOLDURA PARA WEB (Notebook) ---
  // Cria o visual de "celular" no meio da tela do computador
  webContainer: {
    flex: 1,
    backgroundColor: '#f0f2f5', // Fundo cinza para destacar o app
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  webFrame: {
    width: 420, // Largura ideal para simular um smartphone grande
    height: '95%',
    backgroundColor: '#fff',
    borderRadius: 30, // Bordas bem arredondadas
    overflow: 'hidden',
    shadowColor: "#000", // Sombra para dar profundidade
    shadowOpacity: 0.2,
    shadowRadius: 20,
    elevation: 10,
  },

  // --- CABEÇALHO (Topo da tela) ---
  cabecalhoContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 38, // Espaço para não ficar embaixo da barra de status (bateria/sinal)
    marginBottom: 5,
    position: "relative",
  },
  iconeMenu: {
    width: 22,
    height: 22,
    position: "absolute",
    left: 20, // Mantém o menu fixo na esquerda
  },
  caixaLogoTexto: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 0, 
  },
  logoPrincipal: {
    width: 160,
    height: 45,
    resizeMode: 'contain',
  },
  logoIcone: {
    width: 40,
    height: 40,
    marginLeft: 8,
    resizeMode: 'contain',
  },

  // --- BARRA DE BOAS-VINDAS ---
  caixaBoasVindasWrapper: {
    width: "100%",
    marginTop: 10,
    borderRadius: 16,
    overflow: "hidden", // Garante que o fundo verde respeite as bordas redondas
  },
  cabecalho: {
    backgroundColor: "#A6E22E", // Verde mais forte
    paddingVertical: 6,
    width: "100%",
    alignItems: "center",
  },
  tituloCabecalho: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#000",
  },
  caixaBoasVindas: {
    backgroundColor: "#E7FBD3", // Verde claro
    paddingVertical: 14,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  linhaBoasVindas: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  textoBoasVindas: {
    textAlign: "center",
    color: "#333",
    fontSize: 17,
    fontWeight: "600",
    flexShrink: 1,
  },

  // --- FORMULÁRIO (Inputs) ---
  tituloSecao: {
    fontWeight: "bold",
    fontSize: 16,
    marginTop: 20,
    marginBottom: 8,
    textAlign: "center",
    color: "#333",
  },
  campoInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    padding: 12,         // Área de toque confortável
    marginBottom: 12,
    marginHorizontal: 18, // Margem lateral para não colar na borda
    backgroundColor: "#fff",
    fontSize: 15,
  },
  
  // Layout para inputs lado a lado (Estado e Cidade)
  camposLadoALado: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 18,
    marginBottom: 12,
  },
  ajusteLateral: {
    marginHorizontal: 0, // Remove a margem padrão para não somar
    marginBottom: 0,
    width: '48%', // Ocupa quase metade da tela cada um
  },

  camposObrigatorios: {
    fontSize: 12,
    color: "#999",
    marginBottom: 20,
    textAlign: "right",
    marginHorizontal: 18,
  },

  // --- BOTÃO DE AÇÃO ---
  botao: {
    backgroundColor: "#1D7732", // Verde Escuro (Identidade da marca)
    borderRadius: 6,
    paddingVertical: 15,
    alignItems: "center",
    marginTop: 10,
    marginHorizontal: 18,
    elevation: 2, // Sombra leve
  },
  textoBotao: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
    textTransform: "uppercase",
  },
});