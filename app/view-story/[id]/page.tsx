"use client";
import { db } from "@/config/db";
import { StoryData } from "@/config/schema";
import React, { useRef, useState } from "react";
import { useEffect } from "react";
import { eq } from "drizzle-orm";
import HTMLFlipBook from "react-pageflip";
import BookCoverPage from "../_components/BookCoverPage";
import StoryPages from "../_components/StoryPages";
import LastPage from "../_components/LastPage";
import {
  IoIosArrowDroprightCircle,
  IoIosArrowDropleftCircle,
} from "react-icons/io";

const ViewStory = ({ params }: any) => {
  const [story, setStory] = useState<any>();
  const bookRef = useRef<typeof HTMLFlipBook>(null);
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log(params.id);
    getStory();
  }, []);

  const getStory = async () => {
    const result = await db
      .select()
      .from(StoryData)
      .where(eq(StoryData.storyId, params.id));

    console.log(result[0]);
    setStory(result[0]);
  };
  return (
    <div className="p-10 md:px-20 lg:px-40 flex-col">
      <h2 className="font-bold text-4xl text-center p-10 bg-primary text-white">
        {story?.output?.story_name}
      </h2>
      <div className="relative">
        {/* @ts-ignore */}
        <HTMLFlipBook
          width={500}
          height={500}
          showCover={true}
          className="mt-10"
          useMouseEvents={false}
          ref={bookRef}
        >
          <div>
            <BookCoverPage imageUrl={story?.coverImage} />
          </div>

          {[...Array(story?.output?.chapters?.length)].map((item, index) => (
            <div key={index} className="bg-white p-10 border">
              <StoryPages storyChapter={story?.output?.chapters[index]} />
            </div>
          ))}

          {/* <div>
            <LastPage/>
        </div> */}
        </HTMLFlipBook>
        {count != 0 && (
          <div
            className="absolute -left-5 top-[250px]"
            onClick={() => {
              if (bookRef.current) {
                (bookRef.current as any)?.pageFlip().flipPrev();
                setCount(count - 1);
              }
            }}
          >
            <IoIosArrowDropleftCircle className="text-[40px] text-primary cursor-pointer" />
          </div>
        )}
        {count != story?.output?.chapters?.length - 1 && (
          <div
            className="absolute -right-5 top-[250px]"
            onClick={() => {
              if (bookRef.current) {
                (bookRef.current as any)?.pageFlip().flipNext();
              }
              setCount(count + 1);
            }}
          >
            <IoIosArrowDroprightCircle className="text-[40px] text-primary cursor-pointer" />
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewStory;
