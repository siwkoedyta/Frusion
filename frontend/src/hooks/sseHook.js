import { useEffect, useState } from 'react';

const useSSE = (url) => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const eventSource = new EventSource(url);

    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === 'PRICE_CHANGED') {
        setMessages((prevMessages) => [data]);
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

  return messages;
};

export default useSSE;