import React from 'react';
import logo from "../assets/img/HeimdallContructionSansFond.png";
import { MDBFooter, MDBContainer, MDBRow, MDBCol } from 'mdb-react-ui-kit';

export default function Footer() {
    return (
        <MDBFooter  className='text-white text-center text-lg-left'>
            <MDBContainer className='p-2 pt-4'>
                <MDBRow>
                    <MDBCol lg='6' md='12' className='mb-4 mb-md-0'>
                        <img className='mt-5' src={logo} alt="logo" id="logoFooter"/>
                    </MDBCol>

                    <MDBCol lg='3' md='6' className='mb-4 mb-md-0'>
                        <h5 className='text-uppercase'><i className="fas fa-map-marker-alt"></i> Nos Adresses</h5>

                        <h6>Siège social</h6>
                        <p>10 place Léon Meyer <br/>
                            76600 Le Havre</p>

                        <h6>Agence Le Havre</h6>
                        <p>12 place Léon Meyer <br/>
                            76600 Le Havre</p>

                        <h6>Atelier technique</h6>
                        <p>15 place Léon Meyer <br/>
                            76600 Le Havre</p>
                        
                    </MDBCol>

                    <MDBCol lg='3' md='6' className='mb-4 mb-md-0'>
                        <h5 className='text-uppercase'>Contact</h5>

                        <p>Siège social <br/>
                        <i className="fas fa-mobile-alt"></i> 02 35 02 02 01</p>

                        <p>Agence Le Havre <br/>
                        <i className="fas fa-mobile-alt"></i> 02 35 02 02 02</p>

                        <p>Nous contacter pour un devis : <i className="fas fa-envelope"></i> </p>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>

            <div className='text-center p-3' style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
                &copy; {new Date().getFullYear()} Copyright{' '}
            </div>
        </MDBFooter>
    );
}