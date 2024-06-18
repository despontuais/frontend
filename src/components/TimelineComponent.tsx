// @ts-nocheck

// components/TimelineComponent.tsx

"use client";
import axios from 'axios';
import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
 // @ts-nocheck
interface ITimeline {
  id: number;
  title: string;
  description: string;
}

const TimelineComponent: React.FC = () => {

  async function fetchData() {
    try {
      const id = pathname.replace(/.*\D/g, "")
      const response = await fetch(`https://cronolog.duckdns.org/api/timeline/35}`); // Replace with your actual endpoint
      const data = await response.json();
      console.log(data)
      return data;
    } catch (error) {
      console.error('Error fetching data:', error);
      // Handle error appropriately (e.g., return an empty array or error object)
      return []; // Example: Return an empty array on error
    }
  }

  const pathname = usePathname();
  const router = useRouter();
 const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchDataAsync = async () => {
      setIsLoading(true);
      try {
        const fetchedData = await fetchData();
        setData(fetchedData.timeline); // Assuming "timeline" is the key with your data
      } catch (error) {
      } finally {
        setIsLoading(false);
      }
    };

    fetchDataAsync();
    console.log(data)
  },[]);

  // ... rest of your component logic
  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (!data.length) {
    return <p>No timeline data available.</p>;
  }

  return (
    <div>
      {isLoading && <p>Loading data...</p>}
      {data.length > 0 && (
        <ul>
          {data.map((item) => (
            <li key={item.media_timeline_id}>
              { item.media.title} ({item.timeline.title})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
export default TimelineComponent;
