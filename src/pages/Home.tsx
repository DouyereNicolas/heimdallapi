import React, {FunctionComponent} from 'react';
import SectionCount from '../components/section-count';
import GalleryHome from '../components/gallery-home';
import '../components/style-home.css'
import NosValeurs from '../components/nos-valeurs';
import HeroParallax from '../components/hero-parallax';
import ImgServiceAdapte from '../assets/img/serviceAdapte.jpg';
import ImgGrosOeuvre from '../assets/img/grosOeuvre.jpg';
import ImgTravauxService from '../assets/img/travauxService.jpg';

const Home: FunctionComponent = () => {

    return (

        <div>

            <div>
                <HeroParallax/>
            </div>


            <div>
                <NosValeurs/>
            </div>

            <section className="threeSection">
                <div className="container">
                    <div className="row">

                        <div className="col-lg-4 text-align-center d-flex flex-column mb-3 mt-5">
                            <img src={ImgServiceAdapte} id='imgRounded' className="rounded-circle"
                                 alt="Un service adapté"></img>
                            <h4 className=" d-flex justify-content-center mt-2">Un service adapté</h4>
                            <p>Parce que chaque chantier est unique, HEIMDALL Construction dispose d’un Service Méthode
                                qui intervient durant la période de préparation de chantier, afin de
                                déterminer les modes constructifs les plus adéquats au projet en les comparant et en les
                                optimisant d’un point de vue coût, délais, sécurité, et qualité.
                                En définissant un mode constructif, ce service détermine également le besoin en
                                matériel, matériaux et main d’œuvre et en établit les plannings prévisionnels.</p>
                            {/* <a className="btn btn-secondary"  role="button">View details »</a> */}
                        </div>

                        <div className="col-lg-4 text-align-center d-flex flex-column mb-3 mt-5">
                            <img src={ImgGrosOeuvre} id='imgRounded' className="rounded-circle"
                                 alt="Gros oeuvres"></img>
                            <h4 className=" d-flex justify-content-center mt-2">Le gros oeuvre</h4>
                            <p>Le gros œuvre est l’activité première de HEIMDALL Construction. Que ce soit pour la
                                construction d’ouvrages privés ou publics, la société garantie les objectifs en
                                termes de qualité, de délai et de budget. Maîtrisant différentes techniques de
                                construction (béton armé, maçonnerie de pierre, parpaings, briques…),
                                HEIMDALL Construction intervient pour des projets de construction, extensions,
                                réhabilitation, fondations, surélévation ou de rénovation d’ouvrages variés.
                            </p>
                            {/* <a className="btn btn-secondary" role="button">View details »</a> */}
                        </div>

                        <div className="col-lg-4 text-align-center d-flex flex-column mb-3 mt-5">
                            <img src={ImgTravauxService} id='imgRounded' className="rounded-circle"
                                 alt="Travaux services"></img>
                            <h4 className=" d-flex justify-content-center mt-2">Les travaux services</h4>
                            <p>Que ce soit pour de la rénovation ou pour du neuf, cette activité nécessite une
                                réactivité sans faille pour assurer des missions courtes,
                                qui nous sont souvent confiées par les particuliers et les professionnels.
                                La variété des missions « Travaux Services » qui nous sont confiées, est une preuve de
                                nos compétences élargies. Des grands noms de l’industrie en demande de
                                maintenance, aux particuliers en besoin d’une intervention de Remises en état suite à
                                sinistre, notre champs de compétences est large, et maitrisé.
                            </p>
                            {/* <a className="btn btn-secondary" role="button">View details »</a> */}
                        </div>

                    </div>
                </div>
            </section>


            <div id="SliderHome">
                <SectionCount/>
            </div>

            <div id="SliderHome">
                <GalleryHome/>
            </div>

        </div>
    );
}

export default Home;
