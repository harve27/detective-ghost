import React, {useState, useEffect} from 'react'
import BetBox from './BetBox';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase'


export default function HomePage({ user }) {
    const [bets, setBets] = useState([]);
    useEffect(() => {
        const fetchBets = async () => {
          try {
            const betsRef = collection(db, 'betBox');
            const betsSnapshot = await getDocs(betsRef) 
            const betsList = betsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setBets(betsList)
          } catch (error) {
            console.error('Error fetching bets:', error);
          }
        };
    
        fetchBets();
    
        return () => {}; // No cleanup needed
      }, []);

    return (
        <div>
            {/** Don't show bet if it isn't active */}
            {bets.map(bet => (
                <BetBox
                key={bet.id}
                id={bet.id}
                question={bet.question}
                timeLimit={bet.duration}
                user={user}
                yesNumber={bet.yes}
                noNumber={bet.no}
                />
            ))}
        </div>
    )
}
