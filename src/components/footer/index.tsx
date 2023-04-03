import { FaFacebookF, FaInstagram, FaYoutube, FaWhatsapp, FaEnvelope, FaLinkedinIn } from 'react-icons/fa';
import "./footer.scss";

const Footer = () => {
  return (
        <footer className="footer">
                <div className="row">
                    <div className="footer-col">
                        <h4>Lorem</h4>
                        <ul>
                            <li><a href="#">Lorem</a></li>
                            <li><a href="#">Lorem</a></li>
                            <li><a href="#">Lorem</a></li>
                            <li><a href="#">Lorem</a></li>
                        </ul>
                    </div>
                    <div className="footer-col">
                        <h4>Lorem</h4>
                        <ul>
                            
                            <li><a href="#">Natal - RN</a></li>
                            <li><a href="#">Nosso número: +55 (84) 0000-0000</a></li>
                        </ul>
                    </div>
                    <div className="footer-col">
                        <h4>Lorem</h4>
                           <ul>
                               <li><a href="#">Lorem</a></li>
                               <li><a href="#">Lorem</a></li>
                           </ul>
                    </div>
                     
                    <div id="social-links" className="footer-col">
                        <h4>Lorem</h4>
                            <ul className="social-links">
                               
                                <a href="#"target="_blank"> <FaFacebookF/></a>
        
                                <a href="#"target="_blank"><FaInstagram/></a>
        
                                <a href="#" target="_blank"><FaYoutube/></a>
        
                                <a href="https://api.whatsapp.com/send?phone=5584994105215" target="_blank"><FaWhatsapp/></a>
        
                                <a href="mailto:clevertonsantoscodev@gmail.com" target="_blank"><FaEnvelope/></a>
        
                                <a href="https://br.linkedin.com/?trk=BR-SEM_google-adwords_Jordan-brand-sign-up&mcid=6821526239111716925&trk2=ga_campid=12619604099_asid=122510712920_crid=509739556238_kw=linkedin%20site_d=c_tid=kwd-327301955753_n=g_mt=e_geo=9101480_slid=&gclid=Cj0KCQiAjc2QBhDgARIsAMc3SqRYomK3xW3eawGWk4fE4D61EDsbh_H4VW0Ck5YL445cjZfGA6M3zLgaAjIEEALw_wcB&gclsrc=aw.ds" target="_blank"><FaLinkedinIn/></a>	   
                           </ul>
                    </div> 
                </div>  
          </footer>


  );
};

export default Footer;
