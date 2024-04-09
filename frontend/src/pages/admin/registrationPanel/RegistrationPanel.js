import './RegistrationPanel.css'
import Wave from'../../../components/wave/Wave.js'
import Arrow from '../../../components/arrow/Arrow.js';

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
                        <button className='buttonPanel' id='signInButtonPanelRegistration'><Arrow/></button>
                        <div className='captionButton'>Sign in</div>
                    </div>
                </div>
                
                <div className='right'>
                    <div className='buttonArrow'>
                        <div className='captionButton'>Create</div>
                        <button className='buttonPanel'><Arrow/></button>
                    </div>
                </div>


            </div>
        </div>
    </div>
  );
}