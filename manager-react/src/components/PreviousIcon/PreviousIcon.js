import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeftLong } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import './PreviousIcon.css';

const PreviousIcon = (props) => {
    const navigate = useNavigate();
    return (
        <div id='return' onClick={() => {
            navigate(props.path);
        }}>
            <FontAwesomeIcon id='back' icon={faArrowLeftLong} color='rgb(60, 7, 60)' size='2x' />
        </div>
    )
}

export default PreviousIcon;
