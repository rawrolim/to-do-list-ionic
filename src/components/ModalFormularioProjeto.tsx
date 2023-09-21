import { useContext, useEffect } from "react";
import { IonButton, IonButtons, IonContent, IonFab, IonFabButton, IonHeader, IonIcon, IonInput, IonItem, IonList, IonModal, IonTitle, IonToolbar } from "@ionic/react";
import { add, close } from "ionicons/icons";
import { Projeto } from "../@types/projeto";
import { ProjetoContext } from "../contexts/projetoContext";

interface ContainerProps {
    item: Projeto
}

const ModalForularioProjeto: React.FC<ContainerProps> = ({ item }) => {
    useEffect(()=>{
        if(item){
            setNome(item.nome);
        }else{
            setNome('');
        }
    },[item])

    const {save,setId, setNome,nome, _id, setOpenModalFormulario,openModalFormulario} = useContext(ProjetoContext);

    return (
        <>
            <IonFab slot={"fixed"} horizontal="end" vertical="bottom" onClick={() => { setOpenModalFormulario(true); setId("") }}>
                <IonFabButton>
                    <IonIcon icon={add} />
                </IonFabButton>
            </IonFab>

            <IonModal isOpen={openModalFormulario}>
                <IonHeader>
                    <IonToolbar>
                        <IonTitle>
                            {item ?
                                "Editar projeto"
                                :
                                "Criar projeto"
                            }
                        </IonTitle>
                        <IonButtons slot="end">
                            <IonButton onClick={() => setOpenModalFormulario(false)}>
                                <IonIcon icon={close} size="large" />
                            </IonButton>
                        </IonButtons>
                    </IonToolbar>
                </IonHeader>
                <IonContent >
                    <IonList>
                        <IonItem>
                            <IonInput onIonInput={(e) => setNome(String(e.detail.value))} value={nome} labelPlacement={"floating"} label="Título" placeholder="Título" />
                        </IonItem>
                    </IonList>


                    <IonButton expand="full" style={{position: "absolute", width: '100%', bottom:'0'}} onClick={()=>{save(nome, _id)}}>
                        Salvar
                    </IonButton>

                </IonContent>
            </IonModal>
        </>
    )
}

export default ModalForularioProjeto;
