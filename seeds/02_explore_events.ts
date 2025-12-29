import { Knex } from "knex";

const IMAGES = [
  "https://images.unsplash.com/photo-1492684223066-81342ee5ff30",
  "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4",
  "https://images.unsplash.com/photo-1540039155733-5bb30b53aa14",
  "https://images.unsplash.com/photo-1514525253440-b393452e8d26",
  "https://images.unsplash.com/photo-1475721027767-4d529c14cbd3",
  "https://images.unsplash.com/photo-1511795409834-ef04bbd61622",
  "https://images.unsplash.com/photo-1506157786151-b8491531f063",
  "https://images.unsplash.com/photo-1505373877841-8d25f7d46678",
  "https://images.unsplash.com/photo-1522158637959-30385a09e0da",
  "https://images.unsplash.com/photo-1511578314322-379afb476865"
];

const TITLES = [
  "Tech Meetup Strasbourg",
  "React Workshop",
  "Node.js Advanced",
  "Web Design Trends",
  "Startup Pitch Night",
  "Cloud Computing 101",
  "AI & Future of Work",
  "Cybersecurity Basics",
  "DevOps Practices",
  "Mobile App Growth"
];

const LOCATIONS = [
  "Strasbourg",
  "Remote",
  "Paris",
  "Colmar",
  "Mulhouse"
];

function randomItem<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export async function seed(knex: Knex): Promise<void> {
  console.log("Seeding Explore events...");

  // Generate 25 mock events
  const events = Array.from({ length: 25 }).map((_, i) => {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() + randomInt(1, 90)); // Random date in next 3 months
    startDate.setHours(randomInt(9, 20), 0, 0, 0);

    const endDate = new Date(startDate);
    endDate.setHours(endDate.getHours() + randomInt(1, 4));

    return {
      name: `${randomItem(TITLES)} #${i + 1}`,
      description: `Join us for an amazing event about technology and innovation. This is a generated event for testing pagination purposes. Event ID: ${i + 1}`,
      begin_date: startDate,
      end_date: endDate,
      location: randomItem(LOCATIONS),
      max_capacity: randomInt(20, 200),
      price: randomInt(0, 10) * 10, // 0, 10, 20... 100
      status: "PUBLISHED",
      image_url: randomItem(IMAGES)
    };
  });

  await knex("events").insert(events);
  
  console.log("Inserted 25 mock events for Explore page.");
}
