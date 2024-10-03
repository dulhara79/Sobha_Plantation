import axios from 'axios';
import { useHistory } from 'react-router-dom';

const Logout = () => {
    const history = useHistory();

    const handleLogout = async () => {
        try {
            await axios.get('http://localhost:5000/api/auth/logout');
            localStorage.removeItem('token');  // Remove any JWT token if stored
            history.push('/login'); // Redirect to login after logout
        } catch (err) {
            console.error('Logout error:', err);
        }
    };

    // return <button onClick={handleLogout}>Logout</button>;
};

export default Logout;
