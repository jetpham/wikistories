import { load } from "cheerio";

/*
This file overall represent the users api endpoint. It would represent the friends of the current user, but since there is no "current user" and all users are the same from server's perspective, we'll just return the same list of users. You'll see docs for what each funciton would do if it was a fully fledged backend.
*/

/**
 * Returns all users
 *
 * Currently we grab the top 25 most-viewed wikipedia articles and return a json object of their names and url_titles
 * This could be replaced in the future with a database request for the friends of the curren't user
 */
export async function GET() {
  const url = "https://en.wikipedia.org/wiki/Wikipedia:Top_25_Report";

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const html = await response.text();
    const $ = load(html);
    const data: {
      id: number;
      name: string;
      title: string;
      article: URL;
      avatarImageLink: URL;
    }[] = [];

    $("table.wikitable tr").each((_, element) => {
      // Skip the header row
      if (_ === 0) {
        return;
      }

      const cells = $(element).find("td");
      if (cells.length >= 5) {
        const id = $(cells.eq(0)).text();
        const link = $(cells.eq(1)).find("a"); // Select the <a> tag in the second <td>
        const name = link.text().trim();
        const title = link.attr("href");
        const article = "https://en.wikipedia.org/wiki/" + title;
        const img = $(cells.eq(4)).find("img").attr("src");

        if (title && img) {
          data.push({
            id: parseInt(id),
            name,
            title: title.split("/wiki/")[1],
            article: new URL(article),
            avatarImageLink: new URL("https://" + img),
          });
        }
      }
    });

    return new Response(JSON.stringify(data, null, 2), {
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error: unknown) {
    console.error("Error fetching or parsing data:", error);
    return new Response(
      JSON.stringify({ error: String(error) || "An error occurred" }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
  }
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
