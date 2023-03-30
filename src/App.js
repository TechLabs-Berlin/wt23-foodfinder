// Routing imports
import { IonReactRouter } from '@ionic/react-router'
import { Redirect, Route } from 'react-router-dom'
import { LoadScript } from '@react-google-maps/api'

import {
    IonApp,
    IonIcon,
    IonLabel,
    IonRouterOutlet,
    IonTabBar,
    IonTabButton,
    IonTabs,
    setupIonicReact,
} from '@ionic/react'
import { homeSharp, personSharp, storefrontSharp } from 'ionicons/icons'

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css'

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css'
import '@ionic/react/css/structure.css'
import '@ionic/react/css/typography.css'

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css'
import '@ionic/react/css/float-elements.css'
import '@ionic/react/css/text-alignment.css'
import '@ionic/react/css/text-transformation.css'
import '@ionic/react/css/flex-utils.css'
import '@ionic/react/css/display.css'

/* Theme variables */
import './theme/variables.css'

// Tabs
import Profile from './pages/Profile'
import Stores from './pages/Stores'
import Home from './pages/Home'

// Pages
import SelectedProduct from './pages/SelectedProduct'

setupIonicReact()

const googleMapsApiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY

const App = () => (
    <IonApp>
        <IonReactRouter>
            <IonTabs>
                {/* Routes */}
                <IonRouterOutlet>
                    <LoadScript googleMapsApiKey={googleMapsApiKey}>
                        <Route exact path='/home'>
                            <Home />
                        </Route>
                        <Route exact path='/stores'>
                            <Stores />
                        </Route>
                        <Route path='/profile'>
                            <Profile />
                        </Route>
                        <Route exact path='/'>
                            <Redirect to='/home' />
                        </Route>
                        <Route
                            path={`/selectedProduct/:id/:product_name/:brands`}
                            render={props => <SelectedProduct {...props} />}
                        />
                    </LoadScript>
                </IonRouterOutlet>
                {/* Tabs */}
                <IonTabBar slot='bottom'>
                    <IonTabButton tab='home' href='/home'>
                        <IonIcon aria-hidden='true' icon={homeSharp} />
                        <IonLabel>Home</IonLabel>
                    </IonTabButton>
                    <IonTabButton tab='stores' href='/stores'>
                        <IonIcon aria-hidden='true' icon={storefrontSharp} />
                        <IonLabel>Stores</IonLabel>
                    </IonTabButton>
                    <IonTabButton tab='profile' href='/profile'>
                        <IonIcon aria-hidden='true' icon={personSharp} />
                        <IonLabel>Profile</IonLabel>
                    </IonTabButton>
                </IonTabBar>
            </IonTabs>
        </IonReactRouter>
    </IonApp>
)

export default App
