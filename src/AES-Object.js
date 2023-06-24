import ReactPlayer from 'react-player'
import { useQuery, gql } from '@apollo/client';
import { useParams } from 'react-router-dom';
import AESNavButtons from "./AES-Nav-Buttons";
import { useTranslation } from 'react-i18next';
import AESLangSwitch from "./AES-Lang-Switch";
import BG from './assets/HG_Menue.png';


const map_aes_objects = (obj) => {
    if(obj === 'c-01') return 4;
    if(obj === 'c-02') return 5;
    if(obj === 'c-03') return 6;
    if(obj === 'c-04') return 7;
    if(obj === 'c-05') return 8;
    if(obj === 'c-06') return 9;
    if(obj === 'c-07') return 10;
    if(obj === 'c-08') return 11;
    if(obj === 'c-09') return 27;
    if(obj === 'c-10') return 12;
    if(obj === 'c-11') return 13;
    if(obj === 'c-12') return 14;
    if(obj === 'c-13') return 15;
    if(obj === 'c-14') return 16;
    if(obj === 'c-15') return 17;
    if(obj === 'c-16') return 18;
    if(obj === 'c-17') return 19;
    if(obj === 'c-18') return 20;
    if(obj === 'c-19') return 21;
    if(obj === 'c-20') return 22;
    if(obj === 'c-21') return 23;
    if(obj === 'c-22') return 24;
    if(obj === 'c-23') return 25;
    return null;
}

const GET_AES_PARK_OBJECTS = gql`
    query MyQuery($objectId: Int!, $lang: String!) {
        aes_object(id: $objectId, language: $lang) {
            content
            headline
            id
            subline
            image
            video
            image_2
        }
    }
`;
export default function AesObjectComponent() {
    const { i18n } = useTranslation();
    const { objectId } = useParams();
    const lang = i18n.language;
    const id = map_aes_objects(objectId);

    const { loading, error, data} = useQuery(GET_AES_PARK_OBJECTS,{variables:  {objectId : id, lang: lang},fetchPolicy: 'network-only'});
    if (loading) return <p className="aes-object-loader">Loading...</p>;
    if (error) return <p className="aes-object-loader">Error : No connection to server<br/>Fehler: Keine Verbindung zum Server</p>;


    function createMarkup() {
        return {__html: data?.aes_object.content};
    }

    return (
        <div className="aes-object-container">
            <AESLangSwitch  />
            <div className="buttons-bg">
                <img src={BG} alt="bg"/>
            </div>
            <div className="aes-object-wrapper">
                <div className="aes-object-content-wrapper">
                    <div className="aes-object-subline"><h3>{data?.aes_object.subline}</h3></div>
                    <div className="aes-object-headline"><h1>{data?.aes_object.headline}</h1></div>
                    {data?.aes_object.video && <div className="aes-object-video">
                        <ReactPlayer url={data?.aes_object.video} playing={true} controls={true} width={'100%'} height={'auto'}/>
                    </div>}
                    { data?.aes_object.image_2 && <div className="aes-object-image aes-object-image-2"><img src={data?.aes_object.image_2} alt="aes-park"/></div> }
                    <div className="aes-object-content" dangerouslySetInnerHTML={createMarkup()}/>
                    { data?.aes_object.image && <div className="aes-object-image"><img src={data?.aes_object.image} alt="aes-park"/></div> }

                </div>
            </div>
           <AESNavButtons/>
        </div>

    );
}
