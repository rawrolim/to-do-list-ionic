export interface Projeto {
    _id: string;
    nome: string;
    concluido: boolean;
    createdAt: string;
    updatedAt: string;
}

export type projetoContextType = {
    projeto: Projeto;
    setProjeto: (projeto: Projeto) => void;
    _id: string;
    nome: string;
    pesquisar: string;
    setId: (value:string) => void;
    setNome: (value:string) => void;
    setPesquisar: (input: string) => void;

    dados: Projeto[];
    dadosFiltrados: Projeto[];
    setDados: (itens: Projeto[]) => void;

    get: () => Promise<void>;
    save: (nme:string,_id:string) => void;
    deleteItem: (projeto: Projeto) => void;
    alteraStatusItem: (projeto: Projeto) => void;
    updateItem: (projeto: Projeto) => void;

    openModalFormulario: boolean,
    setOpenModalFormulario: (bol: boolean) => void,
    openModalOpcoes: boolean,
    setOpenModalOpcoes: (bol: boolean) => void,
}