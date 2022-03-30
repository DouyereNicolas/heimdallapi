import React from "react";
import imgClient from "../assets/img/serviceClient.jpg";
import Img13 from "../assets/img/image13.jpg";
import ImgExpert from "../assets/img/expert.jpg";
import Img10 from "../assets/img/image10.jpg";
import Img11 from "../assets/img/image11.jpg";
import Img12 from "../assets/img/image12.jpg";


export default function NosValeurs() {


    return (

        <section className="sdSection">
            <div className="container">
                <div className="contentSdSection">
                    <h2 className="text-center">Nos valeurs</h2>

                    <div className="d-flex bd-highlight mb-3">
                        <div className="me-auto bd-highlight" id="styleText">
                            <h3>Écoute du client</h3>
                            <p className="ms-2">Nous sommes à l’écoute de nos clients pour comprendre chacun de leurs besoins et y répondre.
                                Nous construisons une relation de confiance en assurant le succès de chaque client grâce à notre 
                                engagement en faveur de leur satisfaction.
                            </p>
                            <h3 className="mt-4">Respect</h3>
                            <p className="ms-2">Le respect mutuel et la confiance sont le fondement de toute entreprise prospère. Et Heimdall confirme la règle. 
                                Nous sommes convaincus que l’intelligence collective, le travail d’équipe, avec nos collaborateurs mais également 
                                avec nos clients, est un puissant levier pour relever les défis et réaliser nos ambitions.
                            </p>
                            <h3 className="mt-4">Services</h3>
                            <p className="ms-2">la volonté de servir nos clients est au coeur de notre engagement. Nous veillons à nous montrer toujours disponbles
                                et à l'écoute de leurs besoins. Nous traitons leurs demandes avec la plus grande diligence, et veillons à leur
                                pleine satisfaction dans le cadre de nos domaines de compétences.

                            </p>
                            <h3 className="mt-4">Performance</h3>
                            <p className="ms-2">Grâce à notre savoir-faire, notre expérience et notre engagement, nous exerçons notre métier avec rigueur, afin de 
                                livrer des prestations d'un haut niveau de qualité. Proches de nos marchés et en cultivant des relations de proximité
                                avec nos clients, nous participons à la réalisation de valeurs ajoutées.
                            </p>
                        </div>
                        <div className=" bd-highlight">
                            <div className="column">
                                <div className="row">
                                    <img src={imgClient} alt="Service Client" id="imgValues" />
                                    <img src={Img13} alt="Respect" id="imgValues"/>
                                </div>
                                <div className="row">
                                    <img src={ImgExpert} alt="Service Client" id="imgValues" />
                                    <img src={Img10} alt="Respect" id="imgValues"/>
                                </div>
                                <div className="row">
                                    <img src={Img12} alt="Service Client" id="imgValues" />
                                    <img src={Img11} alt="Respect" id="imgValues"/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

    );
}
