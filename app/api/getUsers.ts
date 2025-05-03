import { load } from "cheerio";
import { getStoriesForUser } from "./getStoriesForUser";
import { RawUser, User } from "../types";
import { readFile } from "fs/promises";

/*
This file overall represent the users api endpoint. It would represent the friends of the current user, but since there is no "current user" and all users are the same from server's perspective, we'll just return the same list of users. You'll see docs for what each funciton would do if it was a fully fledged backend.
*/

/**
 * Returns all users
 *
 * Currently we grab the top 25 most-viewed wikipedia articles and return a json object of their names and url_titles
 * This could be replaced in the future with a database request for the friends of the curren't user
 */

export async function getUsers(): Promise<User[]> {
  const url = "https://en.wikipedia.org/wiki/Wikipedia:Top_25_Report";

  let response;
  try {
    response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  } catch (error) {
    console.warn("Failed to fetch data from the URL, loading offline data:", error);
    const offlineDataString = await readFile( "offlineData.json", "utf-8");
    const offlineData: RawUser[] = JSON.parse(offlineDataString);
    return offlineData.map((rawUser: RawUser) => ({
      ...rawUser,
      completedStories: 0,
    }));
  }
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const html = await response.text();

  const $ = load(html);
  const data: RawUser[] = [];

  const rows = $("table.wikitable tr").toArray();
  let counter = 0;
  for (const [index, element] of rows.entries()) {
    if (index === 0) {
      continue;
    }

    const cells = $(element).find("td");
    if (cells.length >= 5) {
      const link = $(cells.eq(1)).find("a");
      const name = link.text().trim();
      const title = link.attr("href");
      const article = "https://en.wikipedia.org" + title;
      const img = $(cells.eq(4)).find("img").attr("src");
      
      if (title && img) {
        const splitTitle = title.split("/wiki/")[1];
        const stories = await getStoriesForUser(splitTitle);
        if (stories.length === 0) {
          continue;
        }

        const userId = counter++;
        data.push({
          id: userId,
          name,
          title: splitTitle,
          article: article,
          avatarImageLink: "https://" + img,
          stories: stories,
        } as RawUser);
      }
    }
  }
  const users = data.map((rawUser) => ({
    ...rawUser,
    completedStories: 0,
  }))


  return users
}

/**
Adds a new friends to a user's friend list

This would probably be more integrated with a "friend invite" system.

Will always return 404 because it's not a real endpoint
*/
export async function POST() {
  return new Response(null, {
    status: 404,
  });
}

/**
Updates the status of a friend

Within the context of instagram, this could be notification settings, or "close friend" status, etc

Will always return 404 because it's not a real endpoint
*/
export async function PUT() {
  return new Response(null, {
    status: 404,
  });
}

/**
Removes a friend fro ma user's friend list

Will always return 404 because it's not a real endpoint
*/
export async function DELETE() {
  return new Response(null, {
    status: 404,
  });
}
