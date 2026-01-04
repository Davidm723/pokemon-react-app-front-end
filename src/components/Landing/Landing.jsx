import './Landing.css'
import { useNavigate } from 'react-router';

const Landing = () => {
  const navigate = useNavigate()

  return (
    <main className='landing-main'>
      <h1>Welcome to the Pokemon <br /> Party and Box Manager</h1>
      <p>Please sign up or sign in to manage your Party</p>
      <div>
        <button onClick={() => navigate('/sign-in')}>Sign In</button>
        <button onClick={() => navigate('/sign-up')}>Sign Up</button>
      </div>
    </main>
  );
};

export default Landing;
