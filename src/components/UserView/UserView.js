import { useLocation } from 'react-router-dom';
import StripeContainer from '../CheckoutForm/StripeContainer';
function UserView() {
    const location = useLocation();
    const userEmail = location.state?.data;
    return(
        <div>
            <StripeContainer userEmail={userEmail}/>
        </div>
    );

    
}
export default UserView;