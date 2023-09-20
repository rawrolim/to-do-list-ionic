export interface Item {
    _id: string;
    comentarios: [];
    concluido: boolean;
    descricao: string;
    tempo: number;
    titulo: string;
    updatedAt: string;
}

export type todoContextType = {
    itemApontando: Item;
    setItemApontando: (todo: Item) => void;
    itemOpcoes: Item;
    setItemOpcoes: (todo: Item) => void;
    dados: Item[];
    dadosFiltrados: Item[];
    setDados: (itens: Item[]) => void;
    titulo: string;
    setTitulo: (titulo: string) => void;
    descricao: string;
    setDescricao: (descricao: string) => void;
    _id: string;
    setId: (id: string) => void;
    openModal: boolean;
    setOpenModal: (isOpen: boolean) => void;
    openModalOpcoes: boolean;
    setOpenModalOpcoes: (isOpen: boolean) => void;
    pesquisar: string;
    setPesquisar: (input: string) => void;

    get: () => Promise<void>;
    save: (titulo:string, descricao: string, _id: string) => void;
    presentToast: (message: string, color: string) => void;
    deleteItem: (todo: Item) => void;
    alteraStatusItem: (todo: Item) => void;
    updateItem: (todo: Item) => void;
}
