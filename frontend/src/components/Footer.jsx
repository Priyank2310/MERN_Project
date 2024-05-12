import { Footer } from 'flowbite-react';
import { Link } from 'react-router-dom';
import { BsFacebook, BsInstagram, BsTwitter, BsGithub } from 'react-icons/bs';

function FooterOn() {
  return (
    <div className="bg-gray-900 text-white">
      <div className="container mx-auto py-8">
        <Footer container className='custom-footer'>
          <style>
            {`
              @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap');

              .custom-footer {
                box-shadow: none !important; 
                font-family: 'Roboto', sans-serif;
              }

              .footer-title {
                color: #FFD700; /* Golden */
                font-weight: 700;
                font-size: 1.1rem;
                margin-bottom: 0.75rem; /* Add space between title and links */
              }

              .footer-link {
                color: #A0AEC0; /* Light gray */
                cursor: pointer; /* Add cursor pointer */
                transition: color 0.3s ease;
                display: block; /* Ensure links take up full width */
                margin-bottom: 0.25rem; /* Add space between links */
              }

              .footer-divider {
                border-top-color: #A0AEC0; /* Light gray */
                margin: 1.5rem 0;
              }

              .footer-icon {
                color: #A0AEC0; /* Light gray */
                transition: color 0.3s ease;
                cursor: pointer; /* Add cursor pointer */
                font-size: 1.3rem;
              }
            `}
          </style>
          <div className='w-full max-w-7xl mx-auto'>
            <div className='grid w-full justify-between sm:flex md:grid-cols-1'>
              <div className='grid grid-cols-2 gap-8 mt-4 sm:grid-cols-3 sm:gap-6'>
                <div>
                  <Footer.Title className="footer-title" title='About' />
                  <Footer.LinkGroup col>
                    <Footer.Link className="footer-link" href='/about'>About Us</Footer.Link>
                    <Footer.Link className="footer-link" href='#'>Blog</Footer.Link>
                  </Footer.LinkGroup>
                </div>
                <div>
                  <Footer.Title className="footer-title" title='Follow us' />
                  <Footer.LinkGroup col>
                    <Footer.Link className="footer-link" href='https://github.com/Priyank2310' target='_blank' rel='noopener noreferrer'>
                      GitHub
                    </Footer.Link>
                    <Footer.Link className="footer-link" href='#'>Discord</Footer.Link>
                  </Footer.LinkGroup>
                </div>
                <div>
                  <Footer.Title className="footer-title" title='Legal' />
                  <Footer.LinkGroup col>
                    <Footer.Link className="footer-link" href='#'>Privacy Policy</Footer.Link>
                    <Footer.Link className="footer-link" href='#'>Terms &amp; Conditions</Footer.Link>
                  </Footer.LinkGroup>
                </div>
              </div>
            </div>
            <Footer.Divider className="footer-divider" />
            <div className='w-full sm:flex sm:items-center sm:justify-between'>
              <Footer.Copyright
                href='#'
                by="Priyank Maheshwari"
                year={new Date().getFullYear()}
              />
              <div className="flex gap-6 sm:mt-0 mt-4 sm:justify-center">
                <Footer.Icon className="footer-icon" href='#' icon={BsFacebook}/>
                <Footer.Icon className="footer-icon" href='#' icon={BsInstagram}/>
                <Footer.Icon className="footer-icon" href='#' icon={BsTwitter}/>
                <Footer.Icon className="footer-icon" href='https://github.com/Priyank2310' icon={BsGithub}/>    
              </div>
            </div>
          </div>
        </Footer>
      </div>
    </div>
  );
}

export default FooterOn;
