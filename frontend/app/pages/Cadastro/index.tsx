// Tela de Cadastro
import React, { useState } from "react";
import { Image, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { estilos } from "./styles";

// Componente principal da tela de cadastro
export default function TelaCadastro() {
  // Estado para armazenar os dados do formulário
  const [formulario, setFormulario] = useState({
    nome: "",
    email: "",
    cpf: "",
    whatsapp: "",
    nascimento: "",
    fazenda: "",
    endereco: "",
    pais: "",
    estado: "",
    cidade: "",
    cnpj: "",
    car: "",
  });

  // Atualiza os campos do formulário conforme o usuário digita
  function atualizarCampo(campo: keyof typeof formulario, valor: string) {
    setFormulario({ ...formulario, [campo]: valor });
  }

  // Função chamada ao confirmar o cadastro
  function enviarFormulario() {
    console.log("Dados enviados:", formulario);
  }

  return (
    <ScrollView style={estilos.container}>
      {/* Cabeçalho com logo e menu */}
      <View style={estilos.cabecalhoContainer}>
        <Image
          source={require("../../../assets/images/menu.png")}
          style={estilos.iconeMenu}
          resizeMode="contain"
        />
        <View style={estilos.caixaLogoTexto}>
          <Image
            source={require("../../../assets/images/LogoEscrita.png")}
            style={estilos.logoPrincipal}
            resizeMode="contain"
          />
          <Image
            source={require("../../../assets/images/Logo.png")}
            style={estilos.logoIcone}
            resizeMode="contain"
          />
        </View>
      </View>

      {/* Boas-vindas */}
      <View style={estilos.caixaBoasVindasWrapper}>
        <View style={estilos.cabecalho}>
          <Text style={estilos.tituloCabecalho}>Cadastro</Text>
        </View>
        <View style={estilos.caixaBoasVindas}>
          <View style={estilos.linhaBoasVindas}>
            <Text style={estilos.textoBoasVindas}>
              Seja bem-vindo. Vamos iniciar o seu {"\n"} cadastro de forma fácil e rápida!
            </Text>
            <Image
              source={require("../../../assets/images/localizacao.png")}
              style={estilos.iconeLocalizacao}
              resizeMode="contain"
            />
          </View>
        </View>
      </View>

      {/* Dados do Usuário */}
      <Text style={estilos.tituloSecao}>Dados do Usuário</Text>
      <TextInput
        style={estilos.campoInput}
        placeholder="Nome Completo"
        value={formulario.nome}
        onChangeText={(v) => atualizarCampo("nome", v)}
      />
      <TextInput
        style={estilos.campoInput}
        placeholder="E-mail *"
        value={formulario.email}
        onChangeText={(v) => atualizarCampo("email", v)}
        keyboardType="email-address"
      />
      <TextInput
        style={estilos.campoInput}
        placeholder="CPF *"
        value={formulario.cpf}
        onChangeText={(v) => atualizarCampo("cpf", v)}
        keyboardType="numeric"
      />
      <TextInput
        style={estilos.campoInput}
        placeholder="Whatsapp"
        value={formulario.whatsapp}
        onChangeText={(v) => atualizarCampo("whatsapp", v)}
        keyboardType="phone-pad"
      />
      <TextInput
        style={estilos.campoInput}
        placeholder="Data de Nascimento"
        value={formulario.nascimento}
        onChangeText={(v) => atualizarCampo("nascimento", v)}
      />
      <Text style={estilos.camposObrigatorios}>Dados Obrigatórios (*)</Text>

      {/* Dados da Fazenda */}
      <Text style={estilos.tituloSecao}>Dados da Fazenda Principal</Text>
      <TextInput
        style={estilos.campoInput}
        placeholder="Nome da fazenda"
        value={formulario.fazenda}
        onChangeText={(v) => atualizarCampo("fazenda", v)}
      />
      <TextInput
        style={estilos.campoInput}
        placeholder="Endereço"
        value={formulario.endereco}
        onChangeText={(v) => atualizarCampo("endereco", v)}
      />
      <TextInput
        style={estilos.campoInput}
        placeholder="País"
        value={formulario.pais}
        onChangeText={(v) => atualizarCampo("pais", v)}
      />

      {/* Estado e Cidade lado a lado */}
      <View style={estilos.camposLadoALado}>
        <TextInput
          style={[estilos.campoInput, estilos.ajusteLateral]}
          placeholder="Estado"
          value={formulario.estado}
          onChangeText={(v) => atualizarCampo("estado", v)}
        />
        <TextInput
          style={[estilos.campoInput, estilos.ajusteLateral]}
          placeholder="Cidade"
          value={formulario.cidade}
          onChangeText={(v) => atualizarCampo("cidade", v)}
        />
      </View>

      <TextInput
        style={estilos.campoInput}
        placeholder="CNPJ"
        value={formulario.cnpj}
        onChangeText={(v) => atualizarCampo("cnpj", v)}
      />
      <TextInput
        style={estilos.campoInput}
        placeholder="CAR (Cadastro Ambiental Rural) *"
        value={formulario.car}
        onChangeText={(v) => atualizarCampo("car", v)}
      />
      <Text style={estilos.camposObrigatorios}>Dados Obrigatórios (*)</Text>

      {/* Botão de enviar */}
      <TouchableOpacity style={estilos.botao} onPress={enviarFormulario}>
        <Text style={estilos.textoBotao}>Confirmar Dados</Text>
      </TouchableOpacity>

      {/* Espaço final */}
      <View style={{ height: 40 }} />
    </ScrollView>
  );
}
