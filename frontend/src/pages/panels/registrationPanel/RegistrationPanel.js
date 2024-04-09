import './RegistrationPanel.css'
import Wave from '../../../components/wave/Wave.js';
import Arrow from '../../../components/arrow/Arrow.js';
import { Link } from 'react-router-dom';

export default function RegistrationPanel() {
  return (
    <div className='panels'>
        <Wave/>
        <div id='inputPanelLog'>
            
            <div className='middle'>
                <div id='titlePanelRegistration'>Create account</div>
                <input placeholder="Email"/>
                <input placeholder="Password"/>
                <input placeholder="Repeat password"/>
                <input placeholder="Frusion name"/>
            </div>

            <div id='buttonsPanelRegistration'>
                <div className='left'>
                    <div className='buttonArrow'>
                        <Link to="/Home" className='buttonPanel' id='signInButtonPanelRegistration'><Arrow/></Link>
                        <div className='captionButton'>Sign in</div>
                    </div>
                </div>
                
                <div className='right'>
                    <div className='buttonArrow'>
                        <div className='captionButton'>Create</div>
                        <Link to="/LoginPanel" className='buttonPanel'><Arrow/></Link>
                    </div>
                </div>


            </div>
        </div>
    </div>
  );
}