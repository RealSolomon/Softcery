/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from '@emotion/react';
import React from 'react';
import Alert from '@material-ui/lab/Alert';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import mail from '../img/mail.svg';
import { styles } from '../utils/index';
import spinner from '../img/spinblue.svg';

function Confirm() {
  const [error, setError] = React.useState('');
  const { currentUser, sendemail } = useAuth();
  const [loading, setLoading] = React.useState(false);
  const [time, setTime] = React.useState(false);
  const [timerRunning, setTimerRunning] = React.useState(false);

  const [counter, setCounter] = React.useState(10);

  function handleTimer() {
    setTimerRunning(true);
  }

  React.useEffect(() => {
    let timer;
    if (timerRunning) {
      if (counter > 0) {
        timer = setTimeout(() => setCounter((c) => c - 1), 1000);
      }
    }

    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [counter, timerRunning]);

  async function handleResend() {
    setError('');
    setLoading(true);

    if (loading) {
      setTimeout(() => {
        setLoading(false);
      }, 2500);
    } else {
      setTimerRunning(true);
    }

    try {
      // setTimeout(() => {
      //   setLoading(false);
      // }, 2500);
      // await sendemail();
    } catch {
      setError('Failed to resend the message');
    }
    // if (!loading) {
    //   setTimerRunning(true);
    // }
  }

  return (
    <>
      <div css={styles.confcont}>
        <div
          css={{
            float: 'left',
          }}
        >
          <h2 css={styles.head}>Confirm account</h2>
          {error && (
            <Alert variant="outlined" severity="error">
              {error}
            </Alert>
          )}
          <p css={styles.info}>
            Please confirm your email by clicking on the link in the
            confirmation email that we sent to &nbsp;{' '}
            <p
              css={{
                color: 'rgba(37, 67, 83, 0.75)',
                display: 'inline',
              }}
            >
              {currentUser.email}
            </p>
          </p>
          {!timerRunning ? (
            <button
              css={styles.btn}
              style={{ marginBottom: '15px' }}
              onClick={handleResend}
              disabled={loading}
            >
              {loading && <img src={spinner} alt="spinner"></img>}
              {/* {loading ? setTimerRunning(true) : null} */}
              {/* {timerRunning ? counter : 'Resend'} */}
            </button>
          ) : (
            <button css={styles.btn} style={{ marginBottom: '15px' }}>
              {!loading && counter > 0 ? counter : 'Resend'}
            </button>
          )}

          <br />
          <Link css={styles.lnk} to="/signup">
            Sign out
          </Link>
        </div>
        <p
          css={{
            marginLeft: '243px',
            float: 'right',
          }}
        >
          <img src={mail} alt="mail"></img>
        </p>
      </div>
    </>
  );
}

export default Confirm;
