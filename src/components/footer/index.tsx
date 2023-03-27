import { FaFacebookF, FaInstagram, FaYoutube, FaWhatsapp, FaEnvelope, FaLinkedinIn } from 'react-icons/fa';
import "./footer.scss";

const Footer = () => {
  return (
        <footer className="footer">
                <div className="row">
                    <div className="footer-col">
                        <h4>Sobre Nós</h4>
                        <ul>
                            <li><a href="#">nossos serviços</a></li>
                            <li><a href="#">Planos e covêncios</a></li>
                            <li><a href="#">politica de atendimento</a></li>
                            <li><a href="#">outros serviçoes</a></li>
                        </ul>
                    </div>
                    <div className="footer-col">
                        <h4>Endereço</h4>
                        <ul>
                            
                            <li><a href="#">Av.Engenheiro Roberto Freire - SEAWAY - SHOPPING Loja: 26</a></li>
                            <li><a href="#">Nosso número: +55 (84) 0000-0000</a></li>
                        </ul>
                    </div>
                    <div className="footer-col">
                        <h4>Modalidades de atendimento</h4>
                           <ul>
                               <li><a href="#">Domiciliar: Fisioterapia no conforto do seu lar!</a></li>
                               <li><a href="#">Online: Está com covid? Temos a teleconsulta!</a></li>
                           </ul>
                           
                        <div>
                            <ul className="consulta">
                                
                                     <li className="con"><a  href="https://api.whatsapp.com/send?phone=5584994105215"  target="_blank">AGENDE SUA CONSULTA</a></li>
                            </ul>
                                
                            </div>
                    </div>
                     
                    <div id="social-links" className="footer-col">
                        <h4>Siga nossas redes sociais</h4>
                            <ul className="social-links">
                               
                                <a href="https://www.facebook.com/search/top?q=cleverton%20santos%20-%20fisioterapeuta"target="_blank"> <FaFacebookF/></a>
        
                                <a href="https://www.instagram.com/fisiotres.fisioespecializada/"target="_blank"><FaInstagram/></a>
        
                                <a href="https://www.youtube.com/"><FaYoutube/></a>
        
                                <a href="https://api.whatsapp.com/send?phone=5584994105215"><FaWhatsapp/></a>
        
                                <a href="mailto:clevertonsantoscodev@gmail.com"><FaEnvelope/></a>
        
                                <a href="https://br.linkedin.com/?trk=BR-SEM_google-adwords_Jordan-brand-sign-up&mcid=6821526239111716925&trk2=ga_campid=12619604099_asid=122510712920_crid=509739556238_kw=linkedin%20site_d=c_tid=kwd-327301955753_n=g_mt=e_geo=9101480_slid=&gclid=Cj0KCQiAjc2QBhDgARIsAMc3SqRYomK3xW3eawGWk4fE4D61EDsbh_H4VW0Ck5YL445cjZfGA6M3zLgaAjIEEALw_wcB&gclsrc=aw.ds"><FaLinkedinIn/></a>	   
                           </ul>
                    </div> 
                </div>  
          </footer>


  );
};

export default Footer;
