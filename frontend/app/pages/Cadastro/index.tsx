import React, { useState } from "react";
import { 
  Image, ScrollView, Text, TextInput, TouchableOpacity, View, Alert, 
  ActivityIndicator, Modal, FlatList, Platform 
} from "react-native";
import { router } from "expo-router"; 
import { cadastrarUsuario } from "../../services/api"; 
import { estilos } from "./styles";

const ESTADOS_BRASIL = [
  "AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA", "MT", "MS", "MG", 
  "PA", "PB", "PR", "PE", "PI", "RJ", "RN", "RS", "RO", "RR", "SC", "SP", "SE", "TO"
];

export default function TelaCadastro() {
  const [carregando, setCarregando] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  
  // Estado para guardar os dados digitados
  const [formulario, setFormulario] = useState({
    nome: "", email: "", senha: "", cpf: "", whatsapp: "", nascimento: "", 
    fazenda: "", endereco: "", pais: "Brasil", estado: "", cidade: "", cnpj: "", car: "",
  });

  // --- MÁSCARAS DE FORMATAÇÃO ---
  const formatarCPF = (v: string) => v.replace(/\D/g, '').replace(/(\d{3})(\d)/, '$1.$2').replace(/(\d{3})(\d)/, '$1.$2').replace(/(\d{3})(\d{1,2})/, '$1-$2').replace(/(-\d{2})\d+?$/, '$1');
  const formatarCNPJ = (v: string) => v.replace(/\D/g, '').replace(/^(\d{2})(\d)/, '$1.$2').replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3').replace(/\.(\d{3})(\d)/, '.$1/$2').replace(/(\d{4})(\d)/, '$1-$2').replace(/(-\d{2})\d+?$/, '$1');
  const formatarTelefone = (v: string) => v.replace(/\D/g, '').replace(/^(\d{2})(\d)/, '($1) $2').replace(/(\d{5})(\d)/, '$1-$2').replace(/(-\d{4})\d+?$/, '$1');
  const formatarData = (v: string) => v.replace(/\D/g, '').replace(/(\d{2})(\d)/, '$1/$2').replace(/(\d{2})(\d)/, '$1/$2').replace(/(\d{4})\d+?$/, '$1');

  function atualizarCampo(campo: string, valor: string) {
    let valorFormatado = valor;
    if (campo === 'cpf') valorFormatado = formatarCPF(valor);
    if (campo === 'cnpj') valorFormatado = formatarCNPJ(valor);
    if (campo === 'whatsapp') valorFormatado = formatarTelefone(valor);
    if (campo === 'nascimento') valorFormatado = formatarData(valor);
    setFormulario({ ...formulario, [campo]: valorFormatado });
  }

  const selecionarEstado = (sigla: string) => {
    setFormulario({ ...formulario, estado: sigla });
    setModalVisible(false);
  };

  // --- VALIDAÇÃO E ENVIO ---
  async function enviarFormulario() {
    // Verifica campos obrigatórios um por um
    if (!formulario.nome) return Alert.alert("Campo Obrigatório", "Falta preencher o Nome Completo.");
    if (!formulario.email) return Alert.alert("Campo Obrigatório", "Falta preencher o E-mail.");
    if (!formulario.senha) return Alert.alert("Campo Obrigatório", "Falta criar uma Senha.");
    if (!formulario.cpf) return Alert.alert("Campo Obrigatório", "Falta preencher o CPF.");
    if (!formulario.fazenda) return Alert.alert("Campo Obrigatório", "Falta preencher o Nome da Fazenda.");
    if (!formulario.car) return Alert.alert("Campo Obrigatório", "Falta preencher o CAR.");

    if (formulario.cpf.length < 14) return Alert.alert("Erro", "O CPF digitado parece incompleto.");

    setCarregando(true);

    try {
      await cadastrarUsuario({
        name: formulario.nome,
        email: formulario.email,
        password: formulario.senha
      });

      Alert.alert(
        "Sucesso!", 
        "Usuário cadastrado no banco de dados com sucesso!", 
        [
          { 
            text: "Entrar no App", 
            onPress: () => {
              router.replace({ pathname: "/pages/Dashboard", params: { nomeUsuario: formulario.nome } });
            } 
          }
        ]
      );
    } catch (error) {
      console.error(error);
      Alert.alert("Erro", "Não foi possível cadastrar. Verifique se o e-mail já existe.");
    } finally {
      setCarregando(false);
    }
  }

  // --- CONTEÚDO DO FORMULÁRIO (Reutilizável) ---
  const renderConteudo = () => (
    <>
      {/* Modal de Estado */}
      <Modal animationType="slide" transparent={true} visible={modalVisible} onRequestClose={() => setModalVisible(false)}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <View style={{ backgroundColor: 'white', width: '80%', height: '60%', borderRadius: 10, padding: 20 }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 15, textAlign: 'center' }}>Selecione o Estado</Text>
            <FlatList data={ESTADOS_BRASIL} keyExtractor={(item) => item} renderItem={({ item }) => (
                <TouchableOpacity style={{ padding: 15, borderBottomWidth: 1, borderBottomColor: '#eee' }} onPress={() => selecionarEstado(item)}>
                  <Text style={{ fontSize: 16, textAlign: 'center' }}>{item}</Text>
                </TouchableOpacity>
              )} />
            <TouchableOpacity style={{ marginTop: 15, padding: 10, backgroundColor: '#ff4444', borderRadius: 5 }} onPress={() => setModalVisible(false)}>
              <Text style={{ color: 'white', textAlign: 'center', fontWeight: 'bold' }}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Cabeçalho */}
      <View style={estilos.cabecalhoContainer}>
        <Image source={require("../../../assets/images/menu.png")} style={estilos.iconeMenu} resizeMode="contain" />
        <View style={estilos.caixaLogoTexto}>
          <Image source={require("../../../assets/images/LogoEscrita.png")} style={estilos.logoPrincipal} resizeMode="contain" />
          <Image source={require("../../../assets/images/Logo.png")} style={estilos.logoIcone} resizeMode="contain" />
        </View>
      </View>

      {/* Boas-vindas */}
      <View style={estilos.caixaBoasVindasWrapper}>
        <View style={estilos.cabecalho}><Text style={estilos.tituloCabecalho}>Cadastro</Text></View>
        <View style={estilos.caixaBoasVindas}>
          <View style={estilos.linhaBoasVindas}><Text style={estilos.textoBoasVindas}>Seja bem-vindo. Vamos iniciar o seu {"\n"}cadastro!</Text></View>
        </View>
      </View>

      {/* Campos de Usuário */}
      <Text style={estilos.tituloSecao}>Dados do Usuário</Text>
      <TextInput style={estilos.campoInput} placeholder="Nome Completo *" value={formulario.nome} onChangeText={(v) => atualizarCampo("nome", v)} />
      <TextInput style={estilos.campoInput} placeholder="E-mail *" value={formulario.email} onChangeText={(v) => atualizarCampo("email", v)} keyboardType="email-address" autoCapitalize="none"/>
      <TextInput style={estilos.campoInput} placeholder="Senha *" value={formulario.senha} onChangeText={(v) => atualizarCampo("senha", v)} secureTextEntry={true} />
      <TextInput style={estilos.campoInput} placeholder="CPF * (000.000.000-00)" value={formulario.cpf} onChangeText={(v) => atualizarCampo("cpf", v)} keyboardType="numeric" maxLength={14}/>
      <TextInput style={estilos.campoInput} placeholder="Whatsapp (DD) 00000-0000" value={formulario.whatsapp} onChangeText={(v) => atualizarCampo("whatsapp", v)} keyboardType="phone-pad" maxLength={15}/>
      <TextInput style={estilos.campoInput} placeholder="Data de Nascimento (DD/MM/AAAA)" value={formulario.nascimento} onChangeText={(v) => atualizarCampo("nascimento", v)} keyboardType="numeric" maxLength={10}/>

      {/* Campos da Fazenda */}
      <Text style={estilos.tituloSecao}>Dados da Fazenda Principal</Text>
      <TextInput style={estilos.campoInput} placeholder="Nome da fazenda *" value={formulario.fazenda} onChangeText={(v) => atualizarCampo("fazenda", v)} />
      <TextInput style={estilos.campoInput} placeholder="Endereço" value={formulario.endereco} onChangeText={(v) => atualizarCampo("endereco", v)} />
      <TextInput style={estilos.campoInput} placeholder="País" value={formulario.pais} onChangeText={(v) => atualizarCampo("pais", v)} />

      <View style={estilos.camposLadoALado}>
        <TouchableOpacity style={[estilos.campoInput, estilos.ajusteLateral, { justifyContent: 'center' }]} onPress={() => setModalVisible(true)}>
          <Text style={{ color: formulario.estado ? '#000' : '#aaa' }}>{formulario.estado || "Estado (UF)"}</Text>
        </TouchableOpacity>
        <TextInput style={[estilos.campoInput, estilos.ajusteLateral]} placeholder="Cidade" value={formulario.cidade} onChangeText={(v) => atualizarCampo("cidade", v)} />
      </View>

      <TextInput style={estilos.campoInput} placeholder="CNPJ (XX.XXX.XXX/0001-XX)" value={formulario.cnpj} onChangeText={(v) => atualizarCampo("cnpj", v)} keyboardType="numeric" maxLength={18} />
      <TextInput style={estilos.campoInput} placeholder="CAR (Cadastro Ambiental Rural) *" value={formulario.car} onChangeText={(v) => atualizarCampo("car", v)} />
      
      <Text style={estilos.camposObrigatorios}>Campos com (*) são obrigatórios</Text>

      <TouchableOpacity style={[estilos.botao, carregando && { opacity: 0.7 }]} onPress={enviarFormulario} disabled={carregando}>
        {carregando ? <ActivityIndicator color="#FFF" /> : <Text style={estilos.textoBotao}>Confirmar Dados</Text>}
      </TouchableOpacity>

      <View style={{ height: 60 }} />
    </>
  );

  // --- RENDERIZAÇÃO FINAL (Lógica da Moldura) ---
  if (Platform.OS === 'web') {
    return (
      <View style={estilos.webContainer}>
        <View style={estilos.webFrame}>
          <ScrollView style={estilos.container} contentContainerStyle={{ flexGrow: 1, paddingBottom: 50 }} showsVerticalScrollIndicator={true}>
            {renderConteudo()}
          </ScrollView>
        </View>
      </View>
    );
  }

  return (
    <ScrollView style={estilos.container} contentContainerStyle={{ flexGrow: 1, paddingBottom: 40 }}>
      {renderConteudo()}
    </ScrollView>
  );
}