import { useQuery, gql} from '@apollo/client';
import { useTranslation } from 'react-i18next';
import Offcanvas from 'react-bootstrap/Offcanvas';
import close from "./assets/BTN_Schliessen.png";

const GET_AES_INFO_FENSTER= gql`
    query MyQuery($objectId: Int!, $lang: String!) {
        infofenster(id: $objectId, language: $lang) {
            content
            headline
            id
            subline
            image
        }
    }
`;

const AESInfoSlideIn = ({ infoId, showOffcanvas,closeOffcanvas }) => {
    const { i18n } = useTranslation();
    const lang = i18n.language;
    const { loading, error, data } = useQuery(GET_AES_INFO_FENSTER,{
        variables:  {objectId : parseInt(infoId), lang: lang},
        skip: !infoId,
        fetchPolicy: 'network-only',
    });
    function createMarkup() {
        return {__html: data?.infofenster.content};
    }
    return (
            <Offcanvas show={showOffcanvas} onHide={closeOffcanvas} onClick={closeOffcanvas} placement="end" id="offcanvas-aes-park">
                <Offcanvas.Body id="offcanvas-body-aes-park">
                    <div className="info-content-wrapper" >
                        <div className="info-subline"><h3>{data?.infofenster.subline}</h3></div>
                        <div className="info-headline"><h1>{data?.infofenster.headline}</h1></div>
                        {data?.infofenster.image && <div className="info-image"><img className="img-fluid" src={data?.infofenster.image} alt=""/></div>}
                        <div className="info-content" dangerouslySetInnerHTML={createMarkup()} />
                        {error && <div className="info-error-meldung"><p>Error : No connection to aes-park.webapp.phoenixcontact.com</p></div>}
                    </div>
                </Offcanvas.Body>
                <Offcanvas.Header onClick={closeOffcanvas}>
                    <img src={close} alt="close"/>
                </Offcanvas.Header>
            </Offcanvas>

    );
};

export default AESInfoSlideIn;