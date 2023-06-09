import Navbar from '@/components/Navbar';
import styles from '../styles/My_requests.module.css';
import Footer from '@/components/Footer';
import RequestCard from '@/components/RequestCard';
import { useEffect, useState } from 'react';
import DeleteBox from '@/components/DeleteBox';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';

export default function My_requests() {
  const [freelancer, setFreelancer] = useState(null);
  const [isFreelancerLoaded, setIsFreelancerLoaded] = useState(false);
  const [requests, setRequests] = useState([]);
  const [showDeleteBox, setShowDeleteBox] = useState(false);
  const [reqId, setReqId] = useState(null);
  const [showAcceptBox, setShowAcceptBox] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).token : null;
    if (token) {
      fetch(`${process.env.SERVER_URL}/profile`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
        .then(res => res.json())
        .then(data => {
          setFreelancer(data);
          setIsFreelancerLoaded(true);
        })
        .catch(error => {
          console.error(error);
        });
    }
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).token : null;
    if (token) {
      fetch(`${process.env.SERVER_URL}/requests`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
        .then(res => res.json())
        .then(data => {
          setRequests(data);
        })
        .catch(error => {
          console.error(error);
        });
    }
  }, [freelancer, isFreelancerLoaded]);

  const handleDeleteAccount = (id) => {
    const token = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).token : null;
    if (token) {
      fetch(`${process.env.SERVER_URL}/cancel/request/${id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }).then(res => res.json())
        .then(data => {
          if (data.success) {
            setShowDeleteBox(false);
            setReqId(null);
            setRequests(requests.filter(request => request._id !== id));
          }
        }
        )
        .catch(error => {
          console.error(error);
        }
        );
    }
  }

  const acceptRequest = (id) => {
    const token = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).token : null;
    if (token) {
      fetch(`${process.env.SERVER_URL}/accept/request/${id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }).then(res => res.json())
        .then(data => {
          if (data.success) {
            setShowDeleteBox(false);
          }
        }
        )
        .catch(error => {
          console.error(error);
        }
        );
    }
  }

  return (
    <div className={styles.myRequests}>
      <Navbar />
      <div className={styles.requests}>
        <h1 className={styles.heading}>My Requests</h1>
        <div className={styles.requestsContainer}>
          {requests.map((request, i) => {
            return <RequestCard setShowAcceptBox={setShowAcceptBox} acceptRequest={acceptRequest} setReqId={setReqId} setShowDeleteBox={setShowDeleteBox} key={i} request={request} />
          })}
        </div>
        {showDeleteBox && <div className={styles.deleteBox}>
          <DeleteBox reqId={reqId} setShowDeleteBox={setShowDeleteBox} handleDeleteAccount={handleDeleteAccount} delete='Request' />
        </div>}
        {showAcceptBox && <div className={styles.acceptBox}>
          <div className={styles.box}>
            <h1 className={styles.headingReq}>Request Accepted <FontAwesomeIcon icon={faCircleCheck} style={{color: "#1bd03f",}} /></h1>
            <p className={styles.textReq}>Please contact the client to discuss the details. Ensure that you are punctual and perform the job diligently. Remember to collect the payment from the client. Failing to arrive on time may result in a negative review or even a suspension.</p>
            <button className={styles.btnReq} onClick={() => setShowAcceptBox(false)}>Close</button>
          </div>
        </div>}
      </div>
      <Footer />
    </div>
  )
}