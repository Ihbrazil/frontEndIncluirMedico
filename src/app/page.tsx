"use client";

import styles from "./page.module.css";
import { FormEvent, useState } from "react";
import {  Rowdies, Quicksand } from 'next/font/google'

import axios, { AxiosError } from "axios";
import { InputMask } from "@react-input/mask";

const eduvic = Rowdies({ subsets: ['latin'], weight: ['300'] });
const quicksand = Quicksand({subsets: ['latin'], weight: ['600']});

export default function Home() {

  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [email, setEmail] = useState("");
  const [descricao, setDescricao] = useState("");
  

  const [mensagem, setMensagem] = useState("");
  const [erro, setErro] = useState(false);

  function limpaCampos() {
    setNome("");
    setTelefone("");
    setEmail("");
    setDescricao("");
  }

  async function handleCadastraMedico(event: FormEvent) {
    event.preventDefault();

    const endpoint = 'http://localhost:9000/medicos';

    try {
      await axios.post(endpoint, {nome,telefone,email,descricao});
      limpaCampos();

      setMensagem("Usuário cadastrado com sucesso");
      setErro(false);

    } catch (error) {
      
      type errorDataType = {
        mensagem: string;
      }

      const _erro = error as AxiosError;
      const _erroData = _erro.response?.data as errorDataType;
     const mensagemErro = _erroData?.mensagem || "erro desconhecido";

     setMensagem(mensagemErro);
      setErro(true);
    }
  }

  return (
    <main className={styles.main}>
      <h1 className={[styles.h1, eduvic.className].join(" ")}>Incluir Médico</h1>

      <form className={styles.form}>
        <input className={[styles.input, quicksand.className].join(" ")} placeholder="nome" type="text" onChange={(inputNome) => setNome(inputNome.currentTarget.value)} defaultValue={nome}/>
        <InputMask onChange={(inputTelefone) => setTelefone(inputTelefone.currentTarget.value)} defaultValue={telefone} placeholder="telefone" className={[styles.input, quicksand.className].join(" ")} mask="(__) _____-____" replacement={{ _: /\d/ }} />
        <input className={[styles.input, quicksand.className].join(" ")} placeholder="email" type="email" onChange={(inputEmail) => setEmail(inputEmail.currentTarget.value)} defaultValue={email}/>
        <input className={[styles.input, quicksand.className].join(" ")} placeholder="descricao" type="text" onChange={(inputDescricao) => setDescricao(inputDescricao.currentTarget.value)} defaultValue={descricao}/>
        {
          (mensagem !== "") 
          ? 
            <p className={erro ? [styles.mensagem, styles.erro, quicksand.className].join(" ") : [styles.mensagem, styles.sucesso, quicksand.className].join(" ")}>{mensagem}</p>
          :
            <></>
        }
        <button className={[styles.button, quicksand.className].join(" ")} onClick={(event) => handleCadastraMedico(event)} type="submit">registrar</button>
      </form>
    </main>
  );
}
