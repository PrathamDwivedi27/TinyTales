"use client"
import React, { useState, useEffect } from 'react';
import { StoryItemType } from '../dashboard/_components/UserStoryList';
import { StoryData } from '@/config/schema';
import { desc } from 'drizzle-orm';
import { db } from '@/config/db';
import StoryItemCard from '../dashboard/_components/StoryItemCard';
import { Button } from '@nextui-org/button';

const ExploreMore = () => {
  const [offset, setOffset] = useState<number>(0);
  const [storyList, setStoryList] = useState<StoryItemType[]>([]);
  const [hasMore, setHasMore] = useState<boolean>(true); // Track if more stories exist

  useEffect(() => {
    GetAllStories(0);
  }, []);

  const GetAllStories = async (offset: number) => {
    setOffset(offset);
    const result: any = await db.select().from(StoryData)
      .orderBy(desc(StoryData.id))
      .limit(8)
      .offset(offset);

    // Prevent adding duplicate stories
    if (result.length === 0) {
      setHasMore(false); // No more stories to load
      return;
    }

    setStoryList((prev) => {
      const newStories = result.filter(
        (story: StoryItemType) => !prev.some((s) => s.id === story.id)
      );
      return [...prev, ...newStories];
    });
  };

  return (
    <div className='min-h-screen p-10 md:px-20 lg:px-40'>
      <h2 className='font-bold text-4xl text-primary text-center'>Explore Stories</h2>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 mt-10'>
        {storyList && storyList.map((item, index) => (
          <StoryItemCard key={item.id} story={item} />
        ))}
      </div>

      <div className='text-center mt-10'>
        {hasMore && (
          <Button className='' color='primary' onClick={() => GetAllStories(offset + 8)}>
            Load More
          </Button>
        )}
        {!hasMore && (
          <p>No more stories to load.</p>
        )}
      </div>
    </div>
  );
};

export default ExploreMore;
