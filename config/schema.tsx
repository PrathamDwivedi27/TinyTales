import { user } from "@nextui-org/theme";
import { integer, json,pgTable, serial,text,varchar } from "drizzle-orm/pg-core";

export const StoryData=pgTable('storyData',{
    id:serial('id').primaryKey(),
    storyId:varchar('storyId'),
    storySubject:text('storySubject').notNull(),
    storyType:varchar("storyType"),
    ageGroup:varchar('ageGroup'),
    imageStyle:varchar('imageStyle'),
    output:json('output'),
    coverImage:varchar('coverImage'),
    userEmail:varchar('userEmail'),
    userName:varchar('userName'),
    userImage:varchar('userImage'),

})

export const Users=pgTable('users',{
    id:serial('id').primaryKey(),
    userEmail:varchar('userEmail'),
    userName:varchar('userName'),
    userImage:varchar('userImage'),
    credit:integer('credit').default(3)
})