import React from "react";
import { useState } from "react";
import { projetoContextType, Projeto } from "../@types/projeto";
import axios from "axios";
import { ENV } from "../environments/environment";
import { useIonToast } from "@ionic/react";

export const ProjetoContext = React.createContext<projetoContextType | null>(null);

interface Props {
    children: React.ReactNode
}

export const ProjetoProvider: React.FC<Props> = ({ children }) => {
    const [projeto, setProjeto] = useState<Projeto>(null);
    const [dados, setDados] = useState<Projeto[]>([]);
    const [openModalFormulario, setOpenModalFormulario] = useState<boolean>(false);
    const [openModalOpcoes, setOpenModalOpcoes] = useState<boolean>(false);
    const [_id, setId] = useState("");
    const [nome, setNome] = useState("");
    const [pesquisar, setPesquisar] = useState("");
    const [present] = useIonToast();

    const dadosFiltrados = dados.filter(Projeto => Projeto.nome.toLocaleUpperCase().includes(pesquisar.toUpperCase()));

    async function get() {
        const res = await axios.get(ENV.BACKEND_URI + '/projeto');
        const data = res.data;
        setDados(data);
    }

    function save(nome: string, _id: "") {
        if (nome == "") {
            presentToast("Necessário informar o título.", "danger");
        } else {
            if (_id === "") {
                axios.post(ENV.BACKEND_URI + '/projeto', {
                    nome
                }).then(() => {
                    get();
                })
            } else {
                axios.put(ENV.BACKEND_URI + '/projeto' + '/' + _id, {
                    nome,
                    _id
                }).then(() => {
                    get();
                })
            }
            setOpenModalFormulario(false);
            setOpenModalOpcoes(false);
            setId("");
            setNome("");
            presentToast("Projeto salvo com sucesso.", "success");
        }
    }

    function deleteItem(Projeto: Projeto) {
        axios.delete(ENV.BACKEND_URI + '/projeto' + '/' + Projeto._id)
            .then(() => {
                get();
                setOpenModalOpcoes(false);
                setProjeto(null);
                presentToast("Projeto deletado com sucesso", "success");
            });
    }

    function alteraStatusItem(Projeto: Projeto) {
        Projeto.concluido = !Projeto.concluido;
        axios.put(ENV.BACKEND_URI + '/projeto' + '/' + Projeto._id, Projeto)
            .then(() => {
                get();
                setOpenModalOpcoes(false);
                setProjeto(null);
                presentToast("Status alterado com sucesso", "success");
            });
    }

    function updateItem(Projeto: Projeto) {
        axios.put(ENV.BACKEND_URI + '/projeto' + '/' + Projeto._id, Projeto)
            .then(() => {
                get();
                setOpenModalFormulario(false);
                setOpenModalOpcoes(false);
                setProjeto(null);
            });
    }

    function presentToast(message: string, color: string): void {
        present({
            message: message,
            duration: 2000,
            position: 'top',
            color: color
        })
    }

    return <ProjetoContext.Provider value={{
        projeto,
        setProjeto,
        _id,
        nome,
        setId,
        setNome,
        dados,
        dadosFiltrados,
        setDados,
        get,
        save,
        deleteItem,
        alteraStatusItem,
        updateItem,
        pesquisar,
        setPesquisar,
        openModalFormulario,
        setOpenModalFormulario,
        openModalOpcoes,
        setOpenModalOpcoes
    }}>
        {children}
    </ProjetoContext.Provider>
}