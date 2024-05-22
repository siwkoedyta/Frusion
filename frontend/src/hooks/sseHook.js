import { useEffect, useState } from 'react';

const useSSE = (url) => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const eventSource = new EventSource(url);

    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === 'PRICE_CHANGED') {
        setMessages(prevMessages => [...prevMessages, data]);
      }
    };

    eventSource.onerror = (err) => {
      console.error("EventSource failed:", err);
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, [url]);

  useEffect(() => {
    setInterval(() => {
      const expirationTime = new Date().getTime() - 5 * 60000
      setMessages(prevMessages => prevMessages.filter(msg => msg.time >= expirationTime ))
    }, 5000);
  }, []);

  return messages;
};

export default useSSE;