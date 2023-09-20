import { Item } from "../@types/todo";
import { TodoContext } from "../contexts/todoContext";
import { useContext, useEffect } from "react";
import { IonButton, IonButtons, IonContent, IonFab, IonFabButton, IonHeader, IonIcon, IonInput, IonItem, IonList, IonModal, IonTitle, IonToolbar } from "@ionic/react";
import { add, close } from "ionicons/icons";

interface ContainerProps {
    item: Item
}

const ModalForularioItem: React.FC<ContainerProps> = ({ item }) => {
    useEffect(()=>{
        if(item){
            setTitulo(item.titulo);
            setDescricao(item.descricao);
        }else{
            setTitulo('');
            setDescricao('');
        }
    },[item])

    const {save, openModal, setOpenModal, setTitulo,titulo, setDescricao, descricao, _id} = useContext(TodoContext);

    return (
        <>
            <IonFab slot={"fixed"} horizontal="end" vertical="bottom" onClick={() => { setOpenModal(true) }}>
                <IonFabButton>
                    <IonIcon icon={add} />
                </IonFabButton>
            </IonFab>

            <IonModal isOpen={openModal}>
                <IonHeader>
                    <IonToolbar>
                        <IonTitle>
                            {item ?
                                "Editar item"
                                :
                                "Criar item"
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
                    </IonList>


                    <IonButton expand="full" style={{position: "absolute", width: '100%', bottom:'0'}} onClick={()=>{save(titulo, descricao, _id)}}>
                        Salvar
                    </IonButton>

                </IonContent>
            </IonModal>
        </>
    )
}

export default ModalForularioItem;
