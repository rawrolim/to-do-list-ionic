import React from "react";
import { useState } from "react";
import { todoContextType, Item } from "../@types/todo";
import axios from "axios";
import { ENV } from "../environments/environment";
import { useIonToast } from "@ionic/react";

export const TodoContext = React.createContext<todoContextType | null>(null);

interface Props {
    children: React.ReactNode
}

export const TodoProvider: React.FC<Props> = ({ children }) => {
    const [itemApontando, setItemApontando] = useState<Item>(null);
    const [itemOpcoes, setItemOpcoes] = useState<Item>(null);
    const [dados, setDados] = useState<Item[]>([]);
    const [openModal, setOpenModal] = useState<boolean>(false);
    const [openModalOpcoes, setOpenModalOpcoes] = useState<boolean>(false);
    const [descricao, setDescricao] = useState("");
    const [_id, setId] = useState("");
    const [titulo, setTitulo] = useState("");
    const [pesquisar, setPesquisar] = useState("");
    const [present] = useIonToast();

    const dadosFiltrados = dados.filter(item => item.titulo.toLocaleUpperCase().includes(pesquisar.toUpperCase()));

    async function get() {
        const res = await axios.get(ENV.BACKEND_URI);
        const data = res.data;
        setDados(data);
    }

    function save(titulo: string, descricao: string, _id: "") {
        if (titulo == "") {
            presentToast("Necessário informar o título.", "danger");
        } else {
            if (descricao == "") {
                presentToast("Necessário informar a descrição.", "danger");
            } else {
                if (_id === "") {
                    axios.post(ENV.BACKEND_URI, {
                        titulo,
                        descricao
                    }).then(() => {
                        get();
                    })
                } else {
                    axios.put(ENV.BACKEND_URI, {
                        titulo,
                        descricao,
                        _id
                    }).then(() => {
                        get();
                    })
                }
                setOpenModal(false);
                setTitulo("");
                setDescricao("");
                presentToast("Item salvo com sucesso.", "success");
            }
        }
    }

    function deleteItem(item: Item) {
        axios.delete(ENV.BACKEND_URI + '/' + item._id)
            .then(() => {
                get();
                setOpenModalOpcoes(false);
                presentToast("Item deletado com sucesso", "success");
            });
    }

    function alteraStatusItem(item: Item) {
        item.concluido = !item.concluido;
        axios.put(ENV.BACKEND_URI + '/' + item._id, item)
            .then(() => {
                get();
                setOpenModalOpcoes(false);
                presentToast("Status alterado com sucesso", "success");
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

    return <TodoContext.Provider value={{
        itemApontando, setItemApontando,
        itemOpcoes, setItemOpcoes,
        openModalOpcoes, setOpenModalOpcoes,
        dados, setDados, dadosFiltrados,
        openModal, setOpenModal,
        descricao, setDescricao,
        titulo, setTitulo,
        _id, setId,
        pesquisar, setPesquisar,
        presentToast,
        get, save, deleteItem, alteraStatusItem
    }}>
        {children}
    </TodoContext.Provider>
}