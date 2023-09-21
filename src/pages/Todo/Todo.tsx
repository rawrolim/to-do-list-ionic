import { IonButton, IonButtons, IonContent, IonFab, IonFabButton, IonHeader, IonIcon, IonPage, IonSearchbar, IonTitle, IonToolbar } from '@ionic/react';
import './Todo.css';
import { useEffect, useState, useContext } from 'react';
import Lista from '../../components/Lista';
import { TodoContext } from '../../contexts/todoContext';
import ModalForularioItem from '../../components/ModalFormularioItem.tsx';
import ModalOpcoes from '../../components/ModalOpcoes';
import { useParams } from 'react-router';
import { ProjetoContext } from '../../contexts/projetoContext';

interface ProjetoDetailPageProps {
  projetoId: string
}

const Todo: React.FC = () => {
  const [filtroItensConcluidos, setFiltroItensConcluidos] = useState<boolean>(false);

  const params = useParams<ProjetoDetailPageProps>();

  const {dadosFiltrados, get, pesquisar, setPesquisar, itemOpcoes } = useContext(TodoContext)
  const projetoContextAll = useContext(ProjetoContext)
  
  useEffect(() => {
    get();
    projetoContextAll.get();
  }, [])

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Lista de tarefas
            {params.projetoId !== undefined &&
              <label style={{marginLeft: '5px'}}>
                projeto {projetoContextAll.dados.find(prj => prj._id === params.projetoId).nome}
              </label>
            }  
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Lista</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonSearchbar value={pesquisar} onIonInput={e=>setPesquisar(e.target.value)}   style={{paddingLeft: '3px', paddingRight: '3px'}} animated={true} placeholder='Pesquisar' />

        <IonButtons style={{marginTop:"5px"}}>
          <IonButton style={{width:'50%'}} fill={filtroItensConcluidos? "outline":"solid"} color={"primary"} onClick={()=>setFiltroItensConcluidos(false)}>
            Pendentes
          </IonButton>
          <IonButton style={{width:'50%'}} fill={!filtroItensConcluidos? "outline":"solid"} color={"primary"} onClick={()=>setFiltroItensConcluidos(true)}>
            Concluídos
          </IonButton>
        </IonButtons>


        {dadosFiltrados && dadosFiltrados.filter(i => i.concluido === filtroItensConcluidos).map(item => {
          if(params.projetoId !== undefined){
            if(item.projetoId === params.projetoId)
              return <Lista item={item} key={item._id} />
          }else{
            return <Lista item={item} key={item._id} />
          }
        })}

        <ModalForularioItem item={itemOpcoes} />

        <ModalOpcoes />

      </IonContent>
    </IonPage>
  );
};

export default Todo;
