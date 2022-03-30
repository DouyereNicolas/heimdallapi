
import React from "react"
import image1 from '../assets/img/image1.jpg';
import image4 from '../assets/img/image4.jpg';
import image6 from '../assets/img/image6.jpg';
import image7 from '../assets/img/image7.jpg';
import image8 from '../assets/img/image8.jpg';
import image9 from '../assets/img/image9.jpg';






export default function GalleryHome() {


    return (



        <section className="sectionGallery" style={{ height: 'auto' }}>
            <div className="divGallery">
                <div className="col-12 col-sm-6 col-md-6 col-lg-4 div_img">
                    <img src={image1} className='img-thumbnail'
                        alt='...' loading="lazy" />
                </div>
                <div className="col-12 col-sm-6 col-md-6 col-lg-4 div_img">
                    <img src={image4} className='img-thumbnail'
                        alt='...' loading="lazy" />
                </div>
                <div className="col-12 col-sm-6 col-md-6 col-lg-4 div_img">
                    <img src={image6} className='img-thumbnail'
                        alt='...' loading="lazy" />
                </div>

            </div>

            <div className="divGallery">
                <div className="col-12 col-sm-6 col-md-6 col-lg-4 div_img">
                    <img src={image7} className='img-thumbnail'
                        alt='...' loading="lazy" />
                    <div className="div_main_des">
                    </div>
                </div>
                <div className="col-12 col-sm-6 col-md-6 col-lg-4 div_img">
                    <img src={image8} className='img-thumbnail'
                        alt='...' loading="lazy" />
                    <div className="div_main_des">
                    </div>
                </div>
                <div className="col-12 col-sm-6 col-md-6 col-lg-4 div_img">
                    <img src={image9} className='img-thumbnail'
                        alt='...' loading="lazy" />
                    <div className="div_main_des">
                    </div>
                </div>

            </div>

            <div className="divGalleryMobile">
                <div className="col-12 col-xs-6 col-sm-6 col-md-6 col-lg-4">
                    <img src={image1} className='img-thumbnail'
                        alt='...' loading="lazy" />
                    <div className="div_main_des">
                    </div>
                </div>
                <div className="col-12 col-xs-6 col-sm-6 col-md-6 col-lg-4">
                    <img src={image4} className='img-thumbnail'
                        alt='...' loading="lazy" />
                    <div className="div_main_des">
                    </div>
                </div>
            </div>
            <div className="divGalleryMobile">
                <div className="col-12 col-xs-6 col-sm-6 col-md-6 col-lg-4">
                    <img src={image6} className='img-thumbnail'
                        alt='...' loading="lazy" />
                    <div className="div_main_des">
                    </div>
                </div>

                <div className="col-12 col-xs-6 col-sm-6 col-md-6 col-lg-4">
                    <img src={image7} className='img-thumbnail'
                        alt='...' loading="lazy" />
                    <div className="div_main_des">
                    </div>
                </div>
            </div>
            <div className="divGalleryMobile">
                <div className="col-12 col-xs-6 col-sm-6 col-md-6 col-lg-4">
                    <img src={image8} className='img-thumbnail'
                        alt='...' loading="lazy" />
                    <div className="div_main_des">
                    </div>
                </div>
                <div className="col-12 col-xs-6 col-sm-6 col-md-6 col-lg-4">
                    <img src={image9} className='img-thumbnail'
                        alt='...' loading="lazy" />
                    <div className="div_main_des">
                    </div>
                </div>
            </div>
        </section>

    );
}

