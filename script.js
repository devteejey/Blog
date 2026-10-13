const stories = [
  { title: "Somewhere, a little slower", category: "Places", author: "June Miller", date: "October 8", image: "https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?auto=format&fit=crop&w=1100&q=80", alt: "A peaceful cabin tucked into the trees", paragraphs: [
    "At some point between the last email on Friday and the first cup of coffee on Saturday, we decided to go. Nothing elaborate: a little cabin a couple of hours north, two overnight bags, and absolutely no plan.",
    "The first thing you notice when you get somewhere without service is how often your hand reaches for a phone that isn't going to help. The second thing is everything else. The rain starting up on the roof. The green beyond the window. The particular quiet that only shows up when you stop trying to fill it.",
    "We made toast for lunch. Went for a walk that took twice as long as it should have. Sat on the porch and watched the light move across the trees like it had nowhere else to be.",
    "On Sunday, nothing particularly remarkable happened. And somehow that was the remarkable part. We drove home with mud on our shoes, a half-read book on the back seat, and the feeling that the weekend had finally belonged to us."
  ] },
  { title: "The things we grow", category: "People", author: "Alex Lee", date: "October 2", image: "https://images.unsplash.com/photo-1493106641515-6b5631de4bb9?auto=format&fit=crop&w=900&q=80", alt: "Sunlight and greenery in an artist's greenhouse", paragraphs: [
    "Mara's studio is full of things halfway through becoming something else. Pots waiting for a glaze, seedlings leaning toward a south-facing window, a collection of found objects whose stories she hasn't worked out yet.",
    "She started working with clay after moving into a house with a garden. At first the two projects felt separate: the things she made at her wheel, and the things growing outside her door. Then, gradually, they started to speak to one another.",
    "“You can have an idea of what you want a thing to be,” she tells us, brushing soil from her palms, “but you can't force it to get there. I think that's the part I like.”",
    "By the time we leave, the afternoon light has crossed the whole studio floor. A tray of seedlings is getting a little more sun, and Mara has just started on another pot."
  ] },
  { title: "A very small morning ritual", category: "Living", author: "Sam Kim", date: "September 26", image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=900&q=80", alt: "A warm cup of coffee on a quiet morning", paragraphs: [
    "This is not a guide to reinventing your life before 7 a.m. There is no cold shower, no elaborate routine, and certainly no miracle supplement.",
    "It's just this: make something warm to drink, and don't take it to another room. Stand or sit by the window. Leave your phone where it is for five minutes. Look at what the weather is doing.",
    "The whole thing takes less time than choosing a podcast. Most mornings, it doesn't feel like anything at all. But the day starts a little more gently, and that turns out to count for something.",
    "Sometimes the window is full of rain. Sometimes a neighbor's cat appears on the fence. Every so often, the coffee is especially good. It's a very small thing, which is kind of the point."
  ] },
  { title: "Take the long way home", category: "Places", author: "June Miller", date: "September 19", image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80", alt: "A quiet winding path under warm evening light", paragraphs: [
    "There is a road we take nearly every day that we have never really seen. We know how long it takes, which light changes slowly, and exactly where the traffic starts to back up.",
    "Last week, on a whim, we took the turn before the bridge. It added twenty minutes to the trip. It added a bakery we hadn't noticed, a little free library with three mysteries and a handwritten note, and a view of the river we thought we knew.",
    "Getting lost is often presented as an adventure, and it can be. Mostly, though, it's a way of making space for things you weren't specifically looking for.",
    "We still use the regular road most days. But now we know where the long way is. Sometimes, it turns out, the destination really isn't the best part."
  ] },
  { title: "Begin before you are ready", category: "Ideas", author: "Alex Lee", date: "September 12", image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=900&q=80", alt: "Open notebook and pen ready for a first draft", paragraphs: [
    "There is a version of this project in my head that is very good. It is also, inconveniently, not a project at all. It is an idea I have been carrying around long enough to make starting feel more difficult than doing the work ever could.",
    "So here is what I am learning: the first version does not need to prove anything. It needs to exist. It can be lopsided and unfinished and a little embarrassing. It can be a small piece of evidence that you started.",
    "A friend once told me she keeps the first bad sketch of every finished painting. “It's how I know where it came from,” she said. Not every beginning is pretty. But each one makes a next step possible.",
    "If there is something you are waiting to feel ready for, consider this your permission to make the clumsy first version. No one needs to see it yet. It only needs to be real."
  ] },
  { title: "More chairs at the table", category: "Living", author: "Sam Kim", date: "September 5", image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=900&q=80", alt: "A welcoming dinner table ready for friends", paragraphs: [
    "For a long time, we thought dinner with friends had to be an occasion. A menu planned days in advance. A properly set table. The kind of evening where everything is clean before anyone rings the bell.",
    "Then we started asking people over on regular Wednesdays. We made soup, asked someone to bring bread, and said yes when a friend asked if they could bring another friend.",
    "It turns out nobody remembers whether the glasses match. They remember the conversation that wandered somewhere unexpected, the recipe someone scribbled on the back of an envelope, and the person who came alone and left with plans for next week.",
    "Here's to more chairs at the table, even when the table is a little messy. Especially then."
  ] }
];

const filterButtons = [...document.querySelectorAll(".filter-chip")];
const storyCards = [...document.querySelectorAll(".story-card")];
const searchInput = document.querySelector("#story-search");
const emptyState = document.querySelector("#empty-state");
const resultsCount = document.querySelector("#results-count");
let activeCategory = "All";

function filterStories() {
  const searchTerm = searchInput.value.trim().toLowerCase();
  let visibleCount = 0;
  storyCards.forEach((card) => {
    const matchesCategory = activeCategory === "All" || card.dataset.category === activeCategory;
    const matchesSearch = !searchTerm || card.dataset.search.includes(searchTerm) || card.querySelector("h3").textContent.toLowerCase().includes(searchTerm);
    const isVisible = matchesCategory && matchesSearch;
    card.hidden = !isVisible;
    if (isVisible) visibleCount += 1;
  });
  emptyState.hidden = visibleCount !== 0;
  resultsCount.textContent = searchTerm || activeCategory !== "All" ? `${visibleCount} ${visibleCount === 1 ? "story" : "stories"}` : "";
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    activeCategory = button.dataset.filter;
    filterButtons.forEach((item) => {
      const isActive = item === button;
      item.classList.toggle("is-active", isActive);
      item.setAttribute("aria-pressed", String(isActive));
    });
    filterStories();
  });
});
searchInput.addEventListener("input", filterStories);
document.querySelector(".reset-search").addEventListener("click", () => {
  searchInput.value = "";
  activeCategory = "All";
  filterButtons.forEach((button) => {
    const isActive = button.dataset.filter === "All";
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });
  filterStories();
  searchInput.focus();
});

const articleDialog = document.querySelector("#article-dialog");
document.querySelectorAll("[data-story]").forEach((button) => {
  button.addEventListener("click", () => {
    const story = stories[Number(button.dataset.story)];
    document.querySelector("#dialog-category").textContent = `${story.category} · A Fieldnotes story`;
    document.querySelector("#dialog-title").textContent = story.title;
    document.querySelector("#dialog-byline").textContent = `By ${story.author} · ${story.date}`;
    const dialogImage = document.querySelector("#dialog-image");
    dialogImage.src = story.image;
    dialogImage.alt = story.alt;
    document.querySelector("#dialog-body").replaceChildren(...story.paragraphs.map((paragraph) => {
      const element = document.createElement("p");
      element.textContent = paragraph;
      return element;
    }));
    articleDialog.showModal();
  });
});
document.querySelector(".dialog-close").addEventListener("click", () => articleDialog.close());
articleDialog.addEventListener("click", (event) => {
  if (event.target === articleDialog) articleDialog.close();
});

const menuToggle = document.querySelector(".menu-toggle");
const siteNav = document.querySelector(".site-nav");
menuToggle.addEventListener("click", () => {
  const isOpen = menuToggle.getAttribute("aria-expanded") !== "true";
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
  siteNav.classList.toggle("is-open", isOpen);
});
siteNav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open menu");
    siteNav.classList.remove("is-open");
  });
});

document.querySelector("#newsletter-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const emailInput = document.querySelector("#email-address");
  if (!emailInput.reportValidity()) return;
  const message = document.querySelector("#newsletter-message");
  message.textContent = "You're on the list. Look out for a little Sunday something!";
  message.classList.add("is-success");
  emailInput.value = "";
});
