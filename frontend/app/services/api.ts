/**
 * ARQUIVO DE CONFIGURAÇÃO DA API
 * Responsável por conectar o aplicativo ao servidor (Back-end).
 */

import axios from 'axios';
import { Platform } from 'react-native';

// --- CONFIGURAÇÃO DE REDE ---

// SEU IP DO WI-FI (Atualize se mudar)
const IP_DO_WIFI = '192.168.15.8'; 

// Lógica inteligente:
// - Se for Web (Notebook), usa localhost.
// - Se for Celular, usa o IP da rede.
const BASE_URL = Platform.OS === 'web' 
  ? 'http://127.0.0.1:8000' 
  : `http://${IP_DO_WIFI}:8000`;

console.log(`🔌 Conectando ao servidor em: ${BASE_URL}`);

const api = axios.create({
  baseURL: BASE_URL,
});

// --- FUNÇÕES DE INTEGRAÇÃO ---

// Função para cadastrar um novo usuário
export const cadastrarUsuario = async (dados: any) => {
  try {
    // Envia os dados para a rota '/usuarios/' do Python
    const response = await api.post('/usuarios/', {
      nome: dados.name,      
      email: dados.email,
      senha: dados.password 
    });
    return response.data;
  } catch (error) {
    console.error("Erro de conexão com a API:", error);
    throw error; // Repassa o erro para a tela tratar
  }
};

export default api;