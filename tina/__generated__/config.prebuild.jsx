// tina/config.ts
import { defineConfig } from "tinacms";
var config_default = defineConfig({
  // Your GitHub repo — update if your repo name is different
  branch: "main",
  clientId: process.env.TINA_CLIENT_ID || "",
  token: process.env.TINA_TOKEN || "",
  build: {
    outputFolder: "admin",
    // builds to /public/admin
    publicFolder: "public"
  },
  media: {
    tina: {
      mediaRoot: "uploads",
      publicFolder: "public"
    }
  },
  schema: {
    collections: [
      // ── MOVIE & TV REVIEWS ──────────────────────────────────
      {
        name: "reviews",
        label: "Movie & TV Reviews",
        path: "src/content/reviews",
        format: "json",
        ui: {
          filename: {
            // filename = slugified title, e.g. "scary-movie.json"
            slugify: (values) => values?.title?.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") ?? "untitled"
          }
        },
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            isTitle: true,
            required: true
          },
          {
            type: "string",
            name: "type",
            label: "Type",
            options: [
              { label: "Movie", value: "movie" },
              { label: "TV Show", value: "tv" }
            ],
            required: true
          },
          {
            type: "number",
            name: "year",
            label: "Year",
            required: true
          },
          {
            type: "string",
            name: "genre",
            label: "Genres",
            list: true,
            // shows as a tag-input — add each genre separately
            ui: {
              component: "tags"
            }
          },
          {
            type: "number",
            name: "rating",
            label: "Rating (1\u20135, supports 4.5 etc.)",
            required: true
          },
          {
            type: "string",
            name: "review",
            label: "Review",
            ui: {
              component: "textarea"
            }
          },
          {
            type: "string",
            name: "dateWatched",
            label: "Date Watched",
            ui: {
              component: "date"
            }
          },
          {
            type: "boolean",
            name: "recommended",
            label: "Recommended?"
          },
          {
            type: "string",
            name: "status",
            label: "TV Status (TV shows only)",
            options: [
              { label: "Currently Watching", value: "watching" },
              { label: "Completed", value: "completed" },
              { label: "Dropped", value: "dropped" }
            ]
          }
        ]
      },
      // ── DEATH IN PARADISE ───────────────────────────────────
      {
        name: "dip",
        label: "Death in Paradise",
        path: "src/content/dip",
        format: "json",
        ui: {
          filename: {
            // filename = s1e01, s7e03, etc.
            slugify: (values) => {
              const s = String(values?.season ?? "").padStart(1, "0");
              const e = String(values?.episode ?? "").padStart(2, "0");
              return s && e ? `s${s}e${e}` : "untitled";
            }
          }
        },
        fields: [
          {
            type: "number",
            name: "season",
            label: "Season",
            required: true
          },
          {
            type: "number",
            name: "episode",
            label: "Episode",
            required: true
          },
          {
            type: "string",
            name: "title",
            label: "Episode Title",
            isTitle: true,
            required: true
          },
          {
            type: "string",
            name: "summary",
            label: "Summary",
            description: "Brief description shown on the card",
            ui: { component: "textarea" }
          },
          {
            type: "string",
            name: "method",
            label: "Method",
            description: "How the victim was killed",
            ui: { component: "textarea" }
          },
          {
            type: "string",
            name: "motive",
            label: "Motive",
            description: "Why the killer did it",
            ui: { component: "textarea" }
          },
          {
            type: "string",
            name: "killer",
            label: "Killer",
            description: "Who did it \u2014 hidden on card, shown in popup only"
          },
          {
            type: "string",
            name: "notes",
            label: "Notes (optional)",
            description: "Personal notes \u2014 shown in popup only",
            ui: { component: "textarea" }
          },
          {
            type: "string",
            name: "tags",
            label: "Tags / Themes",
            description: "e.g. poisoning, money, revenge, locked-room \u2014 add each separately",
            list: true,
            ui: {
              component: "tags"
            }
          },
          {
            type: "string",
            name: "dateAdded",
            label: "Date Added",
            ui: { component: "date" }
          }
        ]
      }
    ]
  }
});
export {
  config_default as default
};
