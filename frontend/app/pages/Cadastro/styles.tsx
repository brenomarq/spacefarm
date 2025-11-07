// Estilos da tela de Cadastro
import { StyleSheet } from "react-native";

export const estilos = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff", // Fundo branco
    paddingHorizontal: 0,
  },
  cabecalhoContainer: {
    flexDirection: "row", // Itens em linha
    alignItems: "center", // Alinha verticalmente
    marginTop: 38,
    marginBottom: 5,
    justifyContent: "center", // Centraliza horizontalmente
    position: "relative",
  },
  iconeMenu: {
    width: 22,
    height: 22,
    position: "absolute", // Ícone flutuante
    left: 20,
  },
  caixaLogoTexto: {
    flexDirection: "row", // Logo e texto lado a lado
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    marginLeft: 45,
  },
  logoPrincipal: {
    width: 160,
    height: 45, // Logo principal
  },
  logoIcone: {
    width: 40,
    height: 40, // Ícone do logo
    marginLeft: 8,
  },
  caixaBoasVindasWrapper: {
    width: "100%",
    alignSelf: "center",
    borderRadius: 16,
    overflow: "hidden",
    marginTop: 1,
  },
  cabecalho: {
    backgroundColor: "#A6E22E", // Fundo verde do cabeçalho
    paddingVertical: 6,
    width: "100%",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  tituloCabecalho: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
    color: "#000", // Título do cabeçalho
  },
  caixaBoasVindas: {
    backgroundColor: "#E7FBD3", // Fundo do box de boas-vindas
    paddingVertical: 14,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
  },
  linhaBoasVindas: {
    flexDirection: "row", // Ícone e texto lado a lado
    alignItems: "center",
    justifyContent: "center",
  },
  textoBoasVindas: {
    textAlign: "center",
    color: "#333",
    fontSize: 17,
    fontWeight: "600",
    paddingRight: 6,
    flexShrink: 1, // Ajusta o tamanho do texto
  },
  iconeLocalizacao: {
    width: 20,
    height: 20, // Ícone de localização
    marginLeft: 6,
  },
  tituloSecao: {
    fontWeight: "bold",
    fontSize: 16,
    marginTop: 20,
    marginBottom: 8,
    textAlign: "center", // Título das seções
  },
  campoInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    padding: 10,
    marginBottom: 10,
    marginHorizontal: 18, // Campos de input
  },
  camposLadoALado: {
    flexDirection: "row", // Dois campos na mesma linha
    justifyContent: "space-between",
  },
  ajusteLateral: {
    flex: 1,
    marginHorizontal: 18, // Ajuste lateral para inputs
  },
  camposObrigatorios: {
    fontSize: 12,
    color: "#999",
    marginBottom: 10,
    textAlign: "right",
    marginHorizontal: 18, // Texto de campos obrigatórios
  },
  botao: {
    backgroundColor: "#1D7732",
    borderRadius: 6,
    padding: 14,
    alignItems: "center",
    marginTop: 10,
    marginHorizontal: 18, // Botão de enviar
  },
  textoBotao: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16, // Texto do botão
  },
});
