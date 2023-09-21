import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  IonToast,
  setupIonicReact
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { list, person, home, clipboard } from 'ionicons/icons';
import Home from './pages/Home/Home';
import Todo from './pages/Todo/Todo';
import User from './pages/User/User';

/* User/Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import { TodoProvider } from './contexts/todoContext';
import Projeto from './pages/Projeto/Projeto';
import { ProjetoProvider } from './contexts/projetoContext';
setupIonicReact();

const App: React.FC = () => (
  <TodoProvider>
    <ProjetoProvider>
      <IonApp>
        <IonToast />
        <IonReactRouter>
          <IonTabs>
            <IonRouterOutlet>
              <Route exact path="/home">
                <Home />
              </Route>
              <Route exact path="/projeto">
                <Projeto />
              </Route>
              <Route exact path="/todo">
                <Todo />
              </Route>
              <Route exact path="/todo/:projetoId">
                <Todo />
              </Route>
              <Route path="/user">
                <User />
              </Route>
              <Route exact path="/">
                <Redirect to="/home" />
              </Route>
            </IonRouterOutlet>

            <IonTabBar slot="bottom">
              <IonTabButton tab="home" href="/home">
                <IonIcon aria-hidden="true" icon={home} />
              </IonTabButton>
              <IonTabButton tab="projeto" href="/projeto">
                <IonIcon aria-hidden="true" icon={clipboard} />
              </IonTabButton>
              <IonTabButton tab="todo" href="/todo">
                <IonIcon aria-hidden="true" icon={list} />
              </IonTabButton>
              <IonTabButton tab="user" href="/user">
                <IonIcon aria-hidden="true" icon={person} />
              </IonTabButton>
            </IonTabBar>
          </IonTabs>
        </IonReactRouter>
      </IonApp>
    </ProjetoProvider>
  </TodoProvider>
);

export default App;
