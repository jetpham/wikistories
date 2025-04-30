/*
This file represents the stories endpoint for users. If you are intereacting with the stories of a user, this is the api. I have some documentation for what other endpoints would looks like theoretically.
*/

/**
 * Get the images and alt text of their stories given a user name.
 *
 * For a given user, we hit the wikipedia api endpoint and get all of the media sources for that user. Then we map it to just be [{src, alt}, ...] to simplify things. It's a takehome afterall lol.
 */
export async function getStoriesForUser(user: string) {
  try {
    const wikiEndpoint = `https://en.wikipedia.org/api/rest_v1/page/media-list/${user}`;
    const response = await fetch(wikiEndpoint, {
      headers: {
        accept:
          'application/json; charset=utf-8; profile="https://www.mediawiki.org/wiki/Specs/Media/1.3.1"',
      },
    });

    if (!response.ok) {
      const errorBody = await response.text(); // Attempt to read the error body
      console.error("Wikipedia API Error:", response.status, errorBody);
      return new Response(
        JSON.stringify({
          error: `Failed to fetch from Wikipedia: ${response.status} - ${errorBody}`,
        }),
        {
          status: response.status,
          headers: { "Content-Type": "application/json" },
        },
      );
    }

    const data = await response.json();

    if (!data.items || !Array.isArray(data.items)) {
      return new Response(
        JSON.stringify({ error: "Invalid data format from Wikipedia." }),
        { status: 500, headers: { "Content-Type": "application/json" } },
      );
    }

    const mappedItems = data.items.map(
      (item: { srcset: { src: string }[]; caption: { text: string } }) => ({
        src: "https://" + item.srcset?.[0]?.src || "",
        alt: item.caption?.text || "",
      }),
    );

    return new Response(JSON.stringify(mappedItems), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error: unknown) {
    console.error("Error fetching data:", error);
    return new Response(
      JSON.stringify({ error: "Failed to fetch data from Wikipedia." }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    );
  }
}

/**
Adds a an image to a user's story.
Would probably be called from some kind of "story creation" studio.
*/
// export async function POST()

/**
Update add a like to a story.

Send from another user, you can send this to add a like to the story. (just one theoretical use)
*/
// export async function PUT()

/**
Deletes a story off of a user's list of stories
*/
// export async function DELETE()
