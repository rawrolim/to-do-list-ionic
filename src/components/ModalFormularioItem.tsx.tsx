import { Item } from "../@types/todo";
import { TodoContext } from "../contexts/todoContext";
import { ProjetoContext } from "../contexts/projetoContext";
import { useContext, useEffect } from "react";
import { IonButton, IonButtons, IonContent, IonFab, IonFabButton, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonList, IonModal, IonSelect, IonSelectOption, IonTitle, IonToolbar } from "@ionic/react";
import { add, close } from "ionicons/icons";

interface ContainerProps {
    item: Item
}

const ModalForularioItem: React.FC<ContainerProps> = ({ item }) => {
    useEffect(() => {
        if (item) {
            setTitulo(item.titulo);
            setDescricao(item.descricao);
            setProjetoId(item.projetoId);
        } else {
            setTitulo('');
            setDescricao('');
            setProjetoId('');
        }
        get();
    }, [item])

    const { setId,setProjetoId,projetoId, save, openModal, setOpenModal, setTitulo, titulo, setDescricao, descricao, _id } = useContext(TodoContext);
    const { get, dados } = useContext(ProjetoContext);

    return (
        <>
            <IonFab slot={"fixed"} horizontal="end" vertical="bottom" onClick={() => { setOpenModal(true); setId("") }}>
                <IonFabButton>
                    <IonIcon icon={add} />
                </IonFabButton>
            </IonFab>

            <IonModal isOpen={openModal}>
                <IonHeader>
                    <IonToolbar>
                        <IonTitle>
                            {item ?
                                "Editar tarefa"
                                :
                                "Criar tarefa"
                            }
                        </IonTitle>
                        <IonButtons slot="end">
                            <IonButton onClick={() => setOpenModal(false)}>
                                <IonIcon icon={close} size="large" />
                            </IonButton>
                        </IonButtons>
                    </IonToolbar>
                </IonHeader>
                <IonContent >
                    <IonList>
                        <IonItem>
                            <IonInput onIonInput={(e) => setTitulo(String(e.detail.value))} value={titulo} labelPlacement={"floating"} label="Título" placeholder="Título" />
                        </IonItem>

                        <IonItem>
                            <IonInput onIonInput={(e) => setDescricao(String(e.detail.value))} value={descricao} labelPlacement={"floating"} label="Descrição" placeholder="Descrição" />
                        </IonItem>

                        <IonItem>
                            <IonSelect value={item?.projetoId} aria-label="Projeto" placeholder="Selecione o projeto" interface="action-sheet" onIonChange={e=>setProjetoId(e.target.value)}>
                                {dados.filter(prj => prj.concluido === false).map(prjCurrent => {
                                    return <IonSelectOption key={prjCurrent._id} value={prjCurrent._id}>{prjCurrent.nome}</IonSelectOption>
                                })}
                            </IonSelect>
                        </IonItem>
                    </IonList>


                    <IonButton expand="full" style={{ position: "absolute", width: '100%', bottom: '0' }} onClick={() => { save(titulo, descricao, _id, projetoId) }}>
                        Salvar
                    </IonButton>

                </IonContent>
            </IonModal>
        </>
    )
}

export default ModalForularioItem;
