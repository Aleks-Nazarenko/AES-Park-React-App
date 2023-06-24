 //import React from 'react';
import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import AesMapComponent from './AES-Map';
import AesObjectComponent from "./AES-Object";
import AesStartComponent from "./AES-Start";
import AesErrorPageComponent from "./Error-Page";
import AesCamComponent from "./AES-QRScanner";
import AesARComponent from "./AES-ARScene";
import reportWebVitals from './reportWebVitals';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { BrowserRouter, Route, Routes} from 'react-router-dom';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enTranslations from './translations/en.json';
import deTranslations from './translations/de.json';

i18n
    .use(initReactI18next)
    .init({
        resources: {
            en: {
                translation: enTranslations,
            },
            de: {
                translation: deTranslations,
            },
        },
        lng: 'de', // Default language
        fallbackLng: 'de', // Fallback language
        interpolation: {
            escapeValue: false, // React already escapes values
        },
    });

const client_info = new ApolloClient({
    uri: 'https://aes-cms.webapp-dev.phoenixcontact.com/graphql-infofenster-1',
    cache: new InMemoryCache(),
});
const client_object = new ApolloClient({
    uri: 'https://aes-cms.webapp-dev.phoenixcontact.com/graphql-aes-object',
    cache: new InMemoryCache(),

});

const ApolloClients = {
    client_info,
    client_object,
};

const App = () => {

    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<AesStartComponent/>} />
                <Route path="/object/:objectId" element={<AesObjectComponent/>} client={client_object}/>
                <Route path="/map/:objectId" element={<AesMapComponent/>} client={client_info}/>
                <Route path="/cam/:objectId" element={<AesCamComponent/>} />
                <Route path="/ar" element={<AesARComponent/>} />
                <Route path="*" element={<AesErrorPageComponent />} />
            </Routes>
        </BrowserRouter>
    );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <StrictMode>
        <ApolloProvider client={ApolloClients.client_object}>
            <App />
        </ApolloProvider>
    </StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
